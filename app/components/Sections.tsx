'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Briefcase, Target, ShieldCheck, Rocket } from 'lucide-react';
import { NAV_ITEMS, PRODUCTS, SERVICES, EVENTS, BLOGS, JOBS, CAREER_PERKS } from '../constants';

// ─── Helper ───────────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar({ onGetInTouch }: { onGetInTouch: () => void }) {
  return (
<header className="fixed top-0 left-0 right-0 z-40 bg-[#F8FAFC] backdrop-blur-md border-b border-gray-200">
     <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/almanet-logo.png" alt="AlmaNet" className="h-18 w-auto object-contain hover:scale-105 transition-transform duration-300" style={{ mixBlendMode: 'multiply' }} />
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-gray-700">
          {NAV_ITEMS.map((item) => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase().replace(/\s+/g, ''))} className="hover:text-blue-700 transition-colors">{item}</button>
          ))}
        </nav>
        <button onClick={onGetInTouch} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-[0.98]">
          Get in Touch
        </button>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function HeroSection({ onGetInTouch }: { onGetInTouch: () => void }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#F8FAFC] border-b border-gray-200">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: `radial-gradient(#4A77BC 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-1/3 w-[50vw] h-[300px] bg-blue-100 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">

        {/* Left: Text */}
        <div className="space-y-6 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Next Generation Digital Ecosystems
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-gray-900">
            Empowering Ideas via <br /><span className="text-blue-600">Advanced Intelligence</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Almanet builds foundational automation suites, customized corporate SAP transformations, and machine learning models engineered to elevate complex modern business initiatives.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <button onClick={() => scrollTo('products')} className="px-6 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">Explore Products</button>
            <button onClick={onGetInTouch} className="px-6 py-3 rounded-xl font-semibold bg-white text-gray-800 border border-gray-200 hover:border-blue-300 transition-all">Register Platform</button>
          </div>
        </div>

        {/* Right: Image with animations */}
        <div className="relative flex justify-center animate-fade-in-right">
          <div className="absolute -inset-1 bg-blue-200 rounded-3xl blur-2xl opacity-40 animate-pulse" />
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"
            alt="Dashboard"
            className="rounded-2xl border border-gray-100 shadow-xl relative z-10 max-w-full h-auto object-cover animate-float"
          />
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2 z-20 animate-bounce-slow">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-gray-700">99.9% Uptime</span>
          </div>
          <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2 z-20 animate-bounce-slow-delay">
            <span className="text-xs font-bold text-blue-600">14+ Modules</span>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────
export function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600">Our Portfolios</span>
          <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">Enterprise Scaling Products</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">Robust system modules custom optimized to run high-volume workflows fluidly.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((prod) => (
            <div key={prod.id} className="group rounded-3xl border border-gray-100 bg-white p-6 space-y-4 hover:border-blue-100 transition-all text-left flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-blue-50/50 hover:-translate-y-1 duration-300">
              <div className="space-y-4">
                <div className="h-48 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">{prod.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{prod.desc}</p>
              </div>
              <Link href={`/products/${prod.name.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                Explore Specification →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Our Core Services</h2>
          <p className="text-gray-500 text-sm">We deliver end-to-end IT solutions—helping organisations implement, optimise, and support mission-critical systems.</p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl hover:border-blue-100 transition-all shadow-sm hover:shadow-lg group">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <s.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">{s.desc}</p>
<Link href={`/services/${s.title.toLowerCase().replace(/[\s&,/]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`} className="text-blue-600 font-bold text-sm">Learn More →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Events ───────────────────────────────────────────────────────────────────
export function EventsSection({ onRegister }: { onRegister: (evt: typeof EVENTS[0]) => void }) {
  return (
    <section id="events" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Upcoming Events & Workshops</h2>
          <p className="text-gray-500 text-sm">Reserve a slot in our upcoming technical panels and direct deployment system deep-dives.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EVENTS.map((evt) => (
            <div key={evt.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col sm:flex-row hover:border-blue-100 transition-all group shadow-sm hover:shadow-lg">
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                <img src={evt.img} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 text-xs text-blue-600 font-semibold">
                    <span>{evt.date}</span> &bull; <span>{evt.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{evt.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{evt.desc}</p>
                  <p className="text-xs font-medium text-gray-400 italic flex items-center gap-1"><Activity className="w-3 h-3" /> {evt.location}</p>
                </div>
                <button onClick={() => onRegister(evt)} className="w-full px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-100">
                  Register For Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Blogs ────────────────────────────────────────────────────────────────────
export function BlogsSection() {
  return (
    <section id="blogs" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Our Latest Publications</h2>
          <p className="text-gray-500 text-sm">Deep technical reading exploring AI design patterns, cloud computing pipelines, and data orchestration.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS.map((blog) => (
            <article key={blog.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-blue-100 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-blue-50/50">
              <div>
                <div className="h-52 overflow-hidden">
                  <img src={blog.img} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60'; }} />
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-xs text-blue-600 font-bold tracking-wider uppercase">{blog.date}</span>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-snug line-clamp-2">{blog.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{blog.excerpt}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link href={`/blogs/${blog.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Read Full Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Careers ──────────────────────────────────────────────────────────────────
export function CareersSection({ onApply }: { onApply: (jobTitle: string) => void }) {
  return (
    <section id="career" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            <Rocket className="w-3.5 h-3.5" /> Join Our Team
          </span>
          <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">Build the Future of <span className="text-blue-600">Enterprise Software</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">Grow your skills while working on advanced data systems, enterprise integrations, and robust application suites.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
          {CAREER_PERKS.map((perk, i) => (
            <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:border-blue-100 transition-all space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                <perk.Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">{perk.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4 max-w-4xl mx-auto text-left">
          <h3 className="text-base font-bold text-gray-900 mb-4 px-2">Current Openings</h3>
          {JOBS.map((job, idx) => (
            <div key={idx} className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-blue-100 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-sm hover:shadow-md">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                  <span className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">{job.type}</span>
                </div>
                <p className="text-[11px] text-blue-600 font-medium">{job.dept}</p>
                <p className="text-xs text-gray-500 max-w-xl">{job.desc}</p>
              </div>
              <button onClick={() => onApply(job.title)} className="sm:self-center px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 active:scale-[0.98] transition-all whitespace-nowrap shadow-md shadow-blue-100">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
export function AboutSection() {
  return (
    <section id="aboutus" className="py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <Briefcase className="w-3.5 h-3.5" /> Corporate Profile & Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              Architecting the Software Ecosystems That Drive <span className="text-blue-600">Global Modern Enterprises</span>
            </h2>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              Founded on rigid software engineering principles, Almanet designs high-performance digital architectures that fundamentally eliminate structural bottlenecks.
            </p>
            <p className="text-gray-600 font-light leading-relaxed text-sm">
              We believe modern enterprise apps shouldn't operate in silos. Our approach centers on unifying fragmented data streams—ensuring field actions, internal inventories, donor telemetry, and customer-facing touchpoints speak to the same underlying analytical database engine.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { val: '99.9%', label: 'System Uptime', desc: 'Guaranteed through redundant cloud pipelines.' },
              { val: '14+', label: 'Core Modules', desc: 'Production-ready layers for enterprise use.' },
              { val: '100%', label: 'Data Privacy', desc: 'Strict regulatory compliance layers built-in.' },
              { val: '2026', label: 'Industry Ready', desc: 'AI frameworks for next-gen performance.' },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-blue-100 transition-all">
                <div className="text-4xl font-black text-blue-600">{stat.val}</div>
                <div className="text-xs font-semibold text-gray-900 tracking-wider mt-1.5 uppercase">{stat.label}</div>
                <p className="text-[11px] text-gray-500 mt-1.5 leading-normal">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <hr className="border-gray-100" />
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { Icon: Target, title: 'Our Mission', desc: 'To democratize heavy enterprise automation layers—engineering secure ecosystems that lower operational friction.' },
            { Icon: ShieldCheck, title: 'Technical Mastery', desc: 'Specialized Python deep learning to comprehensive SAP configurations, our architecture relies on microservice modularity.' },
            { Icon: Rocket, title: 'Talent Incubation', desc: 'Integrated internship systems and expert-led training ensure upcoming developers master full-stack code paths.' },
          ].map((pillar, i) => (
            <div key={i} className="space-y-3 p-8 rounded-3xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                <pillar.Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">{pillar.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer({ onGetInTouch }: { onGetInTouch: () => void }) {
  return (
    <footer className="bg-gray-50 text-gray-600 pt-16 pb-12 border-t border-gray-100 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <div className="lg:col-span-2 space-y-5">
          <img src="/almanet-logo.png" alt="AlmaNet" className="h-18 w-auto object-contain" />
          <p className="text-xs text-gray-500 max-w-xs leading-relaxed">Empowering organizations with next-generation enterprise suites, automated modules, and secure cloud pipelines.</p>
          <div className="flex space-x-3 pt-2">
            {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((p) => (
              <button key={p} onClick={onGetInTouch} className="h-8 px-3 rounded-lg bg-white border border-gray-200 text-[10px] font-semibold text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-all">{p}</button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase">Sitemap</h4>
          <ul className="space-y-2 text-xs font-medium text-gray-600">
            {['Home', 'Products', 'Services', 'Events', 'Blogs', 'About Us'].map((item) => (
              <li key={item}><button onClick={() => scrollTo(item.toLowerCase().replace(' ', ''))} className="hover:text-blue-600 transition-colors">{item}</button></li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase">Core Products</h4>
          <ul className="space-y-2 text-xs font-medium text-gray-600">
            {['Pathyatech Ecosystem', 'Trackintrack Fleet', 'Almanet CRM Matrix', 'NGO Global Portal', 'Vendor Supply Connect', 'Lab Module Hub'].map((prod) => (
              <li key={prod}><button onClick={() => scrollTo('products')} className="hover:text-blue-600 transition-colors text-left">{prod}</button></li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase">Stay Informed</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Subscribe to unlock periodic engineering research insights.</p>
          <form onSubmit={(e) => { e.preventDefault(); onGetInTouch(); }} className="space-y-2">
            <input type="email" required placeholder="engineering@domain.com" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 outline-none focus:border-blue-600 transition-all" />
            <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold tracking-wide transition-all">Join Telemetry</button>
          </form>
        </div>
      </div>
      <hr className="border-gray-200 max-w-7xl mx-auto px-6 mb-8" />
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-500">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-900 font-semibold">Almanet Technologies © 2026</span>
          <span>&bull;</span>
          <span>All System Telemetry Operational</span>
        </div>
        <div className="flex space-x-6">
          {['Security Controls', 'Privacy Framework', 'Terms of Operations'].map((item) => (
            <button key={item} onClick={onGetInTouch} className="hover:text-blue-600 transition-colors">{item}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}