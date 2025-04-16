# Project Template

This is a template project with pre-configured CI/CD pipeline using Docker-in-Docker deployment.

## Features

- Jenkins pipeline configuration
- Docker-in-Docker deployment
- Kubernetes deployment manifests
- Frontend and backend application structure
- Local development with Docker Compose

## Getting Started

1. Create a new repository from this template in Gitea
2. Clone your new repository
3. Update the configuration in `.env.example` and rename to `.env`
4. Run `docker-compose up -d` to start the development environment

## CI/CD Pipeline

This project includes a pre-configured Jenkins pipeline that:

1. Builds Docker images for frontend and backend
2. Pushes images to your Docker registry
3. Deploys the application to Kubernetes

## Customization

- Update the `REGISTRY` variable in the Jenkinsfile
- Modify the Kubernetes manifests in the `k8s/` directory
- Customize the Dockerfiles for your specific requirements
