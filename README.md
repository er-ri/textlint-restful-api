# textlint-restful-api

## Getting Started
```
# Install all necessary dependencies.
npm install --save-dev

# Start Web Server 
node app.js
```

## AWS Elastic Container Service(ECS)
A highly scalable and fast container management service. 

You can use it to run, stop, and manage containers on a `cluster`. With Amazon ECS, your `containers` are defined in a `task definition` that you use to run an individual task or task within a service.

### Cluster
A logical grouping of tasks or services. Tasks and services are run on infrastructure that is registered to a cluster. 

### Task Definition
Specify docker image, CPU and memory, IAM role, etc. 

### Service
Run and maintain a specified number of instances of a task definition simultaneously. If one of your tasks fails or stops, the Amazon ECS service scheduler launches another instance of your task definition to replace it.


## Deploy on AWS Elastic Container Service(ECS) Fargate with Github Action
Tutorial: [Continuous delivery of container applications to AWS Fargate with GitHub Actions](https://aws.amazon.com/blogs/opensource/github-actions-aws-fargate/)
* The repository using this method.

## AWS CLI Command
```bash
# Create Elastic Container Repository(ECR)
aws ecr create-repository --repository-name textlint-restful-api-repo --region ap-northeast-1
# Delete
aws ecr delete-repository --repository-name textlint-restful-api-repo --region ap-northeast-1

# Create Cluster
aws ecs create-cluster --region ap-northeast-1 --cluster-name my-ecs-clu

# Set up a Task Definition
aws ecs register-task-definition --region ap-northeast-1 --cli-input-json file://task-def.json

# Create a Fargate service
# Note: `assignPublicIp=ENABLED`, a public ip address is required when pulling image from ECR.
aws ecs create-service --service-name textlint-restful-api-service --cluster my-ecs-clu --region ap-northeast-1 --task-definition nodejs-family-fargate:1 --desired-count 1 --launch-type "FARGATE" --network-configuration "awsvpcConfiguration={subnets=[subnet-1234567890abcdefg],securityGroups=[sg-1234567890abcdefg],assignPublicIp=ENABLED}"

# Stop/Start the Fargate Task(Set count to 0/1)
aws ecs update-service --desired-count 0 --cluster "my-ecs-clu" --service "textlint-restful-api-service"

### Get Fargate instance public ip address
# Get task ID
aws ecs list-tasks --cluster my-ecs-clu

# Get Task Network Interface ID
aws ecs describe-tasks --cluster my-ecs-clu --tasks 23ef050332d74003a2ab5362cfa26a3b

# Get public ip address
aws ec2 describe-network-interfaces --network-interface-ids eni-07424888100a6ec5f
```

------------------------------------------------------

## Deploy on AWS Elastic Beanstalk with Github CI/CD
Tutorial: [Deploy NodeJS app to AWS Elastic Beanstalk](https://www.red-gate.com/simple-talk/blogs/deploying-a-nodejs-application-from-github-to-aws-elastic-beanstalk-and-creating-a-ci-cd-aws-codepipeline/)

### Note
Some configurations are required on AWS.
* Elastic Beanstalk(Configurations): set `NPM_USE_PRODUCTION` to `false`.
* Role: `aws-elasticbeanstalk-ec2-role`

## Deploy on AWS EC2 Instance
Command
```bash
#Perform a quick update on your instance:
sudo yum update -y

#Install git in your EC2 instance
sudo yum install git -y

#Install nodejs
nvm install 16.17.0
nvm use 16.17.0

sudo amazon-linux-extras install docker
sudo service docker start
sudo chmod 666 /var/run/docker.sock

docker build --file ./Dockerfile --tag textlint-restful-api .
docker run -t -i -p 80:8081 textlint-restful-api

# Kill all docker containers
docker kill $(docker ps -q)
```

Reference:
* https://docs.npmjs.com/cli/v9/commands/npm-install