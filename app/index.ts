import { Keypair } from "@solana/web3.js";
import { AgentxClient } from "../sdk/src/index.js";

const wallet = Keypair.generate();

const client = new AgentxClient(
  "https://api.devnet.solana.com",
  "http://localhost:4000"
);

async function main() {
  await client.registerAgent(wallet);

  const proof = await client.generateProof({
    coordination: "Agent A + Agent B"
  });

  await client.submitProof(proof);
}

main();
