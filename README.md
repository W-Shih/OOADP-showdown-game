# Showdown Card Game with OOADP: Iterative Development and Continuous Refactoring

This project demonstrates the iterative development and continuous refactoring process of **Object-Oriented Analysis, Design, Programming (OOADP), unit tests, and refactoring** through a simple showdown card game.

The project emphasizes

- **Iterative Development and Continuous Refactoring**:
  - Following a structured cycle to continuously refine design and implementation:

    > **OOA -> OOD -> OOP -> Unit tests -> Refactoring**

- **Practical Development Environment**:
  - Leveraging modern tools like **Docker**, **Vagrant**, and **Node.js** to simulate a realistic and efficient development environment.

## Contents [[↑](#showdown-card-game-with-ooadp-iterative-development-and-continuous-refactoring)]

- [Contents \[↑\]](#contents-)
- [Project Objective \[↑\]](#project-objective-)
- [Prerequisites \[↑\]](#prerequisites-)
- [Design Documentation \[↑\]](#design-documentation-)
- [Quick Start \[↑\]](#quick-start-)
- [Development environment \[↑\]](#development-environment-)
- [Development Commands \[↑\]](#development-commands-)

## Project Objective [[↑](#showdown-card-game-with-ooadp-iterative-development-and-continuous-refactoring)]

- To demonstrate the **OOA -> OOD -> OOP -> Unit tests -> Refactoring** process.
- To show the basics of software design and development cycles.
- Offers hands-on practice with modern tools like Docker, Vagrant, and Node.js.

---

## Prerequisites [[↑](#showdown-card-game-with-ooadp-iterative-development-and-continuous-refactoring)]

Before starting, ensure you have at least one of the following installed:

- Local development environment:
  - Node.js (>=20.x)
- Docker development environment:
  - Docker (>=24.x)
- Vagrant development environment:
  - VirtualBox (>=7.1)
  - Vagrant (>=2.4)

---

## Design Documentation [[↑](#showdown-card-game-with-ooadp-iterative-development-and-continuous-refactoring)]

The design documents for this project can be found in the following files located in the `docs/designs` directory:

### OOA - Domain Modeling

- [OOA Class Diagram](docs/designs/1-OOA-ClassDiagram-Showdown-v0.0.0.png)

### OOD - Design blueprint

- [OOD Sequence Diagram](docs/designs/2.1-OOD-SeqDiagram-Showdown-v0.1.0.png)
- [OOD Class Diagram](docs/designs/2.2-OOD-ClassDiagram-Showdown-v0.1.0.png)

### OOP - Programming

- [OOP Class Diagram](docs/designs/3.1-OOP-ClassDiagram-Showdown-v0.1.0.png)
- [OOP Sequence Diagram](docs/designs/3.2-OOP-SeqDiagram-Showdown-v0.1.0.png)

These designs outline the conceptual and logical structures of the game, following the OOADP process.

---

## Quick Start [[↑](#showdown-card-game-with-ooadp-iterative-development-and-continuous-refactoring)]

You can run the game locally, via Docker, or via Node.js and Docker.

### Run the game locally

- If you have local node.js installed, you can run the game by running the following commands:

  ```bash
  npm install
  npm run start
  ```

### Run the game via Docker

- If you have Docker installed, you can run the game by running the following commands:

  ```bash
  docker build -t showdown-card-game:latest .
  docker container run --name showdown-card-game --rm -it showdown-card-game:latest
  ```

### Run the game via Node.js and Docker

- If you have local node.js and Docker installed, you can run the game by running the following commands:

  ```bash
  npm install
  npm run start:container
  ```

---

## Development environment [[↑](#showdown-card-game-with-ooadp-iterative-development-and-continuous-refactoring)]

This project supports three development setups:

### Local development environment

- Requires Node.js (>=20.x).

### Docker development environment

- Requires Docker (>=24.x).
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

### Vagrant development environment

- Requires VirtualBox (>=7.1) and Vagrant (>=2.4).
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

## Development Commands [[↑](#showdown-card-game-with-ooadp-iterative-development-and-continuous-refactoring)]

### Run unit tests

- Run the unit tests with coverage by running the following commands:

  ```bash
  npm run test:coverage
  ```

### Run lint

- Run the lint by running the following commands:

  ```bash
  npm run lint
  ```

### Clean up

- Clean up the environment (`node_modules`, `dist`, `coverage`) by running the following commands:

  ```bash
  npm run clean
  ```

### More commands

- See more commands in the `package.json` file.
