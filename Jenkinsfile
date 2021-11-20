pipeline {
    agent any

    stages {
        stage('Dependencies') {
            steps {
                nodejs('node-14.17.1') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build') {
            steps {
                nodejs('node-14.17.1') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'rm -rf /dist/covid'
                sh 'cp -r dist/covid /dist/'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
