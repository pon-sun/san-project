# Use the official Node.js image as the base image
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy the .env.development.local file to the container
COPY .env.development.local .env

# Build the React app
RUN npm run build

# Use Nginx as a lightweight web server to serve the React app
FROM nginx:alpine

# Copy the build files from the build stage to the nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80


