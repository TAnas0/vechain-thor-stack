import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
// TODO Middleware for "authentication"

app.get("/", (req: Request, res: Response) => {
  res.send("Server working");
});

app.get("/status", async (req: Request, res: Response) => {
  // TODO Get best/finalized block details
  // TODO Ping other testnet servers and get their details
  // TODO determine if synced or not
  // TODO Estimate how long till sync
  let resp = await axios.get(`http://${THOR_ENDPOINT}:${THOR_PORT}/blocks/best`)
  const bestBlock = resp.data
  resp = await axios.get(`http://${THOR_ENDPOINT}:${THOR_PORT}/blocks/finalized`)
  const finalizedBlock = resp.data

  resp = await axios.get("https://testnet.veblocks.net/blocks/best")
  const remoteBestBlock = resp.data
  resp = await axios.get("https://testnet.veblocks.net/blocks/finalized")
  const remoteFinalizedBlock = resp.data

  res.send({
    bestBlock,
    finalizedBlock,
    remoteBestBlock,
    remoteFinalizedBlock,
  });
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
