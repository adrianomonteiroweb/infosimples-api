import fs from "fs";
import { Router } from "express";

import { consultaDctf, consultaCNPJ } from "../services/infosimples.js";
import { encryptBase64Base, encryptString } from "../utils/encrypt.js";
import config from "../config/index.js";

const router = Router();

/**
 * POST /ecac/dctf
 * Body: {
 *   certPath, certPass, data_inicial_apuracao?, ...outros params da API InfoSimples
 * }
 */
router.post("/dctf", async (req, res, next) => {
  try {
    const { certPath, certPass, ...params } = req.body;

    // Validações básicas
    if (!certPath || !certPass) {
      return res.status(400).json({
        error: "certPath e certPass são obrigatórios",
      });
    }

    if (!config.encryptionKey) {
      return res.status(500).json({
        error: "CHAVE_CRIPTOGRAFIA não configurada no servidor",
      });
    }

    // Verifica se o arquivo do certificado existe
    if (!fs.existsSync(certPath)) {
      return res.status(400).json({
        error: `Arquivo de certificado não encontrado: ${certPath}`,
      });
    }

    const key = config.encryptionKey;

    // Lê e criptografa o certificado
    const certBuffer = fs.readFileSync(certPath);
    const pkcs12_cert = encryptBase64Base(certBuffer, key);
    const pkcs12_pass = encryptString(certPass, key);

    // Faz a consulta na API InfoSimples
    const result = await consultaDctf({ ...params, pkcs12_cert, pkcs12_pass });

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Erro na consulta DCTF:", err.message);
    next(err);
  }
});

/**
 * GET /ecac/cnpj/:cnpj
 * Consulta dados de empresa por CNPJ na Receita Federal
 * Não requer certificado
 */
router.get("/cnpj/:cnpj", async (req, res, next) => {
  try {
    const { cnpj } = req.params;

    // Validação básica do CNPJ
    if (!cnpj) {
      return res.status(400).json({
        error: "CNPJ é obrigatório",
      });
    }

    // Remove caracteres especiais do CNPJ para validação
    const cnpjLimpo = cnpj.replace(/[^\d]/g, "");

    if (cnpjLimpo.length !== 14) {
      return res.status(400).json({
        error: "CNPJ deve ter 14 dígitos",
      });
    }

    // Faz a consulta na API InfoSimples
    const result = await consultaCNPJ(cnpj);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Erro na consulta CNPJ:", err.message);
    next(err);
  }
});

// Rota de health check
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "ECAC API",
  });
});

export default router;
