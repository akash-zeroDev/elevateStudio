import { createFileRoute } from "@tanstack/react-router";
import { Work } from "@/components/studio/Work";

export const Route = createFileRoute("/work")({
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="pt-24 sm:pt-32">
      <Work />
    </div>
  );
}
