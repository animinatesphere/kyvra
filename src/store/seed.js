// Demo data. Everything here is editable from the admin panel and saved in the browser (localStorage).
const uid = () => Math.random().toString(36).slice(2, 10)
export { uid }

export const seed = {
  settings: {
    agencyName: 'Kyvra Studio',
    tagline: 'Brand. Build. Grow.',
    heroTitle: 'Your brand needs more than a website',
    heroSubtitle:
      'We are the creative crew that handles it all — strategy, identity, websites, apps, content and growth — so you can focus on the work you love.',
    email: 'hello@kyvra.studio',
    phone: '+44 20 0000 0000',
    address: 'Remote-first · London · Lagos',
    foundedYear: 2019,
    instagram: 'https://instagram.com/',
    twitter: 'https://x.com/',
    linkedin: 'https://linkedin.com/',
    dribbble: 'https://dribbble.com/',
    currency: '£',
  },

  services: [
    { id: uid(), title: 'Brand Identity', description: 'Naming, logo systems, visual language and brand guidelines that make you unforgettable.', tags: 'Logo, Strategy, Guidelines', price: 2500, active: true },
    { id: uid(), title: 'Web Design', description: 'Award-worthy UI and UX designed around your customers and the actions that grow your business.', tags: 'UI, UX, Prototyping', price: 3000, active: true },
    { id: uid(), title: 'Development', description: 'Fast, scalable websites and web apps built with React, Next.js and headless CMS.', tags: 'React, CMS, E-commerce', price: 5000, active: true },
    { id: uid(), title: 'Mobile Apps', description: 'Native-feeling iOS and Android apps from a single React Native codebase.', tags: 'iOS, Android, React Native', price: 8000, active: true },
    { id: uid(), title: 'Growth & SEO', description: 'Search, social and performance marketing that turns visitors into paying customers.', tags: 'SEO, Ads, Analytics', price: 1200, active: true },
    { id: uid(), title: 'Care & Management', description: 'Hosting, content updates, security and support — we keep everything running.', tags: 'Hosting, Updates, Support', price: 300, active: true },
  ],

  portfolio: [
    { id: uid(), title: 'Nightfall Records', category: 'Music Label', services: 'Branding, Website', year: 2026, color: '#ff5b2e', featured: true, url: '', summary: 'A dark, cinematic identity and streaming-first site for an independent label.' },
    { id: uid(), title: 'Orbit Fitness', category: 'Health & Fitness', services: 'App, UI/UX', year: 2026, color: '#3d8bff', featured: true, url: '', summary: 'Class booking app with live leaderboards and subscriptions.' },
    { id: uid(), title: 'Maison Verde', category: 'Hospitality', services: 'Website, SEO', year: 2025, color: '#2fbf71', featured: true, url: '', summary: 'Reservation-led website that doubled direct bookings.' },
    { id: uid(), title: 'Pulse Esports', category: 'Gaming', services: 'Branding, Development', year: 2025, color: '#b45cff', featured: true, url: '', summary: 'Tournament platform with team pages and live brackets.' },
    { id: uid(), title: 'Atlas Capital', category: 'Finance', services: 'Web Design, CMS', year: 2025, color: '#e8c547', featured: false, url: '', summary: 'A calm, trustworthy web presence for a boutique fund.' },
    { id: uid(), title: 'Lumen Skincare', category: 'Beauty', services: 'E-commerce, Growth', year: 2024, color: '#ff8fb1', featured: false, url: '', summary: 'Shopify headless store with a 40% faster checkout.' },
  ],

  team: [
    { id: uid(), name: 'Ada Okafor', role: 'Founder & Creative Director', bio: 'Leads strategy and creative across every project.', color: '#c8ff3d' },
    { id: uid(), name: 'James Whitfield', role: 'Lead Developer', bio: 'Turns ambitious designs into fast, reliable products.', color: '#ff5b2e' },
    { id: uid(), name: 'Sofia Marin', role: 'Head of Design', bio: 'Obsessed with typography, motion and the details.', color: '#3d8bff' },
    { id: uid(), name: 'Tunde Bello', role: 'Growth Lead', bio: 'Makes sure the work gets seen and pays off.', color: '#b45cff' },
  ],

  testimonials: [
    { id: uid(), name: 'Rachel Kim', company: 'Orbit Fitness', quote: 'They felt like part of our team from day one. The app launched on time and our members love it.', rating: 5, active: true },
    { id: uid(), name: 'Marcus Doyle', company: 'Nightfall Records', quote: 'Our new brand finally matches the music. Streams and merch sales jumped after launch.', rating: 5, active: true },
    { id: uid(), name: 'Elena Rossi', company: 'Maison Verde', quote: 'Direct bookings doubled in three months. Best investment we made this year.', rating: 5, active: true },
  ],

  clients: [
    { id: uid(), name: 'Orbit Fitness', contact: 'Rachel Kim', email: 'rachel@orbit.example', phone: '+44 7700 900001', status: 'Active', since: '2025-03-10' },
    { id: uid(), name: 'Nightfall Records', contact: 'Marcus Doyle', email: 'marcus@nightfall.example', phone: '+44 7700 900002', status: 'Active', since: '2025-07-01' },
    { id: uid(), name: 'Maison Verde', contact: 'Elena Rossi', email: 'elena@maisonverde.example', phone: '+44 7700 900003', status: 'Active', since: '2024-11-21' },
    { id: uid(), name: 'Atlas Capital', contact: 'Daniel Shaw', email: 'daniel@atlas.example', phone: '+44 7700 900004', status: 'Past', since: '2024-02-14' },
  ],

  projects: [
    { id: uid(), name: 'Orbit App v2', client: 'Orbit Fitness', status: 'In Progress', progress: 65, budget: 18000, deadline: '2026-12-20', owner: 'James Whitfield' },
    { id: uid(), name: 'Nightfall Merch Store', client: 'Nightfall Records', status: 'Design', progress: 30, budget: 9500, deadline: '2027-01-15', owner: 'Sofia Marin' },
    { id: uid(), name: 'Maison Verde SEO Retainer', client: 'Maison Verde', status: 'In Progress', progress: 80, budget: 3600, deadline: '2026-11-30', owner: 'Tunde Bello' },
    { id: uid(), name: 'Pulse Brand Refresh', client: 'Pulse Esports', status: 'Review', progress: 90, budget: 7000, deadline: '2026-11-25', owner: 'Ada Okafor' },
    { id: uid(), name: 'Atlas Website', client: 'Atlas Capital', status: 'Completed', progress: 100, budget: 12000, deadline: '2026-06-30', owner: 'James Whitfield' },
  ],

  leads: [
    { id: uid(), name: 'Grace Adeyemi', email: 'grace@bloom.example', company: 'Bloom Bakery', service: 'Web Design', budget: '£3k – £5k', message: 'We need a new site with online ordering.', status: 'New', date: '2026-11-10' },
    { id: uid(), name: 'Tom Harris', email: 'tom@ridge.example', company: 'Ridge Outdoors', service: 'Development', budget: '£10k+', message: 'Looking for a headless e-commerce rebuild.', status: 'Contacted', date: '2026-11-06' },
    { id: uid(), name: 'Nina Patel', email: 'nina@solace.example', company: 'Solace Clinic', service: 'Brand Identity', budget: '£5k – £10k', message: 'Rebrand ahead of opening a second location.', status: 'Proposal', date: '2026-11-02' },
    { id: uid(), name: 'Leo Martins', email: 'leo@kite.example', company: 'Kite Labs', service: 'Mobile Apps', budget: '£10k+', message: 'MVP for a fintech app.', status: 'Won', date: '2026-10-22' },
  ],

  invoices: [
    { id: uid(), number: 'INV-1042', client: 'Orbit Fitness', amount: 6000, issued: '2026-10-01', due: '2026-10-31', status: 'Paid' },
    { id: uid(), number: 'INV-1043', client: 'Nightfall Records', amount: 3200, issued: '2026-10-15', due: '2026-11-14', status: 'Pending' },
    { id: uid(), number: 'INV-1044', client: 'Maison Verde', amount: 1200, issued: '2026-11-01', due: '2026-11-30', status: 'Pending' },
    { id: uid(), number: 'INV-1039', client: 'Pulse Esports', amount: 3500, issued: '2026-09-10', due: '2026-10-10', status: 'Overdue' },
  ],

  posts: [
    { id: uid(), title: 'Why your brand needs motion in 2027', category: 'Design', author: 'Sofia Marin', date: '2026-11-05', status: 'Published', excerpt: 'Motion is no longer decoration — it is how modern brands explain themselves.' },
    { id: uid(), title: 'Headless commerce, explained simply', category: 'Development', author: 'James Whitfield', date: '2026-10-20', status: 'Published', excerpt: 'What “headless” actually means and when it is worth it for your store.' },
    { id: uid(), title: 'Local SEO checklist for small businesses', category: 'Growth', author: 'Tunde Bello', date: '2026-10-02', status: 'Draft', excerpt: 'Twelve steps to show up when customers search near you.' },
  ],

  jobs: [
    { id: uid(), title: 'Senior Frontend Engineer', type: 'Full-time', location: 'Remote', open: true },
    { id: uid(), title: 'Motion Designer', type: 'Contract', location: 'London / Remote', open: true },
  ],

  revenue: [
    { month: 'Jun', value: 14200 }, { month: 'Jul', value: 16800 }, { month: 'Aug', value: 15100 },
    { month: 'Sep', value: 19400 }, { month: 'Oct', value: 22600 }, { month: 'Nov', value: 18900 },
  ],
}
