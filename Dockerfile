FROM oven/bun@sha256:abc123... AS base

WORKDIR /app
COPY package.json .
COPY bun.lockb ./
RUN npm install

FROM base AS development
COPY . .
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000
CMD ["bun", "dev"]

FROM base AS build
COPY . .
RUN bun run build

FROM oven/bun@sha256:abc123... AS production
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/package*.json ./
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "start"]
