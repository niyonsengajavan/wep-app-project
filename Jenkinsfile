
pipeline {
    agent any

    environment {
        IMAGE_NAME = 'tourism-portal:1.0'
        CONTAINER_NAME = 'tourism-portal'
        HOST_PORT = '4000'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME -t tourism-portal:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker rm -f $CONTAINER_NAME || true'
                sh 'docker run -d --name $CONTAINER_NAME --restart unless-stopped -p $HOST_PORT:4000 $IMAGE_NAME'
            }
        }
    }
}
