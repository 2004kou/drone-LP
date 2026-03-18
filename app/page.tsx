import Header from "./components/Header";
import Hero from "./components/Hero";
import DroneSoccer from "./components/DroneSoccer";
import WhyQuit from "./components/WhyQuit";
import WhyFreiheit from "./components/WhyFreiheit";
import ForParents from "./components/ForParents";
import Experience from "./components/Experience";
import ArticleList from "./components/article/ArticleList"
import Access from "./components/Access";
import Staff from "./components/Staff";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default async function Home() {
   const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/post`,{
        cache: "no-store",
      })
      const { posts: articles } = await response.json();
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
        <ArticleList articles={articles} />
        <Access />
        <Staff />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
