import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const tokenAddress = process.env.NUSA_TOKEN!; // set in CI or .env
  if (!tokenAddress) throw new Error("NUSA_TOKEN not set");

  const minTx   = ethers.parseEther("0.001");
  const lock    = 60;            // 60s
  const grace   = 7 * 24 * 3600; // 7 days

  const Escrow = await ethers.getContractFactory("NusaPayEscrow");
  const escrow = await Escrow.deploy(tokenAddress, minTx, lock, grace);
  await escrow.waitForDeployment();

  console.log("Escrow deployed to:", await escrow.getAddress());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
