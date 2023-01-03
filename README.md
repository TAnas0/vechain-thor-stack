# Vechain Thor Stack

This a dockerized setup for the following:

1. Thor node using the [official docker image](https://hub.docker.com/r/vechain/thor/)
2. Backend (ExpressJS/TypeScript)
3. Frontend (NextJS/TypeScript/TailwindCSS)

You can launch them all with a single command:

```bash
docker-compose up -d
```

This may take some time initially for the build of the images.
Once it is up, you Thor node will start syncing with the testnet blockchain.
You can access the resources at:

1. Thor node: http://localhost:8669/ (**Requires an additional step**)
2. Backend: http://localhost:8080/
3. Frontend: http://localhost:3000/