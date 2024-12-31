# OOADP develop showdown card game

This is a project that follows

> **OOA -> OOD -> OOP -> Unit tests -> Refactoring**

process and iteratively develops a showdown card game to demonstrate the process of continuous development and refactoring.

## Contents [[↑](#ooadp-develop-showdown-card-game)]

- [OOADP develop showdown card game](#ooadp-develop-showdown-card-game)
  - [Contents \[↑\]](#contents-)
  - [Development environment \[↑\]](#development-environment-)
    - [Local development environment \[↑\]](#local-development-environment-)
    - [Docker development environment \[↑\]](#docker-development-environment-)
    - [Vagrant development environment \[↑\]](#vagrant-development-environment-)
  - [Run unit tests \[↑\]](#run-unit-tests-)
  - [Run lint \[↑\]](#run-lint-)

## Development environment [[↑](#ooadp-develop-showdown-card-game)]

You can use one of the following development environments to develop the game:

### Local development environment [[↑](#ooadp-develop-showdown-card-game)]

- You need to have node.js installed.

### Docker development environment [[↑](#ooadp-develop-showdown-card-game)]

- You need to have Docker installed, then you can run the following commands to start the container for development:

  ```bash
  docker-compose -f _dev-env/docker/docker-compose-dev-env.yml up -d
  docker container exec -it <container_id or container_name> bash
  npm install
  ```

### Vagrant development environment [[↑](#ooadp-develop-showdown-card-game)]

- You need to have virtualbox and vagrant installed, then you can run the following commands to start the VM for development:

  ```bash
  cd _dev-env/vagrant
  vagrant up
  vagrant ssh
  npm install
  ```

## Run unit tests [[↑](#ooadp-develop-showdown-card-game)]

- You can run the unit tests by running the following commands:

  ```bash
  npm run test:coverage
  ```

## Run lint [[↑](#ooadp-develop-showdown-card-game)]

- You can run the lint by running the following commands:

  ```bash
  npm run lint
  ```
