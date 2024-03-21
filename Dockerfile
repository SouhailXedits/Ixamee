# syntax=docker/dockerfile:1

# Use a more recent Node.js version
ARG NODE_VERSION=16.14.0

# Use multi-stage build
FROM node:${NODE_VERSION}-alpine AS builder

# Set working directory for all build stages
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's caching
COPY package*.json ./

# Install production dependencies
RUN apk add --no-cache --virtual .build-deps gcc libc-dev musl-dev && \
    npm ci --only=production && \
    apk del .build-deps

# Copy the rest of the source files into the image
COPY . .

# Run the build script
RUN npx prisma generate && npm run build

# Create a new stage to run the application with minimal runtime dependencies
FROM node:${NODE_VERSION}-alpine

# Set working directory for all build stages
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the built application from the builder stage
COPY --from=builder /app/. .

# Expose the port that the application listens on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
