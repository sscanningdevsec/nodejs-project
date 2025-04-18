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
                    // Initialize git-secrets and register AWS patterns
                    bat 'git secrets --install || echo "git-secrets already installed."'
                    bat 'git secrets --register-aws || echo "AWS patterns already registered."'

                    // Run git-secrets scan
                    bat 'git secrets --scan --recursive || echo "Potential secrets found by git-secrets."'
                }
            }
        }

        stage('Run Gitleaks scan') {
            steps {
                script {
                    // Run Gitleaks scan and save results in JSON format
                    bat "gitleaks detect --source . --report-format json --report-path %GITLEAKS_REPORT% || echo 'Potential secrets found by Gitleaks.'"
                }
            }
        }

        stage('Run TruffleHog scan') {
            steps {
                script {
                    // Run TruffleHog scan and output JSON results
                    bat "trufflehog filesystem . --json > %TRUFFLEHOG_REPORT% || echo 'Potential secrets found by TruffleHog.'"
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
            echo 'Secret scanning detected potential issues!'
        }
    }
}
