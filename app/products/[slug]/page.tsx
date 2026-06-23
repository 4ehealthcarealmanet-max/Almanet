'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  CheckCircle, ArrowLeft, Shield, Zap, BarChart2,
  Clock, Users, Globe, FileText, Cpu, Lock, TrendingUp,
  Heart, Truck, Star, Database, Cloud, Activity,
  Video, Calendar, CreditCard, Package,
  ClipboardList, Microscope, UserCheck, DollarSign, Settings
} from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  Heart:<Heart size={24}/>, Truck:<Truck size={24}/>, TrendingUp:<TrendingUp size={24}/>,
  Users:<Users size={24}/>, Package:<Package size={24}/>, Microscope:<Microscope size={24}/>,
  Video:<Video size={24}/>, FileText:<FileText size={24}/>, Activity:<Activity size={24}/>,
  BarChart2:<BarChart2 size={24}/>, CreditCard:<CreditCard size={24}/>, Cpu:<Cpu size={24}/>,
  Star:<Star size={24}/>, Zap:<Zap size={24}/>, Globe:<Globe size={24}/>,
  Shield:<Shield size={24}/>, Database:<Database size={24}/>, Cloud:<Cloud size={24}/>,
  Lock:<Lock size={24}/>, Clock:<Clock size={24}/>, ClipboardList:<ClipboardList size={24}/>,
  UserCheck:<UserCheck size={24}/>, DollarSign:<DollarSign size={24}/>, Calendar:<Calendar size={24}/>,
};
const SM: Record<string, React.ReactNode> = {
  Heart:<Heart size={14}/>, Truck:<Truck size={14}/>, TrendingUp:<TrendingUp size={14}/>,
  Users:<Users size={14}/>, Package:<Package size={14}/>, Microscope:<Microscope size={14}/>,
  Video:<Video size={14}/>,
};
const SP: Record<string, React.ReactNode> = {
  Shield:<Shield size={20}/>, Cloud:<Cloud size={20}/>, Activity:<Activity size={20}/>,
  Clock:<Clock size={20}/>, Lock:<Lock size={20}/>, Globe:<Globe size={20}/>,
  Cpu:<Cpu size={20}/>, Database:<Database size={20}/>, Zap:<Zap size={20}/>,
  BarChart2:<BarChart2 size={20}/>, Star:<Star size={20}/>, FileText:<FileText size={20}/>,
  Users:<Users size={20}/>, TrendingUp:<TrendingUp size={20}/>, UserCheck:<UserCheck size={20}/>,
  Package:<Package size={20}/>, ClipboardList:<ClipboardList size={20}/>,
  CreditCard:<CreditCard size={20}/>, Video:<Video size={20}/>, Calendar:<Calendar size={20}/>,
};

