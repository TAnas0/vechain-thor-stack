# Vechain Thor Stack

This a dockerized setup for the following:

1. Thor node using the [official docker image](https://hub.docker.com/r/vechain/thor/)
2. Backend (ExpressJS/TypeScript)
3. Frontend (NextJS/TypeScript/TailwindCSS)

## Requirements

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Node](https://nodejs.org/en/) v16+ & NPM: for running the frontend and backend locally

## Recommended hardware

We recommend the following hardware specifications:

- AWS EC2 `t2.medium`: 2vCPUs and 4GB of RAM
- 70 GB of disk space (50 GB is needed for the Vechain Testnet blockchain data)

## Getting started

You can launch all 3 services with a single command:

```bash
docker-compose up -d
```

This may take some time initially for the build of the images.

Once it is up, your Thor node will start syncing with the testnet blockchain. To check its logs, use `docker-compose node logs`.

You can access the resources at:

1. Thor node: http://localhost:8669/ (**Requires exposing port 8669 in docker-compose.yaml**)
2. Backend: http://localhost:8080/
3. Frontend: http://localhost:3000/

For further details about each project and how to run it individually, please refer to their respective READMEs.
