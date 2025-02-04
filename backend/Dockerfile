# Use an official Node.js runtime as the base image
FROM node:23

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application (if needed)
RUN npm run build

# Expose the port of the backend application
EXPOSE 4000

# Command to run your application
CMD ["npm", "run", "start:prod"]