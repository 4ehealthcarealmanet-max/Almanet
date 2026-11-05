import {
  Briefcase, BookOpen, GraduationCap, Users, Bot,
  Code, Megaphone, Monitor, TrendingUp, Handshake,
} from 'lucide-react';

// ─── Products ─────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: 'pathyatech',
    name: 'PathyaTech',
    category: 'Healthcare',
    desc: 'Unified EMR, billing, and patient lifecycle management built for multi-specialty hospitals and clinics.',
    img: 'https://images.unsplash.com/photo-1559000357-f6b52ddfbe37?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'trackintake',
    name: 'Trackintake',
    category: 'Nutrition',           // ← changed from 'Logistics'
desc: 'Clinical-grade nutrition tracking with real-time macro analytics and personalised dietary intelligence.',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'crm',
    name: 'CRM - Unified Customer Relationship Platform',
    category: 'CRM & Sales',
desc: 'Unified pipeline, multi-channel support, and revenue forecasting built for high-growth sales teams.',
    img: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'ngo',
    name: 'NgoConnect - Non-Profit Management System',
    category: 'Non-Profit',
desc: 'Donor CRM, grant tracking, and volunteer management built for audit-ready non-profit operations.',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'vendor',
    name: 'VendorSync - Vendor & Procurement Management',
    category: 'Supply Chain',
desc: 'Automated procurement workflows, vendor scorecards, and spend analytics for enterprise supply chains.',
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'lab',
    name: 'LabCore LIMS - Laboratory Information Management System',
    category: 'Lab Tech',
desc: 'Instrument-integrated lab information management for fully traceable, regulation-ready diagnostics.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'medconsult-live',
    name: 'MedConsult Live - Telehealth & Doctor Consultation Platform',
    category: 'Telehealth',
desc: 'HD video consultations, smart scheduling, and digital prescriptions for compliant virtual care delivery.',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=60',
  },
];

// ─── Blogs ────────────────────────────────────────────────────────────────────
// ─── Blogs Data — topic-matched images ────────────────────────────────────────

