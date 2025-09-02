# Teste da API - Consulta CNPJ

## Testando a rota de consulta CNPJ

### Usando PowerShell:

```powershell
# Teste com CNPJ sem formatação
Invoke-RestMethod -Uri "http://localhost:3333/ecac/cnpj/48242938000144" -Method GET

# Teste com CNPJ formatado (URL encoded)
Invoke-RestMethod -Uri "http://localhost:3333/ecac/cnpj/48.242.938%2F0001-44" -Method GET
```

### Usando curl (se disponível):

```bash
# Teste com CNPJ sem formatação
curl http://localhost:3333/ecac/cnpj/48242938000144

# Teste com CNPJ formatado
curl "http://localhost:3333/ecac/cnpj/48.242.938%2F0001-44"
```

### Usando navegador:

Acesse diretamente:

- http://localhost:3333/ecac/cnpj/48242938000144
- http://localhost:3333/ecac/cnpj/48.242.938%2F0001-44

## Exemplo de resposta esperada:

```json
{
  "success": true,
  "data": {
    // Dados da empresa retornados pela Receita Federal
  }
}
```
