import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { thorify } from "thorify";
const Web3 = require("web3"); // Recommend using require() instead of import here
import bodyParser from "body-parser";
import { mnemonic } from "thor-devkit";
import cors from "cors";
import { walletAuth } from "./middlewares";

dotenv.config();

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/send/:to", walletAuth);

const port = process.env.PORT || 8080;
const { THOR_ENDPOINT, THOR_PORT } = process.env;
let web3 = thorify(new Web3(), `http://${THOR_ENDPOINT}:${THOR_PORT}`);

// Routes
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

app.post("/send/:to", async (req: Request, res: Response) => {
  const { value, data, from }: { value: number; data: string; from: string } =
    req.body;
  const { to }: { to?: string } = req.params;

  try {
    const resp = await web3.eth.sendTransaction({
      from,
      to,
      value,
      data: Buffer.from(data, "utf8").toString("hex"),
    });
    console.log(resp);
    res.send(resp);
  } catch (error) {
    console.log("Error while making transaction");
    console.error(error);
    res.status(400).send({
      error: "Error while making transaction",
    });
  }
});

app.post("/mnemonictokey", async (req: Request, resp: Response) => {
  const privateKey: Buffer = mnemonic.derivePrivateKey(req.body.words);
  resp.send(privateKey.toString("hex"));
});

app.listen(port, () => {
  console.log(`??????[server]: Server is running at http://localhost:${port}`);
});

export { web3 };
