import express from "express";

import ecacRouter from "./routes/ecac.js";

const app = express();

// Middleware para parsing JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rota principal
app.get("/", (req, res) => {
  res.json({
    message: "API InfoSimples - ECAC",
    version: "1.0.0",
    endpoints: {
      health: "GET /ecac/health",
      dctf: "POST /ecac/dctf",
      cnpj: "GET /ecac/cnpj/:cnpj",
    },
    documentation: "https://api.infosimples.com/consultas/docs",
  });
});

// Rotas
app.use("/ecac", ecacRouter);

// Middleware de tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada",
    method: req.method,
    path: req.path,
  });
});

// Middleware de erro genérico
app.use((err, req, res, next) => {
  console.error("Erro na aplicação:", err);

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || "Erro interno do servidor",
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  });
});

export default app;
