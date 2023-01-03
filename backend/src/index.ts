import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { thorify } from "thorify";
const Web3 = require("web3"); // Recommend using require() instead of import here
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const { THOR_ENDPOINT, THOR_PORT } = process.env;
const web3 = thorify(new Web3(), `http://${THOR_ENDPOINT}:${THOR_PORT}`);
// TODO Middleware for "authentication"

app.get("/", (req: Request, res: Response) => {
  res.send("Server working");
});

app.get("/status", async (req: Request, res: Response) => {
  // TODO determine if synced or not
  // TODO Estimate how long till sync
  const bestBlock = await web3.eth.getBlock("latest");
  const finalizedBlock = await web3.eth.getBlock("finalized");

  // Get status of remote Thor testnet nodes
  const veblocksWeb3 = thorify(new Web3(), `https://testnet.veblocks.net`);
  const veblocksBestBlock = await veblocksWeb3.eth.getBlock("latest");
  const veblocksFinalizedBlock = await veblocksWeb3.eth.getBlock("finalized");

  res.send({
    bestBlock,
    finalizedBlock,
    veblocksBestBlock,
    veblocksFinalizedBlock,
  });
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
