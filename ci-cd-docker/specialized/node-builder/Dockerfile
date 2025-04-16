FROM node:18-alpine

# Install build essentials
RUN apk add --no-cache \
    git \
    curl \
    python3 \
    make \
    g++

# Install global npm packages
RUN npm install -g \
    yarn \
    typescript \
    jest \
    eslint

# Set working directory
WORKDIR /app

# Add custom scripts
COPY scripts/ /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

CMD ["node"]
