import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
// Change this to the email address you want to receive notifications at
const NOTIFICATION_EMAIL = "akashkumar7653099@gmail.com"; 

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // The payload from the frontend client
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response("No record found in payload", { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return new Response("Server configuration error", { 
        status: 500,
        headers: corsHeaders
      });
    }

    // Call the Resend API to send the email
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // Resend provides this test email domain for free
        from: "Elevate Studio <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject: `🔥 New Project Inquiry: ${record.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="color: #111;">New Project Inquiry</h2>
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
            <p><strong>Name:</strong> ${record.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${record.email}">${record.email}</a></p>
            <p><strong>Company:</strong> ${record.company || "N/A"}</p>
            <p><strong>Services:</strong> ${record.services?.join(", ") || "None selected"}</p>
            <p><strong>Budget:</strong> ${record.budget || "N/A"}</p>
            <p><strong>Timeline:</strong> ${record.timeline || "N/A"}</p>
            <h3 style="margin-top: 30px;">Project Details</h3>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #333; line-height: 1.6;">
              ${record.message}
            </div>
          </div>
        `,
      }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error("Resend API Error:", data);
      return new Response(JSON.stringify({ error: data }), { 
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
})
