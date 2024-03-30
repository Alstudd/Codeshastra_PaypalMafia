import { AlchemyProvider, Contract, ethers, BrowserProvider } from "ethers";
import { ABI } from "./abi";
// import ConnectKit from 'connectkit'

// const provider = new AlchemyProvider(
// 	"maticmum",
// 	process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
// );

// const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, provider);

const provider = new BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
console.log("Account:", await signer.getAddress());

export default function getContractInstance() {
	const contractInstance = new Contract(
		process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
		ABI,
		signer
	);

	return contractInstance;
}
