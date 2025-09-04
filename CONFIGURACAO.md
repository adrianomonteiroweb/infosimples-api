# Configuração da API InfoSimples

## Variáveis de Ambiente Necessárias

Para usar a API corretamente, você precisa configurar as seguintes variáveis no arquivo `.env`:

### 1. Token da API InfoSimples

```env
TOKEN_INFOSIMPLES=seu_token_da_infosimples_aqui
```

### 2. Chave de Criptografia

```env
CHAVE_CRIPTOGRAFIA=sua_chave_de_criptografia_aqui
```

**Importante**: Esta chave deve ser a mesma que você cadastrou na InfoSimples para descriptografar os certificados.

### 3. Certificado Digital

```env
CERT_PATH=caminho/absoluto/para/seu/certificado.p12
CERT_PASSWORD=senha_do_seu_certificado
```

## Exemplo de arquivo .env completo

```env
# API Config
PORT=3333
HOST=localhost

# InfoSimples
TOKEN_INFOSIMPLES=
INFOSIMPLES_BASE_URL=https://api.infosimples.com/api/v2/consultas

# Criptografia
CHAVE_CRIPTOGRAFIA=sua_chave_secreta_aqui

# Certificado Digital
CERT_PATH=C:\caminho\para\certificado.p12
CERT_PASSWORD=senha123
```

## Problemas Comuns

### Erro 604 - "Não foi possível decriptar os parâmetros"

Este erro ocorre quando:

1. A `CHAVE_CRIPTOGRAFIA` não está configurada corretamente
2. A chave não é a mesma cadastrada na InfoSimples
3. O certificado ou senha estão incorretos
4. O caminho do certificado está errado

### Como verificar se as variáveis estão corretas

Execute a API e verifique os logs. Você deve ver:

- `CERT length: [número]` - tamanho do certificado criptografado
- `PASS length: [número]` - tamanho da senha criptografada

Se algum dos valores estiver 0 ou undefined, significa que a variável não está configurada.

## Testando a API

### Consulta DCTF

```http
GET http://localhost:3333/ecac/dctf
```

### Consulta CNPJ

```http
GET http://localhost:3333/ecac/cnpj/12345678000100
```
