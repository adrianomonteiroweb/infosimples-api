import axios from "axios";

import config from "../config/index.js";

export async function consultaDctf(params) {
  const url = `${config.infosimples.baseUrl}/ecac/dctf-web`;

  if (!config.infosimples.token) {
    throw new Error("Token da API InfoSimples não configurado");
  }

  const query = {
    token: config.infosimples.token,
    timeout: 600,
    ignore_site_receipt: "0",
    ...params,
  };

  try {
    console.log(`Fazendo requisição para: ${url}`);
    const response = await axios.get(url, {
      params: query,
      timeout: 650000, // 10+ minutos para timeout
    });

    return response.data;
  } catch (error) {
    console.error("Erro na consulta InfoSimples:", error.message);

    if (error.response) {
      // Erro da API InfoSimples
      throw new Error(
        `API InfoSimples retornou erro ${error.response.status}: ${
          error.response.data?.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      // Erro de network/timeout
      throw new Error(
        "Erro de conexão com a API InfoSimples - verifique sua conectividade"
      );
    } else {
      // Outro tipo de erro
      throw new Error(`Erro inesperado: ${error.message}`);
    }
  }
}

export async function consultaCNPJ(cnpj) {
  const url = `${config.infosimples.baseUrl}/receita-federal/cnpj`;

  if (!config.infosimples.token) {
    throw new Error("Token da API InfoSimples não configurado");
  }

  const query = {
    token: config.infosimples.token,
    timeout: 600,
    ignore_site_receipt: "0",
    cnpj: cnpj,
  };

  try {
    console.log(`Fazendo requisição para: ${url}`);
    console.log(`CNPJ: ${cnpj}`);

    const response = await axios.get(url, {
      params: query,
      timeout: 650000, // 10+ minutos para timeout
    });

    return response.data;
  } catch (error) {
    console.error("Erro na consulta InfoSimples:", error.message);

    if (error.response) {
      // Erro da API InfoSimples
      throw new Error(
        `API InfoSimples retornou erro ${error.response.status}: ${
          error.response.data?.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      // Erro de network/timeout
      throw new Error(
        "Erro de conexão com a API InfoSimples - verifique sua conectividade"
      );
    } else {
      // Outro tipo de erro
      throw new Error(`Erro inesperado: ${error.message}`);
    }
  }
}
