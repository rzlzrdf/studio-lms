FROM node:20.11.0-alpine3.18

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies and Sanity CLI globally
RUN npm install -g @sanity/cli && \
    npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3333

# Use development command
CMD ["npm", "run", "dev"]
