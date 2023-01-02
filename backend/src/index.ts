import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

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
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
