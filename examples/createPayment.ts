import { ethers } from "ethers";
import escrowAbi from "../artifacts/contracts/NusaPayEscrow.sol/NusaPayEscrow.json";

async function run() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC!);
  const wallet   = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const escrow = new ethers.Contract(
    process.env.ESCROW_ADDRESS!,
    escrowAbi.abi,
    wallet
  );

  const recipient = "0xRecipient...";
  const amount    = ethers.parseEther("0.05");

  const tx = await escrow.createPayment(recipient, amount);
  const rc = await tx.wait();
  console.log("Payment created:", rc?.hash);
}

run().catch(console.error);
