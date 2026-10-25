"""ARQUIVO PARA TESTE: Enviar push de teste aos aparelhos cadastrados: python testar_push.py"""

import time
from notificacoes import enviar_diagnostico, quantidade_dispositivos, consultar_recibos

if __name__ == '__main__':
    print('Aparelhos cadastrados:', quantidade_dispositivos())
    resposta = enviar_diagnostico(f'teste-{int(time.time())}', 'Teste', modo_teste=True)
    print('Tickets aceitos (não significam entrega garantida):', resposta)
    print('Após alguns minutos, execute: python verificar_push.py')
