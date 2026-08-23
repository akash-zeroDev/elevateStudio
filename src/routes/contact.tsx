import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/studio/Contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="pt-24 sm:pt-32 min-h-screen">
      <Contact />
    </div>
  );
}
