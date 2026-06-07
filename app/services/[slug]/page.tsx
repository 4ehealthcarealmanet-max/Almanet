'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, CheckCircle, ArrowRight, Users, Clock,
  Shield, Zap, BarChart2, Globe, Award, Target,
  Briefcase, BookOpen, Code2, Megaphone, Brain,
  TrendingUp, Star, ChevronRight, Phone, Mail
} from 'lucide-react';

/* ── icon maps (no JSX in data) ── */
const ICONS: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={28}/>, BookOpen: <BookOpen size={28}/>,
  Award: <Award size={28}/>, Users: <Users size={28}/>,
  Brain: <Brain size={28}/>, Code2: <Code2 size={28}/>,
  Megaphone: <Megaphone size={28}/>, Shield: <Shield size={28}/>,
  Zap: <Zap size={28}/>, BarChart2: <BarChart2 size={28}/>,
  Globe: <Globe size={28}/>, Target: <Target size={28}/>,
  TrendingUp: <TrendingUp size={28}/>, Star: <Star size={28}/>,
  Clock: <Clock size={28}/>, CheckCircle: <CheckCircle size={28}/>,
};
const SM_ICONS: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={20}/>, BookOpen: <BookOpen size={20}/>,
  Award: <Award size={20}/>, Users: <Users size={20}/>,
  Brain: <Brain size={20}/>, Code2: <Code2 size={20}/>,
  Megaphone: <Megaphone size={20}/>, Shield: <Shield size={20}/>,
  Zap: <Zap size={20}/>, BarChart2: <BarChart2 size={20}/>,
  Globe: <Globe size={20}/>, Target: <Target size={20}/>,
  TrendingUp: <TrendingUp size={20}/>, Star: <Star size={20}/>,
  Clock: <Clock size={20}/>, CheckCircle: <CheckCircle size={20}/>,
};

