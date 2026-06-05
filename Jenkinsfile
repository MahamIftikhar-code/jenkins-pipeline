pipeline {
    agent { label 'mhm' }

    environment {
        DOCKER_IMAGE = "mahamiftikhar/jenkins-pipeline"
        DOCKER_TAG   = "${BUILD_NUMBER}"
        EC2_HOST     = "18.119.14.196"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Pulling code from GitHub'
                checkout scm
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests'
                sh 'npm install'
                sh 'npm test'
                echo 'All tests passed'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image'
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing to Docker Hub'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerHubCred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
                echo 'Image pushed successfully'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to AWS EC2'
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ec2-ssh-key',
                    keyFileVariable: 'SSH_KEY'
                )]) {
                    sh """
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                            docker pull ${DOCKER_IMAGE}:latest &&
                            docker stop jenkins-app 2>/dev/null || true &&
                            docker rm jenkins-app 2>/dev/null || true &&
                            docker run -d \\
                                --name jenkins-app \\
                                --restart unless-stopped \\
                                -p 4000:4000 \\
                                ${DOCKER_IMAGE}:latest
                        '
                    """
                }
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully'
            echo "App live at http://${EC2_HOST}:4000"
        }
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
    }
}