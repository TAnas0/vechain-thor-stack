import { Request, Response, NextFunction } from "express";
import { mnemonic } from "thor-devkit";
import { web3 } from "./";

const walletAuth = (req: Request, res: Response, next: NextFunction) => {
  const { auth } = req.body;
  try {
    const authKeys = Object.keys(auth);
    if (authKeys.includes("privateKey")) {
      web3.eth.accounts.wallet.add(auth.privateKey);
      next();
    } else if (authKeys.includes("mnemonicWords")) {
      if (Array.isArray(auth.mnemonicWords)) {
        const privateKey: Buffer = mnemonic.derivePrivateKey(
          auth.mnemonicWords
        );
        web3.eth.accounts.wallet.add(privateKey.toString("hex"));
        next();
      } else {
        res.status(404).json({
          error: "Provide mnemonic words as an array",
        });
      }
    } else {
      res.status(403).json({
        error: "Authentication details not provided",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(401).json({
      error: "Unexpected error in middleware",
    });
  }
};

export { walletAuth };
