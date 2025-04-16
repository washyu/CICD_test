#!/bin/bash
set -e

# Configuration
REGISTRY=${1:-"your-registry-url"}
IMAGE_NAME=${2:-"ci-cd-image"}
VERSION=${3:-"1.0.0"}

# Set up Docker Buildx
docker buildx create --name mybuilder --use

# Build and push multi-architecture image
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ${REGISTRY}/${IMAGE_NAME}:${VERSION} \
  -t ${REGISTRY}/${IMAGE_NAME}:latest \
  --push \
  .

echo "Multi-architecture image built and pushed successfully!"
