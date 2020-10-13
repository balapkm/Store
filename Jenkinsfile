pipeline {
    agent any
    options {
        disableConcurrentBuilds()
    }
    environment {
        
    }
    stages {
        stage('Run API & Client Unit testing') {
            steps {
                sh 'npm run test'
                sh 'npm start'
                sh 'cd src/views && yarn test'
                sh 'yarn build'
            }
        }
    }
    post { 
        always {
            echo "Final Output --> ${currentBuild.result}"
        }
    }
}