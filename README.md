# API InfoSimples - ECAC

API para realizar consultas no ECAC (E-CAC - Centro Virtual de Atendimento ao Contribuinte) através da API da InfoSimples.

## Documentação da API InfoSimples

https://api.infosimples.com/consultas/docs

## Funcionalidades

1. Consulta DCTF-Web no ECAC
2. Criptografia automática de certificados e senhas
3. Interface REST simplificada

## Instalação

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env-example .env
# Editar o arquivo .env com suas configurações
```

## Configuração

Configure o arquivo `.env` com as seguintes variáveis:

```properties
# Configuração da API
PORT=3333
HOST=localhost

# InfoSimples
TOKEN_INFOSIMPLES=seu_token_aqui
INFOSIMPLES_BASE_URL=https://api.infosimples.com/api/v2/consultas

# Criptografia
CHAVE_CRIPTOGRAFIA=sua_chave_de_criptografia_aqui

# Certificado (opcional)
CERT_PATH=
CERT_PASS=
```

## Executar

```bash
# Desenvolvimento
pnpm run dev

# Produção
pnpm start
```

## Endpoints

### GET `/`

Informações da API e endpoints disponíveis.

### GET `/ecac/health`

Health check da API.

### GET `/ecac/cnpj/:cnpj`

Consulta dados de empresa por CNPJ na Receita Federal.

**Esta rota não requer certificado digital.**

#### Parâmetros da URL:

- `cnpj` (obrigatório): CNPJ da empresa (pode conter ou não formatação)

#### Exemplo de Requisição:

```bash
# Com formatação
curl http://localhost:3333/ecac/cnpj/48.242.938/0001-44

# Sem formatação
curl http://localhost:3333/ecac/cnpj/48242938000144
```

#### Resposta de Sucesso:

```json
{
  "success": true,
  "data": {
    // Dados da empresa retornados pela Receita Federal
  }
}
```

### POST `/ecac/dctf`

Realiza consulta DCTF-Web no ECAC.

#### Parâmetros do Body (JSON):

- `certPath` (obrigatório): Caminho para o arquivo .pfx do certificado
- `certPass` (obrigatório): Senha do certificado
- `data_inicial_apuracao` (opcional): Data inicial da apuração (YYYY-MM-DD)
- `data_final_apuracao` (opcional): Data final da apuração (YYYY-MM-DD)
- `data_inicial_transmissao` (opcional): Data inicial da transmissão
- `data_final_transmissao` (opcional): Data final da transmissão
- `perfil_procurador_cnpj` (opcional): CNPJ do procurador
- `perfil_procurador_cpf` (opcional): CPF do procurador
- `categoria_declaracao` (opcional): Categoria da declaração
- `situacoes_declaracao` (opcional): Situações da declaração
- `numero_recibo` (opcional): Número do recibo
- `pagina` (opcional): Número da página (padrão: 1)

#### Exemplo de Requisição:

```bash
curl -X POST http://localhost:3333/ecac/dctf \
  -H "Content-Type: application/json" \
  -d '{
    "certPath": "C:/caminho/para/certificado.pfx",
    "certPass": "senha_do_certificado",
    "data_inicial_apuracao": "2025-01-01",
    "data_final_apuracao": "2025-01-31",
    "pagina": 1
  }'
```

#### Resposta de Sucesso:

```json
{
  "success": true,
  "data": {
    // Dados retornados pela API InfoSimples
  }
}
```

#### Resposta de Erro:

```json
{
  "error": "Descrição do erro",
  "timestamp": "2025-09-02T...",
  "path": "/ecac/dctf",
  "method": "POST"
}
```

## Criptografia

A API utiliza AES-256 para criptografar certificados e senhas antes de enviá-los para a InfoSimples.

### Exemplo de criptografia manual:

```javascript
import AES256 from "aes-everywhere";
import fs from "fs";

// Criptografar certificado
const cert_base64 = Buffer.from(
  fs.readFileSync("caminho/para/certificado.pfx")
).toString("base64");
const cert_criptografado = AES256.encrypt(cert_base64, "SUA_CHAVE_CRIPTOGRAFIA")
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");

// Criptografar senha
const senha_criptografada = AES256.encrypt(
  "SENHA_CERTIFICADO",
  "SUA_CHAVE_CRIPTOGRAFIA"
)
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");
```

## Estrutura do Projeto

```
src/
├── routes/
│   └── ecac.js          # Rotas para ECAC
├── services/
│   └── infosimples.js   # Integração com API InfoSimples
├── utils/
│   └── encrypt.js       # Funções de criptografia
├── config/
│   └── index.js         # Configurações da aplicação
└── app.js               # Configuração do Express
```

## Dependências

- **express**: Framework web
- **axios**: Cliente HTTP
- **aes-everywhere**: Criptografia AES
- **dotenv**: Gerenciamento de variáveis de ambiente

## Referências

- [Documentação InfoSimples](https://api.infosimples.com/consultas/docs)
- [Documentação Certificados](https://api.infosimples.com/consultas/docs/certificados#criptografia)

## Rota teste - Busca de dados de empresa por CNPJ na Receita Federal

A nova rota `/ecac/cnpj/:cnpj` permite consultar dados de empresas diretamente na Receita Federal através da API InfoSimples, **sem necessidade de certificado digital**.

### Exemplo de uso:

```bash
# PowerShell
Invoke-RestMethod -Uri "http://localhost:3333/ecac/cnpj/48242938000144" -Method GET

# Navegador
http://localhost:3333/ecac/cnpj/48242938000144
```

### URL de referência da API InfoSimples:

```js
https://api.infosimples.com/api/v2/consultas/receita-federal/cnpj?token=r61ww8-Wf052n7APyAfp2rYv2tuXvUoZv2SWJ5sj&timeout=600&ignore_site_receipt=0&cnpj=48.242.938%2F0001-44
```
