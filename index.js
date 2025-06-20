const { createClient } = require('bedrock-protocol');
const http = require('http');
const fs = require('fs');
let client = null;
let reconectando = false;

function criarBot() {
  if (client) {
    try { client.disconnect?.(); } catch (_) {}
    client = null;
  }

  // Verifica se o perfil salvo existe
  if (!fs.existsSync('./profiles') || fs.readdirSync('./profiles').length === 0) {
    console.log("❌ A pasta './profiles' não existe ou está vazia. Faça login localmente primeiro.");
    return;
  }

  console.log("🔁 Iniciando bot...");

  client = createClient({
    host: 'CraftIFMA.aternos.me',
    port: 21968,
    username: undefined, // usa perfil salvo localmente
    profilesFolder: './profiles',
    flow: 'msal',
  });

  client.on('join', () => {
    console.log("✅ Bot entrou no servidor Bedrock!");
    reconectando = false;
  });

  client.on('disconnect', (packet) => {
    console.log(`⚠️ Desconectado: ${packet?.reason || 'sem motivo'}`);
    tentarReconectar();
  });

  client.on('error', (err) => {
    console.log(`❌ Erro: ${err.message}`);
    tentarReconectar();
  });

  client.on('end', () => {
    console.log("🔚 Conexão encerrada (end).");
    tentarReconectar();
  });

  client.on('close', () => {
    console.log("🔒 Conexão fechada (close).");
    tentarReconectar();
  });
}

function tentarReconectar() {
  if (reconectando) return;
  reconectando = true;
  console.log("🔄 Tentando reconectar em 10 segundos...");
  setTimeout(() => {
    criarBot();
  }, 10000);
}

// Primeira conexão
criarBot();

// HTTP keep-alive (Render)
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
});
server.listen(10000, () => {
  console.log("🌐 Servidor HTTP rodando na porta 10000");
});

// Heartbeat de log
setInterval(() => {
  console.log('📡 Bot ainda está vivo');
}, 60000);
