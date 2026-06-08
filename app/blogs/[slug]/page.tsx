'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Clock, Calendar, User, Tag, ChevronRight,
  BookOpen, Copy, CheckCheck
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────
   BLOG DATA
   titleSlug = title.toLowerCase().replace(/\s+/g,'-')
───────────────────────────────────────────────────────── */
const BLOGS: any[] = [
  {
    titleSlug: 'the-future-of-ai-in-enterprise-solutions',
    title: 'The Future of AI in Enterprise Solutions',
    date: 'June 12, 2026',
    author: 'Priya Sharma',
    authorRole: 'Chief Technology Officer',
    readTime: '8 min read',
    category: 'Artificial Intelligence',
    categoryColor: '#6366f1',
    categoryBg: '#eef2ff',
    heroImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80',
    accent: '#6366f1',
    accentLight: '#eef2ff',
    accentDark: '#1e1b4b',
    excerpt: 'How predictive AI is changing the landscape of modern CRM tools and enterprise decision-making at scale.',
    intro: `Artificial intelligence is no longer a futuristic concept reserved for research labs — it is the operational backbone of the world's most competitive enterprises. From predictive analytics that anticipate customer churn before it happens, to natural language interfaces that let non-technical staff query complex databases with a sentence, AI is reshaping what enterprise software means.`,
    sections: [
      {
        heading: 'From Rule-Based Systems to Adaptive Intelligence',
        body: `Early enterprise software operated on rigid, rule-based logic: if X happens, do Y. These systems were predictable but brittle. The moment business conditions shifted — a new product line, a market disruption, a regulatory change — the rules needed to be manually rewritten.\n\nModern AI flips this paradigm. Machine learning models ingest historical data and build probabilistic models of how the world works. When conditions change, the model retrains — adapting automatically rather than waiting for a developer to update a rule sheet. This shift from brittle rules to adaptive intelligence is the defining characteristic of next-generation enterprise platforms.`
      },
      {
        heading: 'AI in CRM: Beyond Contact Management',
        body: `Customer Relationship Management tools were, for decades, glorified address books with deal tracking bolted on. AI transforms them into revenue intelligence engines. Lead scoring models trained on thousands of closed-won and closed-lost deals can predict, with startling accuracy, which prospects are ready to buy — and which need more nurturing.\n\nSentiment analysis on support tickets automatically flags frustrated customers before they churn. Conversation intelligence tools transcribe and analyse sales calls, surfacing the objections that lose deals and the phrases that close them. The result: sales teams that get smarter with every interaction, not just more experienced.`
      },
      {
        heading: 'The Ethics and Governance Imperative',
        body: `The power of enterprise AI comes with serious responsibility. Biased training data produces biased models — hiring algorithms that discriminate, credit models that redline, recommendation engines that reinforce inequality. Enterprises deploying AI must invest equally in governance: audit trails, explainability frameworks, diverse training datasets, and human-in-the-loop checkpoints for high-stakes decisions.\n\nRegulatory pressure is accelerating this imperative. The EU AI Act, India's emerging AI policy framework, and sector-specific guidance from financial and healthcare regulators are creating a compliance landscape that rewards organisations that built governance in from the start.`
      },
      {
        heading: 'What to Expect in the Next Three Years',
        body: `The near-term roadmap for enterprise AI centres on three themes: multimodality, agentic workflows, and edge deployment. Multimodal models that process text, images, audio, and structured data simultaneously will power richer analytics and more intuitive interfaces. Agentic AI — systems that plan, take actions, and self-correct toward a goal — will automate complex multi-step workflows that today require human coordination. And edge AI will bring inference capabilities directly to devices and sensors, enabling real-time decisions without cloud round-trips.`
      },
    ],
    tags: ['AI', 'Enterprise Software', 'CRM', 'Machine Learning', 'Digital Transformation'],
    relatedSlugs: ['optimizing-logistics-with-trackintrack', 'why-sap-cloud-transformation-is-crucial'],
  },

  {
    titleSlug: 'optimizing-logistics-with-trackintrack',
    title: 'Optimizing Logistics with TrackIntrack',
    date: 'May 28, 2026',
    author: 'Arjun Mehta',
    authorRole: 'Head of Supply Chain Solutions',
    readTime: '7 min read',
    category: 'Logistics & Supply Chain',
    categoryColor: '#ea580c',
    categoryBg: '#fff7ed',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80',
    accent: '#ea580c',
    accentLight: '#fff7ed',
    accentDark: '#431407',
    excerpt: 'Why real-time tracking is vital for modern supply-chain compliance and how TrackIntrack delivers.',
    intro: `Supply chains have always been complex. But the decade since 2020 has exposed just how fragile complexity can become under pressure. Port shutdowns, driver shortages, fuel price spikes, and the relentless growth of e-commerce have pushed logistics operators to their limits. The organisations that navigated these crises best shared one capability: real-time visibility into every node of their supply chain.`,
    sections: [
      {
        heading: 'The Visibility Gap — and Why It Is So Costly',
        body: `Most logistics operators have some form of tracking — GPS units on trucks, barcode scans at warehouses. But point-in-time data is not the same as real-time visibility. A GPS ping every 5 minutes means a vehicle can travel several kilometres unmonitored. A warehouse scan tells you when a pallet arrived, not where it is right now or whether it has been moved to the correct location.\n\nThis visibility gap creates cascading costs. Delayed shipments trigger customer penalties. Missing inventory causes production line stoppages. Fuel theft — facilitated by infrequent monitoring — drains margins silently. Compliance violations go undetected until an audit reveals months of unreported route deviations.`
      },
      {
        heading: 'How TrackIntrack Closes the Gap',
        body: `TrackIntrack's IoT platform aggregates data from GPS hardware, fuel sensors, door-open detectors, temperature probes, and driver behaviour accelerometers — updating every second. This sub-second telemetry feeds a live operational dashboard that gives dispatchers a true real-time picture of every asset.\n\nGeo-fencing rules automatically alert managers when a vehicle leaves an approved corridor or enters a restricted zone. Predictive maintenance algorithms analyse engine diagnostics from OBD-II ports and flag vehicles approaching failure — reducing unplanned breakdowns by up to 40% in early deployments.`
      },
      {
        heading: 'Compliance and the Regulatory Landscape',
        body: `Electronic logging device (ELD) mandates, driver hours-of-service rules, cold chain temperature documentation requirements, and customs pre-notification obligations are creating an increasingly complex compliance landscape for logistics operators. Manual compliance — paper logs, spreadsheet temperature records, verbal communications — is not only inefficient; it is increasingly legally insufficient.\n\nTrackIntrack's automated compliance module generates audit-ready reports from live telemetry data: ELD-compliant hours-of-service logs, timestamped temperature records for cold chain shipments, and geo-tagged delivery confirmations. When a regulator or a customer audits your operation, the documentation is already waiting.`
      },
      {
        heading: 'The ROI Case: Numbers That Move Decision-Makers',
        body: `Logistics technology investments need to demonstrate measurable returns quickly. TrackIntrack deployments have consistently delivered: 28–34% reduction in fuel spend through route optimisation and idle-time alerts; 40% reduction in unplanned vehicle downtime through predictive maintenance; 22% improvement in on-time delivery rates; and 15–20% reduction in insurance premiums through driver safety scoring programmes. For a mid-size fleet of 200 vehicles, these numbers typically represent annual savings well in excess of the platform cost.`
      },
    ],
    tags: ['Logistics', 'Fleet Management', 'IoT', 'Supply Chain', 'Real-Time Tracking'],
    relatedSlugs: ['the-future-of-ai-in-enterprise-solutions', 'revolutionizing-healthcare-via-tech-modules'],
  },

  {
    titleSlug: 'why-sap-cloud-transformation-is-crucial',
    title: 'Why SAP Cloud Transformation is Crucial',
    date: 'May 14, 2026',
    author: 'Neha Kapoor',
    authorRole: 'Enterprise Architecture Lead',
    readTime: '9 min read',
    category: 'Cloud & Infrastructure',
    categoryColor: '#0891b2',
    categoryBg: '#ecfeff',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
    accent: '#0891b2',
    accentLight: '#ecfeff',
    accentDark: '#083344',
    excerpt: 'Migrating legacy SAP frameworks to cloud instances safely — a practical guide for enterprise architects.',
    intro: `SAP systems sit at the centre of operations for thousands of the world's largest enterprises. They manage everything from procurement and finance to manufacturing and HR. They are also, in many organisations, running on on-premise infrastructure that was designed for a world before cloud computing, mobile access, and real-time analytics. The case for moving to SAP cloud is compelling — but the path is rarely simple.`,
    sections: [
      {
        heading: 'The On-Premise Liability',
        body: `Legacy SAP on-premise installations carry a compounding set of liabilities. Hardware refresh cycles are expensive and disruptive. Capacity planning is a perpetual guessing game — over-provision and you waste capital; under-provision and a month-end processing surge brings the system to its knees. Security patching lags behind cloud-native alternatives. And perhaps most critically, on-premise SAP environments are difficult to integrate with the modern SaaS ecosystem that most enterprises now depend on.\n\nSAP has made its own position clear: mainstream maintenance for many older ECC versions ends in 2027, with extended maintenance available until 2030 at premium cost. The migration clock is ticking.`
      },
      {
        heading: 'RISE with SAP — What It Actually Means',
        body: `SAP's RISE programme bundles S/4HANA Cloud, infrastructure (typically on hyperscalers like AWS, Azure, or Google Cloud), SAP Business Network access, and a suite of transformation services into a single commercial offer. For many enterprises, it simplifies the commercial and technical complexity of cloud migration.\n\nBut RISE is not a magic button. Organisations that approach it as a lift-and-shift — moving their existing customised ECC configuration to a cloud environment unchanged — typically end up with the same technical debt in a different location, plus cloud hosting costs. The value of cloud transformation is realised when it is accompanied by genuine process simplification and adoption of SAP standard functionality.`
      },
      {
        heading: 'A Practical Migration Methodology',
        body: `Successful SAP cloud migrations follow a structured methodology: Assess — inventory current systems, customisations, integrations, and data volumes. Clean — rationalise customisations, archive historical data, and resolve outstanding data quality issues before migration. Design — blueprint the target architecture, integration landscape, and change management approach. Migrate — execute phased data migration with parallel-run validation. Optimise — use cloud-native capabilities (embedded analytics, AI-assisted processes, API integration) that were unavailable on-premise.\n\nThe assessment and clean phases are where most projects underestimate effort. Years of accumulated customisations and data debt cannot be migrated away; they must be resolved.`
      },
      {
        heading: 'Security, Compliance, and Shared Responsibility',
        body: `Cloud migration does not transfer security responsibility — it redistributes it. Under the shared responsibility model, the hyperscaler secures the infrastructure; SAP secures the platform; and the enterprise remains responsible for data, access management, configuration, and application-layer security. Enterprises that assume cloud means someone else handles security learn this lesson expensively.\n\nFor highly regulated sectors — banking, pharmaceuticals, public sector — cloud migration also requires careful mapping of data residency requirements, audit log retention obligations, and change management documentation to applicable regulatory frameworks. Building compliance into the migration design is far less expensive than retrofitting it post-go-live.`
      },
    ],
    tags: ['SAP', 'Cloud Migration', 'Enterprise Architecture', 'Digital Transformation', 'S/4HANA'],
    relatedSlugs: ['the-future-of-ai-in-enterprise-solutions', 'mastering-python-for-machine-learning'],
  },

  {
    titleSlug: 'revolutionizing-healthcare-via-tech-modules',
    title: 'Revolutionizing Healthcare via Tech Modules',
    date: 'April 30, 2026',
    author: 'Dr. Vikram Nair',
    authorRole: 'Healthcare Technology Advisor',
    readTime: '8 min read',
    category: 'Healthcare Technology',
    categoryColor: '#0d9488',
    categoryBg: '#f0fdfa',
    heroImage: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80',
    accent: '#0d9488',
    accentLight: '#f0fdfa',
    accentDark: '#042f2e',
    excerpt: 'Bridging the disconnect between patient consulting and laboratories through integrated digital health modules.',
    intro: `The modern hospital is a deeply fragmented information environment. A patient's journey from GP referral to specialist consultation to diagnostic testing to pharmacy to billing may involve five or more disconnected systems, each maintained by a different department, each storing data in a different format. The consequences — delayed diagnoses, medication errors, duplicate tests, and frustrated patients — are well documented. Integrated health technology modules are the solution.`,
    sections: [
      {
        heading: 'The Fragmentation Problem in Indian Healthcare',
        body: `India's healthcare sector presents the fragmentation challenge in its most acute form. A secondary hospital may run a standalone billing system, a paper-based OPD register, a laboratory information system that doesn't talk to the EMR, and a pharmacy management tool purchased from a third vendor. Connecting a patient record across these systems requires manual data re-entry at each step — a process that is slow, error-prone, and impossible to scale.\n\nAyushman Bharat Digital Mission (ABDM) is creating the policy framework for interoperability through standardised health IDs and FHIR-compliant data exchange. But policy frameworks only create value when the underlying systems are capable of participating in them.`
      },
      {
        heading: 'EMR at the Centre — and What That Really Requires',
        body: `An Electronic Medical Record is only as valuable as the completeness and timeliness of the data flowing into it. An EMR that receives lab results 24 hours after they are generated, that requires manual transcription of pharmacy dispensing records, or that doesn't receive nursing observations from the ward is not a clinical intelligence tool — it is an expensive data repository.\n\nTruly useful EMR deployments require bidirectional integration with every clinical touchpoint: laboratory analysers that push results directly, pharmacy systems that confirm dispensing, imaging systems that attach DICOM studies, and ward nursing tools that record vital signs and observations in real time. PathyaTech achieves this through a unified data bus architecture where all modules share a common patient context.`
      },
      {
        heading: 'Telemedicine: Extending the Reach of Specialists',
        body: `India has approximately 1.2 doctors per 1,000 population against a WHO-recommended ratio of 1:1,000 — and the distribution is heavily skewed toward urban centres. A specialist in Mumbai or Delhi is inaccessible to a patient in a district town not because the specialist doesn't exist, but because the infrastructure for remote consultation hasn't existed.\n\nIntegrated telemedicine modules change this equation. When a rural clinic's EMR can share a patient's complete clinical history, lab results, and imaging studies with a specialist 1,000 kilometres away — and the specialist can conduct a video consultation, annotate the records, and issue a digital prescription back into the same system — the geography of healthcare changes fundamentally.`
      },
      {
        heading: 'Measuring Outcomes: The Data Dividend',
        body: `Integrated health modules don't just improve care delivery — they generate the data infrastructure needed to measure and improve outcomes systematically. When every clinical event is captured in a structured, timestamped, attributed record, healthcare administrators can analyse: which treatment protocols produce the best outcomes for which patient populations; where diagnostic delays are occurring and why; which physicians have the highest rates of readmission; and how resource utilisation varies across departments and time periods. This data dividend — the ability to learn systematically from clinical experience — may be the most transformative long-term benefit of healthcare digitisation.`
      },
    ],
    tags: ['Healthcare', 'Digital Health', 'EMR', 'Telemedicine', 'ABDM', 'HealthTech'],
    relatedSlugs: ['the-future-of-ai-in-enterprise-solutions', 'building-impactful-apps-for-non-profits'],
  },

  {
    titleSlug: 'building-impactful-apps-for-non-profits',
    title: 'Building Impactful Apps for Non-Profits',
    date: 'April 15, 2026',
    author: 'Ananya Desai',
    authorRole: 'Social Impact Technology Lead',
    readTime: '6 min read',
    category: 'Non-Profit Technology',
    categoryColor: '#16a34a',
    categoryBg: '#f0fdf4',
    heroImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80',
    accent: '#16a34a',
    accentLight: '#f0fdf4',
    accentDark: '#052e16',
    excerpt: 'How tailored software architecture helps NGOs unlock global funding and demonstrate measurable impact.',
    intro: `Non-profit organisations operate under a paradox: they are often expected to demonstrate the same rigour of financial reporting, impact measurement, and governance as large corporations — with a fraction of the administrative budget. Donors, grant-making bodies, and government partners increasingly require detailed utilisation reports, real-time programme dashboards, and auditable financial records. Meeting these expectations with spreadsheets and manually maintained databases is no longer viable.`,
    sections: [
      {
        heading: 'Why Generic Software Fails NGOs',
        body: `The first instinct of many NGOs is to adapt generic business software — QuickBooks for accounting, Salesforce for donor management, Excel for grant tracking. This approach works at small scale but breaks down as the organisation grows and programmes multiply.\n\nGeneric accounting tools don't understand fund accounting — the NGO principle that money donated for a specific purpose must be spent only on that purpose and reported separately. Generic CRM tools don't have concepts like grant lifecycle stages, beneficiary demographics, or programme impact metrics built in. The result is extensive customisation work that typically produces fragile, undocumented systems that only one person knows how to maintain.`
      },
      {
        heading: 'The Architecture of Impact: What NGO Software Must Do',
        body: `Effective NGO management software must handle several capabilities that are genuinely sector-specific: Fund accounting with ring-fenced budgets and automatic utilisation tracking; Grant lifecycle management from application through reporting and closure; Beneficiary registration and programme participation tracking; Donor CRM with gift aid processing and relationship management; Volunteer management with hour logging and skills matching; and Impact reporting that translates programme activities into compelling outcome narratives.\n\nNgoConnect was designed with input from programme officers, grant managers, and finance teams across 50+ organisations to ensure every feature maps to a real operational need, not a theoretical requirement.`
      },
      {
        heading: 'Unlocking International Funding Through Compliance',
        body: `International foundations and bilateral donors have stringent compliance requirements. FCRA registration and compliance for foreign contributions in India; detailed utilisation certificates in formats specified by funders; sub-grantee monitoring and reporting; and procurement transparency requirements that document every major purchase decision.\n\nOrganisations that meet these requirements consistently — that produce clean, auditable, timely reports — build the track record that attracts larger grants and longer-term partnerships. NgoConnect's automated compliance module generates funder-specific report formats directly from programme data, eliminating the manual compilation work that typically consumes weeks of staff time before major reporting deadlines.`
      },
      {
        heading: 'Technology as an Equity Tool',
        body: `There is a troubling feedback loop in the non-profit sector: well-resourced organisations can invest in systems that make them more competitive for funding, while under-resourced organisations spend their capacity on manual administration that the better-resourced ones automate. Technology, deployed thoughtfully, can break this loop.\n\nCloud-native NGO management platforms with subscription pricing eliminate the capital expenditure barrier that previously restricted enterprise-grade software to large organisations. A community organisation managing a single government scheme can access the same quality of grant management, donor CRM, and impact reporting tools as an international development foundation — and compete for funding on the merits of their programmes, not the sophistication of their reporting.`
      },
    ],
    tags: ['Non-Profit', 'NGO Technology', 'Grant Management', 'Social Impact', 'Fund Accounting'],
    relatedSlugs: ['revolutionizing-healthcare-via-tech-modules', 'the-future-of-ai-in-enterprise-solutions'],
  },

  {
    titleSlug: 'mastering-python-for-machine-learning',
    title: 'Mastering Python for Machine Learning',
    date: 'March 02, 2026',
    author: 'Rohan Verma',
    authorRole: 'Senior Data Scientist',
    readTime: '10 min read',
    category: 'Data Science',
    categoryColor: '#7c3aed',
    categoryBg: '#faf5ff',
    heroImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&q=80',
    accent: '#7c3aed',
    accentLight: '#faf5ff',
    accentDark: '#2e1065',
    excerpt: 'A clear roadmap for engineering students and professionals entering AI careers through Python and ML fundamentals.',
    intro: `Python has become the lingua franca of machine learning — not because it is the fastest language or the most theoretically elegant, but because it sits at the intersection of accessibility and power. A beginner can write a working neural network in under 20 lines. A researcher can prototype a novel architecture in a day. An enterprise team can deploy a production model with the same tools they used to explore the data. This guide maps the path from Python fundamentals to production ML.`,
    sections: [
      {
        heading: 'The Python ML Stack: What You Actually Need',
        body: `The Python ML ecosystem is vast, and the abundance of libraries can be paralysing for newcomers. The core stack is much smaller than it appears: NumPy for numerical computation and array manipulation — virtually everything else is built on it. Pandas for data loading, cleaning, and transformation. Matplotlib and Seaborn for visualisation. Scikit-learn for classical ML algorithms and evaluation frameworks. PyTorch or TensorFlow for deep learning. And Jupyter notebooks for interactive exploration.\n\nMastering these six tools deeply — understanding not just their APIs but the mathematical concepts they implement — puts you in a position to work effectively on the vast majority of real-world ML problems. Everything else is specialisation.`
      },
      {
        heading: 'The Mathematics You Cannot Avoid',
        body: `It is tempting to treat ML libraries as black boxes — feed in data, get predictions out, tune hyperparameters until the metrics look good. This approach works, poorly, for simple problems. For anything non-trivial, you need to understand what is happening inside the box.\n\nThe essential mathematics for ML: Linear algebra (vectors, matrices, dot products, eigendecomposition) — because data is structured as matrices and most ML operations are linear algebraic transformations. Calculus (derivatives, chain rule, gradient descent) — because training a model is an optimisation problem solved by following gradients. Probability and statistics (Bayes' theorem, probability distributions, hypothesis testing) — because ML models are probabilistic and evaluation requires statistical rigour. You don't need to derive everything from first principles, but you need enough understanding to know when something has gone wrong.`
      },
      {
        heading: 'From Notebook to Production: The Gap Nobody Warns You About',
        body: `The journey from a Jupyter notebook with good validation metrics to a production ML system that delivers value reliably is longer and more treacherous than most tutorials acknowledge. Production ML requires: data pipelines that reliably ingest, validate, and transform new data; model versioning that tracks exactly which data and code produced each model; serving infrastructure that can deliver predictions at the required latency and throughput; monitoring that detects when model performance degrades due to data drift; and retraining pipelines that update the model when performance falls below thresholds.\n\nMLOps — the practice of applying DevOps principles to the ML lifecycle — has emerged as a discipline specifically to address this gap. Tools like MLflow, Weights & Biases, and cloud-native ML platforms (Vertex AI, SageMaker, Azure ML) provide the infrastructure. But the practices — reproducibility, version control, automated testing, monitoring — are as important as the tools.`
      },
      {
        heading: 'Building a Portfolio That Gets You Hired',
        body: `For engineering students and career-changers entering ML, the portfolio is the credential. Academic qualifications signal potential; a GitHub portfolio demonstrates execution. The most impactful portfolio projects share common characteristics: they start with a real problem (not "I implemented a MNIST classifier"), demonstrate end-to-end thinking from data acquisition through deployment, show honest evaluation including failure modes and limitations, and include clean, documented code that a collaborator could run.\n\nThree or four genuinely excellent projects — with clear problem statements, rigorous methodology, and thoughtful analysis — outperform ten superficial ones. Quality of thinking matters more than quantity of commits. Document your projects as if you are explaining them to a technically capable colleague who has not seen the data.`
      },
    ],
    tags: ['Python', 'Machine Learning', 'Data Science', 'AI', 'Career Development', 'MLOps'],
    relatedSlugs: ['the-future-of-ai-in-enterprise-solutions', 'why-sap-cloud-transformation-is-crucial'],
  },
];

