import { createFileRoute } from "@tanstack/react-router";
import { Philosophy } from "@/components/studio/Philosophy";
import { Process } from "@/components/studio/Process";
import { About } from "@/components/studio/About";
import { Faq } from "@/components/studio/Faq";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
});

function StudioPage() {
  return (
    <div className="pt-24 sm:pt-32">
      <Philosophy />
      <Process />
      <About />
      <Faq />
    </div>
  );
}
