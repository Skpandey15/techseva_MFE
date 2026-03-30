# syntax=docker/dockerfile:1
# Build context: monorepo root (docker build -f apps/shell/Dockerfile .)

# ── Stage 1: install dependencies ─────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

# Copy workspace manifests first for maximum layer cache reuse.
# Source files are NOT copied here — only package descriptors.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/shared-types/package.json  ./packages/shared-types/
COPY packages/shared-store/package.json  ./packages/shared-store/
COPY packages/shared-ui/package.json     ./packages/shared-ui/
COPY apps/shell/package.json             ./apps/shell/

RUN pnpm install --frozen-lockfile

# ── Stage 2: build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

# Carry over installed node_modules from deps stage
COPY --from=deps /app ./

# Copy source — workspace packages first (depended on by shell)
COPY tsconfig.base.json ./
COPY packages/shared-types/ ./packages/shared-types/
COPY packages/shared-store/ ./packages/shared-store/
COPY packages/shared-ui/    ./packages/shared-ui/
COPY apps/shell/            ./apps/shell/

# Remote URLs are BAKED into the JS bundle at build time.
# Pass the correct values via --build-arg for each target environment.
ARG VITE_REMOTE_AUTH_URL=http://localhost:3001/assets/remoteEntry.js
ARG VITE_REMOTE_JOBSEEKER_URL=http://localhost:3002/assets/remoteEntry.js
ARG VITE_REMOTE_ADMIN_URL=http://localhost:3003/assets/remoteEntry.js

ENV VITE_REMOTE_AUTH_URL=$VITE_REMOTE_AUTH_URL
ENV VITE_REMOTE_JOBSEEKER_URL=$VITE_REMOTE_JOBSEEKER_URL
ENV VITE_REMOTE_ADMIN_URL=$VITE_REMOTE_ADMIN_URL

RUN pnpm --filter @techseva/shell build

# ── Stage 3: serve ────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/apps/shell/dist /usr/share/nginx/html
COPY apps/shell/nginx.conf               /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
