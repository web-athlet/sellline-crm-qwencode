# Multi-stage build

# Dependencies stage
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/shared-types/package*.json ./packages/shared-types/
RUN npm ci --workspaces --if-present

# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build --workspace=apps/api

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package*.json ./apps/api/
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages

EXPOSE 3001

ENV PORT=3001

CMD ["node", "apps/api/dist/main.js"]