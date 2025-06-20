const { createClient } = require('bedrock-protocol');

function criarBot() {
    const client = createClient({
        host: 'CraftIFMA.aternos.me', // 🔁 Substitua com o IP do Aternos
        port: 21968,                     // Padrão do Bedrock
        username: 'Hedrinho'            // Nick do bot
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

// Adicione isso no final do index.js
require('http').createServer((req, res) => {
  res.end('Bot online');
}).listen(process.env.PORT || 3000);

const http = require('http');

const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running.\n');
}).listen(port, () => {
  console.log(`HTTP fake server running on port ${port}`);
});
