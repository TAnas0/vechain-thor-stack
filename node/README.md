# Thor Node

Based on the official [vechain/thor](https://hub.docker.com/r/vechain/thor/) Docker image.
You can find its source code at [vechain/thor](https://github.com/vechain/thor).

## Getting started

We recommend you use the top-level `docker-compose.yaml` file `docker-compose up -d node`.
It will take care of properly mounting the volume, and limiting the CPU/RAM usage.
If you wish to run the Thor node individually, use:

```bash
docker run -d\
  -v {path-to-your-data-directory}/.org.vechain.thor:/root/.org.vechain.thor\
  -p 127.0.0.1:8669:8669 -p 11235:11235 -p 11235:11235/udp\
  --name thor-node vechain/thor --network test
```

Some notable flags for the Thor CLI are:

- `--network`: the network to join (`main` or `test`) or a path to a genesis file for a [custom network](https://docs.vechain.org/thor/get-started/custom-network.html)
- `--skip-logs`: skip writing `event` and `transfer` logs
- `--api-addr`: API service listening address (default: "localhost:8669")

For the full list of flags Thor supports, check the official [Running Thor](https://github.com/vechain/thor#running-thor) documentation.

## Security

For a through guide on how to secure a Thor node, check out the official [VeChain core nodes security checklist](https://github.com/slowmist/vechain-core-nodes-security-checklist/blob/master/README-en.md).

## Resources

- [VeChain Docs: Introduction](https://docs.vechain.org/thor/learn/)
- [VeChain Docs: Development Resources](https://docs.vechain.org/others/development-resources.html)
- [How To Develop a DApp on VeChain (II): Setup & Walk Around](https://abyteahead.medium.com/how-to-develop-a-dapp-on-vechain-ii-setup-walk-around-109a01bf7ae9)