export const BLOGS = [
  {
    id: 1,
    title: 'The Future of AI in Enterprise Solutions',
    excerpt: 'How predictive AI is changing the landscape of modern CRM tools...',
    date: 'June 12, 2026',
    tag: 'Artificial Intelligence',
    content: `Artificial Intelligence is no longer just a luxury buzzword for tech giants.\n\n### Strategic Architecture Implementation\n1. Comprehensive Data Cleaning\n2. Model Fine-Tuning\n3. Live Feedback Telemetry Loops`,
    // Neural network / AI visualization
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Smart Nutrition Tracking with Trackintrack',
    excerpt: 'How Trackintrack helps users monitor diet, macros, and wellness goals with intelligent automation...',
    date: 'May 28, 2026',
    tag: 'Nutrition & Wellness',
    content: `Trackintrack merges smart nutrition intelligence with elegant analytical software.\n\n### Overcoming Modern Dietary Challenges\nOur unified nutrition telemetry approach bridges the gap between food logging and actionable health insights.`,
    // Healthy food / nutrition tracking — bowls, macros, wellness
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Why SAP Cloud Transformation is Crucial',
    excerpt: 'Migrating legacy frameworks to cloud instances safely...',
    date: 'May 14, 2026',
    tag: 'Cloud & SAP',
    content: `Legacy setups expose modern organizations to severe cybersecurity liabilities.\n\n### Seamless Migration Protocols\n* Detailed Pre-Migration Assessments\n* Phased Parallel Processing Paths`,
    // Server room / cloud infrastructure
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Revolutionizing Healthcare via Tech Modules',
    excerpt: 'Bridging the disconnect between patient consulting and laboratories...',
    date: 'April 30, 2026',
    tag: 'HealthTech',
    content: `Medical workflows have historically suffered from siloed departments.\n\n### Elevating Operational Patient Care\n* Unified Electronic Records\n* Automated Lab Tracking`,
    // Medical technology / hospital digital interface
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Building Impactful Apps for Non-Profits',
    excerpt: 'How tailored software architecture helps NGOs unlock global funding...',
    date: 'April 15, 2026',
    tag: 'Social Impact',
    content: `NGOs operate under rigid compliance standards.\n\n### Foundational Portals for Global Outreach\n1. Automated Audit Trails\n2. Flexible Contribution Frameworks`,
    // Community / people collaboration — NGO feel
    img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'Mastering Python for Machine Learning',
    excerpt: 'A clear roadmap for engineering students entering AI careers...',
    date: 'March 02, 2026',
    tag: 'Engineering',
    content: `Starting your career path requires moving past mere syntax logic.\n\n### Key Pillars\n* Exploratory Analysis\n* Custom Network Tuning\n* Cost-Effective Cloud Deployments`,
    // Code on screen — Python/ML dev environment
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
  },
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
  {
    icon: Briefcase,
    title: 'SAP Consulting & Implementation Services',
    desc: 'Expert strategic advisory for enterprise landscape optimization.',
    color: { bg: '#E6F1FB', icon: '#185FA5', tag: 'SAP' },
  },
  {
    icon: BookOpen,
    title: 'SAP VTO Solutions - Vendor Transition & Optimization',
    desc: 'Virtual technical orchestration for complex SAP environments.',
    color: { bg: '#EEEDFE', icon: '#534AB7', tag: 'SAP' },
  },
  {
    icon: GraduationCap,
    title: 'Enterprise SAP Training Programs',
    desc: 'Comprehensive modules for mastering SAP architectures.',
    color: { bg: '#EAF3DE', icon: '#3B6D11', tag: 'Training' },
  },
  {
    icon: Users,
    title: 'Tech Internship & Industry Readiness Program',
    desc: 'Hands-on industry exposure in live production environments.',
    color: { bg: '#E1F5EE', icon: '#0F6E56', tag: 'Internship' },
  },
  {
    icon: Bot,
    title: 'AI & Machine Learning with Python - Professional Certification',
    desc: 'Deep learning and automation training using Python.',
    color: { bg: '#FAEEDA', icon: '#854F0B', tag: 'AI / ML' },
  },
  {
    icon: Code,
    title: 'AI Solutions & Custom Software Development',
    desc: 'Tailored AI-driven development for business process automation.',
    color: { bg: '#FAECE7', icon: '#993C1D', tag: 'Development' },
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing & Growth Services',
    desc: 'Data-driven outreach to scale your brand presence.',
    color: { bg: '#FBEAF0', icon: '#993556', tag: 'Marketing' },
  },
]

