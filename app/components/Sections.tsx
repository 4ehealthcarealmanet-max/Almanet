'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Briefcase, Target, ShieldCheck, Rocket } from 'lucide-react';
import { Monitor, TrendingUp, Handshake, MapPin, Clock, ArrowRight } from "lucide-react";

import { NAV_ITEMS, SERVICES, EVENTS, BLOGS, JOBS, CAREER_PERKS } from '../constants';
import { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '../constants';

//import { ArrowRight } from 'lucide-react';
import type { ReactElement } from 'react';

// ─── Scroll Reveal (built-in, no separate file needed) ────────────────────────
/**
 * useReveal — lightweight scroll-triggered reveal hook.
 *
 * Why this instead of a library: the whole site only needs one motion
 * primitive (fade + rise on first view), so IntersectionObserver gives us
 * that with zero extra JS weight and no layout-shift risk. Animations are
 * GPU-only (opacity/transform), respect prefers-reduced-motion, and only
 * fire once per element — no re-triggering jank while scrolling up/down.
 */
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // fire once — no re-animating on scroll-back
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/** Class-string helper so call sites stay one-liners. delay is in ms (0/75/150/225...) */
function reveal(visible: boolean, delayMs = 0) {
  const delayClass =
    delayMs === 0 ? '' :
    delayMs <= 75 ? 'delay-75' :
    delayMs <= 150 ? 'delay-150' :
    delayMs <= 300 ? 'delay-300' : 'delay-500';

  return [
    'transition-all duration-700 ease-out will-change-transform',
    delayClass,
    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
  ].join(' ');
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * RevealItem — wraps a single grid/list item with its own scroll-revea */
function RevealItem({
  as: Tag = 'div',
  delayMs = 0,
  className = '',
  children,
}: {
  as?: 'div' | 'article';
  delayMs?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const { ref, visible } = useReveal();
  return (
    <Tag ref={ref as React.RefObject<any>} className={`${className} ${reveal(visible, delayMs)}`}>
      {children}
    </Tag>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar({ onGetInTouch }: { onGetInTouch: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
       <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/almanet-logo.png" alt="AlmaNet" className="h-30 w-auto object-contain hover:scale-105 transition-transform duration-300" style={{ mixBlendMode: 'multiply' }} />
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-gray-700">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().replace(/\s+/g, ''))}
              className="relative hover:text-blue-700 transition-colors group py-2"
            >
              {item}
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>
        <button
          onClick={onGetInTouch}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-blue-200/60 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98]"
        >
          Get in Touch
        </button>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
// ─── Hero ─────────────────────────────────────────────────────────────────────
// Layout   : Original left (text) + right (image) — UNCHANGED
// Upgrades : Better typography hierarchy, refined badges, smoother animations,
//            subtle gradient on headline, polished stat row, better image glow

//import { useEffect, useRef } from "react";

export function HeroSection({ onGetInTouch }: { onGetInTouch: () => void }) {
  const imageRef = useRef<HTMLDivElement>(null);

  // Subtle mouse parallax on image — desktop only
  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * -4;
      el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-36 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-[#F8FAFC] border-b border-gray-100"
    >
      {/* ── Background depth ── */}
      <div className="absolute inset-0 hero-grain pointer-events-none z-0" />
      <div className="absolute top-[-60px] left-1/3 w-[55vw] h-[340px] bg-blue-100 rounded-full blur-[130px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[35vw] h-[260px] bg-blue-50 rounded-full blur-[110px] opacity-80 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[20vw] h-[200px] bg-indigo-50 rounded-full blur-[90px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">

        {/* ─── LEFT: Text ─────────────────────────────────────────────────── */}
        <div className="space-y-7 text-center md:text-left">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black bg-blue-600 text-white shadow-lg shadow-blue-300/40 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Next Generation Digital Ecosystems
          </span>

          {/* Headline — with underline accent on blue word */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-gray-900">
            Empowering Ideas via{" "}
            <br className="hidden sm:block" />
            <span className="relative inline-block text-blue-600">
              Advanced Intelligence
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-200 rounded-full" />
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-500 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Almanet builds foundational automation suites, customized corporate SAP
            transformations, and machine learning models engineered to elevate
            complex modern business initiatives.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-1">
            <button
              onClick={() => scrollTo("products")}
              className="px-8 py-4 rounded-xl font-bold text-base bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
            >
              Explore Products
            </button>
            <button
              onClick={onGetInTouch}
              className="px-8 py-4 rounded-xl font-bold text-base bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-400 hover:text-blue-700 hover:-translate-y-0.5 transition-all active:scale-[0.98] shadow-sm"
            >
              Register Platform
            </button>
          </div>

          {/* Stat row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 pt-6 border-t border-gray-100 mt-2">
            {[
              { val: "99.9%", label: "Uptime" },
              { val: "14+",   label: "Modules" },
              { val: "100%",  label: "Compliant" },
            ].map((s, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl font-black text-blue-600">{s.val}</div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT: Image ───────────────────────────────────────────────── */}
        <div className="relative flex justify-center items-center">

          {/* Rotating rings */}
          <div
            className="hero-accent-ring absolute rounded-full border border-dashed border-blue-200 pointer-events-none hidden sm:block"
            style={{ inset: "-32px" }}
          />
          <div
            className="hero-accent-ring-reverse absolute rounded-full border border-dashed border-blue-100 pointer-events-none hidden sm:block"
            style={{ inset: "-14px" }}
          />

          {/* Glow behind image */}
          <div className="absolute inset-4 bg-blue-300 rounded-3xl blur-3xl opacity-20 animate-pulse pointer-events-none" />

          {/* Image */}
          <div
            ref={imageRef}
            className="relative z-10 rounded-2xl overflow-hidden border border-gray-100 shadow-2xl shadow-blue-100/60 transition-transform duration-200 ease-out"
            style={{ willChange: "transform" }}
          >
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&auto=format&fit=crop&q=80"
              alt="Almanet enterprise analytics dashboard"
              className="w-full h-auto object-cover block max-w-full"
            />
            {/* Subtle inner vignette */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/5 to-transparent pointer-events-none" />
          </div>

          {/* Floating badge — bottom left */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-2.5 z-20 animate-bounce-slow">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
            <span className="text-xs font-bold text-gray-700 whitespace-nowrap">99.9% Uptime</span>
          </div>

          {/* Floating badge — top right */}
          <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-2.5 z-20 animate-bounce-slow-delay">
            <span className="text-xs font-bold text-blue-600 whitespace-nowrap">14+ Modules</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
          </div>

          {/* Floating badge — bottom right (new: 100% Compliant) */}
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-2 z-20 animate-bounce-slow hidden sm:flex">
            <span className="text-xs font-bold text-emerald-600 whitespace-nowrap">✓ Compliant</span>
          </div>

        </div>
      </div>
    </section>
  );
}


// ─── Product Types ────────────────────────────────────────────────────────────────────
interface ProductDisplay {
  num: string;
  title: string;
  desc: string;
  tag: string;
  color: { bg: string; accent: string; tagBg: string; tagText: string };
  illustration: React.ReactNode;
  slug: string;
}

// ─── Illustrations ────────────────────────────────────────────────────────────

const PathyaIllus = () => (
  <svg viewBox="0 0 320 148" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <line x1="0" y1="37" x2="320" y2="37" stroke="#B5D4F4" strokeWidth="0.5" />
    <line x1="0" y1="74" x2="320" y2="74" stroke="#B5D4F4" strokeWidth="0.5" />
    <line x1="0" y1="111" x2="320" y2="111" stroke="#B5D4F4" strokeWidth="0.5" />
    <polyline
      points="0,80 40,80 55,80 60,30 68,120 76,80 100,80 115,80 120,40 128,115 136,80 200,80 210,80 215,45 222,118 230,80 280,80 320,80"
      fill="none" stroke="#185FA5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    />
    <circle cx="280" cy="80" r="4" fill="#185FA5" opacity="0.8" />
    <rect x="14" y="14" width="60" height="28" rx="7" fill="white" opacity="0.7" />
    <text x="24" y="26" fontSize="7" fontWeight="700" fill="#185FA5">Patients</text>
    <text x="24" y="36" fontSize="9" fontWeight="800" fill="#0D1E3A">1,284</text>
    <rect x="86" y="14" width="60" height="28" rx="7" fill="white" opacity="0.7" />
    <text x="96" y="26" fontSize="7" fontWeight="700" fill="#185FA5">Beds Free</text>
    <text x="96" y="36" fontSize="9" fontWeight="800" fill="#0D1E3A">42 / 60</text>
  </svg>
);

const TrackintakeIllus = () => (
  <svg viewBox="0 0 320 148" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <circle cx="160" cy="74" r="50" fill="white" opacity="0.5" />
    <circle cx="160" cy="74" r="50" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
    <path d="M160,30 A44,44 0 0,1 204,98" fill="none" stroke="#3B6D11" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
    <path d="M204,98 A44,44 0 0,1 135,116" fill="none" stroke="#82C94E" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
    <path d="M135,116 A44,44 0 0,1 160,30" fill="none" stroke="#B5E480" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
    <circle cx="160" cy="74" r="22" fill="white" opacity="0.85" />
    <text x="160" y="70" textAnchor="middle" fontSize="8" fontWeight="700" fill="#3B6D11">1,840</text>
    <text x="160" y="80" textAnchor="middle" fontSize="7" fill="#5A7490">kcal</text>
    <rect x="18" y="50" width="8" height="8" rx="2" fill="#3B6D11" />
    <text x="30" y="58" fontSize="8" fill="#3B6D11" fontWeight="600">Protein 35%</text>
    <rect x="18" y="66" width="8" height="8" rx="2" fill="#82C94E" />
    <text x="30" y="74" fontSize="8" fill="#3B6D11" fontWeight="600">Carbs 40%</text>
    <rect x="18" y="82" width="8" height="8" rx="2" fill="#B5E480" />
    <text x="30" y="90" fontSize="8" fill="#3B6D11" fontWeight="600">Fats 25%</text>
    <rect x="238" y="44" width="64" height="24" rx="7" fill="white" opacity="0.7" />
    <text x="248" y="53" fontSize="7" fontWeight="600" fill="#3B6D11">Hydration</text>
    <text x="248" y="63" fontSize="9" fontWeight="800" fill="#0D1E3A">2.4L / 3L</text>
    <rect x="238" y="74" width="64" height="24" rx="7" fill="white" opacity="0.7" />
    <text x="248" y="83" fontSize="7" fontWeight="600" fill="#3B6D11">Streak</text>
    <text x="248" y="93" fontSize="9" fontWeight="800" fill="#0D1E3A">🔥 14 days</text>
  </svg>
);

const CRMIllus = () => (
  <svg viewBox="0 0 320 148" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <path d="M100,20 L220,20 L190,60 L130,60 Z" fill="#534AB7" opacity="0.18" />
    <path d="M130,64 L190,64 L175,100 L145,100 Z" fill="#534AB7" opacity="0.28" />
    <path d="M145,104 L175,104 L167,130 L153,130 Z" fill="#534AB7" opacity="0.45" />
    <text x="160" y="37" textAnchor="middle" fontSize="8" fontWeight="700" fill="#534AB7">Leads — 840</text>
    <text x="160" y="79" textAnchor="middle" fontSize="8" fontWeight="700" fill="#534AB7">Pipeline — 312</text>
    <text x="160" y="120" textAnchor="middle" fontSize="8" fontWeight="700" fill="#534AB7">Won — 98</text>
    <rect x="14" y="14" width="68" height="28" rx="7" fill="white" opacity="0.7" />
    <text x="24" y="26" fontSize="7" fontWeight="600" fill="#534AB7">Revenue</text>
    <text x="24" y="36" fontSize="9" fontWeight="800" fill="#0D1E3A">$2.4M</text>
    <rect x="238" y="14" width="68" height="28" rx="7" fill="white" opacity="0.7" />
    <text x="248" y="26" fontSize="7" fontWeight="600" fill="#534AB7">Win Rate</text>
    <text x="248" y="36" fontSize="9" fontWeight="800" fill="#0D1E3A">38.6%</text>
  </svg>
);

const NgoIllus = () => (
  <svg viewBox="0 0 320 148" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <circle cx="160" cy="74" r="18" fill="#0F6E56" opacity="0.85" />
    <text x="160" y="78" textAnchor="middle" fontSize="9" fontWeight="800" fill="white">NGO</text>
    <line x1="160" y1="56" x2="100" y2="24" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
    <line x1="160" y1="56" x2="220" y2="24" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
    <line x1="160" y1="92" x2="80" y2="120" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
    <line x1="160" y1="92" x2="240" y2="120" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
    <line x1="160" y1="74" x2="50" y2="74" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
    <line x1="160" y1="74" x2="270" y2="74" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
    {[
      { cx: 100, cy: 24, label: "Donors" },
      { cx: 220, cy: 24, label: "Grants" },
      { cx: 80, cy: 120, label: "Vol." },
      { cx: 240, cy: 120, label: "Impact" },
      { cx: 50, cy: 74, label: "Events" },
      { cx: 270, cy: 74, label: "Reports" },
    ].map(({ cx, cy, label }) => (
      <g key={label}>
        <circle cx={cx} cy={cy} r="12" fill="white" opacity="0.8" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="7" fill="#0F6E56" fontWeight="700">{label}</text>
      </g>
    ))}
  </svg>
);

const VendorIllus = () => (
  <svg viewBox="0 0 320 148" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <text x="18" y="20" fontSize="8" fontWeight="600" fill="#854F0B">PO Volume — This Month</text>
    {[
      { x: 18, h: 24, op: 0.3 }, { x: 36, h: 32, op: 0.5 }, { x: 54, h: 28, op: 0.4 },
      { x: 72, h: 36, op: 0.7 }, { x: 90, h: 40, op: 0.9 },
    ].map(({ x, h, op }, i) => (
      <rect key={i} x={x} y={50 - h} width="14" height={h} rx="3" fill="#854F0B" opacity={op} />
    ))}
    {[
      { x: 18, label: "Supplier", val: "12" },
      { x: 102, label: "Warehouse", val: "3 hubs" },
      { x: 186, label: "Dispatch", val: "247" },
      { x: 250, label: "Delivered", val: "✓ 98%" },
    ].map(({ x, label, val }, i) => (
      <g key={i}>
        <rect x={x} y="55" width="52" height="38" rx="8" fill="white" opacity="0.8" />
        <text x={x + 26} y="70" textAnchor="middle" fontSize="7" fontWeight="700" fill="#854F0B">{label}</text>
        <text x={x + 26} y="82" textAnchor="middle" fontSize="8" fontWeight="800" fill={val.startsWith("✓") ? "#1D9E75" : "#0D1E3A"}>{val}</text>
      </g>
    ))}
    <line x1="72" y1="74" x2="100" y2="74" stroke="#854F0B" strokeWidth="2" />
    <line x1="156" y1="74" x2="184" y2="74" stroke="#854F0B" strokeWidth="2" />
    <line x1="240" y1="74" x2="248" y2="74" stroke="#854F0B" strokeWidth="2" />
    <rect x="18" y="108" width="110" height="24" rx="7" fill="white" opacity="0.7" />
    <text x="28" y="120" fontSize="7.5" fontWeight="600" fill="#854F0B">Cost Saved this Q: </text>
    <text x="118" y="120" fontSize="8" fontWeight="800" fill="#0D1E3A">$84K</text>
  </svg>
);

const LabIllus = () => (
  <svg viewBox="0 0 320 148" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    {[
      { x: 60, fillH: 32, fillY: 58, op1: 0.3, op2: 0.5 },
      { x: 95, fillH: 44, fillY: 46, op1: 0.35, op2: 0.55, fill: "#E07850" },
      { x: 130, fillH: 56, fillY: 34, op1: 0.2, op2: 0.35 },
    ].map(({ x, fillH, fillY, op1, op2, fill = "#993C1D" }, i) => (
      <g key={i}>
        <rect x={x} y="20" width="22" height="70" rx="11" fill="white" opacity="0.6" />
        <rect x={x} y={fillY} width="22" height={fillH} rx="0" fill={fill} opacity={op1} />
        <rect x={x} y="72" width="22" height="18" rx="11" fill={fill} opacity={op2} />
      </g>
    ))}
    <line x1="50" y1="92" x2="162" y2="92" stroke="#993C1D" strokeWidth="2" opacity="0.4" />
    <rect x="178" y="14" width="128" height="120" rx="10" fill="white" opacity="0.65" />
    <text x="188" y="30" fontSize="8" fontWeight="700" fill="#993C1D">Sample Results</text>
    {[
      { y: 36, label: "Haemoglobin", w: 62, pct: "78%" },
      { y: 56, label: "WBC Count", w: 48, pct: "60%", fill: "#E07850" },
      { y: 76, label: "RBC Count", w: 70, pct: "87%" },
    ].map(({ y, label, w, pct, fill = "#993C1D" }, i) => (
      <g key={i}>
        <text x="188" y={y + 14} fontSize="7" fill="#5A7490">{label}</text>
        <rect x="188" y={y + 18} width="80" height="5" rx="2" fill="#F5C8B8" />
        <rect x="188" y={y + 18} width={w} height="5" rx="2" fill={fill} opacity="0.7" />
        <text x="278" y={y + 23} fontSize="7" fill="#0D1E3A" fontWeight="700">{pct}</text>
      </g>
    ))}
    <rect x="188" y="98" width="108" height="26" rx="7" fill="#FAECE7" />
    <text x="198" y="109" fontSize="7" fontWeight="700" fill="#993C1D">Samples Processed</text>
    <text x="198" y="119" fontSize="10" fontWeight="800" fill="#0D1E3A">1,482 today</text>
  </svg>
);

const MedIllus = () => (
  <svg viewBox="0 0 320 148" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <rect x="30" y="18" width="160" height="100" rx="12" fill="white" opacity="0.65" />
    <circle cx="110" cy="52" r="20" fill="#FBEAF0" />
    <circle cx="110" cy="44" r="10" fill="#993556" opacity="0.6" />
    <ellipse cx="110" cy="68" rx="16" ry="10" fill="#993556" opacity="0.4" />
    <path d="M100,60 Q96,70 100,76" fill="none" stroke="#993556" strokeWidth="2" opacity="0.7" />
    <circle cx="100" cy="77" r="3" fill="#993556" opacity="0.7" />
    <rect x="40" y="106" width="140" height="6" rx="3" fill="#FBEAF0" />
    <rect x="40" y="106" width="70" height="6" rx="3" fill="#993556" opacity="0.45" />
    <text x="110" y="120" textAnchor="middle" fontSize="7" fill="#993556" fontWeight="700">Live Consultation</text>
    <rect x="202" y="18" width="98" height="100" rx="10" fill="white" opacity="0.65" />
    <text x="212" y="34" fontSize="7" fontWeight="700" fill="#993556">Queue Today</text>
    <text x="212" y="46" fontSize="14" fontWeight="800" fill="#0D1E3A">38</text>
    <text x="212" y="62" fontSize="7" fontWeight="700" fill="#993556">Avg Wait</text>
    <text x="212" y="74" fontSize="12" fontWeight="800" fill="#0D1E3A">4 min</text>
    <rect x="210" y="84" width="82" height="22" rx="6" fill="#FBEAF0" />
    <text x="220" y="94" fontSize="6.5" fontWeight="700" fill="#993556">Satisfaction</text>
    <text x="220" y="102" fontSize="8" fontWeight="800" fill="#0D1E3A">⭐ 4.8 / 5</text>
  </svg>
);

// ─── Display config keyed by product id ───────────────────────────────────────
const PRODUCT_DISPLAY: Record<string, Omit<ProductDisplay, "title" | "desc" | "tag" | "slug">> = {
  pathyatech: {
    num: "01",
    color: { bg: "from-[#E6F1FB] to-[#C5DCF5]", accent: "#185FA5", tagBg: "rgba(24,95,165,0.15)", tagText: "#185FA5" },
    illustration: <PathyaIllus />,
  },
  trackintake: {
    num: "02",
    color: { bg: "from-[#EAF6E0] to-[#C8EAB0]", accent: "#3B6D11", tagBg: "rgba(59,109,17,0.15)", tagText: "#3B6D11" },
    illustration: <TrackintakeIllus />,
  },
  crm: {
    num: "03",
    color: { bg: "from-[#EEEDFE] to-[#D5D2FB]", accent: "#534AB7", tagBg: "rgba(83,74,183,0.15)", tagText: "#534AB7" },
    illustration: <CRMIllus />,
  },
  ngo: {
    num: "04",
    color: { bg: "from-[#E1F5EE] to-[#B2E5D0]", accent: "#0F6E56", tagBg: "rgba(15,110,86,0.15)", tagText: "#0F6E56" },
    illustration: <NgoIllus />,
  },
  vendor: {
    num: "05",
    color: { bg: "from-[#FAEEDA] to-[#F5D8A0]", accent: "#854F0B", tagBg: "rgba(133,79,11,0.15)", tagText: "#854F0B" },
    illustration: <VendorIllus />,
  },
  lab: {
    num: "06",
    color: { bg: "from-[#FAECE7] to-[#F5C8B8]", accent: "#993C1D", tagBg: "rgba(153,60,29,0.15)", tagText: "#993C1D" },
    illustration: <LabIllus />,
  },
  doctor: {
    num: "07",
    color: { bg: "from-[#FBEAF0] to-[#F5C2D8]", accent: "#993556", tagBg: "rgba(153,53,86,0.15)", tagText: "#993556" },
    illustration: <MedIllus />,
  },
};

// Merge constants PRODUCTS with display config
const DISPLAY_PRODUCTS: ProductDisplay[] = PRODUCTS
  .filter((p) => PRODUCT_DISPLAY[p.id])
  .map((p) => ({
    ...PRODUCT_DISPLAY[p.id],
    title: p.name,
    desc: p.desc,
    tag: p.category,
    slug: p.id,
  }));

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProductCard({ p, delay }: { p: ProductDisplay; delay: number }) {
  return (
    <div
      className="group bg-white border border-[rgba(55,138,221,0.13)] rounded-[18px]
                 overflow-hidden flex flex-col
                 transition-all duration-300 ease-out
                 hover:-translate-y-1.5 hover:scale-[1.012]
                 hover:shadow-[0_12px_36px_rgba(24,95,165,0.13)]
                 hover:border-[rgba(24,95,165,0.28)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Illustration */}
      <div className={`relative h-[148px] overflow-hidden bg-gradient-to-br ${p.color.bg} flex items-center justify-center`}>
        {p.illustration}
        {/* Number badge */}
        <div
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center
                     text-[10px] font-bold text-white z-10"
          style={{ background: p.color.accent }}
        >
          {p.num}
        </div>
        {/* Domain tag */}
        <div
          className="absolute bottom-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1
                     rounded-full z-10 tracking-wide backdrop-blur-sm"
          style={{ background: p.color.tagBg, color: p.color.tagText }}
        >
          {p.tag}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 gap-1.5 p-4 pb-3.5">
        <h3 className="text-[13px] font-bold text-gray-900 leading-snug">{p.title}</h3>
        <p className="text-[11.5px] text-gray-500 leading-relaxed flex-1">{p.desc}</p>
        <Link
          href={`/products/${p.slug}`}
          className="text-[11.5px] font-bold inline-flex items-center gap-1 mt-2 transition-all
                     group-hover:gap-2"
          style={{ color: p.color.accent }}
        >
          Explore Specification <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ProductsSection() {
  const topRow = DISPLAY_PRODUCTS.slice(0, 3);
  const midRow = DISPLAY_PRODUCTS.slice(3, 6);
  const lastCard = DISPLAY_PRODUCTS[6] ?? null;

  return (
    <section
      id="products"
      className="py-28 border-t border-gray-100 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 10% 40%, rgba(55,138,221,0.09) 0%, transparent 65%),
          radial-gradient(ellipse 50% 60% at 90% 20%, rgba(83,74,183,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 50% 90%, rgba(24,95,165,0.05) 0%, transparent 60%),
          #EEF4FB
        `,
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100 mb-4">
            Our Portfolios
          </span>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Enterprise Scaling Products</h2>
          <p className="text-gray-500 text-base">
            Robust system modules custom optimized to run high-volume workflows fluidly.
          </p>
        </div>

        {/* Row 1 — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {topRow.map((p, i) => (
            <ProductCard key={p.slug} p={p} delay={i * 75} />
          ))}
        </div>

        {/* Row 2 — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {midRow.map((p, i) => (
            <ProductCard key={p.slug} p={p} delay={(i + 3) * 75} />
          ))}
        </div>

        {/* Row 3 — 1 card centered */}
        {lastCard && (
          <div className="flex justify-center">
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <ProductCard p={lastCard} delay={6 * 75} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}



// ─── Services ─────────────────────────────────────────────────────────────────
function ServiceCard({
  service: s,
  delay,
}: {
  service: (typeof SERVICES)[0];
  delay: number;
}) {
  return (
    <RevealItem
      delayMs={delay}
      className="p-6 bg-white border border-gray-100 rounded-3xl
                 hover:border-blue-200 card-lift shadow-sm hover:shadow-xl
                 group flex flex-col"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4
                   group-hover:scale-110 transition-all duration-300"
        style={{ backgroundColor: s.color.bg }}
      >
        <s.icon
          className="w-6 h-6 transition-colors duration-300"
          style={{ color: s.color.icon }}
        />
      </div>

      <span
        className="text-[10px] font-bold uppercase tracking-widest mb-1"
        style={{ color: s.color.icon }}
      >
        {s.color.tag}
      </span>

      <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">
        {s.title}
      </h3>

      <p className="text-xs text-gray-500 leading-relaxed mb-5 flex-1">
        {s.desc}
      </p>

      <Link
        href={`/services/${s.title
          .toLowerCase()
          .replace(/[\s&,/]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')}`}
        className="text-sm font-bold flex items-center gap-1 transition-colors"
        style={{ color: s.color.icon }}
      >
        Learn More <span aria-hidden="true">→</span>
      </Link>
    </RevealItem>
  );
}

export function ServicesSection() {
  const header = useReveal();
  const topRow = SERVICES.slice(0, 4);
  const bottomRow = SERVICES.slice(4);

  return (
    <section id="services" className="py-28 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div
          ref={header.ref}
          className={`text-center max-w-2xl mx-auto mb-16 ${reveal(header.visible)}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black
                           uppercase tracking-widest text-blue-700 bg-blue-100 mb-4">
            What We Do
          </span>
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Our Core Services
          </h2>
          <p className="text-gray-500 text-base">
            We deliver end-to-end IT solutions—helping organisations implement,
            optimise, and support mission-critical systems.
          </p>
        </div>

        {/* Top row — 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {topRow.map((s, i) => (
            <ServiceCard key={i} service={s} delay={i * 75} />
          ))}
        </div>

        {/* Bottom row — 3 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:max-w-[75%] mx-auto">
          {bottomRow.map((s, i) => (
            <ServiceCard key={i} service={s} delay={(i + 4) * 75} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Events ───────────────────────────────────────────────────────────────────
export function EventsSection({ onRegister }: { onRegister: (evt: typeof EVENTS[0]) => void }) {
  const header = useReveal();
  return (
    <section id="events" className="py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={header.ref} className={`text-center max-w-3xl mx-auto mb-16 space-y-4 ${reveal(header.visible)}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100">Stay Sharp</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">Upcoming Events & Workshops</h2>
          <p className="text-gray-500 text-base">Reserve a slot in our upcoming technical panels and direct deployment system deep-dives.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EVENTS.map((evt, i) => (
            <RevealItem
              key={evt.id}
              delayMs={i * 100}
              className="relative bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col group shadow-sm hover:shadow-2xl hover:shadow-blue-100/60 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-56 relative overflow-hidden">
                <img src={evt.img} alt={evt.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xs font-black text-gray-900">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white flex items-center gap-1.5">
                  <Activity className="w-3 h-3" /> {evt.location}
                </div>

                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 text-xs text-white font-semibold">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600/90 backdrop-blur-sm">{evt.date}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20">{evt.time}</span>
                </div>
              </div>

              <div className="p-7 flex flex-col justify-between flex-1 space-y-5">
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{evt.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{evt.desc}</p>
                </div>
                <button onClick={() => onRegister(evt)} className="w-full px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-100 flex items-center justify-center gap-2 group/btn">
                  Register For Event
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[3px] bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 transition-all duration-500" />
            </RevealItem>
          ))}
        </div>

        <div className="text-center mt-14">
          <button className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group">
            View All Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Blogs / Publications ─────────────────────────────────────────────────────
export function BlogsSection() {
  const header = useReveal();
  return (
    <section id="blogs" className="py-28 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={header.ref} className={`text-center max-w-3xl mx-auto mb-16 space-y-4 ${reveal(header.visible)}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100">Insights</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">Our Latest Publications</h2>
          <p className="text-gray-500 text-base">Deep technical reading exploring AI design patterns, cloud computing pipelines, and data orchestration.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS.map((blog, i) => (
            <RevealItem
              key={blog.id}
              as="article"
              delayMs={i * 75}
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-blue-100 card-lift flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-blue-50/50"
            >
              <div>
                <div className="h-52 overflow-hidden relative group">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60'; }}
                  />
                  {/* Subtle label chip over the image — helps scanability when browsing many cards */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-blue-700 px-2.5 py-1 rounded-full shadow-sm">
                    Article
                  </span>
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
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Careers ──────────────────────────────────────────────────────────────────
const PERK_IMAGES = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
];

const DEPT_COLORS: Record<string, string> = {
  'Engineering':          'bg-blue-50 text-blue-700 border-blue-200',
  'Cloud Infrastructure': 'bg-sky-50 text-sky-700 border-sky-200',
  'Design':               'bg-purple-50 text-purple-700 border-purple-200',
  'Product':              'bg-amber-50 text-amber-700 border-amber-200',
};

const TYPE_COLORS: Record<string, string> = {
  'Remote / Hybrid': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Full-Time':       'bg-violet-50 text-violet-700 border-violet-200',
  'Part-Time':       'bg-amber-50 text-amber-700 border-amber-200',
  'Contract':        'bg-rose-50 text-rose-700 border-rose-200',
};

export function CareersSection({ onApply }: { onApply: (jobTitle: string) => void }) {
  const header   = useReveal();
  const perks    = useReveal();
  const jobsHead = useReveal();

  return (
    <section
      id="career"
      className="relative py-28 overflow-hidden bg-[#F8FAFC] border-t border-gray-100"
    >
      {/* Subtle blue blobs for depth */}
      <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[300px] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-40px] w-[350px] h-[260px] bg-blue-50 rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 hero-grain pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Cinematic hero image strip ── */}
        <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden mb-16 border border-gray-200 shadow-2xl shadow-blue-100/60">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&auto=format&fit=crop&q=80"
            alt="Almanet team working together"
            className="w-full h-full object-cover"
          />
          {/* Blue-tinted overlay to keep white theme feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/50 to-blue-800/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 to-transparent" />

          {/* Headline on image */}
          <div
            ref={header.ref}
            className={`absolute bottom-0 left-0 p-8 sm:p-12 space-y-3 max-w-2xl ${reveal(header.visible)}`}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <Rocket className="w-3.5 h-3.5" /> Join Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.08]">
              Build the Future of{" "}
              <span className="text-blue-300">Enterprise Software</span>
            </h2>
            <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-xl">
              Grow your skills while working on advanced data systems, enterprise integrations, and robust application suites.
            </p>
          </div>

          {/* Floating badges on image */}
          <div className="absolute top-5 right-5 flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-700">2 Open Roles</span>
            </div>
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm">
              <MapPin className="w-3 h-3 text-blue-500" />
              <span className="text-xs font-bold text-gray-700">Remote Friendly</span>
            </div>
          </div>
        </div>

        {/* ── Perk cards ── */}
        <div
          ref={perks.ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 ${reveal(perks.visible)}`}
        >
          {CAREER_PERKS.map((perk, i) => (
            <RevealItem
              key={i}
              delayMs={i * 100}
              className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-400 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 bg-white"
            >
              {/* Image top */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={PERK_IMAGES[i]}
                  alt={perk.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
              </div>

              {/* Card body */}
              <div className="p-6 space-y-3 bg-white">
                <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <perk.Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {perk.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{perk.desc}</p>
              </div>
            </RevealItem>
          ))}
        </div>

        {/* ── Current Openings ── */}
        <div
          ref={jobsHead.ref}
          className={`space-y-4 max-w-4xl mx-auto ${reveal(jobsHead.visible)}`}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Openings</span>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              {JOBS.length} Positions
            </span>
          </div>

          {JOBS.map((job, idx) => (
            <RevealItem
              key={idx}
              delayMs={idx * 100}
              className="group p-6 sm:p-8 bg-white border border-gray-100 rounded-3xl hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm hover:-translate-y-0.5"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {job.title}
                  </h4>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${TYPE_COLORS[job.type] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {job.type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${DEPT_COLORS[job.dept] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {job.dept}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" /> Posted recently
                  </span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed max-w-xl">{job.desc}</p>
              </div>

              <button
                onClick={() => onApply(job.title)}
                className="group/btn sm:self-center flex items-center gap-2 px-7 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all duration-300 whitespace-nowrap shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </button>
            </RevealItem>
          ))}
        </div>

      </div>
    </section>
  );
}


// ─── About ────────────────────────────────────────────────────────────────────
export function AboutSection() {
  const intro   = useReveal();
  const stats   = useReveal();
  const pillars = useReveal();

  return (
    <section id="aboutus" className="relative overflow-hidden border-t border-gray-100">

      {/* ═══════════════════════════════════════════════════════════════════════
          PART 1 — Text + image side by side (white bg)
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-white py-28">
        {/* Subtle top-right blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-50 rounded-full blur-[120px] opacity-70 pointer-events-none" />
        <div className="absolute inset-0 hero-grain pointer-events-none opacity-20" />

        <div
          ref={intro.ref}
          className={`max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 ${reveal(intro.visible)}`}
        >
          {/* Left — text */}
          <div className="space-y-7">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-blue-600 text-white shadow-md shadow-blue-200">
              <Briefcase className="w-3.5 h-3.5" /> Corporate Profile & Intelligence
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.06]">
              Architecting Software{" "}
              <span className="relative inline-block">
                <span className="text-blue-600">Ecosystems</span>
                {/* Underline accent */}
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-200 rounded-full" />
              </span>{" "}
              That Drive Global Enterprises
            </h2>

            <p className="text-gray-700 leading-relaxed text-base sm:text-lg max-w-lg">
              Founded on rigid software engineering principles, Almanet designs high-performance digital architectures that fundamentally eliminate structural bottlenecks.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm max-w-lg">
              We believe modern enterprise apps shouldn't operate in silos. Our approach centers on unifying fragmented data streams—ensuring field actions, internal inventories, donor telemetry, and customer-facing touchpoints speak to the same underlying analytical database engine.
            </p>

            {/* Inline trust signals */}
            <div className="flex flex-wrap gap-3 pt-2">
              {['ISO Compliant', 'Cloud-Native', 'SAP Certified', 'AI-Ready'].map((tag) => (
                <span key={tag} className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — stacked image with floating card */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-blue-100/50">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&auto=format&fit=crop&q=80"
                alt="Almanet engineering team"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 to-transparent" />
            </div>

            {/* Floating card — bottom left */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4 flex items-center gap-3 z-10">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-black text-gray-900">100% Compliant</div>
                <div className="text-[10px] text-gray-400 font-medium">Regulatory & Data Privacy</div>
              </div>
            </div>

            {/* Floating card — top right */}
            <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4 flex items-center gap-3 z-10">
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-black text-blue-600">14+</span>
              </div>
              <div>
                <div className="text-sm font-black text-gray-900">Core Modules</div>
                <div className="text-[10px] text-gray-400 font-medium">Enterprise Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          PART 2 — Full-width blue stats band
      ════════════════════════════════════════════════════════════════════════ */}
      <div
        ref={stats.ref}
        className={`relative py-16 overflow-hidden ${reveal(stats.visible)}`}
        style={{
          background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #1D4ED8 100%)',
        }}
      >
        {/* Decorative circles inside band */}
        <div className="absolute top-[-60px] left-[-60px] w-[300px] h-[300px] bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-40px] w-[280px] h-[280px] bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute inset-0 hero-grain pointer-events-none opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { val: '99.9%', label: 'System Uptime',  desc: 'Redundant cloud pipelines' },
              { val: '14+',   label: 'Core Modules',   desc: 'Production-ready layers' },
              { val: '100%',  label: 'Data Privacy',   desc: 'Compliance built-in' },
              { val: '2026',  label: 'Industry Ready', desc: 'Next-gen AI frameworks' },
            ].map((stat, i) => (
              <RevealItem
                key={i}
                delayMs={i * 80}
                className="text-center space-y-1 group"
              >
                <div className="text-5xl sm:text-6xl font-black text-white group-hover:scale-105 transition-transform duration-300 inline-block">
                  {stat.val}
                </div>
                <div className="text-xs font-black text-blue-200 uppercase tracking-widest mt-2">
                  {stat.label}
                </div>
                <p className="text-xs text-blue-300/70">{stat.desc}</p>
              </RevealItem>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          PART 3 — Pillar cards (light blue-gray bg, distinct from white above)
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#F0F6FF] py-24">
        <div className="absolute inset-0 hero-grain pointer-events-none opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />

        <div
          ref={pillars.ref}
          className={`max-w-7xl mx-auto px-6 relative z-10 ${reveal(pillars.visible)}`}
        >
          {/* Mini heading */}
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-black text-blue-400 uppercase tracking-widest">What Drives Us</span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Built on Three Core Pillars
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: Target,
                title: 'Our Mission',
                desc: 'To democratize heavy enterprise automation layers—engineering secure ecosystems that lower operational friction.',
                accent: 'bg-blue-600',
                gradientFrom: 'from-blue-50',
                number: '01',
              },
              {
                Icon: ShieldCheck,
                title: 'Technical Mastery',
                desc: 'Specialized Python deep learning to comprehensive SAP configurations, our architecture relies on microservice modularity.',
                accent: 'bg-indigo-600',
                gradientFrom: 'from-indigo-50',
                number: '02',
              },
              {
                Icon: Rocket,
                title: 'Talent Incubation',
                desc: 'Integrated internship systems and expert-led training ensure upcoming developers master full-stack code paths.',
                accent: 'bg-sky-600',
                gradientFrom: 'from-sky-50',
                number: '03',
              },
            ].map((pillar, i) => (
              <RevealItem
                key={i}
                delayMs={i * 100}
                className="group bg-white rounded-3xl border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-400 hover:-translate-y-1 overflow-hidden"
              >
                {/* Gradient accent top bar */}
                <div className={`h-1.5 w-full ${pillar.accent}`} />

                {/* Body */}
                <div className="p-8 space-y-4">
                  {/* Number + icon row */}
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-2xl ${pillar.accent} flex items-center justify-center shadow-lg`}>
                      <pillar.Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-5xl font-black text-gray-100 group-hover:text-blue-100 transition-colors duration-300 select-none">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

// brand logos: lucide-react removed brand icons (Github/Twitter/Linkedin) in
// recent versions, so these are plain inline SVGs instead.
const SocialIcons: Record<string, (props: { size?: number }) => ReactElement> = {
  Twitter: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Linkedin: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124M3.558 20.452h3.56V9h-3.56z" />
    </svg>
  ),
  Github: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2" />
    </svg>
  ),
  Discord: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.062 0a.073.073 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.001-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029M8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418" />
    </svg>
  ),
};

export function Footer({ onGetInTouch }: { onGetInTouch: () => void }) {
  return (
    <footer className="relative bg-[#0a0e1a] text-gray-400 pt-20 pb-10 text-sm overflow-hidden">
      {/* top gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/60 to-orange-500/60" />

      {/* soft ambient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">
          {/* brand col */}
          <div className="lg:col-span-2 space-y-5">
           <div className="flex items-center gap-2">
              <img src="/almanet-logo.png" alt="AlmaNet" className="h-30 w-auto object-contain" />
            </div>
            <p className="text-[13px] text-gray-500 max-w-xs leading-relaxed">
              Empowering organizations with next-generation enterprise suites, automated modules, and secure cloud pipelines.
            </p>
            <div className="flex space-x-3 pt-2">
              {['Twitter', 'Linkedin', 'Github', 'Discord'].map((label) => {
                const Icon = SocialIcons[label];
                return (
                  <button
                    key={label}
                    onClick={onGetInTouch}
                    aria-label={label}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-blue-400 hover:bg-white/[0.07] transition-all duration-300"
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* sitemap */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">Sitemap</h4>
            <ul className="space-y-3 text-[13px] font-medium text-gray-500">
              {['Home', 'Products', 'Services', 'Events', 'Blogs', 'About Us'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item.toLowerCase().replace(' ', ''))}
                    className="group relative inline-block hover:text-white transition-colors duration-300"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-px bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* core products */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">Core Products</h4>
            <ul className="space-y-3 text-[13px] font-medium text-gray-500">
              {['Pathyatech Ecosystem', 'Trackintrack Fleet', 'Almanet CRM Matrix', 'NGO Global Portal', 'Vendor Supply Connect', 'Lab Module Hub'].map((prod) => (
                <li key={prod}>
                  <button
                    onClick={() => scrollTo('products')}
                    className="group relative inline-block text-left hover:text-white transition-colors duration-300"
                  >
                    {prod}
                    <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-px bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* newsletter */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">Stay Informed</h4>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Subscribe to unlock periodic engineering research insights.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); onGetInTouch(); }} className="space-y-3">
              <input
                type="email"
                required
                placeholder="engineering@domain.com"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-gray-600 outline-none focus:border-blue-500/60 focus:bg-white/[0.06] transition-all"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl text-[13px] font-bold tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                Join Telemetry
                <ArrowRight size={14} strokeWidth={2.2} />
              </button>
            </form>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[12px] text-gray-500">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-gray-300 font-semibold">Almanet Technologies &copy; 2026</span>
            <span className="text-gray-700">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              All System Telemetry Operational
            </span>
          </div>
          <div className="flex space-x-6">
            {['Security Controls', 'Privacy Framework', 'Terms of Operations'].map((item) => (
              <button key={item} onClick={onGetInTouch} className="hover:text-white transition-colors duration-300">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
