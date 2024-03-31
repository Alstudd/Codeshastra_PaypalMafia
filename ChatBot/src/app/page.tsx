import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/notes");

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="FlowBrain logo" width={200} height={150} />
        {/* <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          FlowBrain
        </span> */}
      </div>
      <p className="max-w-prose text-center">
        Welcome to LearnBlocks <br /> I am an AI bot to help in learning .
      </p>
      <Button size="lg" asChild>
        <Link href="/notes">Open</Link>
      </Button>
    </main>
  );
}