/* ─────────────────────────────────────────────────────────
   SLUG RESOLVER — immune to extra words / dashes in URL
───────────────────────────────────────────────────────── */
function norm(s: string) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }

function findBlog(rawSlug: string) {
  // 1. exact
  const e = BLOGS.find(b => b.titleSlug === rawSlug); if (e) return e;
  // 2. title → slug
  const t = BLOGS.find(b => b.title.toLowerCase().replace(/\s+/g, '-') === rawSlug); if (t) return t;
  // 3. alphanumeric startsWith
  const nu = norm(rawSlug);
  const s3 = BLOGS.find(b => { const nt = norm(b.titleSlug); return nu.startsWith(nt) || nt.startsWith(nu); });
  if (s3) return s3;
  // 4. first token
  const tok = nu.substring(0, 8);
  return BLOGS.find(b => norm(b.titleSlug).startsWith(tok)) || null;
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug   = params?.slug as string ?? '';
  const blog   = findBlog(slug);

  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      const el = document.documentElement;
      const progress = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <p className="text-gray-400 text-lg font-medium">Blog not found — <code className="bg-gray-100 px-2 py-1 rounded text-sm">{slug}</code></p>
          <button onClick={() => router.back()} className="text-blue-600 font-bold hover:underline">← Go Back</button>
        </div>
      </div>
    );
  }

  const related = BLOGS.filter(b => blog.relatedSlugs.includes(b.titleSlug));

  return (
    <div className="min-h-screen bg-white text-gray-900 w-full overflow-x-hidden">

      {/* Read Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-gray-100">
        <div className="h-full transition-all duration-150 ease-linear" style={{ width: `${readProgress}%`, background: blog.accent }} />
      </div>

      {/* Sticky Navbar */}
      <nav className={`fixed top-0.5 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: scrolled ? blog.accent : '#fff' }}>
            <ArrowLeft size={17} /> All Articles
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: blog.categoryBg, color: blog.categoryColor }}>
              {blog.category}
            </span>
            <button onClick={handleCopy} className="p-2 rounded-lg transition-colors hover:bg-white/20" style={{ color: scrolled ? blog.accent : '#fff' }}>
              {copied ? <CheckCheck size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative w-full h-[400px] md:h-[460px] overflow-hidden">
        <img src={blog.heroImage} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${blog.accentDark}f2, ${blog.accentDark}99, transparent)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 h-full flex flex-col justify-end pb-12 pt-24">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 w-fit" style={{ background: blog.accent, color: '#fff' }}>
            <Tag size={11} /> {blog.category}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 max-w-3xl">{blog.title}</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed mb-6">{blog.excerpt}</p>
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-white/60 font-medium">
            <span className="flex items-center gap-1.5"><User size={13} />{blog.author} · {blog.authorRole}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} />{blog.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} />{blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-14">
        <div className="grid lg:grid-cols-[1fr_300px] gap-16 items-start">

          {/* Article Content */}
          <article>
            {/* Intro */}
            <p className="text-xl text-gray-600 leading-relaxed mb-12 font-medium border-l-4 pl-6" style={{ borderColor: blog.accent }}>
              {blog.intro}
            </p>

            {/* Sections */}
            <div className="space-y-12">
              {blog.sections.map((sec: any, i: number) => (
                <section key={i}>
                  <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-start gap-3">
                    <span className="mt-1 w-6 h-6 rounded-md flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{ background: blog.accent }}>
                      {i + 1}
                    </span>
                    {sec.heading}
                  </h2>
                  {sec.body.split('\n\n').map((para: string, j: number) => (
                    <p key={j} className="text-gray-600 leading-relaxed text-base mb-4">{para}</p>
                  ))}
                </section>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-14 pt-8 border-t border-gray-100">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string, i: number) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full border" style={{ color: blog.categoryColor, borderColor: blog.categoryBg, background: blog.categoryBg }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 p-6 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-gray-900 mb-1">Found this helpful?</p>
                <p className="text-sm text-gray-500">Share this article with your team.</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: blog.accent }}>
                  {copied ? <><CheckCheck size={15}/> Copied!</> : <><Copy size={15}/> Copy Link</>}
                </button>
              </div>
            </div>

            {/* Author Card */}
            <div className="mt-8 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black flex-shrink-0" style={{ background: blog.accent }}>
                {blog.author.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="font-black text-gray-900">{blog.author}</p>
                <p className="text-sm text-gray-500 mb-2">{blog.authorRole}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Expert contributor at the intersection of technology and enterprise transformation. Regularly writes about digital strategy, emerging platforms, and implementation best practices.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6 sticky top-24">
            {/* Article Info */}
            <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Article Info</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600"><User size={14} style={{ color: blog.accent }} /><span>{blog.author}</span></div>
                <div className="flex items-center gap-2 text-gray-600"><Calendar size={14} style={{ color: blog.accent }} /><span>{blog.date}</span></div>
                <div className="flex items-center gap-2 text-gray-600"><Clock size={14} style={{ color: blog.accent }} /><span>{blog.readTime}</span></div>
                <div className="flex items-center gap-2 text-gray-600"><BookOpen size={14} style={{ color: blog.accent }} /><span>{blog.sections.length} sections</span></div>
              </div>
            </div>

            {/* In This Article */}
            <div className="p-5 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">In This Article</p>
              <ol className="space-y-2">
                {blog.sections.map((sec: any, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                    <span className="w-4 h-4 rounded flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 mt-0.5" style={{ background: blog.accent }}>{i + 1}</span>
                    {sec.heading}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-black mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((b: any) => (
                <div key={b.titleSlug} onClick={() => router.push(`/blogs/${b.titleSlug}`)}
                  className="group cursor-pointer rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="h-40 overflow-hidden">
                    <img src={b.heroImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold px-2 py-1 rounded-full mb-3 inline-block" style={{ background: b.categoryBg, color: b.categoryColor }}>{b.category}</span>
                    <h3 className="font-black text-gray-900 mb-2 group-hover:underline underline-offset-2">{b.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{b.excerpt}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-bold" style={{ color: b.accent }}>
                      Read Article <ChevronRight size={13}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 bg-gray-50 py-6 px-6 text-center text-sm text-gray-400 mt-10">
        © {new Date().getFullYear()} Our Blog · All rights reserved
      </div>
    </div>
  );
}
