# Dockerfile (frontend)

# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app for production
RUN npm run build

# Serve the app
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
