import app from "./src/app.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

console.log(`Tentando iniciar servidor na porta ${PORT}...`);

const server = app.listen(PORT, () => {
  console.log(`API rodando em http://${HOST}:${PORT}`);
  console.log(`Servidor ativo e escutando conexões...`);
});

server.on("error", (err) => {
  console.error("Erro no servidor:", err);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM recebido, fechando servidor...");
  server.close(() => {
    console.log("Servidor fechado.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT recebido, fechando servidor...");
  server.close(() => {
    console.log("Servidor fechado.");
    process.exit(0);
  });
});
