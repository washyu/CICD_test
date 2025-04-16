# Project Setup Guide

This document provides step-by-step instructions for setting up a new project from this template.

## 1. Create a New Repository

1. In Gitea, navigate to the template repository
2. Click the "Use this template" button
3. Enter a name for your new repository
4. Click "Create Repository"

## 2. Clone Your New Repository

```bash
git clone https://your-gitea-instance.com/username/your-new-repo.git
cd your-new-repo
```

## 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your specific configuration:
   - Update `REGISTRY` with your Docker registry URL
   - Update `PROJECT_NAME` with your project name
   - Update database credentials if needed
   - Update Kubernetes domain if needed

## 4. Update Jenkinsfile

1. Open `Jenkinsfile` and update:
   - The Docker registry URL
   - Any project-specific environment variables
   - Credential IDs if they differ from the defaults

## 5. Update Kubernetes Manifests

1. Review and update the Kubernetes manifests in the `k8s/` directory:
   - Update resource limits/requests if needed
   - Update the ingress host to match your domain

## 6. Set Up Local Development Environment

1. Start the local development environment:
   ```bash
   docker-compose up -d
   ```

2. Initialize the database:
   ```bash
   docker-compose exec db psql -U postgres -d app_db -f /app/backend/db/init.sql
   ```

## 7. Configure CI/CD in Jenkins

1. In Jenkins, create a new pipeline job
2. Configure it to use your Git repository
3. Add the required credentials:
   - `docker-registry-credentials`: Docker registry credentials
   - `kubeconfig`: Kubernetes configuration file

## 8. Customize the Application

1. Update the frontend code in `frontend/src/`
2. Update the backend code in `backend/`
3. Add additional services as needed

## 9. Commit and Push Your Changes

```bash
git add .
git commit -m "Initial project setup"
git push origin main
```

## 10. Run the CI/CD Pipeline

1. In Jenkins, run the pipeline job
2. Monitor the build, push, and deployment stages
3. Access your application at the configured domain
