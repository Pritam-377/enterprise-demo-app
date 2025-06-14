# Stage 1: Builder (includes dev dependencies)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci  # Installs ALL dependencies (including devDependencies)

# Stage 2: Tester (run tests)
FROM builder AS tester
COPY . .
RUN npm test -- --detectOpenHandles --forceExit

# Stage 3: Production (only runtime dependencies)
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]
