pipeline {

  environment {
    registry = "devcoolinc/testrepo"
    registryCredential = "dockercred"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git 'https://sritejaraavi:Sri$9491@github.com/HiPaaSInc/hipass-frontend.git'
      }
    }

    stage('Build image') {
      steps{
        script {
          dockerImage =  docker build  -t devcoolinc/hipass_reactdocker:(env.$BUILD_NUMBER") . --network host        }
      }
    }

    stage('Push Image') {
      steps{
        script {
          docker.withRegistry( "",registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }

    stage('Deploy App') {
      steps {
        script {
          kubernetesDeploy(configs: "react.yml", kubeconfigId: "mykubeconfig")
        }
      }
    }

  }

}
