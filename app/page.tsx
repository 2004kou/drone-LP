import Header from "./components/Header";
import Hero from "./components/Hero";
import DroneSoccer from "./components/DroneSoccer";
import WhyQuit from "./components/WhyQuit";
import WhyFreiheit from "./components/WhyFreiheit";
import ForParents from "./components/ForParents";
import Experience from "./components/Experience";
import Articles from "./components/Articles";
import Access from "./components/Access";
import Staff from "./components/Staff";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DroneSoccer />
        <WhyQuit />
        <WhyFreiheit />
        <ForParents />
        <Experience />
        <Articles />
        <Access />
        <Staff />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
