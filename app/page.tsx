"use client";

import React, { useState } from 'react';

// --- MOCK DATA ---
const PRODUCTS = [
  { id: 'pathyatech', name: 'PathyaTech', desc: 'Next-gen healthcare management and automation systems.', img: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=500&auto=format&fit=crop&q=60' },
  { id: 'trackintake', name: 'Trackintake', desc: 'Real-time logistics, asset, and fleet tracking intelligence.', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60' },
  { id: 'crm', name: 'CRM -  Unified Customer Relationship Platform', desc: 'Seamless customer relationship management to scale sales.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60' },
  { id: 'ngo', name: 'NgoConnect - Non-Profit Management System', desc: 'All-in-one digital ecosystems for non-profit operations.', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=60' },
  { id: 'vendor', name: 'VendorSync - Vendor & Procurement Management', desc: 'Streamlined supply chain and vendor management portals.', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=60' },
  { id: 'lab', name: 'LabCore LIMS - Laboratory Information Management System', desc: 'Advanced laboratory information systems for precise diagnostics.', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60' },
  { id: 'doctor', name: 'MedConsult Live - Telehealth & Doctor Consultation Platform', desc: 'Telehealth and clinic appointment scheduler for modern doctors.', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=60' },
];

const SERVICES = [
  { name: 'SAP Consulting & Implementation Services', desc: 'Enterprise resource planning tailoring and structural deployment.', img: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=500&auto=format&fit=crop&q=60' },
  { name: 'SAP VTO Solutions - Vendor Transition & Optimization', desc: 'Virtual Training Optimization for enterprise-level workforce agility.', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=60' },
  { name: 'Enterprise SAP Training Programs', desc: 'Hands-on SAP module certifications led by global industry experts.', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60' },
  { name: 'Tech Internship & Industry Readiness Program', desc: 'Real-world project exposure for promising tech talents.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60' },
  { name: 'AI & Machine Learning with Python - Professional Certification ', desc: 'Master Deep Learning, Neural Networks, and Predictive Models.', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60' },
  { name: 'AI Solutions & Custom Software Development', desc: 'Bespoke LLM integrations and automation custom-built for your business.', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80' },
  { name: ' Digital Marketing & Growth Services', desc: 'Data-driven SEO, SEM, and performance marketing frameworks.', img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500&auto=format&fit=crop&q=60' },
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

    Through proper data pipelines built in Python, companies can save up to 40% of standard operating costs. The roadmap requires patience, but early adopters are already building wide, unassailable product moats around their logistics and client retention operations.`, 
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60' 
  },
  { 
    id: 2, 
    title: 'Optimizing Logistics with Trackintrack', 
    excerpt: 'Why real-time tracking is vital for modern supply-chain compliance...', 
    date: 'May 28, 2026', 
    content: `In a globalized marketplace, knowing where your assets are is only half the battle. True supply-chain resilience depends on deep predictive insights. Predictive arrival times, atmospheric monitoring for delicate medical laboratory equipment, and route optimization algorithms are defining the modern logistics sector.

    Trackintrack merges hardware precision with elegant analytical software to ensure your deliverables never face unmitigated delays. By deploying IoT arrays across fleet frameworks, fleet owners don't just see a dot on a map—they gain clear visibility into driver health patterns, ambient cabin temperatures, fuel efficiency variances, and road quality dynamics.

    ### Overcoming Modern Distribution Bottlenecks
    Traditional tracking setups rely on manual entry points, which introduce human error and systemic lag. Our unified telemetry approach bridges this gap by introducing automated geofencing check-ins. As soon as a cargo container enters a custom perimeter, the system automatically runs billing processes, updates stock availability maps, and generates shipping handoffs instantly.

    Furthermore, real-time alert triggers mean that if transit temperatures drop below a critical threshold for perishables or lab modules, an autonomous rerouting order is initiated immediately. This proactive mitigation architecture prevents thousands of dollars in lost inventory every single financial quarter.`, 
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60' 
  },
  { 
    id: 3, 
    title: 'Why SAP Cloud Transformation is Crucial', 
    excerpt: 'Migrating legacy frameworks to cloud instances safely...', 
    date: 'May 14, 2026', 
    content: `Legacy setups expose modern organizations to severe cybersecurity liabilities, fractured data environments, and scaling constraints. Transitioning to an SAP Cloud framework optimizes cross-department tracking, enables virtual training modules (VTO) seamlessly, and guarantees that real-time database updates can occur globally without causing standard workflow down-time.

    Moving to the cloud isn't just about modernizing hardware; it's a fundamental shift in business agility. In an on-premise model, expanding capacity means buying expensive equipment and waiting weeks for deployment. Cloud architecture removes this delay entirely, letting you scale server power up or down instantly based on live traffic demands.

    ### Seamless Migration Protocols
    A successful structural migration requires a disciplined approach to prevent data downtime:
    * Detailed Pre-Migration Assessments: Auditing all existing custom database scripts to flag potential transition errors early.
    * Phased Parallel Processing Paths: Running old database frameworks alongside the new cloud environment to verify data consistency under live loads.
    * Comprehensive Workforce Training: Equipping administrative teams with intuitive tools via modern virtual training simulations.

    When data moves fluidly across departments, leadership teams can make informed decisions based on real-time facts rather than waiting for slow end-of-month financial rollups.`, 
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60' 
  },
  { 
    id: 4, 
    title: 'Revolutionizing Healthcare via Tech Modules', 
    excerpt: 'Bridging the disconnect between patient consulting and laboratories...', 
    date: 'April 30, 2026', 
    content: `Medical workflows have historically suffered from siloed departments. When a patient schedules a doctor consultation, data should effortlessly communicate with lab modules and pharmacy tracking software. Pathyatech offers integrated clinical pipelines that protect privacy while radically accelerating patient turnaround times.

    When a doctor prescribes a specialized diagnostic report during an active consultation, the laboratory system should prepare testing materials before the patient even walks through the door. This fluid handoff cuts down administrative delays and minimizes human error in matching medical charts.

    ### Elevating Operational Patient Care
    * Unified Electronic Records: Bringing patient histories, allergies, and diagnostic data into a secure, single-pane dashboard.
    * Automated Lab Tracking: Instant tracking notifications from sample gathering up to final digital sign-off.
    * Smart Appointment Pipelines: Dynamic booking schedules that auto-adjust based on real-time room availability and emergency prioritize alerts.

    By using encrypted data pipelines, we maintain strict regulatory privacy standards while keeping internal systems lightning fast. Doctors can focus on medical treatment rather than hunting down missing paperwork.`, 
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60' 
  },
  { 
    id: 5, 
    title: 'Building Impactful Apps for Non-Profits', 
    excerpt: 'How tailored software architecture helps NGOs unlock global funding...', 
    date: 'April 15, 2026', 
    content: `NGOs operate under rigid compliance standards and demand transparent financial tracking. Utilizing tailored digital portal systems allows these organizations to present audited data transparently to institutional benefactors, automate donor engagement campaigns through basic integrated CRMs, and direct valuable time toward localized humanitarian efforts.

    A clean digital portal acts as a bridge of trust between local field projects and international grant distribution frameworks. When global donors can track exactly how every dollar impacts communities in real time, engagement and retention metrics increase exponentially.

    ### Foundational Portals for Global Outreach
    Modern non-profit tech stacks prioritize three main areas:
    1. Automated Audit Trails: Documenting asset distribution instantly to satisfy international regulatory checks.
    2. Flexible Contribution Frameworks: Setting up multi-currency, secure donation endpoints that support both one-time contributions and long-term sponsorships.
    3. Multi-Platform Field Portals: Creating lightweight mobile entry forms that work reliably in remote areas with low network connectivity.

    Giving grassroots teams modern data management tools helps non-profits scale operational visibility and unlock larger funding pipelines globally.`, 
    img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=60' 
  },
  { 
    id: 6, 
    title: 'Mastering Python for Machine Learning', 
    excerpt: 'A clear roadmap for engineering students entering AI careers...', 
    date: 'March 02, 2026', 
    content: `Starting your career path in modern engineering requires moving past mere syntax logic. True expertise relies on evaluating matrix math, parsing complex data pools via Pandas, and training adaptive algorithms in frameworks like TensorFlow or PyTorch. Our structured internships ensure candidates gain hands-on production codebase experience.

    The demand for junior engineers who simply copy-paste boilerplates is dropping quickly. Today's tech sector actively hunts for individuals who deeply understand algorithmic theory, data cleanup pipelines, and training efficiencies.

    ### Key Pillars of Advanced AI Learning
    * Exploratory Analysis: Learning to spot underlying patterns and clean up anomalies in messy datasets before training begins.
    * Custom Network Tuning: Understanding how learning rates, layer depths, and activation functions impact model convergence.
    * Cost-Effective Cloud Deployments: Packaging trained models into fast Docker containers to optimize infrastructure costs under production stress.

    By matching deep theoretical study with practical development cycles, developers can build the skills needed to build next-generation machine learning tools.`, 
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60' 
  }
];

const EVENTS = [
  { id: 1, title: 'Global Tech & AI Summit 2026', date: 'July 15, 2026', time: '10:00 AM EST', location: 'Virtual / Zoom Live', desc: 'Dive deep into structural automated frameworks and next-gen Python AI developments with elite international developers.', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60' },
  { id: 2, title: 'SAP Enterprise Integration Workshop', date: 'August 03, 2026', time: '02:00 PM EST', location: 'Hybrid / Chicago Hub', desc: 'A rigorous hands-on technical masterclass covering multi-module SAP architecture migrations and data modeling optimizations.', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=60' },
];

export default function AlmanetWebsite() {
  // Modal states
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeBlog, setActiveBlog] = useState<typeof BLOGS[0] | null>(null);
  const [activeEvent, setActiveEvent] = useState<typeof EVENTS[0] | null>(null);
const [activeProduct, setActiveProduct] = useState<any>(null);
const [activeService, setActiveService] = useState<any>(null);
  // Form states
  const [regFormSubmitted, setRegFormSubmitted] = useState(false);
  const [eventFormSubmitted, setEventFormSubmitted] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
<div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-900 overflow-x-hidden">
      
      {/* LOCK WRAPPER PASTE HERE: Yeh poori website ko image_3a43.jpg ki tarah center me lock rakhega */}
      <div className="max-w-[1366px] mx-auto w-full bg-slate-900 shadow-2xl relative">     
      {/* --- HEADER NAVIGATION --- */}
     <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 transition-all">
  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
     <div 
  className="flex items-center cursor-pointer select-none h-32 py-1 pl-2" 
  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
>
  {/* Ultra High-Visibility Big 3D Frame Container */}
  <div className="h-28 py-2 px-2.5 bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl flex items-center justify-center relative transition-all duration-300 hover:border-teal-400/80 shadow-[0_15px_40px_rgba(0,0,0,0.95)] hover:shadow-[0_0_45px_rgba(74,119,188,0.5)] group">
    
    {/* Ultra Background Glow Pulse Effect */}
    <div className="absolute -inset-1.5 bg-gradient-to-r from-[#4A77BC]/50 via-teal-500/35 to-[#C85A32]/50 rounded-2xl blur-lg opacity-90 group-hover:opacity-100 transition duration-300 -z-10 animate-pulse" />

    {/* Max Size Logo Asset */}
    <div className="h-full relative flex items-center transition-transform duration-300 hover:scale-[1.06] active:scale-[0.96]">
      <img 
        src="/almanet01_logo.jpg" 
        alt="AlmaNet Official" 
        className="h-full w-auto object-contain rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.6)] border border-white/10" 
      />
    </div>

  </div>
</div>
    </div>
    
    {/* Navigation Buttons - Added 'Careers' */}
    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-slate-300">
      {['Home', 'Products', 'Services', 'Events', 'Blogs', 'Careers', 'About Us'].map((item) => (
        <button 
          key={item} 
          onClick={() => handleScroll(item.toLowerCase().replace(' ', ''))}
          className="hover:text-teal-400 transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-teal-400 after:transition-all"
        >
          {item}
        </button>
      ))}
    </nav>

    <div>
      <button 
        onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }}
        className="bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-teal-400/20 hover:shadow-emerald-400/30 hover:scale-[1.03] active:scale-[0.98] transition-all"
      >
        Get in Touch
      </button>
    </div>
  </div>
</header>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,191,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(79,70,229,0.1),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" /> Next Generation Digital Ecosystems
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Empowering Ideas via <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">Advanced Intelligence</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
              Almanet builds foundational automation suites, customized corporate SAP transformations, and machine learning models engineered to elevate complex modern business initiatives.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <button onClick={() => handleScroll('products')} className="px-6 py-3 rounded-xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition-all border border-slate-700">
                Explore Products
              </button>
              <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-all">
                Register Platform
              </button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-3xl blur opacity-30 animate-pulse" />
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" 
              alt="Almanet Digital Ecosystem Dashboard" 
              className="rounded-2xl border border-slate-700 shadow-2xl relative z-10 max-w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

    {/* --- PRODUCTS SECTION (UPDATED) --- */}
<section id="products" className="py-20 relative w-full z-10 border-t border-slate-800">
  <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 text-center space-y-12">
    <div className="space-y-3">
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Enterprise Scaling Products</h2>
      <p className="text-slate-400 font-light max-w-2xl mx-auto text-sm">Robust system modules custom optimized to run high-volume workflows fluidly.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {PRODUCTS && PRODUCTS.map((prod: any, idx: number) => (
        <div key={prod?.id || prod?.title || idx} className="group rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md p-5 space-y-4 hover:border-slate-700/50 transition-all text-left flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <div className="h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              <img 
                src={
                  (prod?.title?.toLowerCase().includes('pathyatech') || prod?.name?.toLowerCase().includes('pathyatech'))
                    ? "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80"
                    : (prod?.img || prod?.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80")
                } 
                alt="" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">{prod?.title || prod?.name || "Product"}</h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">{prod?.desc || prod?.description || ""}</p>
          </div>
          {/* Click to open Full Detail Page */}
          <button 
            onClick={() => setActiveProduct(prod)} 
            className="text-xs font-semibold text-teal-400 group-hover:text-emerald-400 pt-3 flex items-center gap-1 transition-colors"
          >
            Explore Specifications &rarr;
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

    {/* --- SERVICES SECTION (UPDATED) --- */}
<section id="services" className="py-20 relative w-full z-10 border-t border-slate-800">
  <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 text-center space-y-12">
    <div className="space-y-3">
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Our Professional Services</h2>
      <p className="text-slate-400 font-light max-w-2xl mx-auto text-sm">Providing operational consultancy, custom execution algorithms, and workspace expansion paths.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {SERVICES && SERVICES.map((serv: any, idx: number) => (
        <div key={serv?.id || serv?.title || idx} className="group rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md p-6 text-left space-y-4 hover:border-slate-700/50 transition-all flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="h-44 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <img src={serv?.img || serv?.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"} alt="" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">{serv?.title || serv?.name || "Service"}</h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">{serv?.desc || serv?.description || ""}</p>
          </div>
          {/* Click to open Full Detail Page */}
          <button 
            onClick={() => setActiveService(serv)} 
            className="text-xs font-bold tracking-wider text-teal-400 group-hover:text-emerald-400 uppercase pt-2 transition-colors"
          >
            Review Service Architecture &rarr;
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* --- EVENTS SECTION --- */}
      <section id="events" className="py-24 border-t border-slate-800/60 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Upcoming Events & Workshops</h2>
            <p className="text-slate-400">Reserve a slot in our upcoming technical panels and direct deployment system deep-dives.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {EVENTS.map((evt) => (
              <div key={evt.id} className="bg-slate-800/40 border border-slate-800 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-slate-700 transition-all group shadow-xl">
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                  <img src={evt.img} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 text-xs text-emerald-400 font-semibold tracking-wide">
                      <span>{evt.date}</span> &bull; <span>{evt.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">{evt.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{evt.desc}</p>
                    <p className="text-xs font-medium text-slate-500 italic">📌 {evt.location}</p>
                  </div>
                  <button 
                    onClick={() => { setActiveEvent(evt); setEventFormSubmitted(false); }}
                    className="w-full py-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-500 font-bold text-xs tracking-wider transition-all"
                  >
                    Register For Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BLOGS SECTION --- */}
      <section id="blogs" className="py-24 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Our Latest Publications</h2>
            <p className="text-slate-400">Deep technical reading exploring AI design patterns, cloud computing pipelines, and data orchestration.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOGS.map((blog) => (
              <article key={blog.id} className="bg-slate-800/30 border border-slate-800/80 rounded-2xl overflow-hidden hover:scale-[1.02] hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between shadow-md">
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src={blog.id === 2 ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60' : blog.img} 
                      alt={blog.title} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        // Global fallback check for all blog images
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-40" />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-xs text-teal-400 font-semibold tracking-wider uppercase">{blog.date}</span>
                    <h3 className="text-xl font-bold text-white tracking-tight leading-snug line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-3">{blog.excerpt}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button 
                    onClick={() => setActiveBlog(blog)}
                    className="text-sm font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition-colors"
                  >
                    Read Full Article &rarr;
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

     {/* --- CAREERS SECTION (DARK THEME COMPATIBLE) --- */}
<section id="careers" className="py-20 relative w-full z-10 border-t border-slate-800 bg-transparent">
  <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 text-center space-y-16">
    <div className="space-y-3">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
        🚀 Join Our Team
      </span>
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        Build the Future of <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Enterprise Software</span>
      </h2>
      <p className="text-slate-400 font-light max-w-2xl mx-auto text-sm">
        Grow your skills while working on advanced data systems, enterprise integrations, and robust application suites.
      </p>
    </div>

    {/* Perks Cards - Translucent Glassmorphism */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
      <div className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm space-y-3">
        <div className="text-xl">💻</div>
        <h3 className="text-sm font-bold text-slate-200">Modern Tech Stack</h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed">Work directly with Next.js, specialized back-end pipelines, and microservices architectures built to scale flawlessly.</p>
      </div>
      <div className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm space-y-3">
        <div className="text-xl">📈</div>
        <h3 className="text-sm font-bold text-slate-200">Accelerated Mentorship</h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed">Collaborate under industry seniors and project leads to fast-track your practical system engineering capabilities.</p>
      </div>
      <div className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm space-y-3">
        <div className="text-xl">🤝</div>
        <h3 className="text-sm font-bold text-slate-200">Open Culture</h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed">Ownership driven developer ecosystems where optimal design and clean logic are highly recognized.</p>
      </div>
    </div>

    {/* Job Cards - Sleek Dark Row Panels */}
    <div className="space-y-4 max-w-4xl mx-auto text-left">
      <h3 className="text-base font-bold text-slate-200 mb-4 px-2">Current Openings</h3>
      
      {[
        { title: 'Full Stack Web Developer Intern', dept: 'Engineering', type: 'Remote / Hybrid', desc: 'Assist in integrating robust Next.js layouts with fast enterprise API modules.' },
        { title: 'Backend Systems Engineer', dept: 'Cloud Infrastructure', type: 'Full-Time', desc: 'Build scalable business data layers, manage migrations, and secure telemetry hooks.' }
      ].map((job, idx) => (
        <div key={idx} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">{job.title}</h4>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">{job.type}</span>
            </div>
            <p className="text-[11px] text-teal-400/80 font-medium">{job.dept}</p>
            <p className="text-xs text-slate-400 font-light max-w-xl">{job.desc}</p>
          </div>
          <button 
            onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }}
            className="sm:self-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 font-bold text-xs hover:opacity-90 active:scale-[0.98] transition-all whitespace-nowrap text-center shadow-md shadow-teal-500/10"
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* --- EXTENDED HIGH-IMPACT ABOUT US SECTION --- */}
      <section id="aboutus" className="py-28 border-t border-slate-800/60 bg-gradient-to-b from-slate-950/40 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(45,212,191,0.03),transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          
          {/* Main Structural Introduction */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                🏢 Corporate Profile & Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Architecting the Software Ecosystems That Drive <span className="bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">Global Modern Enterprises</span>
              </h2>
              <p className="text-slate-300 font-light leading-relaxed text-base sm:text-lg">
                Founded on rigid software engineering principles, Almanet designs high-performance digital architectures that fundamentally eliminate structural bottlenecks. From deploying robust, integrated hospital lab modules and automated clinic workflows to delivering custom multi-tier SAP cloud management, we bridge advanced technical programming with localized business scale logic natively.
              </p>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                We believe that modern enterprise apps shouldn't operate in siloes. Our specialized approach centers on unifying fragmented data streams—ensuring that field actions, internal inventories, donor telemetry, and customer facing touchpoints speak to the same underlying analytical database engine fluidly and securely.
              </p>
            </div>
            
            {/* Visual Stats Block Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 shadow-md">
                <div className="text-3xl font-black text-teal-400">99.9%</div>
                <div className="text-xs font-semibold text-slate-200 tracking-wider mt-1 uppercase">System Uptime</div>
                <p className="text-[11px] text-slate-500 font-light mt-1.5 leading-normal">Guaranteed high-volume telemetry through redundant cloud pipelines.</p>
              </div>
              <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 shadow-md">
                <div className="text-3xl font-black text-indigo-400">14+</div>
                <div className="text-xs font-semibold text-slate-200 tracking-wider mt-1 uppercase">Core Modules</div>
                <p className="text-[11px] text-slate-500 font-light mt-1.5 leading-normal">Production-ready system layers custom optimized for enterprise use.</p>
              </div>
              <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 shadow-md">
                <div className="text-3xl font-black text-emerald-400">100%</div>
                <div className="text-xs font-semibold text-slate-200 tracking-wider mt-1 uppercase">Data Privacy</div>
                <p className="text-[11px] text-slate-500 font-light mt-1.5 leading-normal">Strict regulatory compliance layers built inside custom firewalls.</p>
              </div>
              <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 shadow-md">
                <div className="text-3xl font-black text-purple-400">2026</div>
                <div className="text-xs font-semibold text-slate-200 tracking-wider mt-1 uppercase">Industry Ready</div>
                <p className="text-[11px] text-slate-500 font-light mt-1.5 leading-normal">Advanced AI frameworks geared up for next-gen performance.</p>
              </div>
            </div>
          </div>

          <hr className="border-slate-900" />

          {/* Expanded Three Pillar Value Architecture */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="space-y-3 p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-lg border border-teal-500/20">
                🎯
              </div>
              <h3 className="text-lg font-bold text-slate-100 tracking-tight">Our Mission</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                To democratize heavy enterprise automation layers. We engineer robust, secure ecosystems that lower operational friction, making high-throughput tracking frameworks accessible to both non-profit structures and multinational networks uniformly.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-3 p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/20">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-slate-100 tracking-tight">Technical Mastery</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                From specialized Python deep learning orchestration to comprehensive SAP configurations, our architecture relies heavily on microservice modularity. This structure guarantees lightning-fast load patterns, scalable deployment parameters, and zero data downtime.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="space-y-3 p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-lg border border-purple-500/20">
                🚀
              </div>
              <h3 className="text-lg font-bold text-slate-100 tracking-tight">Talent Incubation</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Beyond physical software delivery, Almanet actively drives technical workspace scaling. Our integrated internship systems and expert-led virtual training modules (VTO) ensure that upcoming developers master full-stack code paths using live production environments.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* --- EXTENDED MEGA FOOTER --- */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900 text-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(79,70,229,0.05),transparent_40%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Column 1: Brand Insight */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              {/* --- FOOTER OFFICIAL LOGO INTEGRATION --- */}
<div className="flex flex-col items-start space-y-4">
  {/* Premium Frame Container (Header se thoda chota size footer ke liye perfect hai) */}
  <div className="h-20 py-1.5 px-1.5 bg-slate-900/95 border border-slate-700/60 rounded-xl flex items-center justify-center relative shadow-[0_8px_20px_rgba(0,0,0,0.7)] group">
    
    {/* Clean Soft Ambient Glow (Footer dark theme compatibility) */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A77BC]/20 via-slate-800 to-[#C85A32]/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 -z-10" />

    {/* Official White Box Image */}
    <div className="h-full relative flex items-center transition-transform duration-300 hover:scale-[1.03]">
      <img 
        src="/almanet01_logo.jpg" 
        alt="AlmaNet Official Logo" 
        className="h-full w-auto object-contain rounded-lg border border-white/5" 
      />
    </div>
  </div>

  {/* Logo ke niche ka tagline text */}
  <p className="text-xs text-slate-400 font-light max-w-xs leading-relaxed">
    Empowering organizations with next-generation enterprise suites, automated modules, and secure cloud pipelines.
  </p>
</div>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-light">
              Architecting secure data pipelines, next-generation healthcare integrations, and custom business automation tools engineered to empower modern enterprise initiatives globally.
            </p>
            <div className="flex space-x-4 pt-2">
              {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((platform) => (
                <button 
                  key={platform} 
                  onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }}
                  className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs hover:border-teal-500 hover:text-white transition-all"
                >
                  {platform[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-slate-200 uppercase">Sitemap</h4>
            <ul className="space-y-2 text-xs font-light">
              {['Home', 'Products', 'Services', 'Events', 'Blogs', 'About Us'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleScroll(item.toLowerCase().replace(' ', ''))}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Core Modules */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-slate-200 uppercase">Core Products</h4>
            <ul className="space-y-2 text-xs font-light">
              {['Pathyatech Ecosystem', 'Trackintrack Fleet', 'Almanet CRM Matrix', 'NGO Global Portal', 'Vendor Supply Connect', 'Lab Module Hub'].map((prod) => (
                <li key={prod}>
                  <button onClick={() => handleScroll('products')} className="hover:text-indigo-400 transition-colors text-left">
                    {prod}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter / Engagement Box */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-slate-200 uppercase">Stay Informed</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Subscribe to unlock periodic engineering research insights and version release blueprints.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="space-y-2">
              <input 
                type="email" 
                required 
                placeholder="engineering@domain.com" 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-teal-500 transition-all"
              />
              <button type="submit" className="w-full py-2 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-400 hover:to-indigo-500 text-slate-300 hover:text-slate-950 rounded-lg text-xs font-bold tracking-wide transition-all border border-slate-700 hover:border-transparent">
                Join Telemetry
              </button>
            </form>
          </div>

        </div>

        <hr className="border-slate-900 max-w-7xl mx-auto px-6 mb-8" />

        {/* Bottom Metadata Bar */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span className="text-slate-400 font-medium">Almanet Technologies © 2026</span>
            <span>&bull;</span>
            <span>All System Telemetry Operational</span>
          </div>
          <div className="flex space-x-6">
            <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="hover:text-slate-400 transition-colors">Security Controls</button>
            <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="hover:text-slate-400 transition-colors">Privacy Framework</button>
            <button onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); }} className="hover:text-slate-400 transition-colors">Terms of Operations</button>
          </div>
        </div>
      </footer>


      {/* ================= MODAL COMPONENTS ================= */}
{/* ================= MODAL COMPONENTS (ALL TOP-ALIGNED TO FIX ZOOM OUT) ================= */}

      {/* 1️⃣ MODAL: GET IN TOUCH / REGISTRATION (GOOGLE FORM STYLE) */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16 md:pt-28 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl relative max-h-[85vh] flex flex-col mb-8">
            {/* Top Google-Form Style Accent Bar */}
            <div className="h-2.5 w-full bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 shrink-0" />
            
            <button 
              onClick={() => setIsRegisterOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-xl font-bold bg-slate-800 h-8 w-8 rounded-full flex items-center justify-center border border-slate-700 transition-colors z-20"
            >
              &times;
            </button>

            {/* Inner Scroll Protection */}
            <div className="p-8 overflow-y-auto">
              {!regFormSubmitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setRegFormSubmitted(true); }} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-white tracking-tight">Almanet Connect & Registration</h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Please submit the questionnaire parameters required below. Our solutions engineering desk will reach out within one business cycle.
                    </p>
                  </div>

                  <hr className="border-slate-800" />

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">Full Legal Name *</label>
                      <input type="text" required placeholder="Your answer" className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">Corporate Email Address *</label>
                      <input type="email" required placeholder="name@company.com" className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">Primary Interest Array *</label>
                      <select className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none transition-all">
                        <option>Product Integration (Pathyatech, Trackintrack, CRM etc.)</option>
                        <option>SAP Consulting / Enterprise Architectures</option>
                        <option>Professional Training & Student Internships</option>
                        <option>Custom AI Development Planning</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">Operational Scale Constraints / Message</label>
                      <textarea rows={3} placeholder="Provide architectural scope requests here..." className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all resize-none" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-500 font-medium order-2 sm:order-1">🔒 Secure end-to-end telemetry submission</span>
                    <button type="submit" className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 font-bold text-sm tracking-wide hover:opacity-90 transition-all order-1 sm:order-2">
                      Submit Form
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4 animate-scaleUp">
                  <div className="h-14 w-14 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center text-2xl mx-auto border border-teal-500/20">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-white">Submission Stored Successfully</h3>
                  <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Your answers have been registered into Almanet's static telemetry database routing engine.
                  </p>
                  <button onClick={() => setIsRegisterOpen(false)} className="mt-4 px-5 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700">
                    Dismiss Window
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* 2️⃣ MODAL: FULL COMPLETED BLOG VIEWER */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-start justify-center p-4 pt-16 md:pt-28 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl relative max-h-[85vh] flex flex-col mb-8">
            <button 
              onClick={() => setActiveBlog(null)}
              className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white text-lg bg-slate-900/80 backdrop-blur-md h-8 w-8 rounded-full flex items-center justify-center border border-slate-700 transition-colors"
            >
              &times;
            </button>
            
            <div className="overflow-y-auto">
              <div className="h-64 sm:h-80 w-full relative shrink-0">
                <img 
                  src={activeBlog.id === 2 ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80' : activeBlog.img} 
                  alt={activeBlog.title} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              </div>
              
              <div className="p-6 md:p-10 space-y-4 relative -mt-10 bg-slate-900 rounded-t-xl">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">{activeBlog.date}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">{activeBlog.title}</h2>
                <h3 className="text-sm font-medium text-slate-400 italic -mt-2">{activeBlog.excerpt}</h3>
                <hr className="border-slate-800" />
                <p className="text-slate-300 leading-relaxed font-light text-base md:text-lg whitespace-pre-line">
                  {activeBlog.content}
                </p>
                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>Author: Almanet Core Engineering</span>
                  <span>Category: Technology / Scalability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* 3️⃣ MODAL: EVENTS REGISTRATION + VIEW */}
      {activeEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16 md:pt-28 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative max-h-[85vh] flex flex-col mb-8">
            <button 
              onClick={() => setActiveEvent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 h-8 w-8 rounded-full flex items-center justify-center border border-slate-700 z-20 transition-colors"
            >
              &times;
            </button>

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
                      <p className="text-xs text-slate-400 italic">📌 {activeEvent.location}</p>
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

                    <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all hover:opacity-90">
                      Confirm Free Reservation Slot
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-3">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl mx-auto border border-emerald-500/20">✓</div>
                    <h4 className="text-lg font-bold text-white">Ticket Confirmed!</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                      We emailed pass tokens and platform calendar integration invites matching your structured parameters.
                    </p>
                    <button onClick={() => { setActiveEvent(null); setEventFormSubmitted(false); }} className="px-4 py-1.5 text-xs bg-slate-800 hover:text-white rounded-md text-slate-400 border border-slate-700">Dismiss</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
   {/* ================= NEW PRODUCT DETAIL PAGE MODAL ================= */}
{activeProduct && (
  <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-4 pt-6 md:pt-12 overflow-y-auto">
    <div className="bg-slate-900 border-2 border-slate-800 max-w-5xl w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(74,119,188,0.15)] relative max-h-[92vh] flex flex-col mb-8 text-slate-200">
      
      {/* Top Banner Row */}
      <div className="h-64 w-full relative shrink-0 border-b border-slate-800">
        <img 
          src={
            (activeProduct?.title?.toLowerCase().includes('pathyatech') || activeProduct?.name?.toLowerCase().includes('pathyatech'))
              ? "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&auto=format&fit=crop&q=80"
              : (activeProduct?.img || activeProduct?.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80")
          } 
          alt="" 
          className="w-full h-full object-cover brightness-[0.85]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        <button onClick={() => setActiveProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl bg-slate-950/90 h-10 w-10 rounded-full flex items-center justify-center border border-slate-700 shadow-xl transition-transform hover:scale-110">&times;</button>
      </div>

      <div className="overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20 uppercase tracking-widest">Core Product Engine</span>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">v4.2 Stable Release</span>
          <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md ml-auto">ID: #{activeProduct?.id || 'PROD-90X'}</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight -mt-4">{activeProduct?.title || activeProduct?.name}</h2>

        {/* Left-Right Splitted Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Large Column: Overview & Architecture Highlights */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Functional Overview</h3>
              <p className="text-slate-300 font-light text-base leading-relaxed whitespace-pre-line">
                {activeProduct?.desc || activeProduct?.description || "High-performance enterprise infrastructure component designed natively to compute high-density logic layers with zero throttling."}
              </p>
            </div>

            {/* Expanded Field: Embedded Features List */}
            <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Standard Integrated Capability Modules</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2"><span className="text-teal-400">✔</span> Automated Hot-Swap Failover Engine</div>
                <div className="flex items-center gap-2"><span className="text-teal-400">✔</span> Live Telemetry Exporter Hooks</div>
                <div className="flex items-center gap-2"><span className="text-teal-400">✔</span> Encrypted High-Volume Matrix Sync</div>
                <div className="flex items-center gap-2"><span className="text-teal-400">✔</span> Role-Based IAM Access Rules</div>
                <div className="flex items-center gap-2"><span className="text-teal-400">✔</span> Multi-Region Database Sharding</div>
                <div className="flex items-center gap-2"><span className="text-teal-400">✔</span> Low Latency Cache Routing</div>
              </div>
            </div>
          </div>

          {/* Right Smaller Column: System Specification Panel */}
          <div className="space-y-4 bg-slate-950/80 border-2 border-slate-800/60 p-5 rounded-2xl h-fit">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Technical Matrix Sheet</h3>
            
            {[
              { label: "Deployment Structure", val: "Docker / Kubernetes" },
              { label: "Compliance Standard", val: "ISO 27001 / SOC2 Ready" },
              { label: "Data Pipeline", val: "Kafka / Redis Streams" },
              { label: "Maximum API Latency", val: "< 8ms Peak Load" },
              { label: "Bandwidth Threshold", val: "Unlimited Node Pools" },
              { label: "License Type", val: "Commercial SaaS / On-Premise" }
            ].map((spec, i) => (
              <div key={i} className="flex flex-col border-b border-slate-800 pb-2 text-xs">
                <span className="text-slate-500 font-medium">{spec.label}</span>
                <span className="text-slate-200 font-semibold mt-0.5">{spec.val}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Action Panel */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
          <div className="text-xs text-slate-500">Need a sandbox environment setup? Contact system engineers directly.</div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); setActiveProduct(null); }}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/10 hover:opacity-90 transition-all"
            >
              Request Enterprise License
            </button>
            <button onClick={() => setActiveProduct(null)} className="px-5 py-3 rounded-xl border border-slate-800 text-slate-400 font-medium text-xs hover:bg-slate-800/40">
              Close Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{/* ================= NEW SERVICE DETAIL PAGE MODAL ================= */}
{activeService && (
  <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-4 pt-6 md:pt-12 overflow-y-auto">
    <div className="bg-slate-900 border-2 border-slate-800 max-w-4xl w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] relative max-h-[92vh] flex flex-col mb-8 text-slate-200">
      
      <button onClick={() => setActiveService(null)} className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white text-lg bg-slate-950/90 h-10 w-10 rounded-full flex items-center justify-center border border-slate-700 transition-transform hover:scale-110">&times;</button>

      <div className="overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
        {/* Top Service Badge */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            ⚙️ Strategy & Custom Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{activeService?.title || activeService?.name}</h2>
        </div>

        <hr className="border-slate-800" />

        {/* Big Side Image Banner with Text Inline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-2 h-48 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <img src={activeService?.img || activeService?.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80"} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Paradigm & Methodology</h3>
            <p className="text-slate-300 font-light text-sm leading-relaxed whitespace-pre-line">
              {activeService?.desc || activeService?.description || "Providing standard architecture consulting, system pipeline optimization, and deployment strategy layouts customized for long-term scalability parameters."}
            </p>
          </div>
        </div>

        {/* Expanded Field: Step by Step Workflow Timeline Panels */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white tracking-wide">Standard Execution Milestones & Delivery Phases</h3>
          
          <div className="space-y-3">
            <div className="p-4 bg-slate-950/40 border-l-4 border-emerald-500 rounded-r-xl space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="bg-emerald-500/20 text-emerald-400 h-5 w-5 rounded-full flex items-center justify-center text-[10px]">1</span>
                Phase 01: Audit Discovery & Scoping Loop (Week 1)
              </div>
              <p className="text-xs text-slate-400 pl-7 font-light">Deep inspection of current system architecture, tracing API bottleneck matrices, and mapping target telemetry thresholds.</p>
            </div>

            <div className="p-4 bg-slate-950/40 border-l-4 border-teal-500 rounded-r-xl space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="bg-teal-500/20 text-teal-400 h-5 w-5 rounded-full flex items-center justify-center text-[10px]">2</span>
                Phase 02: Blueprinting & Pipeline Refactoring (Week 2-3)
              </div>
              <p className="text-xs text-slate-400 pl-7 font-light">Developing targeted middleware scripts, custom router setups, and configuration layers to optimize active database query pools.</p>
            </div>

            <div className="p-4 bg-slate-950/40 border-l-4 border-indigo-500 rounded-r-xl space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="bg-indigo-500/20 text-indigo-400 h-5 w-5 rounded-full flex items-center justify-center text-[10px]">3</span>
                Phase 03: Simulated Stress Tests & Handover (Week 4)
              </div>
              <p className="text-xs text-slate-400 pl-7 font-light">Subjecting backend channels to intense mock traffic protocols. Validation analysis generation and safe production rollout sign-off.</p>
            </div>
          </div>
        </div>

        {/* Expanded Field: Operational Constraints & KPIs */}
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
            <h4 className="text-xs font-bold text-emerald-400 mb-1">Resource allocation</h4>
            <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1 font-light">
              <li>Dedicated Project Lead & Senior Architect</li>
              <li>24/7 Priority Emergency Channel Support</li>
              <li>Weekly Synchronization Framework Reviews</li>
            </ul>
          </div>
        </div>

        {/* Bottom Button Action Section */}
        <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
          <button onClick={() => setActiveService(null)} className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 font-medium text-xs hover:bg-slate-800/40">
            Dismiss
          </button>
          <button 
            onClick={() => { setIsRegisterOpen(true); setRegFormSubmitted(false); setActiveService(null); }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/10 hover:opacity-95 transition-all"
          >
            Initiate Project Scope Audit
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div> 
  );
}