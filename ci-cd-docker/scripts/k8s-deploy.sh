#!/bin/bash
set -e

# Helper script for Kubernetes deployments
# Usage: k8s-deploy.sh [namespace] [manifest_directory]

NAMESPACE=${1:-default}
MANIFEST_DIR=${2:-k8s}

echo "Deploying to namespace: $NAMESPACE"
echo "Using manifests from: $MANIFEST_DIR"

# Create namespace if it doesn't exist
kubectl get namespace $NAMESPACE || kubectl create namespace $NAMESPACE

# Apply manifests
kubectl apply -f $MANIFEST_DIR -n $NAMESPACE

# Wait for deployments to be ready
kubectl get deployments -n $NAMESPACE -o name | xargs -I{} kubectl rollout status -n $NAMESPACE {}

echo "Deployment completed successfully!"
