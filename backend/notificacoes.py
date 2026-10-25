"""Notificações push do Luz e Colo - protótipo para Android / rede local.

Registra ExpoPushToken em SQLite e envia notificações para dispositivos cadastrados.
ATENÇÃO: cadastro sem autenticação de usuário. 
"""

import json
import os
import re
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

import httpx

BASE = Path(__file__).resolve().parent
BANCO = BASE / 'notificacoes.db'
EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send'
EXPO_RECEIPTS_URL = 'https://exp.host/--/api/v2/push/getReceipts'
CANAL_ANDROID = 'alertas-choro-v3'
VALIDO = re.compile(r'^(?:ExponentPushToken|ExpoPushToken)\[[A-Za-z0-9_-]+\]$')


def conectar():
    conexao = sqlite3.connect(str(BANCO), timeout=10)
    conexao.row_factory = sqlite3.Row
    return conexao


def inicializar():
    with conectar() as db:
        db.execute('''CREATE TABLE IF NOT EXISTS dispositivos (
            token TEXT PRIMARY KEY,
            cadastrado_em TEXT NOT NULL
        )''')
        db.execute('''CREATE TABLE IF NOT EXISTS envios (
            evento_id TEXT NOT NULL,
            token TEXT NOT NULL,
            ticket_id TEXT,
            enviado_em TEXT NOT NULL,
            PRIMARY KEY (evento_id, token)
        )''')


def registrar_token(token):
    token = token.strip()
    if not VALIDO.fullmatch(token):
        raise ValueError('Expo Push Token invalido')
    agora = datetime.now(timezone.utc).isoformat()
    with conectar() as db:
        db.execute('''INSERT INTO dispositivos (token, cadastrado_em) VALUES (?, ?)
            ON CONFLICT(token) DO UPDATE SET cadastrado_em=excluded.cadastrado_em''',
            (token, agora))


def cancelar_token(token):
    with conectar() as db:
        db.execute('DELETE FROM dispositivos WHERE token=?', (token,))


def listar_tokens():
    with conectar() as db:
        linhas = db.execute('SELECT token FROM dispositivos').fetchall()
    return [linha['token'] for linha in linhas]


def quantidade_dispositivos():
    return len(listar_tokens())


def enviar_diagnostico(evento_id, resultado_final, *, modo_teste=False):
    """Envia push para dispositivos cadastrados, sem repetir tickets aceitos.

    Ticket status ok = aceito pelo Expo, NAO prova recebimento no aparelho.
    Consulta de receipts deve ser executada posteriormente.
    """
    with conectar() as db:
        ja_enviados = {
            linha['token'] for linha in db.execute(
                'SELECT token FROM envios WHERE evento_id=?', (evento_id,)
            )
        }

    tokens = [t for t in listar_tokens() if t not in ja_enviados]
    if not tokens:
        print('Push: sem tokens pendentes para o evento', evento_id)
        return {'aceitos': 0, 'pendentes': 0}

    mensagem = (
        'Teste de notificação do Luz e Colo.'
        if modo_teste else
        f'Análise concluída. Possível causa do choro: {resultado_final}.'
    )

    aceitos = 0
    pendentes = 0
    with httpx.Client(timeout=15.0) as cliente:
        for inicio in range(0, len(tokens), 100):
            lote = tokens[inicio:inicio + 100]
            payload = [{
                'to': token,
                'title': ('Luz e Colo — Teste' if modo_teste else 'Luz e Colo — Choro identificado'),
                'body': mensagem,
                'sound': 'default',
                'priority': 'high',
                'channelId': CANAL_ANDROID,
                'data': {
                    'tipo': 'teste' if modo_teste else 'diagnostico',
                    'evento_id': evento_id,
                },
            } for token in lote]
            resposta = cliente.post(EXPO_PUSH_URL, json=payload)
            resposta.raise_for_status()
            recebido = resposta.json()
            tickets = recebido.get('data')
            if not isinstance(tickets, list) or len(tickets) != len(lote):
                raise RuntimeError('Resposta inesperada do Expo Push Service')
            for token, ticket in zip(lote, tickets):
                if ticket.get('status') == 'ok' and ticket.get('id'):
                    agora = datetime.now(timezone.utc).isoformat()
                    with conectar() as db:
                        db.execute('''INSERT OR IGNORE INTO envios
                            (evento_id, token, ticket_id, enviado_em)
                            VALUES (?, ?, ?, ?)''',
                            (evento_id, token, ticket['id'], agora))
                    aceitos += 1
                else:
                    pendentes += 1
                    detalhes = ticket.get('details') or {}
                    print('Push recusado:', ticket.get('message', 'sem detalhes'))
                    if detalhes.get('error') == 'DeviceNotRegistered':
                        cancelar_token(token)
    return {'aceitos': aceitos, 'pendentes': pendentes}


def consultar_recibos():
    """Consulta receipts dos tickets; remova tokens desregistrados."""
    with conectar() as db:
        linhas = db.execute('SELECT token, ticket_id FROM envios WHERE ticket_id IS NOT NULL').fetchall()
    if not linhas:
        return {'consultados': 0, 'erros': 0}

    erros = 0
    count = 0
    with httpx.Client(timeout=15.0) as cliente:
        for inicio in range(0, len(linhas), 1000):
            lote = linhas[inicio:inicio + 1000]
            resposta = cliente.post(
                EXPO_RECEIPTS_URL,
                json={'ids': [linha['ticket_id'] for linha in lote]},
            )
            resposta.raise_for_status()
            receipts = resposta.json().get('data') or {}
            for linha in lote:
                resultado = receipts.get(linha['ticket_id'])
                if not resultado:
                    continue  # ainda indisponível
                count += 1
                if resultado.get('status') == 'error':
                    erros += 1
                    detalhe = resultado.get('details') or {}
                    print('Push receipt erro:', detalhe.get('error'), resultado.get('message'))
                    if detalhe.get('error') == 'DeviceNotRegistered':
                        cancelar_token(linha['token'])
                # Ticket foi consumido. Sucesso/erro de transporte fica no log.
                with conectar() as db:
                    db.execute('UPDATE envios SET ticket_id=NULL WHERE token=? AND ticket_id=?',
                               (linha['token'], linha['ticket_id']))
    return {'consultados': count, 'erros': erros}


inicializar()
