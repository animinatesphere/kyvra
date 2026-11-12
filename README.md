# Kyvra Studio — Agency Website + Admin

A full digital-agency website with an animated landing page and a complete admin dashboard.

**Stack:** React 18 · Vite · Tailwind CSS · Framer Motion · GSAP (ScrollTrigger) · React Router · lucide-react

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
```

## Admin

- URL: `/admin` (there's also a link in the footer)
- Demo login: **admin@kyvra.studio** / **admin123** (change it in `src/store/Store.jsx`)

## Public site

| Page | What's on it |
|---|---|
| `/` Home | GSAP preloader, split-text hero, parallax blobs, logo marquee, scroll-scrubbed intro text, featured work, **pinned horizontal services scroll**, animated counters, process, testimonial slider, CTA |
| `/about` | Story, values, team ("roster"), open roles |
| `/work` | Portfolio with animated category filter |
| `/services` | Animated accordion with starting prices |
| `/blog` | Published posts |
| `/contact` | Enquiry form. Each submission shows up as a lead in Admin → Leads |

There's also a custom cursor, magnetic buttons, a hide-on-scroll navbar and a full-screen mobile menu.

## Admin features

- **Dashboard:** revenue, active projects, new leads, clients, a revenue chart, the lead pipeline, recent projects and enquiries
- **Leads:** drag-and-drop pipeline board (New → Contacted → Proposal → Won/Lost), list view, reply by email, convert to client, CSV export
- **Clients:** a simple CRM
- **Projects:** status, progress slider, budget, deadline, project lead
- **Invoices:** totals, mark as paid, print / save as PDF
- **Portfolio, Services, Team, Testimonials, Blog, Careers:** add, edit and delete. Changes show on the public site straight away
- **Settings:** agency name, hero text, contact details, socials, currency. You can also back up, restore or reset all data

Every table has search, filters, CSV export and add/edit/delete forms with confirm dialogs.

## Before going live

The data lives in the browser (`localStorage`), so it's a fully working demo/prototype. For production:
1. Swap `src/store/Store.jsx` for real API calls (Supabase, Firebase, or your Node/Express + MongoDB backend).
2. Replace the demo login with real authentication.
3. Send contact-form submissions to your backend or an email service.
4. Replace the gradient placeholders with real project images.

## Structure

```
src/
  store/        seed data + global store (localStorage)
  components/site/  Navbar, Footer, Preloader, Cursor, Marquee, Magnetic, Reveal (GSAP helpers), ProjectCard
  pages/site/   Home, About, Work, Services, Blog, Contact
  admin/        AdminLayout, Login, Dashboard, Leads, Invoices, Settings, CrudPage (generic), configs.js
```

To add a new admin section, add an entry to `src/admin/configs.js`, a seed array in `src/store/seed.js` and a link in `AdminLayout.jsx`.
