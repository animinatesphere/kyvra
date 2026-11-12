// Field + column definitions for every generic admin section.
// type: text | textarea | number | money | select | date | color | checkbox | progress | email
export const statusColors = {
  Active: 'bg-lime/15 text-lime', Past: 'bg-white/10 text-white/60', Lead: 'bg-sky-400/15 text-sky-300',
  'In Progress': 'bg-sky-400/15 text-sky-300', Design: 'bg-violet-400/15 text-violet-300', Review: 'bg-amber-400/15 text-amber-300',
  Completed: 'bg-lime/15 text-lime', 'On Hold': 'bg-white/10 text-white/60',
  Paid: 'bg-lime/15 text-lime', Pending: 'bg-amber-400/15 text-amber-300', Overdue: 'bg-red-500/15 text-red-300', Draft: 'bg-white/10 text-white/60',
  Published: 'bg-lime/15 text-lime',
  New: 'bg-sky-400/15 text-sky-300', Contacted: 'bg-violet-400/15 text-violet-300', Proposal: 'bg-amber-400/15 text-amber-300', Won: 'bg-lime/15 text-lime', Lost: 'bg-red-500/15 text-red-300',
}

export const configs = {
  projects: {
    collection: 'projects', title: 'Projects', singular: 'Project', subtitle: 'Track every client project from kickoff to launch.',
    filterBy: 'status',
    fields: [
      { key: 'name', label: 'Project name', type: 'text', required: true, col: true },
      { key: 'client', label: 'Client', type: 'select', optionsFrom: 'clients', col: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Design', 'In Progress', 'Review', 'On Hold', 'Completed'], col: true },
      { key: 'progress', label: 'Progress', type: 'progress', col: true },
      { key: 'budget', label: 'Budget', type: 'money', col: true },
      { key: 'deadline', label: 'Deadline', type: 'date', col: true },
      { key: 'owner', label: 'Project lead', type: 'select', optionsFrom: 'team', optionKey: 'name' },
    ],
  },
  clients: {
    collection: 'clients', title: 'Clients', singular: 'Client', subtitle: 'Your client list and contact details.', filterBy: 'status',
    fields: [
      { key: 'name', label: 'Company', type: 'text', required: true, col: true },
      { key: 'contact', label: 'Contact person', type: 'text', col: true },
      { key: 'email', label: 'Email', type: 'email', col: true },
      { key: 'phone', label: 'Phone', type: 'text', col: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Lead', 'Active', 'Past'], col: true },
      { key: 'since', label: 'Client since', type: 'date' },
    ],
  },
  portfolio: {
    collection: 'portfolio', title: 'Portfolio', singular: 'Case study', subtitle: 'Projects shown on the Work page. “Featured” items appear on the homepage.', filterBy: 'category',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, col: true },
      { key: 'category', label: 'Category', type: 'text', col: true },
      { key: 'services', label: 'Services (comma separated)', type: 'text', col: true },
      { key: 'year', label: 'Year', type: 'number', col: true },
      { key: 'color', label: 'Card colour', type: 'color', col: true },
      { key: 'featured', label: 'Featured on homepage', type: 'checkbox', col: true },
      { key: 'url', label: 'Live URL', type: 'text' },
      { key: 'summary', label: 'Summary', type: 'textarea' },
    ],
  },
  services: {
    collection: 'services', title: 'Services', singular: 'Service', subtitle: 'Services listed on the website.',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, col: true },
      { key: 'tags', label: 'Tags (comma separated)', type: 'text', col: true },
      { key: 'price', label: 'Starting price', type: 'money', col: true },
      { key: 'active', label: 'Show on website', type: 'checkbox', col: true },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  team: {
    collection: 'team', title: 'Team', singular: 'Team member', subtitle: 'People shown on the About page.',
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true, col: true },
      { key: 'role', label: 'Role', type: 'text', col: true },
      { key: 'color', label: 'Card colour', type: 'color', col: true },
      { key: 'bio', label: 'Short bio', type: 'textarea', col: true },
    ],
  },
  testimonials: {
    collection: 'testimonials', title: 'Testimonials', singular: 'Testimonial', subtitle: 'Client reviews shown on the homepage.',
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true, col: true },
      { key: 'company', label: 'Company', type: 'text', col: true },
      { key: 'rating', label: 'Rating (1–5)', type: 'select', options: [5, 4, 3, 2, 1], col: true },
      { key: 'active', label: 'Show on website', type: 'checkbox', col: true },
      { key: 'quote', label: 'Quote', type: 'textarea', required: true },
    ],
  },
  posts: {
    collection: 'posts', title: 'Blog posts', singular: 'Post', subtitle: 'Articles for the Journal page. Only “Published” posts are visible.', filterBy: 'status',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, col: true },
      { key: 'category', label: 'Category', type: 'select', options: ['Design', 'Development', 'Growth', 'News'], col: true },
      { key: 'author', label: 'Author', type: 'select', optionsFrom: 'team', optionKey: 'name', col: true },
      { key: 'date', label: 'Date', type: 'date', col: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Published'], col: true },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
    ],
  },
  jobs: {
    collection: 'jobs', title: 'Careers', singular: 'Job', subtitle: 'Open roles shown under “Join our team”.',
    fields: [
      { key: 'title', label: 'Role', type: 'text', required: true, col: true },
      { key: 'type', label: 'Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship'], col: true },
      { key: 'location', label: 'Location', type: 'text', col: true },
      { key: 'open', label: 'Open', type: 'checkbox', col: true },
    ],
  },
}

export const invoiceConfig = {
  collection: 'invoices', title: 'Invoices', singular: 'Invoice', subtitle: 'Bill clients and track payments.', filterBy: 'status',
  fields: [
    { key: 'number', label: 'Invoice #', type: 'text', required: true, col: true },
    { key: 'client', label: 'Client', type: 'select', optionsFrom: 'clients', col: true },
    { key: 'amount', label: 'Amount', type: 'money', required: true, col: true },
    { key: 'issued', label: 'Issued', type: 'date', col: true },
    { key: 'due', label: 'Due', type: 'date', col: true },
    { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Pending', 'Paid', 'Overdue'], col: true },
  ],
}
