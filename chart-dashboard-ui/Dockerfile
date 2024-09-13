# Use the official Node.js 18 image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all other source files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "run", "start"]
