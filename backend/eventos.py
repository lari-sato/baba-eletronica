"""Persistencia minima dos eventos recebidos da ESP32 para a etapa 1."""

import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "eventos.db"


def _agora():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _conectar():
    conexao = sqlite3.connect(DB_PATH, timeout=15)
    conexao.row_factory = sqlite3.Row
    return conexao


def inicializar_banco_eventos():
    with _conectar() as conexao:
        conexao.execute("""
            CREATE TABLE IF NOT EXISTS eventos (
                evento_id TEXT PRIMARY KEY,
                status TEXT NOT NULL,
                horario TEXT NOT NULL,
                atualizado_em TEXT NOT NULL,
                resultado_json TEXT,
                erro TEXT
            )
        """)


def registrar_evento(evento_id):
    """Retorna True se criou o evento; False se era uma retransmissao."""
    agora = _agora()
    with _conectar() as conexao:
        cursor = conexao.execute(
            "INSERT OR IGNORE INTO eventos "
            "(evento_id, status, horario, atualizado_em) VALUES (?, ?, ?, ?)",
            (evento_id, "recebido", agora, agora),
        )
        return cursor.rowcount == 1


def atualizar_evento(evento_id, status, resultado=None, erro=None):
    with _conectar() as conexao:
        conexao.execute(
            """UPDATE eventos
            SET status=?, atualizado_em=?, resultado_json=?, erro=?
            WHERE evento_id=?""",
            (
                status,
                _agora(),
                json.dumps(resultado, ensure_ascii=False) if resultado is not None else None,
                erro,
                evento_id,
            ),
        )


def _converter(linha):
    if not linha:
        return None
    evento = dict(linha)
    resultado_json = evento.pop("resultado_json")
    evento["resultado"] = json.loads(resultado_json) if resultado_json else None
    return evento


def obter_evento(evento_id):
    with _conectar() as conexao:
        linha = conexao.execute(
            "SELECT * FROM eventos WHERE evento_id=?", (evento_id,)
        ).fetchone()
    return _converter(linha)


def obter_ultimo_evento():
    with _conectar() as conexao:
        linha = conexao.execute(
            "SELECT * FROM eventos ORDER BY rowid DESC LIMIT 1"
        ).fetchone()
    return _converter(linha)


inicializar_banco_eventos()