/* titleSlug must exactly equal what your homepage Link produces:
   prod.title.toLowerCase().replace(/\s+/g,'-')
   PathyaTech       -> pathyatech
   TrackIntake      -> trackintake
   CRM Platform     -> crm-platform
   NgoConnect       -> ngoconnect
   VendorSync       -> vendorsync
   LabCore LIMS     -> labcore-lims
   MedConsult Live  -> medconsult-live
*/
const PRODUCTS: any[] = [
  {
    titleSlug:'pathyatech',
    title:'PathyaTech', tagline:'Next-Generation Healthcare Management',
    subtitle:'Transforming hospitals, clinics, and diagnostic centres with an intelligent, fully-integrated digital ecosystem.',
    heroImage:'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80',
    accent:'#0d9488', accentLight:'#ccfbf1', accentDark:'#042f2e',
    badge:'Healthcare', badgeIconKey:'Heart',
    overview:'PathyaTech is an enterprise-grade, cloud-native health information system purpose-built for modern healthcare facilities. From a single GP clinic to a multi-branch hospital network, PathyaTech automates every clinical and administrative workflow — eliminating paper trails, reducing billing errors, and giving clinicians more time at the bedside.\n\nThe platform unifies Electronic Medical Records (EMR/EHR), pharmacy operations, in-patient management, insurance claim automation, and telemedicine into one cohesive environment. Real-time dashboards surface actionable insights for administrators while role-based access ensures every staff member sees only what is relevant to their function.',
    stats:[{value:'99.9%',label:'Uptime SLA'},{value:'<2s',label:'Avg Load Time'},{value:'500+',label:'Hospitals Deployed'},{value:'HIPAA',label:'Certified'}],
    features:[
      {iconKey:'FileText',title:'EMR / EHR Integration',desc:'Structured clinical notes, SOAP templates, ICD-10/11 coding, and complete patient history at a glance.'},
      {iconKey:'Video',title:'Telemedicine Portal',desc:'HD video consults, digital prescriptions, and follow-up scheduling — accessible from any device.'},
      {iconKey:'Package',title:'Automated Pharmacy Mgmt',desc:'Real-time drug inventory, expiry alerts, e-prescriptions, and POS billing linked to clinical orders.'},
      {iconKey:'CreditCard',title:'Insurance Claim Processing',desc:'AI-assisted pre-authorisation, automated TPA submissions, and real-time claim status tracking.'},
      {iconKey:'Activity',title:'Patient Lifecycle Mgmt',desc:'OPD/IPD workflows, bed management, discharge summaries, and post-discharge follow-up reminders.'},
      {iconKey:'BarChart2',title:'Clinical Analytics',desc:'Department-wise revenue, patient flow heat-maps, diagnostic trends, and physician performance reports.'},
    ],
    specs:[
      {iconKey:'Shield',label:'HIPAA & HL7 FHIR Compliant'},{iconKey:'Cloud',label:'Cloud-Native Multi-Tenant Architecture'},
      {iconKey:'Activity',label:'Real-Time Analytics Dashboard'},{iconKey:'Clock',label:'24/7 Monitoring & Incident Response'},
      {iconKey:'Lock',label:'AES-256 Encryption at Rest & Transit'},{iconKey:'Globe',label:'Multi-Language & Multi-Currency'},
      {iconKey:'Cpu',label:'AI-Assisted Diagnosis Suggestions'},{iconKey:'Database',label:'Automated Backup Every 6 Hours'},
    ],
    benefits:['Reduce administrative overhead by up to 60%','Cut billing errors with end-to-end claim automation','Improve patient satisfaction through faster service','Stay audit-ready with complete digital paper trails'],
    useCases:['Multi-Specialty Hospitals','Diagnostic Chains','Polyclinics','Government Health Schemes'],
  },
 {
    titleSlug:'trackintake',
    title:'TrackIntake', tagline:'Smart Nutrition & Calorie Intelligence',
    subtitle:'Full-spectrum dietary tracking — from daily meals to macro goals — powered by smart food logging and real-time nutrition insights.',
    heroImage:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80',
    accent:'#16a34a', accentLight:'#dcfce7', accentDark:'#052e16',
    badge:'Nutrition', badgeIconKey:'Apple',
    overview:'TrackIntake is a next-generation nutrition tracking platform that transforms how people understand and manage what they eat. By combining a smart food database, barcode scanning, and AI-assisted meal logging, TrackIntake delivers a single pane of glass across your entire daily intake.\n\nMacro and micronutrient breakdowns help users hit personalised goals, smart reminders nudge consistent logging, and the progress dashboard turns raw food data into actionable health trends. Whether you are tracking calories for weight loss, macros for fitness, or nutrients for medical reasons, TrackIntake adapts to your goals.',
    stats:[{value:'10K+',label:'Foods in Database'},{value:'95%',label:'Logging Accuracy'},{value:'50,000+',label:'Meals Tracked'},{value:'GDPR',label:'Data Privacy'}],
    features:[
      {iconKey:'Apple',title:'Smart Food Logging',desc:'Search, scan, or snap a photo of your meal for instant calorie and nutrient breakdown.'},
      {iconKey:'TrendingUp',title:'Macro & Calorie Goals',desc:'Personalised daily targets based on your weight, activity level, and health objectives.'},
      {iconKey:'BarChart2',title:'Nutrition Analytics',desc:'Visual trends on calories, protein, carbs, fats, and micronutrients over time.'},
      {iconKey:'UserCheck',title:'Progress Tracking',desc:'Weight, body measurements, and habit streaks with automated insight summaries.'},
      {iconKey:'Package',title:'Meal Planning',desc:'Save favourite meals and recipes for one-tap logging on repeat days.'},
      {iconKey:'Cpu',title:'AI Meal Recognition',desc:'Photo-based food detection flags portion size and nutrient estimates instantly.'},
    ],
    specs:[
      {iconKey:'Zap',label:'Barcode Scanning — 1M+ Products Supported'},{iconKey:'Activity',label:'Real-Time Nutrient Calculation'},
      {iconKey:'Globe',label:'Multi-Region Food Database Coverage'},{iconKey:'Shield',label:'GDPR Compliant Data Handling'},
      {iconKey:'Database',label:'REST & Webhook API for Integrations'},{iconKey:'Clock',label:'Historical Logs up to 5 Years'},
      {iconKey:'BarChart2',label:'Automated Weekly Progress Reports'},{iconKey:'Lock',label:'End-to-End Encrypted Health Data'},
    ],
    benefits:['Build consistent healthy eating habits with daily logging','Hit fitness goals faster with precise macro tracking','Understand nutrient gaps with detailed breakdowns','Stay motivated with visual progress trends'],
    useCases:['Weight Management','Fitness & Bodybuilding','Medical Diet Plans','General Wellness'],
  },
  {
    titleSlug:'crm-platform',
    title:'CRM Platform', tagline:'Unified Customer Relationship Intelligence',
    subtitle:'Close more deals, resolve support faster, and grow revenue — all from one deeply connected platform.',
    heroImage:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
    accent:'#2563eb', accentLight:'#dbeafe', accentDark:'#1e1b4b',
    badge:'Sales & CRM', badgeIconKey:'TrendingUp',
    overview:'Our CRM Platform is a fully integrated sales, marketing, and customer-success suite built for revenue teams that refuse to settle for spreadsheets. At its core is a real-time pipeline engine that scores leads, forecasts revenue, and surfaces next-best-actions — so your reps spend time selling, not data-entering.\n\nMulti-channel support (email, chat, WhatsApp, and social) converges into a single inbox, ensuring no customer query falls through the cracks. Automated workflows move deals through stages, send follow-up sequences, and escalate overdue tickets — all without manual intervention.',
    stats:[{value:'3×',label:'Pipeline Growth'},{value:'48h',label:'Go-Live Time'},{value:'99.5%',label:'Uptime'},{value:'SOC 2',label:'Type II Certified'}],
    features:[
      {iconKey:'Star',title:'Automated Lead Scoring',desc:'Behavioural and firmographic signals combine to rank every inbound lead in real time.'},
      {iconKey:'BarChart2',title:'Sales Funnel Visualisation',desc:'Drag-and-drop Kanban and table views with deal value, age, and probability overlays.'},
      {iconKey:'Globe',title:'Multi-Channel Support',desc:'Email, live chat, WhatsApp, and social DMs in one unified inbox with SLA timers.'},
      {iconKey:'TrendingUp',title:'Revenue Forecasting',desc:'ML-powered deal predictions broken down by rep, territory, product line, or quarter.'},
      {iconKey:'Users',title:'Account-Based Marketing',desc:'Target high-value accounts with personalised campaigns tied directly to open opportunities.'},
      {iconKey:'Zap',title:'Workflow Automation',desc:'No-code automation builder for lead routing, follow-up sequences, and escalation rules.'},
    ],
    specs:[
      {iconKey:'Shield',label:'SOC 2 Type II & GDPR Compliant'},{iconKey:'Zap',label:'No-Code Workflow Automation Engine'},
      {iconKey:'Cloud',label:'Auto-Scaling Cloud Infrastructure'},{iconKey:'Lock',label:'Field-Level Data Encryption'},
      {iconKey:'Globe',label:'Native Integrations: Slack, Gmail, Zoho'},{iconKey:'Database',label:'REST API + Webhooks for Custom Integrations'},
      {iconKey:'BarChart2',label:'Custom Report Builder with 100+ Metrics'},{iconKey:'Users',label:'Role-Based Access with Granular Permissions'},
    ],
    benefits:['Shorten sales cycles with AI-assisted deal guidance','Improve first-response time across all support channels','Forecast revenue with ±5% accuracy','Onboard new reps in hours, not weeks'],
    useCases:['B2B SaaS','Financial Services','Real Estate','E-Commerce'],
  },
  {
    titleSlug:'ngoconnect',
    title:'NgoConnect', tagline:'Digital Ecosystem for Non-Profit Impact',
    subtitle:'Manage donors, grants, volunteers, and community programmes with transparency and accountability at every step.',
    heroImage:'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80',
    accent:'#16a34a', accentLight:'#dcfce7', accentDark:'#052e16',
    badge:'Non-Profit', badgeIconKey:'Heart',
    overview:'NgoConnect is the only management platform designed from the ground up for the unique compliance, reporting, and relationship-management needs of non-profit organisations. Whether you are a grassroots community group or an internationally funded NGO, the platform adapts to your scale and sector.\n\nA built-in donor CRM tracks every interaction, donation, and communication preference. The grant management module follows every rupee from application to closure, producing audit-ready utilisation reports. Volunteer coordination tools schedule deployments, log hours, and issue digital certificates — automating the entire volunteer lifecycle.',
    stats:[{value:'2,000+',label:'NGOs Empowered'},{value:'40+',label:'Currencies'},{value:'100%',label:'Audit-Ready'},{value:'FCRA',label:'Compliance Ready'}],
    features:[
      {iconKey:'Users',title:'Donor CRM',desc:'Comprehensive donor profiles with giving history, communication logs, and automated acknowledgement letters.'},
      {iconKey:'FileText',title:'Grant Lifecycle Tracking',desc:'Proposal submissions, milestone reporting, budget utilisation, and funder communication in one view.'},
      {iconKey:'BarChart2',title:'Impact Visualisation',desc:'Beneficiary dashboards and geo-mapped programme reach for donor presentations and board reports.'},
      {iconKey:'Calendar',title:'Volunteer Coordination',desc:'Shift scheduling, skill matching, hour logging, and automated digital certificates.'},
      {iconKey:'DollarSign',title:'Fund Accounting',desc:'Ring-fenced fund tracking, multi-currency ledgers, and one-click utilisation certificates.'},
      {iconKey:'Globe',title:'Community Outreach',desc:'Event management, beneficiary registration, and SMS/WhatsApp communication campaigns.'},
    ],
    specs:[
      {iconKey:'Shield',label:'FCRA & 80G Compliance Ready'},{iconKey:'Globe',label:'40+ Global Currency Support'},
      {iconKey:'Lock',label:'PCI-DSS Secure Donation Gateways'},{iconKey:'FileText',label:'Automated Audit-Ready Reporting'},
      {iconKey:'Database',label:'Encrypted Beneficiary Data Storage'},{iconKey:'Activity',label:'Real-Time Programme Impact Dashboard'},
      {iconKey:'Cloud',label:'Cloud-Hosted with Daily Backups'},{iconKey:'Users',label:'Multi-Branch Organisation Support'},
    ],
    benefits:['Demonstrate impact to funders with live dashboards','Eliminate manual grant-reporting with automated logs','Retain donors with personalised engagement workflows','Scale programmes without scaling administrative burden'],
    useCases:['International NGOs','Community Foundations','CSR Arms of Corporates','Government Welfare Schemes'],
  },
  {
    titleSlug:'vendorsync',
    title:'VendorSync', tagline:'Smart Procurement & Vendor Portal',
    subtitle:'Streamline vendor onboarding, purchase orders, contracts, and spend analytics — from one intelligent hub.',
    heroImage:'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80',
    accent:'#7c3aed', accentLight:'#ede9fe', accentDark:'#2e1065',
    badge:'Procurement', badgeIconKey:'Package',
    overview:"VendorSync redefines enterprise procurement by replacing fragmented email chains, paper POs, and siloed contract folders with a single digital command centre. Procurement teams gain complete visibility into every vendor relationship, while suppliers self-serve through a branded portal that reduces back-and-forth by 80%.\n\nThe platform's configurable approval workflows enforce policy compliance automatically. Spend analytics highlight maverick purchasing, identify consolidation opportunities, and surface vendors delivering the best total-cost value — enabling data-driven negotiation with every supplier.",
    stats:[{value:'80%',label:'Faster Onboarding'},{value:'15%',label:'Avg Spend Savings'},{value:'500+',label:'Enterprise Clients'},{value:'ISO 9001',label:'Process Quality'}],
    features:[
      {iconKey:'Zap',title:'Automated Procurement',desc:'Requisition-to-PO automation with configurable approval chains and budget gate checks.'},
      {iconKey:'Users',title:'Supplier Self-Service Portal',desc:'Branded vendor portal for document submission, invoice upload, and payment status tracking.'},
      {iconKey:'BarChart2',title:'Spend Analytics',desc:'Category-wise spend heatmaps, savings tracking, and budget vs actual variance reports.'},
      {iconKey:'Shield',title:'Compliance Auditing',desc:'Automatic document expiry alerts, blacklist checks, and full procurement audit trails.'},
      {iconKey:'FileText',title:'Contract Lifecycle Management',desc:'Template library, redline tracking, e-signature integration, and renewal date alerts.'},
      {iconKey:'Star',title:'Vendor Performance Ratings',desc:'Quality, delivery, and responsiveness scorecards with SLA breach notifications.'},
    ],
    specs:[
      {iconKey:'Database',label:'ERP Integration (SAP, Oracle, Tally)'},{iconKey:'Lock',label:'Encrypted Document Management Vault'},
      {iconKey:'Zap',label:'Configurable Multi-Level Approval Workflows'},{iconKey:'Star',label:'Vendor Scorecard & Rating Engine'},
      {iconKey:'Globe',label:'Multi-Currency & Multi-Entity Support'},{iconKey:'Shield',label:'ISO 9001 Process Quality Standards'},
      {iconKey:'FileText',label:'e-Signature Ready (DocuSign / Zoho Sign)'},{iconKey:'Activity',label:'Real-Time PO & Invoice Status Tracking'},
    ],
    benefits:['Reduce PO cycle time from days to hours','Eliminate maverick spend with automated policy enforcement','Improve supplier relationships via transparent portals','Negotiate better contracts backed by spend intelligence'],
    useCases:['Manufacturing','Retail Chains','Infrastructure & Construction','Healthcare Procurement'],
  },
  {
    titleSlug:'labcore-lims',
    title:'LabCore LIMS', tagline:'Precision Diagnostic Data Management',
    subtitle:'Eliminate manual lab errors, accelerate turnaround times, and maintain complete regulatory compliance across every sample.',
    heroImage:'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1600&q=80',
    accent:'#0891b2', accentLight:'#cffafe', accentDark:'#083344',
    badge:'Laboratory', badgeIconKey:'Microscope',
    overview:'LabCore LIMS is an enterprise laboratory information management system engineered for the most demanding diagnostic and research environments. From sample accession at the front desk to authorised report delivery in the patient portal, every step is logged, validated, and fully traceable.\n\nIntegration with 300+ analytical instruments eliminates manual transcription errors. Automated QC rules flag out-of-range results before reports are approved. The workflow engine handles complex reflexive testing — automatically adding follow-on tests based on initial results — maximising clinical value while minimising manual intervention.',
    stats:[{value:'300+',label:'Instrument Integrations'},{value:'99.99%',label:'Data Integrity'},{value:'<30s',label:'Report Auto-Gen'},{value:'NABL',label:'Accreditation Ready'}],
    features:[
      {iconKey:'ClipboardList',title:'Sample Lifecycle Management',desc:'Barcode-driven accession, chain-of-custody tracking, storage location management, and disposal logging.'},
      {iconKey:'Cpu',title:'Instrument Integration',desc:'Bi-directional middleware for 300+ analysers — results pulled automatically, eliminating transcription.'},
      {iconKey:'FileText',title:'Auto-Report Generation',desc:'Branded, clinician-ready reports in seconds with reference ranges, flags, and trend graphs.'},
      {iconKey:'Shield',title:'Quality Control Module',desc:'Levey-Jennings charts, Westgard rules, and automatic QC failure lockouts prevent erroneous results.'},
      {iconKey:'Users',title:'Patient Result Portal',desc:'Secure portal for patients to access results, download reports, and book re-tests online.'},
      {iconKey:'Activity',title:'TAT Monitoring',desc:'Real-time turnaround-time dashboards with bottleneck identification and escalation alerts.'},
    ],
    specs:[
      {iconKey:'Shield',label:'NABL / CAP / ISO 15189 Accreditation Support'},{iconKey:'Database',label:'Zero-Downtime Redundant Data Architecture'},
      {iconKey:'FileText',label:'Complete Sample-to-Report Audit Trail'},{iconKey:'Lock',label:'Role-Gated Report Approval Workflows'},
      {iconKey:'Cpu',label:'HL7 / ASTM Instrument Middleware'},{iconKey:'Globe',label:'Multi-Branch Centralised Reporting'},
      {iconKey:'Activity',label:'Real-Time TAT & Productivity Analytics'},{iconKey:'Cloud',label:'HIPAA-Compliant Cloud or On-Premise Deploy'},
    ],
    benefits:['Cut critical result TAT by up to 50%','Eliminate transcription errors with direct instrument feeds','Achieve NABL accreditation faster with built-in compliance tools','Increase lab capacity without adding headcount'],
    useCases:['Hospital-Attached Labs','Standalone Diagnostic Centres','Research Laboratories','Blood Banks'],
  },
  {
    titleSlug:'medconsult-live',
    title:'MedConsult Live', tagline:'Modern Telehealth Consultation Platform',
    subtitle:'Connect patients to verified doctors anywhere, anytime — with secure video, smart scheduling, and instant prescriptions.',
    heroImage:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80',
    accent:'#4f46e5', accentLight:'#e0e7ff', accentDark:'#1e1b4b',
    badge:'Telehealth', badgeIconKey:'Video',
    overview:'MedConsult Live is a fully compliant telehealth platform that removes geographic and logistical barriers between patients and quality healthcare. Patients book appointments in under 60 seconds, join HD video consultations from any device, and receive digitally signed prescriptions — all without leaving home.\n\nFor healthcare providers, MedConsult Live is turnkey virtual clinic infrastructure: customisable booking pages, intelligent queue management, integrated payment collection, and a built-in consultation EMR. A real-time analytics dashboard tracks consultation volumes, revenue, and patient satisfaction scores.',
    stats:[{value:'60s',label:'Avg Booking Time'},{value:'4.9/5',label:'Patient Satisfaction'},{value:'50+',label:'Specialties Supported'},{value:'E2E',label:'Encrypted Calls'}],
    features:[
      {iconKey:'Video',title:'HD Video Consultations',desc:'Adaptive bitrate video with virtual background support, screen sharing, and in-call messaging.'},
      {iconKey:'Calendar',title:'Smart Appointment Scheduling',desc:'Patient self-booking, provider availability management, reminders, and Google/Outlook calendar sync.'},
      {iconKey:'FileText',title:'Digital Prescriptions',desc:'Digitally signed Rx with pharmacy dispatch option — fully compliant with regional e-prescribing laws.'},
      {iconKey:'Users',title:'Waiting Queue Management',desc:'Real-time queue display, automated patient-calling, and estimated wait-time notifications.'},
      {iconKey:'CreditCard',title:'Integrated Payments',desc:'In-app payment collection, insurance co-pay capture, and automated invoice generation.'},
      {iconKey:'Activity',title:'Consultation Analytics',desc:'Volume trends, revenue per specialty, no-show rates, and patient retention metrics.'},
    ],
    specs:[
      {iconKey:'Lock',label:'End-to-End Encrypted Video (AES-256)'},{iconKey:'Cloud',label:'Geo-Distributed Cloud for Low-Latency Video'},
      {iconKey:'CreditCard',label:'Multi-Gateway Payments (Razorpay, Stripe)'},{iconKey:'Globe',label:'Multi-Device: Web, iOS & Android'},
      {iconKey:'Shield',label:'HIPAA & IT Act 2000 Compliant'},{iconKey:'FileText',label:'Digital Signature for Prescriptions & Reports'},
      {iconKey:'Database',label:'Consultation Recording with Consent Logs'},{iconKey:'Activity',label:'Real-Time Provider Availability API'},
    ],
    benefits:['Expand patient reach beyond your physical catchment area','Reduce no-shows with automated multi-channel reminders','Generate additional revenue from virtual consultations','Deliver care continuity for chronic disease management'],
    useCases:['Hospital Virtual OPD','Independent Specialists','Corporate Wellness Programmes','Rural Health Outreach'],
  },
];

