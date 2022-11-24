# textlint-restful-api

## Getting Started
```
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
```

Reference:
* https://docs.npmjs.com/cli/v9/commands/npm-install