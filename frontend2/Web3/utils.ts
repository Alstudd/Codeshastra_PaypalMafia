import { ethers, BrowserProvider, Contract } from "ethers";
import { ABI } from "./ABI/ABI";


const getContractInstance = async () => {
	const provider = new BrowserProvider(window.ethereum);
	const signer = await provider.getSigner();
	const contractInstance = new Contract(
		"0xAF96988597c3Fca65b84d8f489D2742458753867",
		ABI,
		signer
	);
	return contractInstance;
};

export const buyCourse = async (courseFee, courseId) => {
	const feeString = courseFee.toString();
	const options = {
		value: ethers.parseEther(feeString),
	};
	const contractInstanceBuy = await getContractInstance();
	const tx = await contractInstanceBuy.buyCourse(courseId, options);
	return tx
};

export const createCourse = async (title, price) => {
	const feeString = ethers.parseEther(price.toString());
	
	const contractInstance = await getContractInstance();
	const tx = await contractInstance.createCourse(title, feeString);
	let id = await contractInstance.nextCourseId();
	id = Number(id)
	return id - 1;
};

export const getCoursesOfStudent = async () => {
	const courses = [];
	let tCourse;
	const contractInstance = await getContractInstance();
	let count = await contractInstance.getCountOfCourses();
	count = Number(count);
	for (let i = 0; i < count; i++) {
		tCourse = await contractInstance.getCourseOfStudent(i);
		courses.push(Number(tCourse));
	}
	return courses;
};
