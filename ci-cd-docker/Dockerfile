FROM docker:dind

# Set environment variables
ENV KUBECTL_VERSION=v1.28.4
ENV HELM_VERSION=v3.13.2
ENV DOCKER_COMPOSE_VERSION=v2.23.0

# Install dependencies
RUN apk add --no-cache \
    curl \
    git \
    bash \
    jq \
    python3 \
    py3-pip \
    nodejs \
    npm

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl" && \
    chmod +x kubectl && \
    mv kubectl /usr/local/bin/

# Install Helm
RUN curl -LO "https://get.helm.sh/helm-${HELM_VERSION}-linux-amd64.tar.gz" && \
    tar -zxvf helm-${HELM_VERSION}-linux-amd64.tar.gz && \
    mv linux-amd64/helm /usr/local/bin/helm && \
    rm -rf linux-amd64 helm-${HELM_VERSION}-linux-amd64.tar.gz

# Install Docker Compose
RUN curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Install AWS CLI
RUN pip3 install --upgrade awscli

# Set working directory
WORKDIR /workspace

# Add any custom scripts or configurations
COPY scripts/ /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

# Verify installations
RUN kubectl version --client && \
    helm version --client && \
    docker-compose version && \
    aws --version

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["dockerd"]
