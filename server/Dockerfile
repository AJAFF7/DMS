# Use the official Node.js image as a base image
FROM node:20-alpine3.18

# Set environment variables


# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install



# Copy server files to the working directory
COPY . .

# Expose the port that the app runs on
EXPOSE 8282

# Command to run the application
CMD ["node", "index.js"]





# # Use an official Node.js runtime as a base image
# #FROM node:18-alpine3.19

# FROM node:20-alpine

# # Install necessary dependencies
# RUN apk --no-cache add libc6-compat

# # Create and set the working directory inside the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install application dependencies
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Expose the port that the app runs on
# EXPOSE 8181

# # Command to run the application
# CMD ["npm", "start"]
