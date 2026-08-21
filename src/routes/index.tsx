import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/studio/Navbar";
import { Hero } from "@/components/studio/Hero";
import { Work } from "@/components/studio/Work";
import { Services } from "@/components/studio/Services";
import { Philosophy } from "@/components/studio/Philosophy";
import { Process } from "@/components/studio/Process";
import { About } from "@/components/studio/About";
import { Testimonials } from "@/components/studio/Testimonials";
import { Faq } from "@/components/studio/Faq";
import { Contact } from "@/components/studio/Contact";
import { Footer } from "@/components/studio/Footer";
import { Cursor } from "@/components/studio/Cursor";

const title = "Elevate Studio — Independent Digital Design & Build Studio";
const description =
  "A small independent studio in Delhi designing and building websites, digital products and brand systems for founders, creators and teams.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-900/15 blur-[120px] mix-blend-screen" />
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-emerald-900/10 blur-[120px] mix-blend-screen" />
      <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full bg-purple-900/15 blur-[120px] mix-blend-screen" />
    </div>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen bg-background md:cursor-none z-0">
      <AmbientBackground />
      <Cursor />
      <div className="relative z-10">
        <Navbar />
        <main>
        <Hero />
        <Work />
        <Services />
        <Philosophy />
        <Process />
        <About />
        <Testimonials />
        <Faq />
        <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
