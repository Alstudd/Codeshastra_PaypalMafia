// "use client";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { HeroParallaxDemo } from "../../components/HeroParallaxDemo";
import { useTheme } from "next-themes";
import {
	AlchemyProvider,
	Contract,
	ethers,
	BrowserProvider,
	JsonRpcProvider,
} from "ethers";
import { ABI } from "../../components/abi";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import { useEffect } from "react";
// import getContractInstance from "../../components/ContractConnect";

async function getContractInstance() {
	const provider = new BrowserProvider(window.ethereum);

	const signer = await provider.getSigner();
	const contractInstance = new Contract(
		process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
		ABI,
		signer
	);

	return contractInstance;
}

export default function Home() {
	const verify = async () => {
		const options = { value: ethers.parseEther("0.0005") };
		const contractInstance = await getContractInstance();
		const tx = await contractInstance.getCourseOfStudent(0);
		console.log(tx);
	};

	verify();

	const { setTheme } = useTheme();
	setTheme("dark");
	return (
		<>
			<Navbar />
			<HeroParallaxDemo/>
		</>
	);
}
