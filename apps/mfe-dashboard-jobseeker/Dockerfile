# syntax=docker/dockerfile:1
# Build context: monorepo root (docker build -f apps/mfe-dashboard-jobseeker/Dockerfile .)

FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/shared-types/package.json               ./packages/shared-types/
COPY packages/shared-store/package.json               ./packages/shared-store/
COPY packages/shared-ui/package.json                  ./packages/shared-ui/
COPY apps/mfe-dashboard-jobseeker/package.json        ./apps/mfe-dashboard-jobseeker/

RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

COPY --from=deps /app ./

COPY tsconfig.base.json ./
COPY packages/shared-types/         ./packages/shared-types/
COPY packages/shared-store/         ./packages/shared-store/
COPY packages/shared-ui/            ./packages/shared-ui/
COPY apps/mfe-dashboard-jobseeker/  ./apps/mfe-dashboard-jobseeker/

RUN pnpm --filter @techseva/mfe-dashboard-jobseeker build

FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/apps/mfe-dashboard-jobseeker/dist /usr/share/nginx/html
COPY apps/mfe-dashboard-jobseeker/nginx.conf               /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
