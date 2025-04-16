FROM node:18-alpine

WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend code
COPY backend/ ./backend/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the port
EXPOSE 5000

# Start the application
CMD ["node", "backend/server.js"]
