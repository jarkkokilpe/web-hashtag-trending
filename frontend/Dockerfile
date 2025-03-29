# Use a base image
FROM node:18 AS build

# Set the working directory
WORKDIR /usr/src/app

# Accept build arguments
ARG BACKEND_API_URL

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Create the .env file dynamically
RUN echo "REACT_APP_BACKEND_API_URL=$BACKEND_API_URL" >> .env

# Build the frontend
RUN npm run build

# Stage 2: Serve the frontend using a lightweight HTTP server
FROM node:18

# Set the working directory
WORKDIR /usr/share/app

# Copy the built files from the previous stage
COPY --from=build /usr/src/app/build .

# Install a lightweight HTTP server
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the HTTP server
CMD ["serve", "-s", ".", "-l", "3000"]