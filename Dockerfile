# Use a multi-stage build for smaller image size
FROM node:18-alpine AS development

# Install build dependencies
RUN apk add --no-cache build-base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package.json .
COPY package-lock.json .

# Install dependencies with elevated permissions
USER root
RUN npm install
# USER node

# Copy the rest of the application files
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
