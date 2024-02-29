import Link from "next/link";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import Contact from "../components/layout/Contact";
import AboutUs from "../components/layout/AboutUs";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <HomeMenu />
      <Contact />
    </>
  );
}
