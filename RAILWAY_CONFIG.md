# 🚂 Configuração Railway - Frontend

Guia completo para deploy do frontend no Railway.

---

## 📋 Variáveis de Ambiente Obrigatórias

Configure no Railway Dashboard → Seu Frontend Service → **Variables**:

### 1️⃣ VITE_API_BASE_URL
```bash
VITE_API_BASE_URL=https://lab-backend.assert.com.br/api
```
**Descrição**: URL do backend (seu domínio custom ou URL do Railway)

---

### 2️⃣ ALLOWED_HOSTS
```bash
ALLOWED_HOSTS=lab.assert.com.br,.up.railway.app,localhost
```
**Descrição**: Lista de domínios permitidos (separados por vírgula)

**⚠️ CRÍTICO**: Sem isso, você verá o erro:
```
Blocked request. This host ("lab.assert.com.br") is not allowed.
```

**Formato**: 
- Domínios completos: `lab.assert.com.br`
- Wildcard de subdomínios: `.up.railway.app` (permite qualquer `*.up.railway.app`)
- Sempre inclua `localhost` para testes locais

---

### 3️⃣ PORT (Opcional)
```bash
PORT=$PORT
```
**Descrição**: Railway injeta automaticamente. Não precisa configurar manualmente.

---

### 4️⃣ HOST (Opcional)
```bash
HOST=0.0.0.0
```
**Descrição**: Permite conexões externas. `0.0.0.0` é o padrão seguro.

---

## 🎯 Resumo: Copie e Cole

```bash
# OBRIGATÓRIAS:
VITE_API_BASE_URL=https://lab-backend.assert.com.br/api
ALLOWED_HOSTS=lab.assert.com.br,.up.railway.app,localhost

# OPCIONAIS (Railway já configura):
# PORT=$PORT
# HOST=0.0.0.0
```

---

## 🔧 Passo a Passo no Railway

### 1. Acessar Variáveis
```
Railway Dashboard → Seu Frontend Service → Variables Tab
```

### 2. Adicionar Variáveis
Para cada variável:
1. Clique em **+ New Variable**
2. Cole o nome (ex: `ALLOWED_HOSTS`)
3. Cole o valor (ex: `lab.assert.com.br,.up.railway.app,localhost`)
4. Enter para salvar

### 3. Verificar
Após adicionar todas:
- [ ] `VITE_API_BASE_URL` configurada
- [ ] `ALLOWED_HOSTS` configurada com seu domínio
- [ ] Railway fará redeploy automático

### 4. Testar
Após deploy completar:
```bash
# Acesse seu domínio
https://lab.assert.com.br

# Deve carregar sem erros de "blocked request"
```

---

## 🐛 Troubleshooting

### ❌ Erro: "Blocked request. This host is not allowed"

**Causa**: `ALLOWED_HOSTS` não configurada ou sem seu domínio.

**Solução**:
```bash
# Adicione no Railway:
ALLOWED_HOSTS=lab.assert.com.br,.up.railway.app,localhost

# Redeploy:
Railway → Settings → Redeploy
```

---

### ❌ Erro: "Failed to fetch" ou Network Error

**Causa**: `VITE_API_BASE_URL` incorreta ou backend offline.

**Solução**:
1. Verifique se backend está rodando:
   ```bash
   curl https://lab-backend.assert.com.br/health
   # Deve retornar: {"status":"healthy"}
   ```

2. Verifique CORS no backend:
   ```bash
   # No backend Railway, configure:
   CORS_ORIGINS=https://lab.assert.com.br
   ```

3. Verifique URL no frontend:
   ```bash
   # Railway Frontend → Variables
   VITE_API_BASE_URL=https://lab-backend.assert.com.br/api
   #                                                    ^^^^
   #                                                    Não esqueça /api !
   ```

---

### ❌ Build Falha: "bun: command not found"

**Causa**: `nixpacks.toml` tentando usar `bun` mas Railway não tem.

**Solução**: Já corrigido no `nixpacks.toml`:
```toml
[phases.install]
cmds = ["npm install --legacy-peer-deps"]

[phases.build]
cmds = ["npm run build"]
```

---

### ❌ Deploy Timeout

**Causa**: Build muito lento ou travando.

**Solução**:
```bash
# Limpe node_modules antes de commit:
git rm -r --cached node_modules
echo "node_modules/" >> .gitignore
git commit -m "chore: remove node_modules"
git push

# Railway fará fresh install
```

---

## 📊 Checklist de Deploy

Antes de considerar deploy completo:

- [ ] **Backend está rodando**
  - [ ] PostgreSQL adicionado e Running
  - [ ] Backend healthcheck passa (`/health` → 200)
  - [ ] CORS configurado com domínio frontend
  
- [ ] **Frontend configurado**
  - [ ] `VITE_API_BASE_URL` apontando para backend
  - [ ] `ALLOWED_HOSTS` com domínio custom
  - [ ] Build passa sem erros
  
- [ ] **Domínio configurado**
  - [ ] DNS apontando para Railway (CNAME)
  - [ ] SSL/HTTPS funcionando
  - [ ] Nenhum erro de "blocked request"
  
- [ ] **Testes funcionais**
  - [ ] Login funciona
  - [ ] API retorna dados
  - [ ] Navegação entre páginas OK
  - [ ] Sem erros de CORS no console

---

## 🎉 Após Deploy Bem-Sucedido

### Testar Integração Completa:

1. **Login**:
   ```
   Usuário: maria
   Senha: 123456
   ```

2. **Verificar dados carregam**:
   - Benefícios
   - Mensagens
   - Dados pessoais

3. **Console do navegador**:
   - Sem erros de CORS
   - Sem "blocked request"
   - Requisições para `lab-backend.assert.com.br` funcionando

---

## 📚 Arquivos de Configuração

### `vite.config.ts`
```typescript
// Lê ALLOWED_HOSTS da variável de ambiente
const allowedHosts = process.env.ALLOWED_HOSTS
  ? process.env.ALLOWED_HOSTS.split(',').map(host => host.trim())
  : ['localhost'];
```

### `nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["nodejs-18_x"]

[phases.install]
cmds = ["npm install --legacy-peer-deps"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm run dev -- --host 0.0.0.0 --port $PORT"
```

### `railway.json`
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "startCommand": "npm run dev -- --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

---

## 🆘 Precisa de Ajuda?

1. **Verifique logs do Railway**:
   ```
   Railway → Seu Frontend → Logs Tab
   ```

2. **Verifique console do navegador**:
   ```
   F12 → Console Tab
   ```

3. **Teste backend diretamente**:
   ```bash
   curl https://lab-backend.assert.com.br/health
   curl https://lab-backend.assert.com.br/docs
   ```

4. **Consulte documentação**:
   - `ENV_EXAMPLE.md`: Todas as variáveis de ambiente
   - `QUICK_START.md`: Guia rápido de setup
   - `README.md`: Visão geral do projeto

---

**✅ Com essas configurações, seu frontend estará pronto para produção no Railway!**