// ─── Training Programs ────────────────────────────────────────────────────────
export const TRAINING_COURSES = [
  {
    id: 'sap-abap-cloud',
    title: 'SAP ABAP on Cloud',
    tag: 'Cloud Architecture & RAP',
    level: 'Professional & Upskilling',
    duration: '8 Weeks · Live Interactive',
    schedule: 'Weekend & Weekday Batches Available',
    shortDesc: 'Master modern cloud-ready ABAP development, RESTful Application Programming Model (RAP), ABAP Core Data Services (CDS), and Clean Core extensions for SAP BTP and S/4HANA Cloud.',
    color: {
      accent: '#2563EB',
      light: '#EFF6FF',
      badgeBg: '#DBEAFE',
      badgeText: '#1D4ED8',
      border: '#BFDBFE',
    },
    stats: [
      { label: 'Practical Labs', value: '100% Hands-On' },
      { label: 'Architecture', value: 'RAP & Clean Core' },
      { label: 'Environment', value: 'SAP BTP Cloud' },
    ],
    curriculum: [
      {
        title: 'Cloud ABAP Fundamentals & Modern Syntax',
        desc: 'New ABAP 7.5+ expressions, statements, Clean ABAP principles, and cloud-ready restrictions.',
      },
      {
        title: 'Core Data Services (CDS) Entities & VDM',
        desc: 'Building Virtual Data Models (VDM), associations, aggregations, access controls, and CDS annotations.',
      },
      {
        title: 'ABAP RESTful Application Programming (RAP)',
        desc: 'Managed & unmanaged scenarios, behavior definitions, determinations, validations, actions, and Draft handling.',
      },
      {
        title: 'OData V4 & Fiori Elements Integration',
        desc: 'Exposing RAP business objects as OData V4 services and consuming them seamlessly with SAP Fiori / UI5 apps.',
      },
      {
        title: 'SAP BTP & Clean Core Extensibility',
        desc: 'Side-by-side extensibility on SAP BTP, developer extensibility (Embedded Steampunk), and event-driven architecture.',
      },
      {
        title: 'abapGit, Cloud CI/CD & Unit Testing',
        desc: 'Version control using abapGit, automated unit testing with ABAP Unit, test doubles, and quality governance.',
      },
    ],
    prerequisites: 'Basic knowledge of ERP or programming concepts. Prior ABAP experience helpful but not mandatory.',
    outcomes: [
      'Architect and build cloud-native enterprise business objects using SAP RAP',
      'Deploy side-by-side extensions on SAP Business Technology Platform (BTP)',
      'Prepare confidently for SAP Certified Development Specialist certification',
      'Gain real production enterprise project experience with live mentorship',
    ],
  },
  {
    id: 'advanced-excel',
    title: 'Advanced Excel',
    tag: 'Business Analytics & BI',
    level: 'Beginner to Advanced',
    duration: '6 Weeks · Hands-on Masterclass',
    schedule: 'Flexible Weekend / Evening Batches',
    shortDesc: 'Become a high-impact data expert: master advanced formulas, Power Query automated ETL pipelines, Power Pivot data modeling, interactive KPI dashboards, and VBA macros.',
    color: {
      accent: '#059669',
      light: '#ECFDF5',
      badgeBg: '#D1FAE5',
      badgeText: '#047857',
      border: '#A7F3D0',
    },
    stats: [
      { label: 'Case Studies', value: '50+ Real Scenarios' },
      { label: 'Data Engines', value: 'Power Query & DAX' },
      { label: 'Certification', value: 'Industry Verified' },
    ],
    curriculum: [
      {
        title: 'Modern Formula Mastery & Dynamic Arrays',
        desc: 'Master XLOOKUP, INDEX/MATCH, FILTER, UNIQUE, SORT, LET, LAMBDA, and nested logical algorithms.',
      },
      {
        title: 'Power Query & Automated Data Cleansing (ETL)',
        desc: 'Extract, transform, and merge multi-source datasets with zero recurring manual effort; unpivot, conditional columns.',
      },
      {
        title: 'Power Pivot & Data Modeling with DAX',
        desc: 'Build multi-table relational models (Star schemas), calculate advanced DAX measures, time-intelligence, and KPIs.',
      },
      {
        title: 'Executive Dashboards & Visual Storytelling',
        desc: 'Design interactive, C-suite ready executive KPI dashboards with dynamic slicers, sparklines, conditional heatmaps, and charts.',
      },
      {
        title: 'What-If Analysis, Forecasting & Financial Modeling',
        desc: 'Data tables, Scenario Manager, Goal Seek, Solver, statistical forecasting, and dynamic sensitivity analysis.',
      },
      {
        title: 'VBA & Macro Automation for Enterprise Tasks',
        desc: 'Automate repetitive workflows, batch export reports, generate custom dialogs, and schedule automatic email notifications.',
      },
    ],
    prerequisites: 'Basic familiarity with Microsoft Excel interface and simple calculations.',
    outcomes: [
      'Automate 80% of repetitive data manipulation and report preparation time',
      'Build robust relational models handling millions of rows using Power Pivot',
      'Create executive-grade KPI dashboards used by Fortune 500 leadership',
      'Receive official Almanet Certificate of Mastery to showcase on LinkedIn',
    ],
  },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────
export const NAV_ITEMS = ['Home', 'Products', 'Services', 'Training', 'Events', 'Blogs', 'Career', 'About Us'];

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
