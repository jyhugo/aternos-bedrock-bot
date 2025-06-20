const { createClient } = require('bedrock-protocol');
const http = require('http');

function criarBot() {
    const client = createClient({
        host: 'CraftIFMA.aternos.me',
        port: 21968,
        username: 'Hedrinho',
        offline: false,           // se for login com Microsoft
        authTitle: 'minecraft',   // necessário para contas Microsoft
        skipPing: true
    });

    client.on('join', () => {
        console.log('✅ Bot entrou no servidor Bedrock!');
    });

    client.on('disconnect', (reason) => {
        console.log('❌ Desconectado:', reason);
        setTimeout(criarBot, 10000); // tenta reconectar após 10 segundos
    });

    client.on('error', (err) => {
        console.error('Erro:', err);
    });
}

criarBot();

// === HTTP SERVER FALSO PARA MANTER RENDER ATIVO ===
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot ativo.\n');
}).listen(port, () => {
    console.log(`🌐 Servidor HTTP rodando na porta ${port}`);
});
