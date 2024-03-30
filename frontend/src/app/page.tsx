// "use client";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { HeroParallaxDemo } from "../../components/HeroParallaxDemo";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";

export default async function Home() {
	// const { setTheme } = useTheme();
	// setTheme("dark");
  const session = await getAuthSession()
    if (session?.user) {
        return redirect("/dashboard")
    }
	return (
		<>
			<Navbar />
			<HeroParallaxDemo/>
		</>
	);
}
