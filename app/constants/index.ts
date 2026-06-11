import {
  Briefcase, BookOpen, GraduationCap, Users, Bot,
  Code, Megaphone, Monitor, TrendingUp, Handshake,
} from 'lucide-react';

// ─── Products ─────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  { id: 'pathyatech', name: 'PathyaTech', desc: 'Next-gen healthcare management and automation systems.', img: 'https://images.unsplash.com/photo-1559000357-f6b52ddfbe37?w=500&auto=format&fit=crop&q=60' },
  { id: 'trackintake', name: 'Trackintake', desc: 'Real-time logistics, asset, and fleet tracking intelligence.', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&auto=format&fit=crop&q=60' },
  { id: 'crm', name: 'CRM - Unified Customer Relationship Platform', desc: 'Seamless customer relationship management to scale sales.', img: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500&auto=format&fit=crop&q=60'},
  { id: 'ngo', name: 'NgoConnect - Non-Profit Management System', desc: 'All-in-one digital ecosystems for non-profit operations.', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=60' },
  { id: 'vendor', name: 'VendorSync - Vendor & Procurement Management', desc: 'Streamlined supply chain and vendor management portals.', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=60' },
  { id: 'lab', name: 'LabCore LIMS - Laboratory Information Management System', desc: 'Advanced laboratory information systems for precise diagnostics.', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60' },
  { id: 'doctor', name: 'MedConsult Live - Telehealth & Doctor Consultation Platform', desc: 'Telehealth and clinic appointment scheduler for modern doctors.', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=60' },
];

// ─── Blogs ────────────────────────────────────────────────────────────────────
export const BLOGS = [
  { id: 1, title: 'The Future of AI in Enterprise Solutions', excerpt: 'How predictive AI is changing the landscape of modern CRM tools...', date: 'June 12, 2026', content: `Artificial Intelligence is no longer just a luxury buzzword for tech giants.\n\n### Strategic Architecture Implementation\n1. Comprehensive Data Cleaning\n2. Model Fine-Tuning\n3. Live Feedback Telemetry Loops`, img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60' },
  { id: 2, title: 'Optimizing Logistics with Trackintrack', excerpt: 'Why real-time tracking is vital for modern supply-chain compliance...', date: 'May 28, 2026', content: `Trackintrack merges hardware precision with elegant analytical software.\n\n### Overcoming Modern Distribution Bottlenecks\nOur unified telemetry approach bridges this gap by introducing automated geofencing check-ins.`, img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60' },
  { id: 3, title: 'Why SAP Cloud Transformation is Crucial', excerpt: 'Migrating legacy frameworks to cloud instances safely...', date: 'May 14, 2026', content: `Legacy setups expose modern organizations to severe cybersecurity liabilities.\n\n### Seamless Migration Protocols\n* Detailed Pre-Migration Assessments\n* Phased Parallel Processing Paths`, img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60' },
  { id: 4, title: 'Revolutionizing Healthcare via Tech Modules', excerpt: 'Bridging the disconnect between patient consulting and laboratories...', date: 'April 30, 2026', content: `Medical workflows have historically suffered from siloed departments.\n\n### Elevating Operational Patient Care\n* Unified Electronic Records\n* Automated Lab Tracking`, img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60' },
  { id: 5, title: 'Building Impactful Apps for Non-Profits', excerpt: 'How tailored software architecture helps NGOs unlock global funding...', date: 'April 15, 2026', content: `NGOs operate under rigid compliance standards.\n\n### Foundational Portals for Global Outreach\n1. Automated Audit Trails\n2. Flexible Contribution Frameworks`, img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=60' },
  { id: 6, title: 'Mastering Python for Machine Learning', excerpt: 'A clear roadmap for engineering students entering AI careers...', date: 'March 02, 2026', content: `Starting your career path requires moving past mere syntax logic.\n\n### Key Pillars\n* Exploratory Analysis\n* Custom Network Tuning\n* Cost-Effective Cloud Deployments`, img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60' },
];

// ─── Events ───────────────────────────────────────────────────────────────────
export const EVENTS = [
  { id: 1, title: 'Global Tech & AI Summit 2026', date: 'July 15, 2026', time: '10:00 AM EST', location: 'Virtual / Zoom Live', desc: 'Dive deep into structural automated frameworks and next-gen Python AI developments.', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60' },
  { id: 2, title: 'SAP Enterprise Integration Workshop', date: 'August 03, 2026', time: '02:00 PM EST', location: 'Hybrid / Chicago Hub', desc: 'A rigorous hands-on technical masterclass covering multi-module SAP architecture migrations.', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=60' },
];

// ─── Jobs ─────────────────────────────────────────────────────────────────────
export const JOBS = [
  { title: 'Full Stack Web Developer Intern', dept: 'Engineering', type: 'Remote / Hybrid', desc: 'Assist in integrating robust Next.js layouts with fast enterprise API modules.' },
  { title: 'Backend Systems Engineer', dept: 'Cloud Infrastructure', type: 'Full-Time', desc: 'Build scalable business data layers, manage migrations, and secure telemetry hooks.' },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  { icon: Briefcase, title: 'SAP Consulting & Implementation Services', desc: 'Expert strategic advisory for enterprise landscape optimization.' },
  { icon: BookOpen, title: 'SAP VTO Solutions - Vendor Transition & Optimization', desc: 'Virtual technical orchestration for complex SAP environments.' },
  { icon: GraduationCap, title: 'Enterprise SAP Training Programs', desc: 'Comprehensive modules for mastering SAP architectures.' },
  { icon: Users, title: 'Tech Internship & Industry Readiness Program', desc: 'Hands-on industry exposure in live production environments.' },
  { icon: Bot, title: 'AI & Machine Learning with Python - Professional Certification', desc: 'Deep learning and automation training using Python.' },
  { icon: Code, title: 'AI Solutions & Custom Software Development', desc: 'Tailored AI-driven development for business process automation.' },
  { icon: Megaphone, title: 'Digital Marketing & Growth Services', desc: 'Data-driven outreach to scale your brand presence.' },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────
export const NAV_ITEMS = ['Home', 'Products', 'Services', 'Events', 'Blogs', 'Career', 'About Us'];

// ─── Career Perks ─────────────────────────────────────────────────────────────
export const CAREER_PERKS = [
  { Icon: Monitor, title: 'Modern Tech Stack', desc: 'Work directly with Next.js, specialized back-end pipelines, and microservices architectures.' },
  { Icon: TrendingUp, title: 'Accelerated Mentorship', desc: 'Collaborate under industry seniors and project leads to fast-track your engineering capabilities.' },
  { Icon: Handshake, title: 'Open Culture', desc: 'Ownership driven developer ecosystems where clean logic and design are highly recognized.' },
];

// ─── EmailJS Config ───────────────────────────────────────────────────────────
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_ug8mwjo',
  CONTACT_TEMPLATE_ID: 'template_4cpn5mi',
  APPLY_TEMPLATE_ID: 'template_9q7uivi',
  PUBLIC_KEY: 'vafZKtGQImtW-jPeV',
} as const;