/* ───────────────────────────────────────────────────────────
   SERVICES DATA
   titleSlug = s.title.toLowerCase().replace(/\s+/g,'-')
─────────────────────────────────────────────────────────── */
const SERVICES: any[] = [

  /* 1 ── SAP Consulting */
  {
    titleSlug: 'sap-consulting-&-implementation-services',
    title: 'SAP Consulting & Implementation Services',
    tagline: 'Expert Strategic Advisory for Enterprise Landscape Optimisation',
    subtitle: 'End-to-end SAP consulting that aligns your technology landscape with business objectives — from initial blueprint to go-live and beyond.',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
    accent: '#2563eb', accentLight: '#dbeafe', accentDark: '#1e1b4b',
    badge: 'SAP Services', iconKey: 'Briefcase',
    overview: `Our SAP Consulting & Implementation practice combines deep functional expertise with proven delivery methodology to help enterprises get maximum value from their SAP investments. Whether you are embarking on a greenfield S/4HANA implementation, migrating from legacy ECC, or optimising an existing SAP landscape, our consultants bring hands-on experience across every major SAP module and industry sector.\n\nWe don't just configure software — we analyse your business processes, identify inefficiencies, and design SAP solutions that eliminate them. Every engagement begins with a thorough current-state assessment and ends with measurable business outcomes: faster month-end close, reduced procurement cycle times, improved inventory accuracy, and real-time financial visibility.`,
    stats: [
      { value: '200+', label: 'SAP Projects Delivered' },
      { value: '15+', label: 'Years of SAP Expertise' },
      { value: '98%', label: 'Client Retention Rate' },
      { value: '40+', label: 'Certified SAP Consultants' },
    ],
    offerings: [
      { iconKey: 'Target',    title: 'SAP S/4HANA Implementation',      desc: 'Greenfield and brownfield implementations with Activate methodology, from scoping and blueprinting through go-live and hypercare.' },
      { iconKey: 'Shield',    title: 'ECC to S/4HANA Migration',         desc: 'Risk-assessed migration planning, system conversion, data cleansing, and parallel-run validation for zero-disruption cutover.' },
      { iconKey: 'BarChart2', title: 'SAP Business Process Optimisation',desc: 'Cross-module process analysis, KPI benchmarking, and redesign to eliminate bottlenecks and unlock SAP standard functionality.' },
      { iconKey: 'Globe',     title: 'SAP Integration Services',         desc: 'API-led integration with third-party systems using SAP Integration Suite, BTP, and middleware platforms.' },
      { iconKey: 'Zap',       title: 'SAP Basis & Technical Services',   desc: 'System landscape design, performance tuning, patch management, and technical architecture advisory.' },
      { iconKey: 'Users',     title: 'Post Go-Live Support & AMS',       desc: 'Hypercare, application managed services, enhancement delivery, and 24/7 incident response retainers.' },
    ],
    process: [
      { step: '01', title: 'Discovery & Assessment',  desc: 'Current-state process mapping, system inventory, gap analysis, and business case development.' },
      { step: '02', title: 'Blueprint & Design',       desc: 'Future-state process design, system architecture, integration blueprint, and change management planning.' },
      { step: '03', title: 'Build & Configure',        desc: 'System configuration, custom development, interface build, and data migration design.' },
      { step: '04', title: 'Test & Validate',          desc: 'Unit testing, integration testing, UAT facilitation, and performance validation.' },
      { step: '05', title: 'Go-Live & Hypercare',      desc: 'Cutover execution, hypercare support, and knowledge transfer to internal teams.' },
    ],
    outcomes: ['Reduce month-end close time by 40–60%', 'Achieve real-time financial and operational visibility', 'Eliminate duplicate data entry across business processes', 'Meet regulatory compliance requirements automatically'],
    industries: ['Manufacturing', 'Retail & Consumer Goods', 'Public Sector', 'Healthcare', 'Financial Services'],
  },

  /* 2 ── SAP VTO */
  {
    titleSlug: 'sap-vto-solutions---vendor-transition-&-optimisation',
    title: 'SAP VTO Solutions - Vendor Transition & Optimisation',
    tagline: 'Virtual Technical Orchestration for Complex SAP Environments',
    subtitle: 'Seamless vendor transitions and ongoing SAP landscape optimisation — reducing cost, risk, and operational complexity.',
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80',
    accent: '#7c3aed', accentLight: '#ede9fe', accentDark: '#2e1065',
    badge: 'VTO Solutions', iconKey: 'BookOpen',
    overview: `Vendor transitions in complex SAP environments are among the highest-risk activities in enterprise IT. A poorly managed transition can result in months of degraded service, knowledge loss, compliance gaps, and business disruption. Our SAP VTO (Vendor Transition & Optimisation) practice exists specifically to manage this risk — providing structured governance, technical knowledge capture, and service continuity throughout every vendor change.\n\nBeyond transitions, our VTO service continuously optimises your SAP support model. We analyse your current AMS contracts, identify overspend and under-delivery, and redesign your support landscape to deliver better service at lower cost — whether through vendor renegotiation, insourcing, or restructured multi-vendor arrangements.`,
    stats: [
      { value: '50+', label: 'Successful Transitions' },
      { value: '0',   label: 'Business Disruptions' },
      { value: '25%', label: 'Avg Cost Reduction' },
      { value: '90d', label: 'Typical Transition Window' },
    ],
    offerings: [
      { iconKey: 'Shield',    title: 'Transition Risk Assessment',       desc: 'Comprehensive risk register, knowledge gap analysis, and transition readiness scoring before any vendor change.' },
      { iconKey: 'BookOpen',  title: 'Knowledge Capture & Transfer',     desc: 'Structured documentation of all customisations, runbooks, escalation procedures, and tribal knowledge.' },
      { iconKey: 'Users',     title: 'Parallel Run Management',          desc: 'Dual-vendor operation during transition with clear handover milestones and service quality checkpoints.' },
      { iconKey: 'BarChart2', title: 'SLA Design & Governance',          desc: 'KPI framework design, vendor scorecard implementation, and ongoing governance cadence management.' },
      { iconKey: 'Zap',       title: 'SAP Landscape Optimisation',       desc: 'System consolidation, licence optimisation, and support model restructuring to reduce total cost of ownership.' },
      { iconKey: 'Target',    title: 'Contract & Commercial Advisory',   desc: 'AMS contract review, benchmarking against industry rates, and negotiation support for renewal or retender.' },
    ],
    process: [
      { step: '01', title: 'Current State Analysis',   desc: 'Audit existing vendor contracts, SLAs, knowledge assets, and service performance history.' },
      { step: '02', title: 'Transition Planning',       desc: 'Design transition roadmap, communication plan, and risk mitigation strategies.' },
      { step: '03', title: 'Knowledge Extraction',      desc: 'Capture all technical and functional knowledge from outgoing vendor through structured workshops.' },
      { step: '04', title: 'Parallel Operation',        desc: 'Manage dual-vendor period with quality gates and escalation procedures.' },
      { step: '05', title: 'Stabilisation & Optimise',  desc: 'Confirm service quality with new model, then continuously optimise for cost and performance.' },
    ],
    outcomes: ['Zero service disruption during vendor transitions', 'Reduce AMS costs by 20–30% through model optimisation', 'Eliminate knowledge dependency on single vendor', 'Improve SLA compliance through rigorous governance'],
    industries: ['Financial Services', 'Utilities', 'Telecommunications', 'Manufacturing', 'Public Sector'],
  },

  /* 3 ── SAP Training */
  {
    titleSlug: 'enterprise-sap-training-programs',
    title: 'Enterprise SAP Training Programs',
    tagline: 'Comprehensive Modules for Mastering SAP Architectures',
    subtitle: 'Structured, role-based SAP training that builds genuine competency — from end-user adoption to architect-level certification preparation.',
    heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80',
    accent: '#0891b2', accentLight: '#cffafe', accentDark: '#083344',
    badge: 'Training', iconKey: 'Award',
    overview: `Enterprise SAP implementations succeed or fail based on user adoption. The most technically perfect system delivers zero value if the people who must use it don't understand it, don't trust it, or actively work around it. Our Enterprise SAP Training programmes close this gap through structured, role-based learning pathways that build genuine competency — not just checkbox compliance.\n\nOur training faculty combines SAP-certified consultants with experienced learning designers to create programmes that are both technically rigorous and practically effective. We don't deliver generic SAP training — we build training around your specific configuration, your business processes, and your users' actual day-to-day workflows.`,
    stats: [
      { value: '5,000+', label: 'Professionals Trained' },
      { value: '95%',    label: 'Certification Pass Rate' },
      { value: '20+',    label: 'SAP Modules Covered' },
      { value: '4.8/5',  label: 'Learner Satisfaction' },
    ],
    offerings: [
      { iconKey: 'BookOpen',  title: 'End-User Training',                 desc: 'Role-specific training on your configured SAP system, delivered in classroom, virtual, or e-learning format.' },
      { iconKey: 'Award',     title: 'Certification Preparation',         desc: 'Structured preparation courses for SAP Associate and Professional certifications with practice exams and mock tests.' },
      { iconKey: 'Brain',     title: 'SAP S/4HANA Upskilling',            desc: 'Transition training for users moving from SAP ECC to S/4HANA, focusing on changed processes and new Fiori interfaces.' },
      { iconKey: 'Users',     title: 'Train-the-Trainer Programmes',      desc: 'Build internal SAP training capability by developing your own super-users and internal trainers.' },
      { iconKey: 'Code2',     title: 'Technical Developer Training',       desc: 'ABAP, Fiori/UI5, BTP development, and integration technology training for your technical teams.' },
      { iconKey: 'Target',    title: 'Custom Learning Path Design',        desc: 'Bespoke curriculum development aligned to your system configuration and specific business role requirements.' },
    ],
    process: [
      { step: '01', title: 'Training Needs Analysis',  desc: 'Role mapping, competency gap assessment, and learning outcome definition.' },
      { step: '02', title: 'Curriculum Design',         desc: 'Course structure, content development, and assessment design aligned to business processes.' },
      { step: '03', title: 'Content Production',        desc: 'System simulations, exercises, job aids, and reference materials using your configured system.' },
      { step: '04', title: 'Delivery',                  desc: 'Instructor-led, virtual, or self-paced delivery with progress tracking and attendance management.' },
      { step: '05', title: 'Evaluation & Reinforcement',desc: 'Post-training assessment, knowledge retention measurement, and refresher programme design.' },
    ],
    outcomes: ['Accelerate user adoption during and after go-live', 'Reduce support tickets from user error by up to 50%', 'Build internal SAP capability to reduce external dependency', 'Achieve SAP certification for key team members'],
    industries: ['All Sectors — Training is Role-Based, Not Industry-Specific'],
  },

  /* 4 ── Tech Internship */
  {
    titleSlug: 'tech-internship-&-industry-readiness-program',
    title: 'Tech Internship & Industry Readiness Program',
    tagline: 'Hands-On Industry Exposure in Live Production Environments',
    subtitle: 'A structured internship programme that bridges the gap between academic knowledge and professional capability in enterprise technology.',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80',
    accent: '#059669', accentLight: '#d1fae5', accentDark: '#064e3b',
    badge: 'Internship', iconKey: 'Users',
    overview: `The gap between what universities teach and what enterprise technology employers need has never been wider. Computer science graduates can write algorithms but have never worked in a production SAP environment. Business graduates understand process theory but have never configured a real system. Our Tech Internship & Industry Readiness Programme was built to close this gap through structured, supervised exposure to live enterprise technology work.\n\nInterns are embedded in real client-facing project teams — not isolated in a separate "intern project." They work on actual deliverables, participate in client interactions, and experience the full complexity of enterprise IT delivery. A dedicated mentor tracks their development and ensures each intern builds a portfolio of genuine work product they can present to future employers.`,
    stats: [
      { value: '500+', label: 'Interns Placed' },
      { value: '85%',  label: 'Hired Post-Internship' },
      { value: '6',    label: 'Month Programme Duration' },
      { value: '4.9/5',label: 'Intern Satisfaction Score' },
    ],
    offerings: [
      { iconKey: 'Code2',     title: 'SAP Functional Internship',        desc: 'Hands-on exposure to SAP module configuration, testing, and documentation within live project environments.' },
      { iconKey: 'Brain',     title: 'Data & Analytics Track',           desc: 'Work with real enterprise data sets on analytics, reporting, and data quality projects using SAP and Python tools.' },
      { iconKey: 'Globe',     title: 'Integration & Development Track',  desc: 'API development, integration testing, and technical documentation in live integration projects.' },
      { iconKey: 'BookOpen',  title: 'Project Management Track',         desc: 'Support project delivery through planning, risk tracking, stakeholder communication, and status reporting.' },
      { iconKey: 'Target',    title: 'Structured Mentorship',            desc: 'Weekly 1:1 mentoring with a senior consultant, structured feedback, and personal development planning.' },
      { iconKey: 'Award',     title: 'Industry Readiness Certification', desc: 'Programme completion certificate with detailed competency assessment report for employer reference.' },
    ],
    process: [
      { step: '01', title: 'Application & Selection',   desc: 'Competency-based application review, technical aptitude assessment, and interview.' },
      { step: '02', title: 'Onboarding & Orientation',  desc: '2-week intensive orientation covering enterprise IT fundamentals, tools, and professional practices.' },
      { step: '03', title: 'Project Embedding',          desc: 'Assignment to live project team with defined deliverables and clear scope of contribution.' },
      { step: '04', title: 'Mid-Programme Review',       desc: 'Formal competency review, feedback session, and adjusted learning plan for remaining period.' },
      { step: '05', title: 'Completion & Placement',     desc: 'Final assessment, portfolio review, completion certification, and job placement support.' },
    ],
    outcomes: ['Build enterprise-grade technical skills on live projects', 'Develop professional communication and stakeholder management skills', 'Earn a verified competency certificate recognised by employers', 'Access our employer network for post-programme placement'],
    industries: ['Open to All Backgrounds — CS, Engineering, Business, and Mathematics Graduates'],
  },

  /* 5 ── AI & ML */
  {
    titleSlug: 'ai-&-machine-learning-with-python---professional-certification',
    title: 'AI & Machine Learning with Python - Professional Certification',
    tagline: 'Deep Learning and Automation Training Using Python',
    subtitle: 'A rigorous professional certification programme covering the full machine learning stack — from Python fundamentals to production model deployment.',
    heroImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80',
    accent: '#6366f1', accentLight: '#eef2ff', accentDark: '#1e1b4b',
    badge: 'AI & ML', iconKey: 'Brain',
    overview: `Artificial intelligence and machine learning skills are among the most valuable — and most scarce — in the global technology market. Our AI & Machine Learning with Python Professional Certification programme provides a structured, rigorous pathway from foundational Python programming through to production machine learning deployment, covering every layer of the modern ML stack.\n\nThe programme is designed for two audiences: engineering and technology professionals seeking to add AI/ML capabilities to their existing skill set, and graduates seeking to enter the AI field with employer-recognised credentials. Both cohorts follow the same curriculum — which means the networking and peer learning value is exceptional.`,
    stats: [
      { value: '1,200+', label: 'Certifications Awarded' },
      { value: '92%',    label: 'Employment Rate Post-Course' },
      { value: '120h',   label: 'Total Learning Hours' },
      { value: '4.9/5',  label: 'Course Rating' },
    ],
    offerings: [
      { iconKey: 'Code2',     title: 'Python for Data Science',           desc: 'NumPy, Pandas, Matplotlib — the foundational stack for data manipulation and analysis.' },
      { iconKey: 'Brain',     title: 'Machine Learning Fundamentals',     desc: 'Supervised and unsupervised learning, model evaluation, regularisation, and scikit-learn mastery.' },
      { iconKey: 'Zap',       title: 'Deep Learning with PyTorch',        desc: 'Neural network architecture, training pipelines, CNNs, RNNs, and transformer models.' },
      { iconKey: 'BarChart2', title: 'MLOps & Production Deployment',     desc: 'Model versioning, serving infrastructure, monitoring, and retraining pipelines with MLflow and Docker.' },
      { iconKey: 'Target',    title: 'NLP & Computer Vision',             desc: 'Practical projects in text classification, sentiment analysis, object detection, and image segmentation.' },
      { iconKey: 'Award',     title: 'Capstone & Certification',          desc: 'Industry-partnered capstone project with real data, followed by proctored certification examination.' },
    ],
    process: [
      { step: '01', title: 'Python & Math Foundations',desc: '3 weeks covering Python, linear algebra, calculus, and statistics essentials.' },
      { step: '02', title: 'Classical ML',              desc: '4 weeks on regression, classification, clustering, and ensemble methods.' },
      { step: '03', title: 'Deep Learning',             desc: '4 weeks on neural networks, CNNs, RNNs, and large language model fundamentals.' },
      { step: '04', title: 'Specialisation Tracks',     desc: '3 weeks on NLP or Computer Vision with hands-on project work.' },
      { step: '05', title: 'Capstone & Exam',           desc: '2 weeks of capstone project delivery and certification examination.' },
    ],
    outcomes: ['Earn an industry-recognised AI/ML professional certificate', 'Build a portfolio of 5+ real ML projects with documented methodology', 'Master the full Python ML stack from data to deployment', 'Join our alumni network with 1,200+ AI professionals'],
    industries: ['Software Engineering', 'Data Analytics', 'Finance & Banking', 'Healthcare Informatics', 'Research'],
  },

  /* 6 ── AI Custom Software */
  {
    titleSlug: 'ai-solutions-&-custom-software-development',
    title: 'AI Solutions & Custom Software Development',
    tagline: 'Tailored AI-Driven Development for Business Process Automation',
    subtitle: 'Bespoke AI and software solutions engineered around your specific business challenges — from intelligent automation to full-stack enterprise applications.',
    heroImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&q=80',
    accent: '#0d9488', accentLight: '#ccfbf1', accentDark: '#042f2e',
    badge: 'Custom Dev', iconKey: 'Code2',
    overview: `Off-the-shelf software solves generic problems. Your business has specific problems — unique processes, unusual data, regulatory requirements, or competitive dynamics that no packaged product was designed to address. Our AI Solutions & Custom Software Development practice builds software that fits your problem, not the other way around.\n\nWe combine deep AI/ML expertise with full-stack engineering capability to deliver solutions that range from targeted automation modules (intelligent document processing, predictive maintenance alerts, demand forecasting) to complete enterprise applications built on cloud-native architectures. Every solution we build is designed for maintainability, scalability, and eventual independence from our involvement.`,
    stats: [
      { value: '150+', label: 'Custom Solutions Built' },
      { value: '60%',  label: 'Avg Process Time Reduction' },
      { value: '99.5%',label: 'Production Uptime SLA' },
      { value: '3×',   label: 'Avg ROI in Year One' },
    ],
    offerings: [
      { iconKey: 'Brain',     title: 'Intelligent Document Processing',  desc: 'OCR, NLP, and ML models that extract, classify, and validate data from unstructured documents at scale.' },
      { iconKey: 'Zap',       title: 'Business Process Automation',      desc: 'End-to-end workflow automation combining RPA, AI decision engines, and system integration.' },
      { iconKey: 'Code2',     title: 'Full-Stack Application Development',desc: 'Cloud-native web and mobile applications built with React, Node.js, Python, and modern database architectures.' },
      { iconKey: 'BarChart2', title: 'Predictive Analytics Platforms',   desc: 'Custom ML models for demand forecasting, churn prediction, fraud detection, and operational optimisation.' },
      { iconKey: 'Globe',     title: 'API & Integration Development',    desc: 'RESTful and GraphQL APIs, event-driven architectures, and third-party system integrations.' },
      { iconKey: 'Shield',    title: 'AI Governance & Explainability',   desc: 'Audit trails, model monitoring, bias detection, and explainability frameworks for regulated environments.' },
    ],
    process: [
      { step: '01', title: 'Problem Definition',        desc: 'Deep-dive workshops to define the problem, data landscape, success criteria, and constraints.' },
      { step: '02', title: 'Solution Architecture',     desc: 'Technical design, data pipeline architecture, model selection, and build-vs-buy decision framework.' },
      { step: '03', title: 'Iterative Development',     desc: 'Agile sprints with working software demonstrations, feedback integration, and continuous delivery.' },
      { step: '04', title: 'Validation & Testing',      desc: 'Model validation, UAT, performance testing, and security assessment before production deployment.' },
      { step: '05', title: 'Deploy & Optimise',         desc: 'Production deployment, monitoring setup, team training, and ongoing optimisation retainer.' },
    ],
    outcomes: ['Automate repetitive processes and reallocate staff to higher-value work', 'Reduce processing errors with AI-powered validation', 'Build proprietary data and AI assets that create competitive moats', 'Deliver measurable ROI within 6–12 months of deployment'],
    industries: ['Financial Services', 'Healthcare', 'Logistics', 'Manufacturing', 'Legal & Professional Services'],
  },

  /* 7 ── Digital Marketing */
  {
    titleSlug: 'digital-marketing-&-growth-services',
    title: 'Digital Marketing & Growth Services',
    tagline: 'Data-Driven Outreach to Scale Your Brand Presence',
    subtitle: 'Full-funnel digital marketing strategy and execution — combining performance marketing, content, SEO, and analytics to drive sustainable growth.',
    heroImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1600&q=80',
    accent: '#dc2626', accentLight: '#fee2e2', accentDark: '#450a0a',
    badge: 'Growth', iconKey: 'Megaphone',
    overview: `Digital marketing without data is guesswork. Digital marketing without strategy is expensive guesswork. Our Digital Marketing & Growth Services practice combines rigorous data analysis with creative execution to build marketing programmes that deliver measurable, attributable results — not vanity metrics.\n\nWe work as an extension of your marketing team, bringing specialist capability in performance advertising, search engine optimisation, content strategy, and conversion rate optimisation. Every campaign is instrumented from day one so that budget allocation decisions are driven by evidence, not intuition. And every month, we report on what worked, what didn't, and what we are changing as a result.`,
    stats: [
      { value: '3.5×',  label: 'Avg ROAS Delivered' },
      { value: '180+',  label: 'Brands Grown' },
      { value: '65%',   label: 'Avg Organic Traffic Growth' },
      { value: '4.7/5', label: 'Client Satisfaction Score' },
    ],
    offerings: [
      { iconKey: 'Target',    title: 'Performance Marketing',            desc: 'Google Ads, Meta Ads, and LinkedIn Ads management with audience strategy, creative testing, and bid optimisation.' },
      { iconKey: 'BarChart2', title: 'SEO & Content Strategy',           desc: 'Technical SEO audits, keyword strategy, content calendars, and link building to drive organic search growth.' },
      { iconKey: 'TrendingUp',title: 'Conversion Rate Optimisation',     desc: 'Landing page analysis, A/B testing, user journey mapping, and funnel optimisation to improve lead-to-customer rates.' },
      { iconKey: 'Megaphone', title: 'Social Media Marketing',           desc: 'Platform strategy, content creation, community management, and influencer partnership management.' },
      { iconKey: 'Brain',     title: 'Marketing Analytics & Attribution', desc: 'GA4 implementation, custom dashboard creation, multi-touch attribution modelling, and campaign performance reporting.' },
      { iconKey: 'Globe',     title: 'Email & Marketing Automation',     desc: 'Drip campaigns, segmentation strategy, behavioural triggers, and CRM integration for lifecycle marketing.' },
    ],
    process: [
      { step: '01', title: 'Audit & Strategy',          desc: 'Competitive analysis, current channel performance audit, and 90-day growth strategy development.' },
      { step: '02', title: 'Foundation Setup',           desc: 'Tracking implementation, audience building, creative development, and campaign architecture.' },
      { step: '03', title: 'Launch & Learn',             desc: 'Campaign launch with intensive monitoring, rapid iteration based on early data signals.' },
      { step: '04', title: 'Scale & Optimise',           desc: 'Budget reallocation to top-performing channels and creative, continuous optimisation for efficiency.' },
      { step: '05', title: 'Report & Evolve',            desc: 'Monthly performance reviews, strategy refinement, and quarterly growth planning sessions.' },
    ],
    outcomes: ['Reduce cost-per-acquisition by 30–50% through data-led optimisation', 'Grow organic traffic by 50%+ within 12 months', 'Build a marketing engine that scales without proportional cost increases', 'Achieve full attribution clarity across every marketing channel'],
    industries: ['B2B Technology', 'E-Commerce', 'Professional Services', 'Education', 'Healthcare'],
  },
];

