# 🔧 Variáveis de Ambiente

Guia de configuração de variáveis de ambiente para o frontend.

---

## 📝 Arquivo `.env.local` (Development)

Crie este arquivo na raiz do projeto:

```bash
# Backend API URL - Local
# Pode usar VITE_API_BASE_URL ou VITE_API_URL (ambos funcionam)
VITE_API_BASE_URL=http://localhost:8000/api

# Server Configuration (opcional - valores padrão são bons para dev)
# HOST=0.0.0.0
# PORT=8080
# ALLOWED_HOSTS=localhost
```

---

## 🚀 Railway Variables (Production)

Configure no Railway Dashboard → Variables:

```bash
# Backend API URL - Production
VITE_API_BASE_URL=https://lab-backend.assert.com.br/api

# Server Configuration - Railway
HOST=0.0.0.0
PORT=$PORT  # Railway injeta automaticamente
ALLOWED_HOSTS=lab.assert.com.br
```

**⚠️ IMPORTANTE**: 
- `ALLOWED_HOSTS` é **obrigatória** no Railway para permitir o domínio custom
  - Pode ser o hostname (`lab.assert.com.br`) ou URL completa (`https://lab.assert.com.br/`)
  - Para múltiplos hosts, separe com vírgula: `lab.assert.com.br,.up.railway.app,localhost`

---

## 🔀 Múltiplos Ambientes

### Local Development
```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

### Staging (opcional)
```bash
VITE_API_BASE_URL=https://staging-backend.assert.com.br/api
```

### Production
```bash
VITE_API_BASE_URL=https://lab-backend.assert.com.br/api
```

---

## ✅ Como Usar

### 1. Local Development

```bash
# Criar arquivo
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env.local

# Rodar projeto
npm run dev
```

### 2. Railway Deploy

No Railway Dashboard:
1. Selecione o projeto
2. Vá em **Variables**
3. Clique **+ New Variable**
4. Nome: `VITE_API_BASE_URL`
5. Valor: `https://lab-backend.assert.com.br/api`
6. **Deploy** (redeploy automático)

---

## 🔍 Como Verificar

### No código:
```typescript
// src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
console.log("API URL:", API_BASE_URL);
```

### No navegador:
```javascript
// DevTools Console
console.log(import.meta.env.VITE_API_BASE_URL);
```

---

## ⚠️ Importante

- Variáveis que começam com `VITE_` são expostas no client
- **Nunca** coloque secrets/tokens em variáveis VITE_
- Arquivo `.env.local` está no `.gitignore` (não vai pro GitHub)
- Railway injeta as variáveis automaticamente no build

---

## 📚 Referências

- Vite Env Variables: https://vitejs.dev/guide/env-and-mode.html
- Railway Environment Variables: https://docs.railway.app/develop/variables

