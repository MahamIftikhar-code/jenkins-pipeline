# Jenkins CI/CD Pipeline — AWS EC2

End-to-end CI/CD pipeline using Jenkins.
Pulls code from GitHub, runs tests, builds Docker image, pushes to Docker Hub, deploys to AWS EC2.

## Pipeline Stages

| Stage    | What happens                        |
|----------|-------------------------------------|
| Checkout | Pulls latest code from GitHub       |
| Test     | Runs npm test                       |
| Build    | Builds Docker image                 |
| Push     | Pushes image to Docker Hub          |
| Deploy   | SSHs into EC2, runs new container   |

## Tech Stack

Node.js, Docker, Jenkins, AWS EC2, Docker Hub