function findProduct(rawSlug: string) {
  // Strategy 1: exact titleSlug match  e.g. "crm-platform"
  const s1 = PRODUCTS.find(p => p.titleSlug === rawSlug);
  if (s1) return s1;

  // Strategy 2: exact title→slug match  e.g. title "CRM Platform" → "crm-platform"
  const s2 = PRODUCTS.find(p =>
    p.title.toLowerCase().replace(/\s+/g, '-') === rawSlug
  );
  if (s2) return s2;

  // Strategy 3: alphanumeric-only startsWith
  // handles extra words appended to slug, e.g. "crm---unified-customer..."
  const normUrl = rawSlug.toLowerCase().replace(/[^a-z0-9]/g, '');
  const s3 = PRODUCTS.find(p => {
    const normTitle = p.titleSlug.replace(/[^a-z0-9]/g, '');
    return normUrl.startsWith(normTitle) || normTitle.startsWith(normUrl);
  });
  if (s3) return s3;

  // Strategy 4: first segment match — take only chars before the 2nd dash group
  // "crm---unified-customer-relationship-platform" → first token "crm"
  const firstToken = rawSlug.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim().split(/\s+/)[0];
  return PRODUCTS.find(p =>
    p.titleSlug.replace(/[^a-z0-9]/g, ' ').trim().split(/\s+/)[0] === firstToken
  ) || null;
}

