pipeline {
    agent any

    stages {
        stage('Actualizar repositorio') {
            steps {
                script {
                    if (fileExists("$WORKSPACE/soa-test/.git")) {
                        // Si ya existe el directorio, realiza un git pull
                        dir("$WORKSPACE/soa-test") {
                            sh 'git pull'
                        }
                    } else {
                        // Si no existe el directorio, realiza un git clone
                        dir('tu-directorio-local') {
                            sh 'git clone https://github.com/AlanCruz10/soa-test.git'
                        }
                    }
                }
            }
        }

        stage('Construir imagen Docker') {
            steps {
                script {
                    // Verifica si la imagen ya existe antes de construirla
                    def imageExists = sh(script: 'docker images -q soa-deploy', returnStatus: true) == 0
                    if (!imageExists) {
                        docker.build("soa-deploy")
                    } else {
                        echo 'La imagen ya existe, no es necesario construirla nuevamente.'
                    }
                }
            }
        }

        stage('Ejecutar pruebas') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Desplegar imagen Docker') {
            when {
                expression { currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    // Verifica si el contenedor ya está corriendo
                    def containerRunning = sh(script: 'docker ps -q -f name=soa-deploy-test', returnStatus: true) == 0
                    if (containerRunning) {
                        // Si el contenedor ya está corriendo, actualiza la imagen
                        sh "docker stop soa-deploy-test"
                        sh "docker rm soa-deploy-test"
                    }
                    // Inicia el contenedor con la nueva imagen
                    sh "docker run -d -p 3000:3000 --name soa-deploy-test soa-deploy"
                }
            }
        }
    }
}