/* ─── slug resolver ─── */
function norm(s: string) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
function findService(rawSlug: string) {
  const e = SERVICES.find(s => s.titleSlug === rawSlug); if (e) return e;
  const t = SERVICES.find(s => s.title.toLowerCase().replace(/\s+/g, '-') === rawSlug); if (t) return t;
  const nu = norm(rawSlug);
  const s3 = SERVICES.find(s => { const nt = norm(s.titleSlug); return nu.startsWith(nt) || nt.startsWith(nu); });
  if (s3) return s3;
  const tok = nu.substring(0, 8);
  return SERVICES.find(s => norm(s.titleSlug).startsWith(tok)) || null;
}

/* ─── sub-components ─── */
function StatCard({ value, label, accent }: any) {
  return (
    <div className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
      <div className="text-3xl font-black mb-1" style={{ color: accent }}>{value}</div>
      <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{label}</div>
    </div>
  );
}

function OfferingCard({ iconKey, title, desc, accent, accentLight }: any) {
  return (
    <div className="p-7 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: accentLight, color: accent }}>
        {SM_ICONS[iconKey]}
      </div>
      <h3 className="font-bold text-base text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── page ─── */
export default function ServiceDetailPage() {
  const params  = useParams();
  const router  = useRouter();
  const slug    = params?.slug as string ?? '';
  const svc     = findService(slug);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (!svc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <p className="text-gray-400 text-lg font-medium">Service not found — <code className="bg-gray-100 px-2 py-1 rounded text-sm">{slug}</code></p>
          <button onClick={() => router.back()} className="text-blue-600 font-bold hover:underline">← Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-900 w-full overflow-x-hidden">

      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: scrolled ? svc.accent : '#fff' }}>
            <ArrowLeft size={18} /> All Services
          </button>
          <span className="text-xs font-bold tracking-wide px-3 py-1.5 rounded-full border flex items-center gap-1.5"
            style={scrolled
              ? { color: svc.accent, borderColor: svc.accentLight, background: svc.accentLight }
              : { color: '#fff', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.12)' }}>
            {svc.badge}
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative w-full h-[400px] md:h-[460px] overflow-hidden">
        <img src={svc.heroImage} alt={svc.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${svc.accentDark}f0, ${svc.accentDark}88, transparent)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 h-full flex flex-col justify-end pb-12 pt-24">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 w-fit" style={{ background: svc.accent, color: '#fff' }}>
            {svc.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3 max-w-3xl">{svc.title}</h1>
          <p className="text-lg text-white/80 font-semibold mb-2 max-w-2xl">{svc.tagline}</p>
          <p className="text-sm text-white/60 max-w-2xl leading-relaxed">{svc.subtitle}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {svc.stats.map((s: any, i: number) => <StatCard key={i} {...s} accent={svc.accent} />)}
        </div>
      </div>

      {/* Body */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-20 space-y-24">

        {/* Overview + Outcomes */}
        <section className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full" style={{ background: svc.accent }} />
              <h2 className="text-3xl font-black">Service Overview</h2>
            </div>
            {svc.overview.split('\n\n').map((p: string, i: number) => (
              <p key={i} className="text-gray-600 leading-relaxed text-lg mb-4">{p}</p>
            ))}
          </div>
          <div className="md:col-span-2 space-y-5">
            {/* Outcomes */}
            <div className="p-8 rounded-3xl" style={{ background: svc.accentLight }}>
              <h3 className="font-black text-lg mb-5" style={{ color: svc.accentDark }}>What You'll Achieve</h3>
              <ul className="space-y-3">
                {svc.outcomes.map((o: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle size={17} className="mt-0.5 flex-shrink-0" style={{ color: svc.accent }} />{o}
                  </li>
                ))}
              </ul>
            </div>
            {/* Industries */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-white">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: svc.accent }}>Industries We Serve</p>
              <div className="flex flex-wrap gap-2">
                {svc.industries.map((ind: string, i: number) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full border bg-gray-50" style={{ color: svc.accentDark, borderColor: `${svc.accent}30` }}>{ind}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Offerings */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full" style={{ background: svc.accent }} />
            <h2 className="text-3xl font-black">What's Included</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {svc.offerings.map((o: any, i: number) => (
              <OfferingCard key={i} {...o} accent={svc.accent} accentLight={svc.accentLight} />
            ))}
          </div>
        </section>

        {/* Process */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full" style={{ background: svc.accent }} />
            <h2 className="text-3xl font-black">Our Delivery Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {svc.process.map((p: any, i: number) => (
              <div key={i} className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                {i < svc.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-2 z-10">
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                )}
                <div className="text-3xl font-black mb-3 opacity-20" style={{ color: svc.accent }}>{p.step}</div>
                <h3 className="font-bold text-sm text-gray-900 mb-2">{p.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl p-10 md:p-16 text-center" style={{ background: `linear-gradient(135deg, ${svc.accentDark} 0%, #111827 100%)` }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: svc.accent }}>
            {ICONS[svc.iconKey]}
            </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to get started?</h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10 text-lg">
            Talk to our team about how <span className="text-white font-bold">{svc.title}</span> can deliver results for your organisation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white shadow-lg hover:opacity-90 transition-opacity" style={{ background: svc.accent }}>
              <Phone size={18} /> Book a Consultation
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold border-2 text-white hover:bg-white/10 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
              <Mail size={18} /> Send an Enquiry
            </button>
          </div>
        </section>

      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white py-6 px-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} {svc.title} · All rights reserved
      </div>
    </div>
  );
}
