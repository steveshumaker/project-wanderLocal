# Use the official Node.js image
FROM node:latest

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 8002

# Start the backend server
CMD ["npm", "start"]
