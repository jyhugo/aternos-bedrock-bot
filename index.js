const { createClient } = require('bedrock-protocol');
const http = require('http');

let client = null;

function criarBot() {
  if (client) {
    try { client.disconnect?.(); } catch (_) {}
    client = null;
  }

  console.log("🔁 Iniciando bot...");

  client = createClient({
    host: 'CraftIFMA.aternos.me',
    port: 21968,
    username: 'Herinhogomes@outlook.com',
    profilesFolder: './profiles',
    authTitle: 'Minecraft',
    flow: 'msal',
  });

  client.on('join', () => {
    console.log("✅ Bot entrou no servidor Bedrock!");
  });

  client.on('disconnect', (packet) => {
    console.log(`⚠️ Desconectado: ${packet.reason}`);
    tentarReconectar();
  });

  client.on('error', (err) => {
    console.log(`❌ Erro: ${err.message}`);
    tentarReconectar();
  });

  client.on('end', () => {
    console.log("🔚 Conexão encerrada (end). Reconectando...");
    tentarReconectar();
  });

  client.on('close', () => {
    console.log("🔒 Conexão fechada (close). Reconectando...");
    tentarReconectar();
  });
}

function tentarReconectar() {
  console.log("🔄 Tentando reconectar em 10 segundos...");
  setTimeout(() => {
    criarBot();
  }, 10000);
}

criarBot();

// HTTP keepalive para Render
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
});
server.listen(10000, () => {
  console.log("🌐 Servidor HTTP rodando na porta 10000");
});

// Heartbeat para logs
setInterval(() => {
  console.log('📡 Bot ainda está vivo');
}, 60000);
