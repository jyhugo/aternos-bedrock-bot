const { createClient } = require('bedrock-protocol');
const http = require('http');
const fs = require('fs');
const path = './profiles';

if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
  console.log("⚠️ Criada pasta './profiles'. Agora faça login com sua conta Microsoft no link abaixo:");
}

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
    flow: 'msal',
  });

  client.on('code', (code) => {
    console.log("🔐 Vá para https://www.microsoft.com/link e digite o código:");
    console.log(`👉 Código: ${code}`);
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
    console.log("🔚 Conexão encerrada. Reconectando...");
    tentarReconectar();
  });

  client.on('close', () => {
    console.log("🔒 Conexão fechada. Reconectando...");
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

// Servidor HTTP para manter vivo (Render ou Replit)
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
}).listen(10000, () => {
  console.log("🌐 Servidor HTTP rodando na porta 10000");
});

setInterval(() => {
  console.log('📡 Bot ainda está vivo');
}, 60000);
