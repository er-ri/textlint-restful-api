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

Reference:
* https://docs.npmjs.com/cli/v9/commands/npm-install