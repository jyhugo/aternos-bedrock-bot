const { createClient } = require('bedrock-protocol');

function criarBot() {
    const client = createClient({
        host: 'SEU_SERVIDOR.aternos.me', // 🔁 Substitua com o IP do Aternos
        port: 19132,                     // Padrão do Bedrock
        username: 'BotRender'            // Nick do bot
    });

    client.on('join', () => {
        console.log('✅ Bot entrou no servidor Bedrock!');
    });

    client.on('disconnect', (reason) => {
        console.log('❌ Desconectado:', reason);
        setTimeout(criarBot, 10000); // Tenta reconectar a cada 10s
    });

    client.on('error', (err) => {
        console.error('Erro:', err);
    });
}

criarBot();
