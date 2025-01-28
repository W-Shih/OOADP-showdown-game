# =====================================================================================================================
# multi-stage build: 
# Stage 1: Install dependencies, build app, and prune devDependencies
FROM node:20.18-alpine3.20 AS builder

WORKDIR /app

# Copy necessary files to /app directory for npm install
# Copy package files first to leverage caching for npm install
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the files to /app directory for the build
COPY . .
RUN npm run build

# Prune devDependencies
RUN npm prune --omit=dev \
    && npm cache clean --force


# =====================================================================================================================
# Stage 2: build the final image
FROM node:22.13-alpine3.21

# Update the package list, upgrade installed packages, install ca-certificates, curl, and remove cache files
RUN apk update \
    && apk upgrade \
    && apk add --no-cache ca-certificates curl \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy the rest of the files to /app directory for running the app
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./

# Switch to non-root user
USER node

# Healthcheck by checking if the node process is running
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD pgrep -x node > /dev/null || exit 1

# Start the app
CMD ["node", "index.js"]
