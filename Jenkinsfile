pipeline {
    agent any

    stages {
        stage('Update') {
            steps {
                git 'https://github.com/AlanCruz10/soa-test.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    docker.build("soa-deploy")
                }
            }
        }

        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Deploy') {
            when {
                expression { currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh "docker stop soa-deploy-c || true"
                sh "docker rm soa-deploy-c || true"
                sh "docker run -d -p 3000:3000 --name soa-deploy-c soa-deploy"
            }
        }
    }
}