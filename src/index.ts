import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import axios from "axios";

export class AgentxClient {
  connection: Connection;
  zkEndpoint: string;

  constructor(rpcUrl: string, zkEndpoint: string) {
    this.connection = new Connection(rpcUrl);
    this.zkEndpoint = zkEndpoint;
  }

  async generateProof(data: any) {
    const res = await axios.post(`${this.zkEndpoint}/generate-proof`, {
      data
    });
    return res.data.proof;
  }

  async registerAgent(wallet: Keypair) {
    console.log("Registering agent:", wallet.publicKey.toBase58());
    // Add actual Anchor interaction here
  }

  async submitProof(proof: string) {
    console.log("Submitting proof:", proof);
    // Add on-chain submit logic here
  }
}