function StatCard({ value, label, accent }: { value:string; label:string; accent:string }) {
  return (
    <div className="text-center p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
      <div className="text-2xl font-black mb-1" style={{color:accent}}>{value}</div>
      <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{label}</div>
    </div>
  );
}

function FeatureCard({ iconKey, title, desc, accent, accentLight }: any) {
  return (
    <div className="p-7 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{background:accentLight,color:accent}}>
        {ICONS[iconKey]}
      </div>
      <h3 className="font-bold text-base text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug   = params?.slug as string ?? '';
  const d      = findProduct(slug);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (!d) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <p className="text-gray-400 text-lg font-medium">
            Product not found — <code className="bg-gray-100 px-2 py-1 rounded text-sm">{slug}</code>
          </p>
          <p className="text-xs text-gray-300">Expected one of: pathyatech · trackintake · crm-platform · ngoconnect · vendorsync · labcore-lims · medconsult-live</p>
          <button onClick={() => router.back()} className="text-blue-600 font-bold hover:underline">← Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-900">

      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{color: scrolled ? d.accent : '#fff'}}>
            <ArrowLeft size={18}/> Back to Products
          </button>
          <span className="text-xs font-bold tracking-wide px-3 py-1.5 rounded-full border flex items-center gap-1.5"
            style={scrolled
              ? {color:d.accent, borderColor:d.accentLight, background:d.accentLight}
              : {color:'#fff', borderColor:'rgba(255,255,255,0.4)', background:'rgba(255,255,255,0.12)'}}>
            {SM[d.badgeIconKey]} {d.badge}
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[380px] md:h-[420px] flex items-end overflow-hidden">
        <img src={d.heroImage} alt={d.title} className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0" style={{background:`linear-gradient(to right, ${d.accentDark}f0, ${d.accentDark}80, transparent)`}}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 pt-20 w-full">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6" style={{background:d.accent, color:'#fff'}}>
            {SM[d.badgeIconKey]} {d.badge}
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-3 max-w-3xl">{d.title}</h1>
          {/*<p className="text-xl text-white/85 font-semibold mb-2 max-w-2xl">{d.tagline}</p>*/}
          <p className="text-2xl md:text-3xl text-white/90 font-bold mb-3 max-w-3xl">{d.tagline}</p>
          <p className="text-base text-white/60 max-w-2xl leading-relaxed">{d.subtitle}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {d.stats.map((s:any,i:number) => <StatCard key={i} value={s.value} label={s.label} accent={d.accent}/>)}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">

        {/* Overview */}
        <section className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full" style={{background:d.accent}}/>
              <h2 className="text-3xl font-black">System Overview</h2>
            </div>
            {d.overview.split('\n\n').map((para:string,i:number) => (
              <p key={i} className="text-gray-600 leading-relaxed text-lg mb-4">{para}</p>
            ))}
          </div>
          <div className="md:col-span-2">
            <div className="p-8 rounded-3xl" style={{background:d.accentLight}}>
              <h3 className="font-black text-lg mb-5" style={{color:d.accentDark}}>Key Benefits</h3>
              <ul className="space-y-3">
                {d.benefits.map((b:string,i:number) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle size={17} className="mt-0.5 flex-shrink-0" style={{color:d.accent}}/>{b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t" style={{borderColor:`${d.accent}33`}}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:d.accent}}>Ideal For</p>
                <div className="flex flex-wrap gap-2">
                  {d.useCases.map((u:string,i:number) => (
                    <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border" style={{color:d.accentDark, borderColor:`${d.accent}40`}}>{u}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full" style={{background:d.accent}}/>
            <h2 className="text-3xl font-black">Key Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {d.features.map((f:any,i:number) => <FeatureCard key={i} {...f} accent={d.accent} accentLight={d.accentLight}/>)}
          </div>
        </section>

        {/* Specs */}
        <section className="rounded-3xl p-10 md:p-14" style={{background:`linear-gradient(135deg, ${d.accentDark} 0%, #111827 100%)`}}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full" style={{background:d.accent}}/>
            <h2 className="text-3xl font-black text-white">Technical Specifications</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {d.specs.map((s:any,i:number) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium text-white/75" style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)'}}>
                <span style={{color:d.accent}}>{SP[s.iconKey]}</span>{s.label}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to get started?</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-8 text-lg">
            Schedule a personalised demo and see <span className="font-bold" style={{color:d.accent}}>{d.title}</span> in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-2xl font-bold text-white shadow-lg hover:opacity-90 transition-opacity" style={{background:d.accent}}>Request a Demo</button>
            <button className="px-8 py-4 rounded-2xl font-bold border-2 hover:bg-gray-50 transition-colors" style={{color:d.accent, borderColor:d.accent}}>Download Brochure</button>
          </div>
        </section>

      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white py-6 px-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} {d.title} · All rights reserved
      </div>
    </div>
  );
}
