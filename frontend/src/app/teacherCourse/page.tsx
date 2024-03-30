import Image from "next/image";
import Navbar from "../../components/Navbar";
import CreateCourse from "../../../components/CreateCourse";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";

export default async function Home() {
    const session = await getAuthSession()
    if (!session?.user || session?.user.role !== "teacher") {
        return redirect("/")
    }
	return (
		<div className="mt-20">
			<Navbar />
			<CreateCourse />
		</div>
	);
}
