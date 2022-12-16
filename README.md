# textlint-restful-api

## Getting Started
```
# Install all necessary dependencies at once.
npm install --save-dev

# Start Web Server 
node app.js
```

## Deploy on AWS Elastic Container Service(ECS) Fargate with Github Action
Tutorial: [Continuous delivery of container applications to AWS Fargate with GitHub Actions](https://aws.amazon.com/blogs/opensource/github-actions-aws-fargate/)
* The repository using this method.

```bash
# Create Elastic Container Repository(ECR)
aws ecr create-repository --repository-name my-ecr-repo --region ap-northeast-1

# Create Cluster
aws ecs create-cluster --region ap-northeast-1 --cluster-name my-ecs-clu

# Set up a Fargate service
aws ecs register-task-definition --region ap-northeast-1 --cli-input-json file://task-def.json

# Create a Fargate service
# Note: `assignPublicIp=ENABLED`, a public ip address is required when pull image from ECR.
aws ecs create-service --service-name fargate-service1 --cluster my-ecs-clu --region ap-northeast-1 --task-definition nodejs-family-fargate:1 --desired-count 1 --launch-type "FARGATE" --network-configuration "awsvpcConfiguration={subnets=[subnet-09f96c821d29e903b],securityGroups=[sg-089528644e60b2c2d],assignPublicIp=ENABLED}"

# Stop the Fargate Task(Set count to 0)
aws ecs update-service --desired-count 0 --cluster "my-ecs-clu" --service "fargate-service1"
```

------------------------------------------------------

## Deploy on AWS Elastic Beanstalk with Github CI/CD
Tutorial: [Deploy NodeJS app to AWS Elastic Beanstalk](https://www.red-gate.com/simple-talk/blogs/deploying-a-nodejs-application-from-github-to-aws-elastic-beanstalk-and-creating-a-ci-cd-aws-codepipeline/)

### Note
Some configurations required on AWS.
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