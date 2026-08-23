import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-12 uppercase tracking-tight">
        Privacy Policy
      </h1>
      
      <div className="space-y-12 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl md:text-2xl text-foreground font-display font-medium uppercase tracking-tight mb-4">
            1. Information We Collect
          </h2>
          <p>
            We only collect information that you choose to share with us, such as your name, email address, and project details when you submit a project inquiry through our contact form. This information is strictly used for evaluating your request and initiating communication regarding your potential project.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl md:text-2xl text-foreground font-display font-medium uppercase tracking-tight mb-4">
            2. How We Use Your Information
          </h2>
          <p>
            The information we collect is used solely to evaluate your project inquiry, reply to your messages, and communicate with you effectively. We do not sell, rent, or share your personal information with any third parties for marketing or advertising purposes.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl md:text-2xl text-foreground font-display font-medium uppercase tracking-tight mb-4">
            3. Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our databases and communications are secured using industry-standard protocols, including encryption in transit and at rest via our infrastructure partners.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl md:text-2xl text-foreground font-display font-medium uppercase tracking-tight mb-4">
            4. Contact Us
          </h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us via our contact form or at the email address provided in the footer of this website.
          </p>
        </section>
      </div>
    </div>
  );
}
