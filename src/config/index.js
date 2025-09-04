import dotenv from "dotenv";

dotenv.config();

export default {
  infosimples: {
    baseUrl:
      process.env.INFOSIMPLES_BASE_URL ||
      "https://api.infosimples.com/api/v2/consultas",
    token: process.env.TOKEN_INFOSIMPLES,
  },
};
