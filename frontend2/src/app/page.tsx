import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import CreateCourse from "./_components/CreateCourse";
import { HeroParallaxDemo } from "./_components/HeroParallaxDemo";
import Navbar from "./_components/Navbar";
import { CanvasRevealEffectDemo } from "./_components/CanvasRealEffectDemo";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <>
    <Navbar/>
    <HeroParallaxDemo />
    <CanvasRevealEffectDemo/>
    </>
  );
}
