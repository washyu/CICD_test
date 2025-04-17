# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm install
RUN cd frontend && npm install

# Copy frontend code
COPY frontend/ ./frontend/

# Build the React app
RUN cd frontend && npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/frontend/build /usr/share/nginx/html

# Copy nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
