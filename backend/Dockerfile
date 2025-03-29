# Use Node.js 18 (or at least 16) for compatibility with modern syntax
FROM node:18 AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller image for runtime
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only the built files and production dependencies
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/data ./data
COPY --from=builder /usr/src/app/.env .env
COPY package*.json ./
RUN npm install --only=production

# Expose the backend port
EXPOSE 4000

# Start the application
CMD ["node", "dist/src/main"]