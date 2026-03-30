# Step 1: Use official Node.js image as base image
FROM node:16-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the application code
COPY . .

# Step 5: Expose application port
EXPOSE 3000

# Step 6: Start the application
CMD ["npm", "run", "start:prod"]