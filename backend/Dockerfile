# Use Node.js 18 (or at least 16) for compatibility with modern syntax
FROM node:18 AS builder

WORKDIR /usr/src/app

# Accept build arguments
ARG API_PORT
ARG CORS_ORIGINS
ARG REDDIT_APPNAME
ARG REDDIT_CLIENT_ID
ARG REDDIT_CLIENT_SECRET
ARG REDDIT_PASSWORD
ARG REDDIT_USERNAME
ARG REDDIT_USER_AGENT

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create the .env file dynamically
RUN echo "API_PORT=$API_PORT" >> .env && \
    echo "CORS_ORIGINS=$CORS_ORIGINS" >> .env && \
    echo "REDDIT_APPNAME=$REDDIT_APPNAME" >> .env && \
    echo "REDDIT_CLIENT_ID=$REDDIT_CLIENT_ID" >> .env && \
    echo "REDDIT_CLIENT_SECRET=$REDDIT_CLIENT_SECRET" >> .env && \
    echo "REDDIT_PASSWORD=$REDDIT_PASSWORD" >> .env && \
    echo "REDDIT_USERNAME=$REDDIT_USERNAME" >> .env && \
    echo "REDDIT_USER_AGENT=$REDDIT_USER_AGENT" >> .env

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