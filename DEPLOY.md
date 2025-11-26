# 🚀 Guia de Deploy - Railway

## ✅ Configuração Correta para Produção

### 📋 Variáveis de Ambiente Necessárias

Configure no Railway Dashboard → Variables:

```bash
VITE_API_BASE_URL=https://lab-backend.assert.com.br/api
HOST=0.0.0.0
ALLOWED_HOSTS=lab.assert.com.br
```

**📝 IMPORTANTE:** 
- A variável pode se chamar `VITE_API_BASE_URL` ou `VITE_API_URL` (ambos funcionam)
- **NÃO** é necessário adicionar `ENVIRONMENT=production`

---

## 🔧 Como Funciona o Deploy

O arquivo `railway.json` está configurado para:

1. **Build**: Compila a aplicação React (`npm run build`)
2. **Preview**: Serve os arquivos estáticos otimizados (`npm run preview`)

```json
{
  "startCommand": "npm run build && npm run preview -- --host 0.0.0.0 --port $PORT"
}
```

### ✅ Vantagens desta Configuração:

- ✓ Build otimizado para produção (minificado, tree-shaking)
- ✓ Sem HMR (Hot Module Replacement) em produção
- ✓ Melhor performance
- ✓ Sem conflitos de SSL
- ✓ Tamanho reduzido dos bundles

---

## 🐛 Problemas Comuns

### 1. Erro: `_jsxDEV is not a function`

**Causa**: Railway estava rodando `npm run dev` em produção  
**Solução**: ✅ Já corrigido no `railway.json`

### 2. Erro: `ERR_SSL_PROTOCOL_ERROR` na porta 8080

**Causa**: HMR tentando conectar via WebSocket em porta sem SSL  
**Solução**: ✅ Build de produção não usa HMR

### 3. Erro: `Blocked request. Host not allowed`

**Causa**: Variável `ALLOWED_HOSTS` não configurada ou incorreta  
**Solução**: Adicionar `ALLOWED_HOSTS=lab.assert.com.br` no Railway

### 4. Erro: CORS ao fazer login/requisições (chama localhost:8000)

**Causa**: Variável `VITE_API_BASE_URL` ou `VITE_API_URL` não configurada  
**Solução**: 
- Verificar se a variável está no Railway
- Nome correto: `VITE_API_BASE_URL` ou `VITE_API_URL`
- Valor: `https://lab-backend.assert.com.br/api`
- Fazer redeploy após adicionar/corrigir

---

## 📝 Checklist de Deploy

- [ ] Variáveis de ambiente configuradas no Railway
- [ ] Domínio custom configurado (lab.assert.com.br)
- [ ] Backend rodando e acessível (lab-backend.assert.com.br)
- [ ] CORS configurado no backend para aceitar o frontend
- [ ] Redeploy após mudanças no código ou variáveis

---

## 🔄 Como Fazer Redeploy

### Opção 1: Push no GitHub
```bash
git add .
git commit -m "fix: configuração de produção"
git push origin main
```
Railway detecta automaticamente e faz redeploy.

### Opção 2: Manual no Dashboard
1. Acesse o projeto no Railway
2. Clique em **"Deploy"** → **"Redeploy"**

---

## 🧪 Testando Localmente

### Simular ambiente de produção:

```bash
# 1. Criar build de produção
npm run build

# 2. Servir com preview
npm run preview
```

### Desenvolvimento normal:

```bash
npm run dev
```

---

## 📚 Arquivos Importantes

- `railway.json` - Configuração de deploy do Railway
- `vite.config.ts` - Configuração do Vite (build e server)
- `ENV_EXAMPLE.md` - Documentação das variáveis de ambiente
- `.env.local` - Variáveis locais (não commitado)

---

## 🆘 Suporte

Em caso de problemas:

1. Verifique os logs no Railway Dashboard
2. Confirme as variáveis de ambiente
3. Teste localmente com `npm run build && npm run preview`
4. Verifique a conectividade com o backend

---

## ✨ Status Atual

✅ Configuração de produção corrigida  
✅ Build otimizado configurado  
✅ ALLOWED_HOSTS funcionando  
✅ Sem erros de SSL  
✅ Sem erros de JSX  

**Pronto para deploy! 🚀**

