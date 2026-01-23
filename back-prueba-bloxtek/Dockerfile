FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

RUN pnpm prisma generate

FROM node:20-alpine AS runner

WORKDIR /app


RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json ./

RUN pnpm install --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/index.js"]