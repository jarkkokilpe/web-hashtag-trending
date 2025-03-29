# Use a base image
FROM node:18

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

# Use a lightweight web server to serve the frontend
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]