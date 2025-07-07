# Stage 1: Build stage
FROM node:20 AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the project
RUN npm run build


# Stage 2: Production image
FROM node:20-slim

WORKDIR /app

# Only copy required files for runtime
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built output from builder stage
COPY --from=builder /app/dist ./dist

# Expose the app port
EXPOSE 8080

# Run the app
CMD ["node", "dist/main"]
