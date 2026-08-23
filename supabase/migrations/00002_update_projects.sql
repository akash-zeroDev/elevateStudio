-- Update Project 1: Aura Analytics (SaaS)
UPDATE public.portfolio_projects
SET 
  name = 'Aura Analytics',
  category = 'SaaS / Data Visualization',
  description = 'A premium analytics dashboard designed for enterprise data teams. We stripped away the visual clutter, introduced a glassmorphism dark mode, and built custom data visualizations that feel alive.',
  services = ARRAY['UI/UX Design', 'Design System', 'Frontend Architecture'],
  image = 'project-1.png'
WHERE index = '01';

-- Update Project 2: Maison Aurelia (E-Commerce)
UPDATE public.portfolio_projects
SET 
  name = 'Maison Aurelia',
  category = 'Fashion / E-Commerce',
  description = 'A digital flagship for a luxury made-to-order label. Quiet, elegant typography paired with full-bleed editorial photography. The checkout experience was optimized to feel as sophisticated as the garments themselves.',
  services = ARRAY['Brand Identity', 'Art Direction', 'Web Design', 'Development'],
  image = 'project-2.png'
WHERE index = '02';

-- Update Project 3: Astra Bank (Fintech)
UPDATE public.portfolio_projects
SET 
  name = 'Astra Bank',
  category = 'Fintech / Mobile App',
  description = 'A complete overhaul of a modern banking application. We designed a dark-themed interface with vibrant green accents that makes checking transaction histories and spending graphs an absolute joy.',
  services = ARRAY['Mobile Design', 'Prototyping', 'User Research'],
  image = 'project-3.png'
WHERE index = '03';

-- Update Project 4: NØRDIS (Branding)
UPDATE public.portfolio_projects
SET 
  name = 'NØRDIS',
  category = 'Branding / Identity',
  description = 'A comprehensive brand identity for a high-end minimalist homeware brand. We delivered a sharp sans-serif logo and applied it across matte black packaging, business cards, and digital touchpoints.',
  services = ARRAY['Visual Identity', 'Packaging', 'Typography'],
  image = 'project-4.png'
WHERE index = '04';
