pipeline {
    agent any

    stages {

        stage('Verificar Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Actualizar repositorio') {
            steps {
                def currentDir = sh(script: 'pwd', returnStdout: true).trim()
                echo "El directorio actual es: ${currentDir}"
                sh '''
                    if [ -d "/home/ubuntu/soa-test/.git" ]; then
                        echo 'El repositorio ya existe. Realizando git pull...'
                        cd /home/ubuntu/soa-test
                        git pull
                    else
                        echo 'El repositorio no existe. Realizando git clone...'
                        git clone https://github.com/AlanCruz10/soa-test.git /home/ubuntu/soa-test
                    fi
                '''
            }
        }

        stage('Construir imagen Docker') {
            steps {
                sh '''
                    if [ -z "$(docker images -q soa-deploy:latest)" ]; then
                        echo 'Construyendo la imagen Docker...'
                        docker build -t soa-deploy:latest /home/ubuntu/soa-test
                    else
                        echo 'La imagen ya existe, no es necesario construirla nuevamente.'
                    fi
                '''
            }
        }

        stage('Ejecutar pruebas') {
            steps {
                sh '''
                    cd /home/ubuntu/soa-test
                    npm install
                    npm test
                '''
            }
        }

        stage('Desplegar imagen Docker') {
            when {
                expression { currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh '''
                    if [ "$(docker ps -q -f name=soa-deploy-test)" ]; then
                        echo 'Deteniendo y eliminando el contenedor existente...'
                        docker stop soa-deploy-test
                        docker rm soa-deploy-test
                    fi
                    echo 'Iniciando el contenedor con la nueva imagen...'
                    docker run -d -p 3000:3000 --name soa-deploy-test soa-deploy:latest
                '''
            }
        }
    }
}
