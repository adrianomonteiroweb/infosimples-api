# Exemplos de Teste da API

## 1. Testando se a API está funcionando

```bash
# Rota principal
curl http://localhost:3333

# Health check
curl http://localhost:3333/ecac/health
```

## 2. Exemplo de consulta DCTF (PowerShell)

```powershell
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    certPath = "C:\caminho\para\certificado.pfx"
    certPass = "senha_do_certificado"
    data_inicial_apuracao = "2025-01-01"
    data_final_apuracao = "2025-01-31"
    pagina = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3333/ecac/dctf" -Method POST -Headers $headers -Body $body
```

## 3. Exemplo de consulta DCTF (curl)

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

## 4. Exemplo com JavaScript/Node.js

```javascript
import axios from "axios";

async function consultarDctf() {
  try {
    const response = await axios.post("http://localhost:3333/ecac/dctf", {
      certPath: "C:/caminho/para/certificado.pfx",
      certPass: "senha_do_certificado",
      data_inicial_apuracao: "2025-01-01",
      data_final_apuracao: "2025-01-31",
      pagina: 1,
    });

    console.log("Sucesso:", response.data);
  } catch (error) {
    console.error("Erro:", error.response?.data || error.message);
  }
}

consultarDctf();
```

## Parâmetros Adicionais Disponíveis

Todos os parâmetros da API InfoSimples são suportados:

- `data_inicial_transmissao`
- `data_final_transmissao`
- `perfil_procurador_cnpj`
- `perfil_procurador_cpf`
- `categoria_declaracao`
- `situacoes_declaracao`
- `numero_recibo`
- `pagina`

Consulte a documentação oficial da InfoSimples para mais detalhes sobre cada parâmetro.
