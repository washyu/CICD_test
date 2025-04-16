#!/bin/bash
set -e

# Configuration
REGISTRY=${1:-"your-registry-url"}
IMAGE_NAME=${2:-"ci-cd-image"}
VERSION=${3:-"1.0.0"}

# Build the image
echo "Building image: ${REGISTRY}/${IMAGE_NAME}:${VERSION}"
docker build -t ${REGISTRY}/${IMAGE_NAME}:${VERSION} .
docker tag ${REGISTRY}/${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:latest

# Push the image
echo "Pushing images to registry..."
docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION}
docker push ${REGISTRY}/${IMAGE_NAME}:latest

echo "Image built and pushed successfully!"
echo "You can use this image in your Jenkins pipeline with:"
echo "agent {"
echo "    docker {"
echo "        image '${REGISTRY}/${IMAGE_NAME}:${VERSION}'"
echo "        args '-v /var/run/docker.sock:/var/run/docker.sock'"
echo "    }"
echo "}"
