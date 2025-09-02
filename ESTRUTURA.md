project-root/
├── src/
│ ├── routes/
│ │ └── ecac.js # Rotas específicas para ECAC / DCTF Web
│ ├── services/
│ │ └── infosimples.js # Chamada HTTP para API Infosimples
│ ├── utils/
│ │ └── encrypt.js # Funções de encriptação AES
│ ├── app.js # Configura express e middleware
│ └── config/
│ └── index.js # Configurações gerais (env, API base URL)
├── index.js # Entry point para rodar o servidor
├── .env # Variáveis de ambiente (TOKEN, CHAVE_CRIPTO, etc.)
├── package.json
└── README.md
