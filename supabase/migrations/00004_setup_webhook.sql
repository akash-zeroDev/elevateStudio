-- This script creates a Database Webhook Trigger automatically!
-- It tells Supabase to fire your Edge Function whenever someone submits the contact form.

-- 1. Drop the trigger if it already exists (just in case you run this twice)
DROP TRIGGER IF EXISTS notify_inquiry_trigger ON public.project_inquiries;

-- 2. Create the webhook trigger to call your Edge Function
CREATE TRIGGER notify_inquiry_trigger
  AFTER INSERT ON public.project_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION supabase_functions.http_request(
    'https://qtyochqhzizivrutrqjr.supabase.co/functions/v1/notify_inquiry',
    'POST',
    '{"Content-type":"application/json"}',
    '{}',
    '5000'
  );
