# Custom CI/CD Docker Image

This repository contains a custom Docker image for CI/CD pipelines, with common tools pre-installed.

## Included Tools

- Docker and Docker Compose
- kubectl for Kubernetes deployments
- Helm for Kubernetes package management
- AWS CLI for AWS integrations
- Git, curl, jq, and other utilities
- Node.js and npm
- Python 3 and pip

## Usage in Jenkins Pipeline

```groovy
pipeline {
    agent {
        docker {
            image 'your-registry/ci-cd-image:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'docker-build-push.sh ${REGISTRY} my-app ${BUILD_NUMBER} ./Dockerfile .'
            }
        }
        
        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh 'export KUBECONFIG=${KUBECONFIG} && k8s-deploy.sh default ./k8s'
                }
            }
        }
    }
}
```

## Building the Image

To build and push this image to your registry:

```bash
docker build -t your-registry/ci-cd-image:latest .
docker push your-registry/ci-cd-image:latest
```

## Customization

You can customize this image by:

1. Adding more tools in the Dockerfile
2. Adding custom scripts to the `scripts/` directory
3. Modifying environment variables and versions

## Versioning

It's recommended to tag your images with specific versions (e.g., `1.0.0`) rather than just using `latest` to ensure pipeline stability.
