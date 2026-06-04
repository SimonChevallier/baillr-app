import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";
import ScrollRevealInit from "./components/ScrollRevealInit";

export default function Home() {
  return (
    <>
      <ScrollRevealInit />
      <Nav />
      <Hero />
      <div className="w-full h-px bg-[#E5E5E3]" />
      <Problem />
      <Solution />
      <HowItWorks />
      <Waitlist />
      <Footer />
    </>
  );
}
