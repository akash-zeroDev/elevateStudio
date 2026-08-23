import { z } from "zod";

const budgetOptions = ["$5k – $15k", "$15k – $40k", "$40k – $100k", "$100k+", "Not sure"];
const timelineOptions = ["ASAP", "1 – 2 months", "3 – 6 months", "Flexible"];
const serviceOptions = [
  "Web applications",
  "Websites",
  "Mobile apps",
  "Design systems",
  "Brand identity",
  "Prototyping",
  "Strategy",
];

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  company: z.string().trim().max(100, "Company must be under 100 characters").optional().or(z.literal("")),
  services: z.array(z.string()).max(10, "Too many services selected").default([]),
  budget: z.enum(budgetOptions as [string, ...string[]]).optional().or(z.literal("")),
  timeline: z.enum(timelineOptions as [string, ...string[]]).optional().or(z.literal("")),
  message: z.string().trim().min(20, "Please tell us a bit more about the project").max(2000, "Message must be under 2000 characters"),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryOutput = z.infer<typeof inquirySchema>;

export const submitInquiry = async ({ data }: { data: InquiryOutput }) => {
  const parsedData = inquirySchema.parse(data);
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { error } = await supabaseAdmin.from("project_inquiries").insert({
    name: parsedData.name,
    email: parsedData.email,
    company: parsedData.company || null,
    services: parsedData.services,
    budget: parsedData.budget || null,
    timeline: parsedData.timeline || null,
    message: parsedData.message,
  });

  if (error) {
    console.error("Inquiry insert failed:", error);
    throw new Error("We couldn't save your inquiry. Please try again.");
  }

  return { ok: true };
};

export { budgetOptions, timelineOptions, serviceOptions };
