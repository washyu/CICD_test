#!/bin/bash
set -e

# Helper script for building and pushing Docker images
# Usage: docker-build-push.sh [registry] [image_name] [tag] [dockerfile_path] [build_context]

REGISTRY=${1}
IMAGE_NAME=${2}
TAG=${3:-latest}
DOCKERFILE=${4:-Dockerfile}
CONTEXT=${5:-.}

FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}:${TAG}"

echo "Building image: $FULL_IMAGE_NAME"
echo "Using Dockerfile: $DOCKERFILE"
echo "Build context: $CONTEXT"

# Build the image
docker build -t $FULL_IMAGE_NAME -f $DOCKERFILE $CONTEXT

# Push the image
echo "Pushing image to registry..."
docker push $FULL_IMAGE_NAME

echo "Image built and pushed successfully: $FULL_IMAGE_NAME"
