# Stage 1: Build
# Use an official Node.js image as the base for the build stage
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code to the container
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Production
# Use a lightweight Node.js image for the production stage
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy the build artifacts and production dependencies from the previous stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# Expose the application port
EXPOSE 3000

# Set the default command to run the application
CMD ["node", "dist/main"]