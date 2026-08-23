-- Update Project 1: Studio Nørd (Architecture)
UPDATE public.portfolio_projects
SET 
  name = 'Studio Nørd',
  category = 'Architecture / Web Design',
  description = 'Architecture of quiet permanence. A boutique practice of fourteen. We design private residences and considered commercial interiors, from site survey to the final detail.',
  services = ARRAY['Web Design', 'Art Direction', 'Photography']
WHERE index = '01';

-- Update Project 2: Maison Aurelia (Fashion)
UPDATE public.portfolio_projects
SET 
  name = 'Maison Aurelia',
  category = 'Fashion / E-Commerce',
  description = 'Elegance in structure. The FW24 collection. Exquisite tailoring for the modern silhouette.',
  services = ARRAY['Brand Identity', 'Art Direction', 'E-commerce']
WHERE index = '02';

-- Update Project 3: Aura Analytics (SaaS)
UPDATE public.portfolio_projects
SET 
  name = 'Aura Analytics',
  category = 'SaaS / Data',
  description = 'Revenue Intelligence. The numbers your board asks for, before they ask. Aura reads your orders, subscriptions and warehouse data, reconciles them nightly, and reports revenue.',
  services = ARRAY['UI/UX Design', 'Dashboard', 'Frontend Architecture']
WHERE index = '03';

-- Update Project 4: Cafe Name (Hospitality)
UPDATE public.portfolio_projects
SET 
  name = 'Cafe Name',
  category = 'Hospitality / Franchise',
  description = 'India''s Most Affordable Cafe Franchise. Join 1181+ franchisees across 27 states. Zero royalty, chef-less model, and a proven system that delivers results in 10-12 months.',
  services = ARRAY['Web Development', 'Franchise Portal', 'Lead Generation']
WHERE index = '04';
