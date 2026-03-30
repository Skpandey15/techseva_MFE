# syntax=docker/dockerfile:1
# Build context: monorepo root (docker build -f apps/mfe-dashboard-admin/Dockerfile .)

FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/shared-types/package.json            ./packages/shared-types/
COPY packages/shared-store/package.json            ./packages/shared-store/
COPY packages/shared-ui/package.json               ./packages/shared-ui/
COPY apps/mfe-dashboard-admin/package.json         ./apps/mfe-dashboard-admin/

RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

COPY --from=deps /app ./

COPY tsconfig.base.json ./
COPY packages/shared-types/       ./packages/shared-types/
COPY packages/shared-store/       ./packages/shared-store/
COPY packages/shared-ui/          ./packages/shared-ui/
COPY apps/mfe-dashboard-admin/    ./apps/mfe-dashboard-admin/

RUN pnpm --filter @techseva/mfe-dashboard-admin build

FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/apps/mfe-dashboard-admin/dist /usr/share/nginx/html
COPY apps/mfe-dashboard-admin/nginx.conf               /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
