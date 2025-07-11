<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup
## Prerequisites

### Git

- **Windows**: Download and run installer from [git-scm.com](https://git-scm.com)
- **Mac**: Run `brew install git` or download from [git-scm.com](https://git-scm.com)
- **Linux**: Run `sudo apt install git` (Ubuntu/Debian) or `sudo dnf install git` (Fedora)

After installing, set up Git:

```bash
$ npm install
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Compile and run the project
No, let me revise to make it work everywhere:

### Setting up GitHub SSH Key

#### Windows

In Git Bash:

```bash
# development
$ npm run start
# Generate key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Press Enter for default location and no passphrase

# watch mode
$ npm run start:dev
# Start SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# production mode
$ npm run start:prod
# Display key to copy
cat ~/.ssh/id_ed25519.pub
```

## Run tests
#### Mac/Linux

In Terminal:

```bash
# unit tests
$ npm run test
# Generate key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Press Enter for default location and no passphrase

# Start SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# e2e tests
$ npm run test:e2e
# Mac: Copy key to clipboard
pbcopy < ~/.ssh/id_ed25519.pub

# test coverage
$ npm run test:cov
# Linux: Display key to copy
cat ~/.ssh/id_ed25519.pub
```

## Deployment
Then:

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.
1. Go to GitHub.com → Settings → SSH Keys → New SSH Key
2. Paste your key and save
3. Test with: `ssh -T git@github.com`

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:
### Connecting Local Repository to GitHub

#### HTTPS method (username + token):

```bash
$ npm install -g mau
$ mau deploy
git remote add origin https://github.com/username/repository.git
git push -u origin main
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).
You'll need to enter your GitHub username and Personal Access Token as password.

## Support
#### SSH method (if you set up SSH key):

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
```bash
git remote add origin git@github.com:username/repository.git
git push -u origin main
```

## Stay in touch
#### Check your remote:

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
```bash
git remote -v
```

## License
After this, you can just use `git push` and `git pull`.

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
Note: Replace `username/repository` with your actual GitHub username and repository name.