"use client";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { HeroParallaxDemo } from "../../components/HeroParallaxDemo";
import CreateCourse from "../../components/CreateCourse";
import { useTheme } from "next-themes";

export default function Home() {
	const { setTheme } = useTheme();
	setTheme("dark");
	return (
		<>
			<Navbar />
			{/* <HeroParallaxDemo/> */}
			<CreateCourse />
		</>
	);
}
