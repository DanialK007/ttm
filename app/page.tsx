import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="bg-[url('/img/ttm.jpeg')] bg-cover bg-center bg-fixed">
      <div className="fixed inset-0 z-50 pointer-events-none">
        <img
          src="noise.png"
          alt="noise"
          className="opacity-5 size-full"
        />
      </div>
      <Hero />
      <Main />
      <Footer />
    </div>
  );
}
