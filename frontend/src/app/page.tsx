import Image from "next/image";
import Navbar from "../../components/Navbar";
import { HeroParallaxDemo } from "../../components/HeroParallaxDemo";
import CreateCourse from "../../components/CreateCourse";

export default function Home() {
  return (
    <>
    <Navbar/>
    {/* <HeroParallaxDemo/> */}
    <CreateCourse/>
    </>
  );
}
