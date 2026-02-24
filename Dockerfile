# Stage 1: build
FROM node:20-alpine AS builder

WORKDIR /app

# Dependências a partir do lockfile (sem cache mount em node_modules = evita EBUSY no Railway)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: servir estático
FROM node:20-alpine AS runner

WORKDIR /app

# Apenas o binário serve para servir dist (leve)
RUN npm install -g serve@14

COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Railway injeta PORT; fallback 3000 para local
CMD ["sh", "-c", "serve -s dist -l ${PORT:-3000}"]
