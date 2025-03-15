# Showdown Card Game with OOADP: Iterative Development, Continuous Refactoring, and DevOps

[![CI](https://github.com/W-Shih/OOADP-showdown-game/actions/workflows/ci.yml/badge.svg)](https://github.com/W-Shih/OOADP-showdown-game/actions/workflows/ci.yml?query=branch%3Amain)
[![Codacy code quality](https://app.codacy.com/project/badge/Grade/8e644233caca4cd9be81a73d2ce77d2b)](https://app.codacy.com/gh/W-Shih/OOADP-showdown-game/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy test coverage](https://app.codacy.com/project/badge/Coverage/8e644233caca4cd9be81a73d2ce77d2b)](https://app.codacy.com/gh/W-Shih/OOADP-showdown-game/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)
[![Codecov test coverage](https://codecov.io/gh/W-Shih/OOADP-showdown-game/branch/main/graph/badge.svg)](https://app.codecov.io/gh/W-Shih/OOADP-showdown-game/tree/main)

[![CD](https://github.com/W-Shih/OOADP-showdown-game/actions/workflows/cd.yml/badge.svg)](https://github.com/W-Shih/OOADP-showdown-game/actions/workflows/cd.yml?query=branch%3Amain)
[![Docker Image Version (tag)](https://img.shields.io/docker/v/wshih/ooadp-showdown-game/latest?label=dockerhub)](https://hub.docker.com/r/wshih/ooadp-showdown-game/tags)
[![multi-arch images (Static Badge)](https://img.shields.io/badge/multi--arch%20images-amd64%2C%20arm64-blue)](https://hub.docker.com/r/wshih/ooadp-showdown-game/tags)

[![GitHub License](https://img.shields.io/github/license/W-Shih/OOADP-showdown-game)](./LICENSE)

This project demonstrates the iterative development, continuous refactoring, and DevOps practices through a simple showdown card game. By combining **Object-Oriented Analysis, Design, Programming (OOADP), unit tests, and refactoring** with modern development tools (e.g. **Docker** and **Vagrant**) and **CI/CD pipelines**, it serves as a hands-on example of how to build scalable and maintainable software for real-world applications.

The project emphasizes

- **Iterative Development and Continuous Refactoring**:
  - Following a structured cycle to continuously refine design and implementation:

    > **OOA -> OOD -> OOP -> Unit tests -> Refactoring**

- **DevOps and CI/CD pipelines**:
  - Leveraging **GitHub Actions workflows** to implement **Continuous Integration (CI)** and **Continuous Delivery (CD)** pipelines, enabling automated testing, integration, and deployment.
  - These practices ensure **high code quality**, early detection of bugs, and consistency across all stages of development and delivery.
  - Supports multi-architecture compatibility (including **amd64** and **arm64**) in the delivery artifacts.

- **Practical Development Environment**:
  - Leveraging modern tools like **Docker** and **Vagrant** to setup a realistic and efficient **Node.js** development environment.
  - Supports **multi-architecture platforms** (including **amd64** and **arm64**) for broad compatibility.

## Contents [[↑](#showdown-card-game-with-ooadp-iterative-development-continuous-refactoring-and-devops)]

- [Contents \[↑\]](#contents-)
- [Tech Stack \[↑\]](#tech-stack-)
- [Project Objective \[↑\]](#project-objective-)
- [Prerequisites \[↑\]](#prerequisites-)
- [Design Documentation \[↑\]](#design-documentation-)
- [DevOps and CI/CD pipelines \[↑\]](#devops-and-cicd-pipelines-)
- [Quick Start \[↑\]](#quick-start-)
- [Development Environment \[↑\]](#development-environment-)
- [Development Commands \[↑\]](#development-commands-)
- [License](#license)

## Tech Stack [[↑](#showdown-card-game-with-ooadp-iterative-development-continuous-refactoring-and-devops)]

- **Programming Language**: TypeScript (Node.js)
- **Development Tools**: Docker, Vagrant
- **DevOps Tools**: GitHub Actions
- **Architecture**: Multi-architecture support (amd64, arm64)
- **Version Control**: Git

---

## Project Objective [[↑](#showdown-card-game-with-ooadp-iterative-development-continuous-refactoring-and-devops)]

- To demonstrate the **OOA -> OOD -> OOP -> Unit tests -> Refactoring** process.
- To illustrate the basics of software design and development cycles.
- To highlight the importance of **DevOps** practices by:
  - Building, testing, and delivering the project using **CI/CD pipelines** powered by **GitHub Actions**.
  - Automating delivery workflows to improve efficiency, reduce manual errors, and **ensure code quality through rigorous automated processes**.
  - Generating **multi-architecture artifacts/images** (e.g., **amd64**, **arm64**) to ensure compatibility across diverse platforms.
- Offers hands-on practice with modern development tools:
  - **Docker** and **Vagrant** for consistent and scalable environment setup across different platforms (e.g., **amd64**, **arm64**).
  - **GitHub Actions** for implementing robust DevOps pipelines.

---

## Prerequisites [[↑](#showdown-card-game-with-ooadp-iterative-development-continuous-refactoring-and-devops)]

Before starting, ensure you have at least one of the following installed:

> **NOTE:**  
> The following versions are based on my tested environment. Lower versions may work but are not guaranteed.

- Local development environment:
  - Node.js (>=18.x)
- Docker development environment:
  - Docker (>=24.x)
- Vagrant development environment:
  - VirtualBox (>=7.1)
  - Vagrant (>=2.4)

---

## Design Documentation [[↑](#showdown-card-game-with-ooadp-iterative-development-continuous-refactoring-and-devops)]

The design documents for this project can be found in the following files located in the `docs/designs` directory:

### OOA - Domain Modeling

- [OOA Class Diagram](docs/designs/1-OOA-ClassDiagram-Showdown-v0.0.0.png)

### OOD - Design blueprint

- [OOD Sequence Diagram](docs/designs/2.1-OOD-SeqDiagram-Showdown-v0.1.0.png)
- [OOD Class Diagram](docs/designs/2.2-OOD-ClassDiagram-Showdown-v0.1.0.png)

### OOP - Programming

- [OOP Class Diagram](docs/designs/3.1-OOP-SeqDiagram-Showdown-v1.0.0.png)
- [OOP Sequence Diagram](docs/designs/3.2-OOP-ClassDiagram-Showdown-v1.0.0.png)

These designs outline the conceptual and logical structures of the game, following the OOADP process.

---

## DevOps and CI/CD pipelines [[↑](#showdown-card-game-with-ooadp-iterative-development-continuous-refactoring-and-devops)]

This section highlights the implementation of modern DevOps practices, focusing on the automation of testing, building, and delivery through CI/CD pipelines. These workflows ensure high efficiency, consistency, and reliability in the development lifecycle.

The CI/CD flowcharts can be found in the following files located in the `docs/devops` directory:

- [CI/CD Flowchart](docs/devops/github-actions-ci-cd-flowchart.png)

---

## Quick Start [[↑](#showdown-card-game-with-ooadp-iterative-development-continuous-refactoring-and-devops)]

You can run the game locally, via Docker, or via Node.js and Docker.

### Run the Game Locally

- If you have local node.js installed, you can run the game by running the following commands:

  ```bash
  npm install
  npm run start:dev
  ```

### Run the Game via Docker

- If you have Docker installed, you can choose to run the pre-built image or build the image locally:

  - Run the pre-built image (supports **amd64** and **arm64** platforms):

    ```bash
    docker container run --name showdown-card-game --rm -it wshih/ooadp-showdown-game:latest
    ```

  - Build the image tailored to your platform and run it:

    ```bash
    docker build -t showdown-card-game:latest .
    docker container run --name showdown-card-game --rm -it ooadp-showdown-game:latest
    ```

### Run the Game via Node.js and Docker

- If you have local node.js and Docker installed, you can run the game by running the following commands:

  ```bash
  npm install
  npm run start:container
  ```

---

## Development Environment [[↑](#showdown-card-game-with-ooadp-iterative-development-continuous-refactoring-and-devops)]

This project supports three development setups:

### Local Development Environment

- Requires Node.js (>=18.x).

### Docker Development Environment

- Requires Docker (>=24.x).
- Supports multi-architecture platforms, including **amd64**, **arm64**, etc., based on the base image.
- To set up the containerized development environment:

  ```bash
  docker-compose -f _dev-env/docker/docker-compose.dev-env.yml up -d
  docker container exec -it <container_id or container_name> bash
  npm install
  ```

- Clean up and remove the Docker development environment by running the following commands:

  ```bash
  docker-compose -f _dev-env/docker/docker-compose.dev-env.yml down
  ```

  Then, remove the corresponding container and image.

### Vagrant Development Environment

- Requires VirtualBox (>=7.1) and Vagrant (>=2.4).
- Supports both **amd64** and **arm64** platforms, ensuring compatibility across different hardware architectures.
- To start the virtual machine for development:

  ```bash
  cd _dev-env/vagrant
  vagrant up
  vagrant ssh
  npm install
  ```

- Clean up and remove the Vagrant development environment by running the following commands:

  ```bash
  cd _dev-env/vagrant
  vagrant destroy
  ```

---

## Development Commands [[↑](#showdown-card-game-with-ooadp-iterative-development-continuous-refactoring-and-devops)]

### Run Unit Tests

- Run the unit tests with coverage by running the following commands:

  ```bash
  npm run test:coverage
  ```

### Run Lint

- Run the lint by running the following commands:

  ```bash
  npm run lint
  ```

### Clean Up

- Clean up the environment (`node_modules`, `dist`, `coverage`) by running the following commands:

  ```bash
  npm run clean
  ```

### More Commands

- See more commands in the `package.json` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
