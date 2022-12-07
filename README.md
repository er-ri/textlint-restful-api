# textlint-restful-api

##
```
Procfile : AWS Elastic Beanstalk
```

## Getting Started
```
# Install all necessary dependencies at once.
npm install --save-dev

npm install --save-dev textlint
npm install --save-dev express
npm install --save-dev textlint-rule-max-kanji-continuous-len
npm install --save-dev textlint-rule-no-dropping-the-ra
```

## Settings on AWS
* Elastic Beanstalk(Configurations): set `NPM_USE_PRODUCTION` to `false`.
* Role: `aws-elasticbeanstalk-ec2-role`

## Install package locally
```
npm install --save-dev ../textlint-rule-ja-conjunction-kanagaki
npm install --save-dev https://github.com/er-ri/textlint-rule-ja-conjunction-kanagaki/tarball/v1.0.0
```

## AWS EC2
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

docker build --file ./Dockerfile --tag textlint-restful-api .
docker run -t -i -p 80:8081 textlint-restful-api

# Kill all docker containers
docker kill $(docker ps -q)
```

Reference:
* https://docs.npmjs.com/cli/v9/commands/npm-install