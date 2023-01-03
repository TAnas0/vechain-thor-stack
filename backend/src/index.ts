import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { thorify } from "thorify";
const Web3 = require("web3"); // Recommend using require() instead of import here
import bodyParser from "body-parser";
import { mnemonic } from "thor-devkit";
import cors from "cors";

dotenv.config();

const app: Express = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;
const { THOR_ENDPOINT, THOR_PORT } = process.env;
const web3 = thorify(new Web3(), `http://${THOR_ENDPOINT}:${THOR_PORT}`);

// Middleware for wallets authentication
app.use("/send/:to", (req, res, next) => {
  const { auth } = req.body;
  const authKeys = Object.keys(auth);
  try {
    if (authKeys.includes("privateKey")) {
      web3.eth.accounts.wallet.add(auth.privateKey);
      next();
    } else if (authKeys.includes("mnemonicWords")) {
      if (auth.mnemonicWords.isArray()) {
        const privateKey: Buffer = mnemonic.derivePrivateKey(auth.mnemonicWords);
        web3.eth.accounts.wallet.add(privateKey);
        next();
      } else {
        res.status(404).json({
          error: "Provide mnemonic words as an array"
        });
      }
    } else {
      res.status(403).json({
        error: "Authentication details not provided"
      });
    }
  } catch (e) {
    console.error(e);
    res.status(401).json({
      error: "Unexpected error in middleware",
    });
  }
});

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
  // TODO Respond with details about the transaction
  const { value, data, from } = req.body;
  const { to } = req.params;

  try {
    const resp = await web3.eth.sendTransaction({
      from,
      to,
      value,
      data: Buffer.from(data, 'utf8').toString('hex'),
    });
    console.log(resp);
    res.send(resp)
  } catch (error) {
    console.log("Error while making transaction");
    console.error(error);
    res.status(400).send({
      error: "Error while making transaction",
    })
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
