import AES256 from "aes-everywhere";

import { readFileSync } from "fs";

import dotend from "dotenv";

dotend.config();

const CHAVE_CRIPTOGRAFIA = process.env.CHAVE_CRIPTOGRAFIA;
const CERT_PATH = process.env.CERT_PATH;
const CERT_PASSWORD = process.env.CERT_PASSWORD;

export function encryptCert() {
  const cert_base64 = Buffer.from(readFileSync(CERT_PATH)).toString("base64");

  return AES256.encrypt(cert_base64, CHAVE_CRIPTOGRAFIA)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function encryptPassword() {
  return AES256.encrypt(CERT_PASSWORD, CHAVE_CRIPTOGRAFIA)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
