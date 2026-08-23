import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/studio/Hero";
import { Work } from "@/components/studio/Work";
import { Services } from "@/components/studio/Services";
import { Testimonials } from "@/components/studio/Testimonials";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Testimonials />
    </>
  );
}
