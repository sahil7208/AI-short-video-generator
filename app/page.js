import Image from "next/image";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

export default function Home() {
  return (
   <div className="md:px-16 lg:px-24 xl:px-36">
    <Header/>
    <Hero/>
   </div>
  );
}
