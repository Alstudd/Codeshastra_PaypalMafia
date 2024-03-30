import contractABI from "../artStore/artifacts/contracts/Carbo.sol/Carbo.json";
import { AlchemyProvider, Contract, ethers, BrowserProvider } from "ethers";

const provider = new AlchemyProvider(
	"maticmum",
	process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
);

const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, provider);

// const provider = new BrowserProvider(window.ethereum);
// const signer = await provider.getSigner();
// console.log("Account:", await signer.getAddress());

export const contractInstance = new Contract(
	process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
	contractABI.abi,
	signer
);
