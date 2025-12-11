import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Model from "@/components/Model";

export default function Home() {
  return (
    <div className="bg-[url('/img/ttm.jpeg')] bg-cover bg-center bg-fixed">
      <div className="fixed inset-0 z-50 pointer-events-none">
        <img src="noise.png" alt="noise" className="opacity-5 size-full" />
      </div>
      <Model />
      <Hero />
      <main className="bg-black/90">
        <Main />
      </main>
      <Footer />
    </div>
  );
}
