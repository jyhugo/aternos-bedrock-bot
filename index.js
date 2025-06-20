const { createClient } = require('bedrock-protocol');
const fs = require('fs');

let client = null;

function criarBot() {
  console.log("🔁 Iniciando bot...");
  client = createClient({
    host: 'CraftIFMA.aternos.me',
    port: 21968,
    username: 'seu-email@microsoft.com', // ou undefined se já tiver salvo
    profilesFolder: './profiles',
    authTitle: 'Minecraft',
    flow: 'msal',
  });

  client.on('join', () => {
    console.log("✅ Bot entrou no servidor Bedrock!");
  });

  client.on('disconnect', (packet) => {
    console.log(`⚠️ Bot foi desconectado: ${packet.reason}`);
    tentarReconectar();
  });

  client.on('error', (err) => {
    console.log(`❌ Erro: ${err.message}`);
    tentarReconectar();
  });
}

function tentarReconectar() {
  console.log("🔄 Tentando reconectar em 10 segundos...");
  setTimeout(() => {
    criarBot();
  }, 10000); // 10 segundos de espera antes de reconectar
}

// Start da primeira conexão
criarBot();

// Servidor web opcional pra evitar timeout na Render
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
});
server.listen(10000, () => {
  console.log("🌐 Servidor HTTP rodando na porta 10000");
});
