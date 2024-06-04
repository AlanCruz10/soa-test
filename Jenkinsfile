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
                script {
                    // echo 'Verificando existencia del directorio...'
                    // if (fileExists("/home/ubuntu/soa-test/.git")) {
                    //     echo 'El directorio ya existe, realizando git pull...'
                    //     // Si ya existe el directorio, realiza un git pull
                    //     dir("/home/ubuntu/soa-test") {
                    //         sh 'git pull'
                    //     }
                    // } else {
                    //     // Si no existe el directorio, realiza un git clone
                    echo 'Realizando git clone...'
                    // dir('/home/ubuntu') {
                    sh 'git pull https://github.com/AlanCruz10/soa-test.git'
                        // }
                    // }
                }
            }
        }

        stage('Construir imagen Docker') {
            steps {
                script {
                    // Verifica si la imagen ya existe antes de construirla
                    // def imageExists = sh(script: 'docker images -q soa-deploy:latest', returnStatus: true) == 0
                    // if (!imageExists) {
                    echo 'Construyendo la imagen Docker...'
                    sh "docker build -t soa-deploy:latest ."
                    // } else {
                    //     echo 'La imagen ya existe, no es necesario construirla nuevamente.'
                    // }
                }
            }
        }

        // stage('Ejecutar pruebas') {
        //     steps {
        //         echo 'Ejecutando pruebas ...'
        //         // dir('/home/ubuntu/soa-test') {
        //         sh 'npm install'
        //         sh 'npm install --production'
        //         sh 'npm install mocha'
        //         sh 'npm test'
        //         // script {
        //         //     def statusCode = sh(script: 'npm test', returnStatus: true) == 0
        //         //     if (statusCode == 0) {
        //         //         echo 'El comando se ejecutó correctamente'
        //         //     } else {
        //         //         echo 'El comando falló'
        //         //         currentBuild.result = 'FAILURE' // Marca el paso como fallido
        //         //     }

        //             // try {
        //             //     sh 'npm test && exit(1)'
        //             // } catch (err) {
        //             //     currentBuild.result = 'FAILURE'
        //             // }
        //         // }
        //         // }
        //     }
        // }

        stage('Desplegar imagen Docker') {
            // when {
            //     expression { currentBuild.result == 'SUCCESS' }
            // }
            steps {
                script {
                    // Verifica si el contenedor ya está corriendo
                    def containerRunning = sh(script: 'docker ps -q -f name=soa-deploy-test', returnStatus: true) == 0
                    if (containerRunning) {
                        echo 'Actualizando contenedor...'
                        // Si el contenedor ya está corriendo, actualiza la imagen
                        sh "sudo docker stop soa-deploy-test"
                        sh "sudo docker rm soa-deploy-test"
                    }
                    echo 'Desplegando...'
                    // Inicia el contenedor con la nueva imagen
                    sh "sudo docker run -d -p 3000:3000 --name soa-deploy-test soa-deploy:latest"
                }
            }
    }
}
    // post {
    //     always {
    //         script {
    //             if (currentBuild.result == 'FAILURE') {
    //                 error('Uno o más pasos del pipeline han fallado.')
    //             }
    //         }
    //     }
    // }
}
