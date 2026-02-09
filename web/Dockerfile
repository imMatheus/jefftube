FROM oven/bun:1-alpine AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY serve.ts .

EXPOSE 8080

CMD ["bun", "run", "start"]
