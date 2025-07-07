# Use Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# Expose the port your app runs on (change if needed)
EXPOSE 8080

# Start the app
CMD ["npm", "run", "start:prod"]