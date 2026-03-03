import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

app.post("/generate-proof", (req, res) => {
  const { data } = req.body;

  // Mock ZK proof (hash-based simulation)
  const proof = crypto
    .createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");

  res.json({
    proof,
    status: "generated"
  });
});

app.listen(4000, () => {
  console.log("ZK Service running on port 4000");
});
