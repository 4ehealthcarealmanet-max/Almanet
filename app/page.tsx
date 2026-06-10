"use client";

import React, { useState } from 'react';
import { Briefcase, BookOpen, GraduationCap, Users, Bot, Code, Megaphone, Monitor, TrendingUp, Handshake, Target, ShieldCheck, Rocket, Settings, CheckCircle, MapPin, Activity } from 'lucide-react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
const PRODUCTS = [
{ 
  id: 'pathyatech', 
  name: 'PathyaTech', 
  desc: 'Next-gen healthcare management and automation systems.', 
img: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=500&auto=format&fit=crop&q=60'},
  { 
    id: 'trackintake', 
    name: 'Trackintake', 
    desc: 'Real-time logistics, asset, and fleet tracking intelligence.', 
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&auto=format&fit=crop&q=60' 
    // Fleet / trucks on road
  },
 { 
  id: 'crm', 
  name: 'CRM - Unified Customer Relationship Platform', 
  desc: 'Seamless customer relationship management to scale sales.', 
  img: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500&auto=format&fit=crop&q=60' 
},
  { 
    id: 'ngo', 
    name: 'NgoConnect - Non-Profit Management System', 
    desc: 'All-in-one digital ecosystems for non-profit operations.', 
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=60' 
    // People / community / ngo
  },
  { 
    id: 'vendor', 
    name: 'VendorSync - Vendor & Procurement Management', 
    desc: 'Streamlined supply chain and vendor management portals.', 
    img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&auto=format&fit=crop&q=60' 
    // Warehouse / supply chain
  },
  { 
    id: 'lab', 
    name: 'LabCore LIMS - Laboratory Information Management System', 
    desc: 'Advanced laboratory information systems for precise diagnostics.', 
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&auto=format&fit=crop&q=60' 
    // Lab / microscope / diagnostics
  },
  { 
    id: 'doctor', 
    name: 'MedConsult Live - Telehealth & Doctor Consultation Platform', 
    desc: 'Telehealth and clinic appointment scheduler for modern doctors.', 
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=60' 
    // Doctor on video call / telehealth
  },
];

const BLOGS = [
  {
    id: 1,
    title: 'The Future of AI in Enterprise Solutions',
    excerpt: 'How predictive AI is changing the landscape of modern CRM tools...',
    date: 'June 12, 2026',
    content: `Artificial Intelligence is no longer just a luxury buzzword for tech giants. In 2026, small to enterprise-level operations are deploying custom LLMs to completely automate customer support, forecast inventory metrics, and predict user attrition.

The real transformation lies in shifting from reactive software to proactive autonomous systems. When an enterprise integrates custom AI layers directly into their database engines, the software stops waiting for human inputs. Instead, it continuously monitors system health, tracks user interaction pipelines, and flags potential drop-offs before they manifest financially.

### Strategic Architecture Implementation
Building a reliable enterprise-grade model requires rigorous structural steps:
1. Comprehensive Data Cleaning: Structuring chaotic multi-department logs into unified, secure storage grids.
2. Model Fine-Tuning: Utilizing isolated open-source weights (like Llama models) inside custom firewalls to guarantee zero data leakage.
3. Live Feedback Telemetry Loops: Allowing corporate agents to grade AI outputs instantly, scaling accuracy metrics exponentially over time.

Through proper data pipelines built in Python, companies can save up to 40% of standard operating costs.`,
img: 'https://images.unsplash.com/photo-1559000357-f6b52ddfbe37?w=500&auto=format&fit=crop&q=60'  },
  {
    id: 2,
    title: 'Optimizing Logistics with Trackintrack',
    excerpt: 'Why real-time tracking is vital for modern supply-chain compliance...',
    date: 'May 28, 2026',
    content: `In a globalized marketplace, knowing where your assets are is only half the battle. True supply-chain resilience depends on deep predictive insights.

Trackintrack merges hardware precision with elegant analytical software to ensure your deliverables never face unmitigated delays. By deploying IoT arrays across fleet frameworks, fleet owners gain clear visibility into driver health patterns, ambient cabin temperatures, fuel efficiency variances, and road quality dynamics.

### Overcoming Modern Distribution Bottlenecks
Traditional tracking setups rely on manual entry points, which introduce human error and systemic lag. Our unified telemetry approach bridges this gap by introducing automated geofencing check-ins.

Furthermore, real-time alert triggers mean that if transit temperatures drop below a critical threshold for perishables or lab modules, an autonomous rerouting order is initiated immediately.`,
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    title: 'Why SAP Cloud Transformation is Crucial',
    excerpt: 'Migrating legacy frameworks to cloud instances safely...',
    date: 'May 14, 2026',
    content: `Legacy setups expose modern organizations to severe cybersecurity liabilities, fractured data environments, and scaling constraints. Transitioning to an SAP Cloud framework optimizes cross-department tracking and guarantees that real-time database updates can occur globally without causing standard workflow down-time.

Moving to the cloud isn't just about modernizing hardware; it's a fundamental shift in business agility.

### Seamless Migration Protocols
A successful structural migration requires a disciplined approach:
* Detailed Pre-Migration Assessments: Auditing all existing custom database scripts to flag potential transition errors early.
* Phased Parallel Processing Paths: Running old database frameworks alongside the new cloud environment.
* Comprehensive Workforce Training: Equipping administrative teams with intuitive tools via modern virtual training simulations.`,
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    title: 'Revolutionizing Healthcare via Tech Modules',
    excerpt: 'Bridging the disconnect between patient consulting and laboratories...',
    date: 'April 30, 2026',
    content: `Medical workflows have historically suffered from siloed departments. When a patient schedules a doctor consultation, data should effortlessly communicate with lab modules and pharmacy tracking software.

Pathyatech offers integrated clinical pipelines that protect privacy while radically accelerating patient turnaround times. When a doctor prescribes a specialized diagnostic report during an active consultation, the laboratory system should prepare testing materials before the patient even walks through the door.

### Elevating Operational Patient Care
* Unified Electronic Records: Bringing patient histories, allergies, and diagnostic data into a secure, single-pane dashboard.
* Automated Lab Tracking: Instant tracking notifications from sample gathering up to final digital sign-off.
* Smart Appointment Pipelines: Dynamic booking schedules that auto-adjust based on real-time room availability.`,
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 5,
    title: 'Building Impactful Apps for Non-Profits',
    excerpt: 'How tailored software architecture helps NGOs unlock global funding...',
    date: 'April 15, 2026',
    content: `NGOs operate under rigid compliance standards and demand transparent financial tracking. Utilizing tailored digital portal systems allows these organizations to present audited data transparently to institutional benefactors.

A clean digital portal acts as a bridge of trust between local field projects and international grant distribution frameworks.

### Foundational Portals for Global Outreach
1. Automated Audit Trails: Documenting asset distribution instantly to satisfy international regulatory checks.
2. Flexible Contribution Frameworks: Setting up multi-currency, secure donation endpoints.
3. Multi-Platform Field Portals: Creating lightweight mobile entry forms that work reliably in remote areas with low network connectivity.`,
    img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 6,
    title: 'Mastering Python for Machine Learning',
    excerpt: 'A clear roadmap for engineering students entering AI careers...',
    date: 'March 02, 2026',
    content: `Starting your career path in modern engineering requires moving past mere syntax logic. True expertise relies on evaluating matrix math, parsing complex data pools via Pandas, and training adaptive algorithms in frameworks like TensorFlow or PyTorch.

The demand for junior engineers who simply copy-paste boilerplates is dropping quickly. Today's tech sector actively hunts for individuals who deeply understand algorithmic theory, data cleanup pipelines, and training efficiencies.

### Key Pillars of Advanced AI Learning
* Exploratory Analysis: Learning to spot underlying patterns and clean up anomalies in messy datasets before training begins.
* Custom Network Tuning: Understanding how learning rates, layer depths, and activation functions impact model convergence.
* Cost-Effective Cloud Deployments: Packaging trained models into fast Docker containers to optimize infrastructure costs.`,
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60'
  },
];

const EVENTS = [
  { id: 1, title: 'Global Tech & AI Summit 2026', date: 'July 15, 2026', time: '10:00 AM EST', location: 'Virtual / Zoom Live', desc: 'Dive deep into structural automated frameworks and next-gen Python AI developments with elite international developers.', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60' },
  { id: 2, title: 'SAP Enterprise Integration Workshop', date: 'August 03, 2026', time: '02:00 PM EST', location: 'Hybrid / Chicago Hub', desc: 'A rigorous hands-on technical masterclass covering multi-module SAP architecture migrations and data modeling optimizations.', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=60' },
];

export default function AlmanetWebsite() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeBlog, setActiveBlog] = useState<typeof BLOGS[0] | null>(null);
  const [activeEvent, setActiveEvent] = useState<typeof EVENTS[0] | null>(null);
  const [activeProduct, setActiveProduct] = useState<any>(null);
  const [activeService, setActiveService] = useState<any>(null);
  const [regFormSubmitted, setRegFormSubmitted] = useState(false);
  const [eventFormSubmitted, setEventFormSubmitted] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
const [applyJobTitle, setApplyJobTitle] = useState('');
const [applyFormSubmitted, setApplyFormSubmitted] = useState(false);
const [isEventOpen, setIsEventOpen] = useState(false);
const [eventTitle, setEventTitle] = useState('');
const [eventDate, setEventDate] = useState('');

  const navItems = ['Home', 'Products', 'Services', 'Events', 'Blogs', 'Careers', 'About Us'];

  const services = [
    { icon: Briefcase, title: 'SAP Consulting & Implementation Services', desc: 'Expert strategic advisory for enterprise landscape optimization.' },
    { icon: BookOpen, title: 'SAP VTO Solutions - Vendor Transition & Optimization', desc: 'Virtual technical orchestration for complex SAP environments.' },
    { icon: GraduationCap, title: 'Enterprise SAP Training Programs', desc: 'Comprehensive modules for mastering SAP architectures.' },
    { icon: Users, title: 'Tech Internship & Industry Readiness Program', desc: 'Hands-on industry exposure in live production environments.' },
    { icon: Bot, title: 'AI & Machine Learning with Python - Professional Certification', desc: 'Deep learning and automation training using Python.' },
    { icon: Code, title: 'AI Solutions & Custom Software Development', desc: 'Tailored AI-driven development for business process automation.' },
    { icon: Megaphone, title: 'Digital Marketing & Growth Services', desc: 'Data-driven outreach to scale your brand presence.' },
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

const sendEmail = (e: any) => {
  e.preventDefault();

  emailjs.sendForm(
    'service_ug8mwjo',    // ← apna Service ID daalo
    'template_4cpn5mi',   // ← apna Template ID daalo
    e.target,
    'vafZKtGQImtW-jPeV'     // ← apni Public Key daalo
  )
  .then(() => {
    setRegFormSubmitted(true);
  })
  .catch(() => {
    alert('Submission failed. Please try again.');
  });
};

const sendApplication = (e: any) => {
  e.preventDefault();

  emailjs.sendForm(
    'service_ug8mwjo',
    'template_9q7uivi',  // same template ya alag bana sakte ho
    e.target,
    'vafZKtGQImtW-jPeV'
  )
  .then(() => {
    setApplyFormSubmitted(true);
  })
  .catch(() => {
    alert('Submission failed. Please try again.');
  });
};

const sendEventRegistration = (e: any) => {
  e.preventDefault();
  setEventFormSubmitted(true); // ← bas itna hi!
};
  return (
    <div className="min-h-screen w-full bg-white text-gray-900 antialiased">

      {/* HEADER */}
<header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
         <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
  <img 
    src="/almanet-logo.png" 
    alt="AlmaNet Official" 
    className="h-18 w-auto object-contain transition-transform duration-300 hover:scale-105"
    style={{ mixBlendMode: 'multiply' }}
  />
</div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-gray-700">
            {navItems.map((item) => (
              <button key={item} onClick={() => handleScroll(item.toLowerCase().replace(/\s+/g, ''))} className="hover:text-blue-700 transition-colors duration-200">{item}</button>
            ))}
          </nav>
          <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-[0.98]">
            Get in Touch
          </button>
        </div>
      </header>

     {/* HERO */}
<section id="home" className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-[#F8FAFC] border-b border-gray-200">
  <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: `radial-gradient(#4A77BC 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
  <div className="absolute top-0 left-1/3 w-[50vw] h-[300px] bg-blue-100 rounded-full blur-[120px] pointer-events-none" />
  <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT - Text */}
    <div className="space-y-6 text-center md:text-left">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Next Generation Digital Ecosystems
      </span>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-gray-900">
        Empowering Ideas via <br /> <span className="text-blue-600">Advanced Intelligence</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0 font-normal leading-relaxed">
        Almanet builds foundational automation suites, customized corporate SAP transformations, and machine learning models engineered to elevate complex modern business initiatives.
      </p>
      <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
        <button onClick={() => handleScroll('products')} className="px-6 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">Explore Products</button>
        <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="px-6 py-3 rounded-xl font-semibold bg-white text-gray-800 border border-gray-200 hover:border-blue-300 transition-all">Register Platform</button>
      </div>
    </div>

    {/* RIGHT - Image with animation */}
    <div className="relative flex justify-center hero-image-enter">
      <div className="hero-image-float">
        <div className="absolute -inset-1 bg-blue-200 rounded-3xl blur-2xl opacity-40" />
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"
          alt="Dashboard"
          className="rounded-2xl border border-gray-100 shadow-xl relative z-10 max-w-full h-auto object-cover"
        />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-blue-400/20 blur-2xl rounded-full" />
      </div>
    </div>

  </div>
</section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 relative w-full z-10 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: `radial-gradient(#2563EB 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 text-center space-y-12 relative z-10">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Our Portfolios</span>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">Enterprise Scaling Products</h2>
            <p className="text-gray-500 font-normal max-w-2xl mx-auto text-sm">Robust system modules custom optimized to run high-volume workflows fluidly.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {PRODUCTS.map((prod, idx) => (
              <div key={prod.id || idx} className="group rounded-3xl border border-gray-100 bg-white p-6 space-y-4 hover:border-blue-100 transition-all text-left flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-blue-50/50 hover:-translate-y-1 duration-300">
                <div className="space-y-4">
                  <div className="h-48 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                    <img src={prod.name?.toLowerCase().includes('pathyatech') ? "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80" : prod.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">{prod.name}</h3>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed line-clamp-3">{prod.desc}</p>
                </div>
                <Link href={`/products/${prod.name.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                  Explore Specification →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-gray-500 text-sm">We deliver end-to-end IT solutions—helping organisations implement, optimise, and support mission-critical systems.</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl hover:border-blue-100 transition-all shadow-sm hover:shadow-lg hover:shadow-blue-50 group">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <s.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-xs text-gray-500 font-normal leading-relaxed mb-6">{s.desc}</p>
                <Link href={`/services/${s.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 font-bold text-sm">Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-24 relative w-full z-10 bg-white">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: `radial-gradient(#2563EB 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Upcoming Events & Workshops</h2>
            <p className="text-gray-500 font-normal max-w-2xl mx-auto text-sm">Reserve a slot in our upcoming technical panels and direct deployment system deep-dives.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {EVENTS.map((evt) => (
              <div key={evt.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col sm:flex-row hover:border-blue-100 transition-all group shadow-sm hover:shadow-lg">
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                  <img src={evt.img} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 text-xs text-blue-600 font-semibold tracking-wide">
                      <span>{evt.date}</span> &bull; <span>{evt.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{evt.title}</h3>
                    <p className="text-xs text-gray-500 font-normal line-clamp-2 leading-relaxed">{evt.desc}</p>
                    <p className="text-xs font-medium text-gray-400 italic flex items-center gap-1"><Activity className="w-3 h-3" /> {evt.location}</p>
                  </div>
                 <button
  onClick={() => {
    setEventTitle(evt.time);
    setEventDate(evt.date);
    setIsEventOpen(true);
    setEventFormSubmitted(false);
  }}
  className="w-full mt-4 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-100"
>
  Register For Event
</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section id="blogs" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Our Latest Publications</h2>
            <p className="text-gray-500 text-sm">Deep technical reading exploring AI design patterns, cloud computing pipelines, and data orchestration.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOGS.map((blog) => (
              <article key={blog.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-blue-100 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-blue-50/50">
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img src={blog.id === 2 ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60' : blog.img} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60'; }} />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-xs text-blue-600 font-bold tracking-wider uppercase">{blog.date}</span>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-snug line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed line-clamp-3">{blog.excerpt}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link href={`/blogs/${blog.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors">
                    Read Full Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="py-24 relative w-full z-10 bg-white border-t border-gray-100">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: `radial-gradient(#2563EB 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 text-center space-y-16 relative z-10">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
              <Rocket className="w-3.5 h-3.5" /> Join Our Team
            </span>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">Build the Future of <span className="text-blue-600">Enterprise Software</span></h2>
            <p className="text-gray-500 font-normal max-w-2xl mx-auto text-sm">Grow your skills while working on advanced data systems, enterprise integrations, and robust application suites.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
            {[
              { Icon: Monitor, title: "Modern Tech Stack", desc: "Work directly with Next.js, specialized back-end pipelines, and microservices architectures." },
              { Icon: TrendingUp, title: "Accelerated Mentorship", desc: "Collaborate under industry seniors and project leads to fast-track your engineering capabilities." },
              { Icon: Handshake, title: "Open Culture", desc: "Ownership driven developer ecosystems where clean logic and design are highly recognized." },
            ].map((perk, i) => (
              <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:border-blue-100 transition-all space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <perk.Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">{perk.title}</h3>
                <p className="text-xs text-gray-500 font-normal leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4 max-w-4xl mx-auto text-left">
            <h3 className="text-base font-bold text-gray-900 mb-4 px-2">Current Openings</h3>
            {[
              { title: 'Full Stack Web Developer Intern', dept: 'Engineering', type: 'Remote / Hybrid', desc: 'Assist in integrating robust Next.js layouts with fast enterprise API modules.' },
              { title: 'Backend Systems Engineer', dept: 'Cloud Infrastructure', type: 'Full-Time', desc: 'Build scalable business data layers, manage migrations, and secure telemetry hooks.' },
            ].map((job, idx) => (
              <div key={idx} className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-blue-100 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-sm hover:shadow-md">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                    <span className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">{job.type}</span>
                  </div>
                  <p className="text-[11px] text-blue-600 font-medium">{job.dept}</p>
                  <p className="text-xs text-gray-500 font-normal max-w-xl">{job.desc}</p>
                </div>
                <button onClick={() => { setApplyJobTitle(job.title); setIsApplyOpen(true); setApplyFormSubmitted(false); }} className="sm:self-center px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 active:scale-[0.98] transition-all whitespace-nowrap shadow-md shadow-blue-100">
  Apply Now
</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="aboutus" className="py-28 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none -z-10" style={{ backgroundImage: `radial-gradient(#2563EB 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <Briefcase className="w-3.5 h-3.5" /> Corporate Profile & Intelligence
            </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">Architecting the Software Ecosystems That Drive <span className="text-blue-600">Global Modern Enterprises</span></h2>
              <p className="text-gray-700 font-normal leading-relaxed text-base sm:text-lg">Founded on rigid software engineering principles, Almanet designs high-performance digital architectures that fundamentally eliminate structural bottlenecks. From deploying robust, integrated hospital lab modules and automated clinic workflows to delivering custom multi-tier SAP cloud management, we bridge advanced technical programming with localized business scale logic natively.</p>
              <p className="text-gray-600 font-light leading-relaxed text-sm">We believe that modern enterprise apps shouldn't operate in siloes. Our specialized approach centers on unifying fragmented data streams—ensuring that field actions, internal inventories, donor telemetry, and customer facing touchpoints speak to the same underlying analytical database engine fluidly and securely.</p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { val: '99.9%', label: 'System Uptime', desc: 'Guaranteed high-volume telemetry through redundant cloud pipelines.' },
                { val: '14+', label: 'Core Modules', desc: 'Production-ready system layers custom optimized for enterprise use.' },
                { val: '100%', label: 'Data Privacy', desc: 'Strict regulatory compliance layers built inside custom firewalls.' },
                { val: '2026', label: 'Industry Ready', desc: 'Advanced AI frameworks geared up for next-gen performance.' },
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-blue-100 transition-all">
                  <div className="text-4xl font-black text-blue-600">{stat.val}</div>
                  <div className="text-xs font-semibold text-gray-900 tracking-wider mt-1.5 uppercase">{stat.label}</div>
                  <p className="text-[11px] text-gray-500 font-normal mt-1.5 leading-normal">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <hr className="border-gray-100" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { Icon: Target, title: 'Our Mission', desc: 'To democratize heavy enterprise automation layers. We engineer robust, secure ecosystems that lower operational friction, making high-throughput tracking frameworks accessible.' },
              { Icon: ShieldCheck, title: 'Technical Mastery', desc: 'Specialized Python deep learning orchestration to comprehensive SAP configurations, our architecture relies heavily on microservice modularity for lightning-fast patterns.' },
              { Icon: Rocket, title: 'Talent Incubation', desc: 'Integrated internship systems and expert-led training ensure upcoming developers master full-stack code paths using live production environments.' },
            ].map((pillar, i) => (
              <div key={i} className="space-y-3 p-8 rounded-3xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <pillar.Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">{pillar.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 text-gray-600 pt-16 pb-12 border-t border-gray-100 text-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex flex-col items-start space-y-4">
              <div className="h-18 w-auto">
                <img src="/almanet-logo.png" alt="AlmaNet Official Logo" className="h-full w-auto object-contain" style={{ mixBlendMode: 'multiply' }} />
              </div>
              <p className="text-xs text-gray-500 font-normal max-w-xs leading-relaxed">Empowering organizations with next-generation enterprise suites, automated modules, and secure cloud pipelines.</p>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-normal">Architecting secure data pipelines, next-generation healthcare integrations, and custom business automation tools engineered to empower modern enterprise initiatives globally.</p>
            <div className="flex space-x-3 pt-2">
              {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((platform) => (
                <button key={platform} onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="h-8 px-3 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-all tracking-wide">{platform}</button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase">Sitemap</h4>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              {['Home', 'Products', 'Services', 'Events', 'Blogs', 'About Us'].map((item) => (
                <li key={item}><button onClick={() => handleScroll(item.toLowerCase().replace(' ', ''))} className="hover:text-blue-600 transition-colors">{item}</button></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase">Core Products</h4>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              {['Pathyatech Ecosystem', 'Trackintrack Fleet', 'Almanet CRM Matrix', 'NGO Global Portal', 'Vendor Supply Connect', 'Lab Module Hub'].map((prod) => (
                <li key={prod}><button onClick={() => handleScroll('products')} className="hover:text-blue-600 transition-colors text-left">{prod}</button></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase">Stay Informed</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-normal">Subscribe to unlock periodic engineering research insights and version release blueprints.</p>
            <form onSubmit={(e) => { e.preventDefault(); setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="space-y-2">
              <input type="email" required placeholder="engineering@domain.com" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 outline-none focus:border-blue-600 transition-all" />
              <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold tracking-wide transition-all">Join Telemetry</button>
            </form>
          </div>
        </div>
        <hr className="border-gray-200 max-w-7xl mx-auto px-6 mb-8" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span className="text-gray-900 font-semibold">Almanet Technologies © 2026</span>
            <span>&bull;</span>
            <span>All System Telemetry Operational</span>
          </div>
          <div className="flex space-x-6">
            <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="hover:text-blue-600 transition-colors">Security Controls</button>
            <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="hover:text-blue-600 transition-colors">Privacy Framework</button>
            <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="hover:text-blue-600 transition-colors">Terms of Operations</button>
          </div>
        </div>
      </footer>

      {/* MODAL: REGISTER */}
    {isRegisterOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(30,40,80,0.45)', backdropFilter: 'blur(6px)' }}>
    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Close button */}
      <button
        onClick={() => { setIsRegisterOpen(false); setRegFormSubmitted(false); }}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-bold z-20 h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
      >
        &times;
      </button>

      <div className="p-8">
        {!regFormSubmitted ? (
          <form onSubmit={sendEmail} className="space-y-5">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Get in Touch</h2>
              <p className="text-sm text-slate-400">Fill in your details below. We'll reach out shortly.</p>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name *</label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input name="user_name" type="text" required placeholder="John Doe" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none" />
              </div>
            </div>

            {/* Email + Phone row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Email *</label>
                <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input name="user_email" type="email" required placeholder="name@co.com" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <input name="user_phone" type="tel" placeholder="10-digit" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0" />
                </div>
              </div>
            </div>

            {/* Interest */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Interest *</label>
              <div className="border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <select name="user_interest" required className="w-full bg-transparent text-sm text-slate-800 outline-none">
                  <option value="">Select an option...</option>
                  <option value="Product Integration">Product Integration</option>
                  <option value="SAP Consulting">SAP Consulting</option>
                  <option value="Professional Training">Professional Training</option>
                  <option value="Custom AI Development">Custom AI Development</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</label>
              <div className="border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <textarea name="message" rows={3} placeholder="Tell us about your project..." className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none resize-none" />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
              Create Account
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Sign in link */}
            <p className="text-center text-sm text-slate-400">
              Already registered?{' '}
              <button type="button" onClick={() => setIsRegisterOpen(false)} className="text-blue-600 font-semibold hover:underline">
                Sign in
              </button>
            </p>
          </form>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Request Submitted!</h3>
            <p className="text-sm text-slate-500">Our team will reach out within one business cycle.</p>
            <button
              onClick={() => { setIsRegisterOpen(false); setRegFormSubmitted(false); }}
              className="mt-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
)}

{/* MODAL: APPLY */}
{isApplyOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(30,40,80,0.45)', backdropFilter: 'blur(6px)' }}>
    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden">
      <button
        onClick={() => { setIsApplyOpen(false); setApplyFormSubmitted(false); }}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-bold z-20 h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
      >
        &times;
      </button>

      <div className="p-8">
        {!applyFormSubmitted ? (
          <form onSubmit={sendApplication} className="space-y-5">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Apply Now</h2>
              {/* Job title pre-filled dikhega */}
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">{applyJobTitle}</span>
              <p className="text-sm text-slate-400">Fill in your details. Our HR team will reach out shortly.</p>
            </div>

            {/* Hidden field — job title EmailJS ko jayega */}
            <input type="hidden" name="job_title" value={applyJobTitle} />

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name *</label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input name="user_name" type="text" required placeholder="John Doe" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none" />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Email *</label>
                <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input name="user_email" type="email" required placeholder="you@mail.com" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <input name="user_phone" type="tel" placeholder="10-digit" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0" />
                </div>
              </div>
            </div>

            {/* Portfolio / LinkedIn */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Portfolio / LinkedIn URL</label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 015.656 0l4-4a4 4 0 01-5.656-5.656l-1.102 1.101" />
                </svg>
                <input name="portfolio_url" type="url" placeholder="https://linkedin.com/in/yourname" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none" />
              </div>
            </div>

            {/* Cover Note */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Cover Note</label>
              <div className="border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <textarea name="message" rows={3} placeholder="Why are you a great fit for this role?" className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none resize-none" />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
              Submit Application
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
            <p className="text-sm text-slate-500">We'll review your profile and get back to you soon.</p>
            <button
              onClick={() => { setIsApplyOpen(false); setApplyFormSubmitted(false); }}
              className="mt-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
)}
{/* MODAL: EVENT REGISTRATION */}
{isEventOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(30,40,80,0.45)', backdropFilter: 'blur(6px)' }}>
    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden">
      <button
        onClick={() => { setIsEventOpen(false); setEventFormSubmitted(false); }}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-bold z-20 h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
      >
        &times;
      </button>

      <div className="p-8">
        {!eventFormSubmitted ? (
          <form onSubmit={sendEventRegistration} className="space-y-5">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Event Registration</h2>
              {/* Event name pre-filled */}
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-center">{eventTitle}</span>
              <span className="text-xs text-slate-400">{eventDate}</span>
            </div>

            {/* Hidden fields */}
            <input type="hidden" name="event_title" value={eventTitle} />
            <input type="hidden" name="event_date" value={eventDate} />

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name *</label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input name="user_name" type="text" required placeholder="John Doe" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none" />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Email *</label>
                <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input name="user_email" type="email" required placeholder="you@mail.com" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <input name="user_phone" type="tel" placeholder="10-digit" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0" />
                </div>
              </div>
            </div>

            {/* Organization */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Organization / Company</label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <input name="organization" type="text" placeholder="Your company name" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Any Questions?</label>
              <div className="border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <textarea name="message" rows={2} placeholder="Any specific topics you'd like covered..." className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none resize-none" />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
              Confirm Registration
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Registration Confirmed!</h3>
            <p className="text-sm text-slate-500">You're registered for <span className="text-blue-600 font-semibold">{eventTitle}</span>. We'll send details to your email.</p>
            <button
              onClick={() => { setIsEventOpen(false); setEventFormSubmitted(false); }}
              className="mt-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
)}
      {/* MODAL: BLOG VIEWER */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-start justify-center p-4 pt-16 md:pt-28 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl relative max-h-[85vh] flex flex-col mb-8">
            <button onClick={() => setActiveBlog(null)} className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white text-lg bg-slate-900/80 backdrop-blur-md h-8 w-8 rounded-full flex items-center justify-center border border-slate-700 transition-colors">&times;</button>
            <div className="overflow-y-auto">
              <div className="h-64 sm:h-80 w-full relative shrink-0">
                <img src={activeBlog.id === 2 ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80' : activeBlog.img} alt={activeBlog.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              </div>
              <div className="p-6 md:p-10 space-y-4 relative -mt-10 bg-slate-900 rounded-t-xl">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">{activeBlog.date}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">{activeBlog.title}</h2>
                <h3 className="text-sm font-medium text-slate-400 italic -mt-2">{activeBlog.excerpt}</h3>
                <hr className="border-slate-800" />
                <p className="text-slate-300 leading-relaxed font-light text-base md:text-lg whitespace-pre-line">{activeBlog.content}</p>
                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>Author: Almanet Core Engineering</span>
                  <span>Category: Technology / Scalability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EVENT REGISTRATION */}
      {activeEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16 md:pt-28 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative max-h-[85vh] flex flex-col mb-8">
            <button onClick={() => setActiveEvent(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 h-8 w-8 rounded-full flex items-center justify-center border border-slate-700 z-20 transition-colors">&times;</button>
            <div className="overflow-y-auto">
              <div className="h-40 relative shrink-0">
                <img src={activeEvent.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              </div>
              <div className="p-6 space-y-4">
                {!eventFormSubmitted ? (
                  <form onSubmit={(e) => { e.preventDefault(); setEventFormSubmitted(true); }} className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">{activeEvent.date} @ {activeEvent.time}</span>
                      <h3 className="text-xl font-bold text-white tracking-tight">Seat Reservation: {activeEvent.title}</h3>
                      <p className="text-xs text-slate-400 italic flex items-center gap-1"><Activity className="w-3 h-3" /> {activeEvent.location}</p>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{activeEvent.desc}</p>
                    <hr className="border-slate-800" />
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Your Full Name</label>
                        <input type="text" required placeholder="John Doe" className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-emerald-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Email Address</label>
                        <input type="email" required placeholder="john@example.com" className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-emerald-500" />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all hover:opacity-90">Confirm Free Reservation Slot</button>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-3">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20"><CheckCircle className="w-6 h-6" /></div>
                    <h4 className="text-lg font-bold text-white">Ticket Confirmed!</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">We emailed pass tokens and platform calendar integration invites matching your structured parameters.</p>
                    <button onClick={() => { setActiveEvent(null); setEventFormSubmitted(false); }} className="px-4 py-1.5 text-xs bg-slate-800 hover:text-white rounded-md text-slate-400 border border-slate-700">Dismiss</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRODUCT DETAIL */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-4 pt-6 md:pt-12 overflow-y-auto">
          <div className="bg-slate-900 border-2 border-slate-800 max-w-5xl w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(74,119,188,0.15)] relative max-h-[92vh] flex flex-col mb-8 text-slate-200">
            <div className="h-64 w-full relative shrink-0 border-b border-slate-800">
              <img src={activeProduct?.name?.toLowerCase().includes('pathyatech') ? "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&auto=format&fit=crop&q=80" : (activeProduct?.img || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80")} alt="" className="w-full h-full object-cover brightness-[0.85]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              <button onClick={() => setActiveProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl bg-slate-950/90 h-10 w-10 rounded-full flex items-center justify-center border border-slate-700 shadow-xl transition-transform hover:scale-110">&times;</button>
            </div>
            <div className="overflow-y-auto p-6 md:p-10 space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20 uppercase tracking-widest">Core Product Engine</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">v4.2 Stable Release</span>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md ml-auto">ID: #{activeProduct?.id || 'PROD-90X'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight -mt-4">{activeProduct?.name}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Functional Overview</h3>
                    <p className="text-slate-300 font-light text-base leading-relaxed">{activeProduct?.desc || "High-performance enterprise infrastructure component."}</p>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Standard Integrated Capability Modules</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
                      {['Automated Hot-Swap Failover Engine', 'Live Telemetry Exporter Hooks', 'Encrypted High-Volume Matrix Sync', 'Role-Based IAM Access Rules', 'Multi-Region Database Sharding', 'Low Latency Cache Routing'].map((f, i) => (
                        <div key={i} className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" /> {f}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4 bg-slate-950/80 border-2 border-slate-800/60 p-5 rounded-2xl h-fit">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Technical Matrix Sheet</h3>
                  {[
                    { label: "Deployment Structure", val: "Docker / Kubernetes" },
                    { label: "Compliance Standard", val: "ISO 27001 / SOC2 Ready" },
                    { label: "Data Pipeline", val: "Kafka / Redis Streams" },
                    { label: "Maximum API Latency", val: "< 8ms Peak Load" },
                    { label: "Bandwidth Threshold", val: "Unlimited Node Pools" },
                    { label: "License Type", val: "Commercial SaaS / On-Premise" },
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col border-b border-slate-800 pb-2 text-xs">
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="text-slate-200 font-semibold mt-0.5">{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
                <div className="text-xs text-slate-500">Need a sandbox environment setup? Contact system engineers directly.</div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); setActiveProduct(null); }} className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-all">Request Enterprise License</button>
                  <button onClick={() => setActiveProduct(null)} className="px-5 py-3 rounded-xl border border-slate-800 text-slate-400 font-medium text-xs hover:bg-slate-800/40">Close Sheet</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SERVICE DETAIL */}
      {activeService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-4 pt-6 md:pt-12 overflow-y-auto">
          <div className="bg-slate-900 border-2 border-slate-800 max-w-4xl w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] relative max-h-[92vh] flex flex-col mb-8 text-slate-200">
            <button onClick={() => setActiveService(null)} className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white text-lg bg-slate-950/90 h-10 w-10 rounded-full flex items-center justify-center border border-slate-700 transition-transform hover:scale-110">&times;</button>
            <div className="overflow-y-auto p-6 md:p-10 space-y-8">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                  <Settings className="w-3 h-3" /> Strategy & Custom Execution
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{activeService?.title}</h2>
              </div>
              <hr className="border-slate-800" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2 h-48 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-3 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Paradigm & Methodology</h3>
                  <p className="text-slate-300 font-light text-sm leading-relaxed">{activeService?.desc || "Providing standard architecture consulting, system pipeline optimization, and deployment strategy layouts customized for long-term scalability."}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white tracking-wide">Standard Execution Milestones & Delivery Phases</h3>
                <div className="space-y-3">
                  {[
                    { color: 'emerald', num: '1', title: 'Phase 01: Audit Discovery & Scoping Loop (Week 1)', desc: 'Deep inspection of current system architecture, tracing API bottleneck matrices, and mapping target telemetry thresholds.' },
                    { color: 'teal', num: '2', title: 'Phase 02: Blueprinting & Pipeline Refactoring (Week 2-3)', desc: 'Developing targeted middleware scripts, custom router setups, and configuration layers to optimize active database query pools.' },
                    { color: 'indigo', num: '3', title: 'Phase 03: Simulated Stress Tests & Handover (Week 4)', desc: 'Subjecting backend channels to intense mock traffic protocols. Validation analysis generation and safe production rollout sign-off.' },
                  ].map((phase, i) => (
                    <div key={i} className={`p-4 bg-slate-950/40 border-l-4 border-${phase.color}-500 rounded-r-xl space-y-1`}>
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <span className={`bg-${phase.color}-500/20 text-${phase.color}-400 h-5 w-5 rounded-full flex items-center justify-center text-[10px]`}>{phase.num}</span>
                        {phase.title}
                      </div>
                      <p className="text-xs text-slate-400 pl-7 font-light">{phase.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
                  <h4 className="text-xs font-bold text-emerald-400 mb-1">Expected Deliverables</h4>
                  <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1 font-light">
                    <li>Full-Stack Integration Architecture Maps</li>
                    <li>Production Pipeline Performance Metrics</li>
                    <li>SLA Compliance Certificates</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
                  <h4 className="text-xs font-bold text-emerald-400 mb-1">Resource Allocation</h4>
                  <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1 font-light">
                    <li>Dedicated Project Lead & Senior Architect</li>
                    <li>24/7 Priority Emergency Channel Support</li>
                    <li>Weekly Synchronization Framework Reviews</li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button onClick={() => setActiveService(null)} className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 font-medium text-xs hover:bg-slate-800/40">Dismiss</button>
                <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); setActiveService(null); }} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-all">Initiate Project Scope Audit</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
