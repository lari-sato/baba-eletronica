import os
import tempfile
import io
import re
import secrets
import wave
from pathlib import Path
import numpy as np
import librosa
import tensorflow as tf
from scipy.signal import butter, lfilter

from fastapi import FastAPI, UploadFile, File, Request, BackgroundTasks, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from keras.models import load_model
from eventos import registrar_evento, atualizar_evento, obter_evento, obter_ultimo_evento
from pydantic import BaseModel
from notificacoes import registrar_token, cancelar_token, quantidade_dispositivos, enviar_diagnostico

# =========================================================
# CONFIGURAÇÕES
# =========================================================

app = FastAPI(title="Backend Luz e Colo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PASTA_MODELOS = os.path.join(os.path.dirname(__file__), "modelos")

CAMINHO_MODELO_FASE2 = os.path.join(PASTA_MODELOS, "modelo_fase2_fome_outros.keras")
CAMINHO_MODELO_FASE3 = os.path.join(PASTA_MODELOS, "modelo_fase3_categorias.keras")
CAMINHO_CLASSES_FASE3 = os.path.join(PASTA_MODELOS, "classes_fase3.npy")

SR = 22050
DURACAO = 3.0
N_MFCC = 40
MAX_PAD_LEN = 130

# Filtro de áudio 
FILTRO_F_BAIXA = 250
FILTRO_F_ALTA = 5000
FILTRO_ORDEM = 4
PRE_ENFASE_ALFA = 0.97

THRESHOLD_FASE2_OUTROS = 0.45

CONFIANCA_MINIMA_FASE3 = 0.45
MARGEM_DIFERENCA_FASE3 = 0.20


# =========================================================
# CARREGAMENTO DOS MODELOS
# =========================================================

modelo_fase2 = load_model(CAMINHO_MODELO_FASE2)
modelo_fase3 = load_model(CAMINHO_MODELO_FASE3)
classes_fase3 = np.load(CAMINHO_CLASSES_FASE3, allow_pickle=True)

print("Modelos carregados com sucesso.")
print("Classes Fase 3:", classes_fase3)

# =========================================================
# FUNÇÕES DE FILTRO
# =========================================================

def aplicar_pre_enfase(sinal, alfa=PRE_ENFASE_ALFA):
    if len(sinal) == 0:
        return sinal

    return np.append(sinal[0], sinal[1:] - alfa * sinal[:-1])


def filtrar_passa_banda(
    sinal,
    f_baixa=FILTRO_F_BAIXA,
    f_alta=FILTRO_F_ALTA,
    f_amostragem=SR,
    ordem=FILTRO_ORDEM
):
    nyq = 0.5 * f_amostragem

    baixa = f_baixa / nyq
    alta = f_alta / nyq

    b, a = butter(ordem, [baixa, alta], btype="band")

    return lfilter(b, a, sinal)


def aplicar_filtro_audio(audio, sample_rate):
    audio = aplicar_pre_enfase(audio)

    audio = filtrar_passa_banda(
        audio,
        f_baixa=FILTRO_F_BAIXA,
        f_alta=FILTRO_F_ALTA,
        f_amostragem=sample_rate,
        ordem=FILTRO_ORDEM
    )

    return audio


# =========================================================
# FUNÇÕES DE PRÉ-PROCESSAMENTO
# =========================================================

def padronizar_mfcc(mfcc, max_pad_len=MAX_PAD_LEN):
    if mfcc.shape[1] < max_pad_len:
        pad_width = max_pad_len - mfcc.shape[1]

        mfcc = np.pad(
            mfcc,
            pad_width=((0, 0), (0, pad_width)),
            mode="constant"
        )
    else:
        mfcc = mfcc[:, :max_pad_len]

    return mfcc


def extrair_mfcc_simples(caminho_audio):
    audio, sample_rate = librosa.load(
        caminho_audio,
        sr=SR,
        duration=DURACAO
    )

    # Filtro aplicado antes do MFCC
    audio = aplicar_filtro_audio(audio, sample_rate)

    mfcc = librosa.feature.mfcc(
        y=audio,
        sr=sample_rate,
        n_mfcc=N_MFCC
    )

    mfcc = padronizar_mfcc(mfcc)

    # Formato esperado pela CNN: (1, 40, 130, 1)
    mfcc = mfcc[..., np.newaxis]
    mfcc = np.expand_dims(mfcc, axis=0)

    return mfcc


def traduzir_classe_fase3(classe):
    mapa = {
        "belly_pain": "Dor",
        "discomfort": "Desconforto",
        "tired": "Cansaço"
    }

    return mapa.get(classe, classe)


# =========================================================
# INFERÊNCIA
# =========================================================

def classificar_audio(caminho_audio):
    mfcc = extrair_mfcc_simples(caminho_audio)

    # -----------------------------
    # FASE 2: Fome vs Outros
    # -----------------------------

    pred_fase2 = modelo_fase2.predict(mfcc, verbose=0)[0][0]

    prob_outros = float(pred_fase2)
    prob_fome = 1.0 - prob_outros

    if prob_outros < THRESHOLD_FASE2_OUTROS:
        return {
            "fase2": "Fome",
            "resultado_final": "Fome",
            "prob_fome": round(prob_fome, 4),
            "prob_outros": round(prob_outros, 4),
            "fase3": None,
            "confianca": round(prob_fome, 4),
            "pre_processamento": "pre_enfase + passa_banda + mfcc"
        }

    # -----------------------------
    # FASE 3: Dor / Desconforto / Cansaço
    # -----------------------------

    pred_fase3 = modelo_fase3.predict(mfcc, verbose=0)[0]

    indices_ordenados = np.argsort(pred_fase3)[::-1]

    indice_1 = indices_ordenados[0]
    indice_2 = indices_ordenados[1]

    classe_1 = classes_fase3[indice_1]
    classe_2 = classes_fase3[indice_2]

    prob_1 = float(pred_fase3[indice_1])
    prob_2 = float(pred_fase3[indice_2])

    diferenca = prob_1 - prob_2

    if prob_1 < CONFIANCA_MINIMA_FASE3:
        resultado_final = "Indefinido"
    elif diferenca < MARGEM_DIFERENCA_FASE3:
        resultado_final = f"{traduzir_classe_fase3(classe_1)} ou {traduzir_classe_fase3(classe_2)}"
    else:
        resultado_final = traduzir_classe_fase3(classe_1)

    return {
        "fase2": "Outros",
        "resultado_final": resultado_final,
        "prob_fome": round(prob_fome, 4),
        "prob_outros": round(prob_outros, 4),
        "fase3": {
            "classe_mais_provavel": traduzir_classe_fase3(classe_1),
            "segunda_classe": traduzir_classe_fase3(classe_2),
            "prob_classe_1": round(prob_1, 4),
            "prob_classe_2": round(prob_2, 4),
            "diferenca": round(diferenca, 4)
        },
        "confianca": round(prob_1, 4),
        "pre_processamento": "pre_enfase + passa_banda + mfcc"
    }


# =========================================================
# ROTAS DA API
# =========================================================

@app.get("/")
def home():
    return {
        "mensagem": "Backend Luz e Colo ativo",
        "status": "ok",
        "pre_processamento": "pre_enfase + passa_banda + mfcc"
    }

@app.post("/classificar")
async def classificar(file: UploadFile = File(...)):
    extensoes_permitidas = [".wav", ".mp3", ".ogg", ".flac", ".m4a", ".3gp"]

    nome_arquivo = file.filename.lower()

    if not any(nome_arquivo.endswith(ext) for ext in extensoes_permitidas):
        return {
            "erro": "Formato de áudio não suportado",
            "arquivo_recebido": file.filename
        }

    sufixo = os.path.splitext(file.filename)[1]

    with tempfile.NamedTemporaryFile(delete=False, suffix=sufixo) as temp:
        conteudo = await file.read()
        temp.write(conteudo)
        caminho_temp = temp.name

    try:
        resultado = classificar_audio(caminho_temp)

        return {
            "status": "sucesso",
            "arquivo": file.filename,
            "resultado": resultado
        }

    except Exception as e:
        return {
            "status": "erro",
            "mensagem": str(e)
        }

    finally:
        if os.path.exists(caminho_temp):
            os.remove(caminho_temp)

# =========================================================
# EVENTOS AUTOMATICOS: ESP32 ENVIA WAV DIRETO AO BACKEND
# =========================================================

# Configure a mesma chave no PowerShell: $env:ESP32_API_KEY="sua-chave"
CHAVE_DISPOSITIVO = os.getenv("ESP32_API_KEY")
LIMITE_WAV_BYTES = 120_000  # 3 s PCM mono 16 kHz/16 bits = 96044 bytes


def _validar_wav_esp32(conteudo: bytes):
    """Valida o WAV enviado pela ESP32, sem alterar os modelos existentes."""
    try:
        with wave.open(io.BytesIO(conteudo), "rb") as wav:
            canais = wav.getnchannels()
            largura = wav.getsampwidth()
            taxa = wav.getframerate()
            quadros = wav.getnframes()
    except (wave.Error, EOFError, OSError) as erro:
        raise HTTPException(status_code=422, detail="WAV invalido") from erro

    if canais != 1 or largura != 2 or taxa != 16000 or quadros != 48000:
        raise HTTPException(
            status_code=422,
            detail="Esperado WAV PCM mono, 16 bits, 16000 Hz, 3 segundos",
        )


def _processar_evento_em_segundo_plano(evento_id: str, caminho_wav: str):
    """Classifica depois de aceitar o upload. A task usa o WAV temporario."""
    try:
        atualizar_evento(evento_id, "analisando")
        resultado = classificar_audio(caminho_wav)
        atualizar_evento(evento_id, "concluido", resultado=resultado)
        print(f"Evento {evento_id} concluido: {resultado['resultado_final']}")
        # O push nao altera o status da classificacao se a internet falhar.
        try:
            resumo = enviar_diagnostico(evento_id, resultado["resultado_final"])
            print(f"Push do evento {evento_id}: {resumo}")
        except Exception as erro_push:
            print(f"Aviso: resultado salvo, mas notificacao falhou: {erro_push}")
    except Exception as erro:
        atualizar_evento(evento_id, "erro", erro=str(erro))
        print(f"Erro ao classificar {evento_id}: {erro}")
    finally:
        if os.path.exists(caminho_wav):
            os.remove(caminho_wav)


@app.post("/eventos/audio", status_code=202)
async def receber_audio_esp32(
    request: Request,
    background_tasks: BackgroundTasks,
    x_device_key: str | None = Header(default=None),
    x_event_id: str | None = Header(default=None),
):
    if not CHAVE_DISPOSITIVO:
        raise HTTPException(status_code=503, detail="ESP32_API_KEY nao configurada")
    if x_device_key is None or not secrets.compare_digest(x_device_key, CHAVE_DISPOSITIVO):
        raise HTTPException(status_code=401, detail="Dispositivo nao autorizado")
    if not x_event_id or not re.fullmatch(r"[A-Za-z0-9_-]{3,90}", x_event_id):
        raise HTTPException(status_code=400, detail="X-Event-Id invalido")

    tipo = request.headers.get("content-type", "").split(";", 1)[0].lower()
    if tipo != "audio/wav":
        raise HTTPException(status_code=415, detail="Envie Content-Type: audio/wav")

    comprimento = request.headers.get("content-length")
    if comprimento is not None:
        try:
            tamanho_declarado = int(comprimento)
        except ValueError as erro:
            raise HTTPException(status_code=400, detail="Content-Length invalido") from erro
        if tamanho_declarado > LIMITE_WAV_BYTES:
            raise HTTPException(status_code=413, detail="Audio excede tamanho maximo")

    # Evita manter na RAM dados maiores que o limite, mesmo sem Content-Length.
    dados = bytearray()
    async for parte in request.stream():
        dados.extend(parte)
        if len(dados) > LIMITE_WAV_BYTES:
            raise HTTPException(status_code=413, detail="Audio excede tamanho maximo")

    _validar_wav_esp32(bytes(dados))

    # O mesmo evento_id na retransmissao nao dispara outra classificacao.
    existente = obter_evento(x_event_id)
    if existente:
        return {"status": "duplicado", "evento_id": x_event_id,
                "status_evento": existente["status"]}

    # Salva primeiro; so aceita no banco depois de haver arquivo para processar.
    caminho_wav = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as arquivo:
            arquivo.write(dados)
            caminho_wav = arquivo.name

        if not registrar_evento(x_event_id):
            os.remove(caminho_wav)
            existente = obter_evento(x_event_id)
            return {"status": "duplicado", "evento_id": x_event_id,
                    "status_evento": existente["status"]}

        background_tasks.add_task(
            _processar_evento_em_segundo_plano, x_event_id, caminho_wav
        )
        return {"status": "recebido", "evento_id": x_event_id}
    except Exception:
        if caminho_wav and os.path.exists(caminho_wav):
            os.remove(caminho_wav)
        raise


@app.get("/monitoramento/status")
def status_monitoramento():
    evento = obter_ultimo_evento()
    return evento if evento else {"status": "aguardando", "resultado": None}


@app.get("/monitoramento/eventos/{evento_id}")
def consultar_evento(evento_id: str):
    evento = obter_evento(evento_id)
    if evento is None:
        raise HTTPException(status_code=404, detail="Evento nao encontrado")
    return evento



# =========================================================
# ETAPA 3 - REGISTRO DO CELULAR ANDROID PARA EXPO PUSH
# Para publicacao: autenticar usuarios e associar tokens a responsaveis.
# =========================================================

class DispositivoPush(BaseModel):
    token: str


@app.post("/push/registrar")
def registrar_dispositivo_push(dispositivo: DispositivoPush):
    try:
        registrar_token(dispositivo.token)
    except ValueError as erro:
        raise HTTPException(status_code=400, detail=str(erro)) from erro
    return {"status": "registrado"}


@app.post("/push/cancelar")
def cancelar_dispositivo_push(dispositivo: DispositivoPush):
    cancelar_token(dispositivo.token)
    return {"status": "cancelado"}


@app.get("/push/status")
def status_push():
    # Nunca exponha tokens nesta rota.
    return {"dispositivos_registrados": quantidade_dispositivos()}
