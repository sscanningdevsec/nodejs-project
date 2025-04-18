pipeline {
    agent any

    environment {
        GITLEAKS_REPORT = 'gitleaks-report.json'
        TRUFFLEHOG_REPORT = 'trufflehog-report.json'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Run git-secrets scan') {
            steps {
                script {
                    try {
                        bat 'git secrets --install'
                        bat 'git secrets --register-aws'
                        bat 'git secrets --scan --recursive'
                    } catch (err) {
                        echo 'Potential secrets found by git-secrets.'
                        // Mark stage as unstable
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Run Gitleaks scan') {
            steps {
                script {
                    try {
                        bat "gitleaks detect --source . --report-format json --report-path %GITLEAKS_REPORT%"
                    } catch (err) {
                        echo 'Potential secrets found by Gitleaks.'
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Run TruffleHog scan') {
            steps {
                script {
                    try {
                        bat "trufflehog filesystem . --json > %TRUFFLEHOG_REPORT%"
                    } catch (err) {
                        echo 'Potential secrets found by TruffleHog.'
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: "${GITLEAKS_REPORT}, ${TRUFFLEHOG_REPORT}", allowEmptyArchive: true
            echo 'Secrets scan completed. Reports have been archived.'
        }
        failure {
            echo 'Secret scanning detected critical issues!'
        }
        unstable {
            echo 'Secret scanning flagged issues. Please review the reports.'
        }
    }
}