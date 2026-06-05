'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Code, ShieldCheck, CheckCircle, Database, Settings, MessageSquare, Briefcase } from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug ? (params.slug as string) : 'sap-abap-development';
  const title = slug
  .replace(/-/g, ' ')
  .replace(/%26/g, '&') // Ye '%26' ko '&' mein badal dega
  .toUpperCase();

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-8">
  <button 
    onClick={() => window.history.back()} 
    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
  >
    <span>←</span> Back to Services
  </button>
</div>
      {/* 1. Hero Section */}
     {/* 1. Hero Section (Updated with Background Image) */}
<section 
  className="relative py-24 overflow-hidden border-b border-gray-200"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  {/* Dark Overlay taaki text saaf dikhe */}
  <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="max-w-3xl">
      {/* Breadcrumb hat gaya hai */}
      <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
        {title}
      </h1>
      <p className="text-xl text-gray-700 leading-relaxed mb-8">
        Enterprise-grade development to extend, optimize, and modernize your SAP landscapes—built for performance, maintainability, and scalable delivery.
      </p>
      
      {/* Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 shadow-lg">
          Discuss Your Requirements &rarr;
        </button>
        <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold border border-gray-300 hover:bg-gray-50">
          View Offerings
        </button>
      </div>
    </div>
  </div>
</section>

      {/* 2. Enterprise-Grade Solutions (Two Columns) */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black mb-8">Enterprise-Grade SAP Solutions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Code, title: 'Clean, maintainable builds', desc: 'Structured development that aligns with SAP best practices.' },
            { icon: ShieldCheck, title: 'Enterprise controls', desc: 'Quality gates, reviews, and documentation to reduce risk.' }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-gray-200 rounded-xl flex gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><item.icon size={28} /></div>
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Services Grid (Six Cards) */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-black mb-8">Core SAP Development Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Briefcase, title: 'Custom development', desc: 'Tailor made SAP solutions aligned to business needs.' },
            { icon: Settings, title: 'Enhancements', desc: 'BAdIs, enhancement spots, and user exits.' },
            { icon: Database, title: 'Reports & ALV', desc: 'Interactive reporting and data extraction.' },
            { icon: MessageSquare, title: 'Workflows', desc: 'Approvals, alerts, and process automation.' },
            { icon: Code, title: 'Interfaces', desc: 'IDocs, BAPIs, RFCs, and web services.' },
            { icon: Settings, title: 'Optimization', desc: 'Performance analysis and code tuning.' }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition-all">
              <div className="mb-4 text-blue-600"><item.icon size={32} /></div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ABAP on HANA Services (Checklist) */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-black mb-8">ABAP on HANA Services</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'ABAP code optimization for SAP HANA', 'CDS Views, AMDPs, and SQL pushdown',
            'Custom ABAP on HANA application development', 'HANA migration support', 'ABAP Development Tools (ADT)'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="text-blue-600" size={20} /> {item}
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Box */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-50 border border-gray-200 p-10 rounded-2xl">
          <h3 className="text-2xl font-black mb-2">Get Started with {title}</h3>
          <p className="text-gray-600 mb-6">Need enhancements, integrations, or optimization? Our experts are ready to help.</p>
          <div className="flex items-center gap-6">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold">Contact Us &rarr;</button>
            <div className="text-sm">
              <p className="font-bold">Phone: +91 6264643660</p>
              <p>Email: info@almanet.in</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}