import { ethers, BrowserProvider, Contract } from "ethers";
import { ABI } from "./ABI/ABI";
declare var window: any;
const contractInstance = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contractInstance = new Contract(
    "0xAF96988597c3Fca65b84d8f489D2742458753867",
    ABI,
    signer
  );
  return contractInstance;
};
const buyCourse = async (courseFee, courseId) => {
  const feeString = courseFee.toString();
  const options = {
    value: ethers.parseEther(feeString),
  };
  const contractInstanceBuy = await contractInstance();
  const tx = await contractInstanceBuy.buyCourse(courseId, options);
};
