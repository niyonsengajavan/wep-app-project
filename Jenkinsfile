pipeline {
    agent any

    environment {
        IMAGE_NAME = 'webapp:1.0'
        CONTAINER_NAME = 'webapp'
    }

    stages {
        stage('Install Dependencies') {
            steps { sh 'npm ci' }
        }
        stage('Test') {
            steps { sh 'npm test' }
        }
        stage('Build Docker Image') {
            steps { sh 'docker build -t $IMAGE_NAME .' }
        }
        // Deploy using Docker
        stage('Deploy') {
            steps {
                sh 'docker rm -f $CONTAINER_NAME || true'
                sh 'docker run -d --name $CONTAINER_NAME -p 3001:3000 $IMAGE_NAME'
            }
        }
    }

    post {
        success { echo 'Deployed: http://localhost:3001' }
        failure { echo 'Pipeline failed. Check Console Output.' }
    }
}