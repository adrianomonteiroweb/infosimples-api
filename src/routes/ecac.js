import { Router } from "express";

import { consultaCNPJ, consultaDctf } from "../services/infosimples.js";
import { encryptCert, encryptPassword } from "../utils/encrypt.js";

const router = Router();

router.get("/dctf", async (_req, res, next) => {
  try {
    // Validação das variáveis de ambiente
    if (!process.env.CERT_PATH) {
      throw new Error("CERT_PATH não configurado no arquivo .env");
    }
    if (!process.env.CERT_PASSWORD) {
      throw new Error("CERT_PASSWORD não configurado no arquivo .env");
    }
    if (!process.env.CHAVE_CRIPTOGRAFIA && !process.env.SECRET_KEY) {
      throw new Error("CHAVE_CRIPTOGRAFIA não configurado no arquivo .env");
    }

    // Lê e criptografa o certificado
    const pkcs12_cert = encryptCert();
    const pkcs12_pass = encryptPassword();

    const params = {
      data_inicial_apuracao: "2025-08-01",
      data_final_apuracao: "2025-08-31",
    };

    // Faz a consulta na API InfoSimples
    const result = await consultaDctf({ ...params, pkcs12_cert, pkcs12_pass });

    res.json(result);
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
