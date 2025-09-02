import AES256 from "aes-everywhere";

export function encryptBase64Base(certBuffer, key) {
  const base64 = certBuffer.toString("base64");
  return AES256.encrypt(base64, key)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function encryptString(text, key) {
  return AES256.encrypt(text, key)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
