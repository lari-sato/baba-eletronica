import os
import tempfile
import numpy as np
import librosa

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from keras.models import load_model

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

PASTA_MODELOS = "modelos"

CAMINHO_MODELO_FASE2 = os.path.join(PASTA_MODELOS, "modelo_fase2_fome_outros.keras")
CAMINHO_MODELO_FASE3 = os.path.join(PASTA_MODELOS, "modelo_fase3_categorias.keras")
CAMINHO_CLASSES_FASE3 = os.path.join(PASTA_MODELOS, "classes_fase3.npy")

SR = 22050
DURACAO = 3.0
N_MFCC = 40
MAX_PAD_LEN = 130

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
            "confianca": round(prob_fome, 4)
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
        "confianca": round(prob_1, 4)
    }


# =========================================================
# ROTAS DA API
# =========================================================

@app.get("/")
def home():
    return {
        "mensagem": "Backend Luz e Colo ativo",
        "status": "ok"
    }


@app.post("/classificar")
async def classificar(file: UploadFile = File(...)):
    extensoes_permitidas = [".wav", ".mp3", ".ogg", ".flac", ".m4a"]

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