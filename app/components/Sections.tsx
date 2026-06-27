'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Briefcase, Target, ShieldCheck, Rocket } from 'lucide-react';
import { Monitor, TrendingUp, Handshake, MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import { NAV_ITEMS, SERVICES, EVENTS, BLOGS, JOBS, CAREER_PERKS } from '../constants';
import { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '../constants';
//import { ArrowRight } from 'lucide-react';
import type { ReactElement } from 'react';
import Image from 'next/image';
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
// ─── Count-up animated stat ─────────────────────────────────────────────
function useCountUp(targetText: string, durationMs = 1500) {
  const [display, setDisplay] = useState(
    targetText.replace(/[0-9.]/g, (c) => (c === "." ? "." : "0"))
  );
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const match = targetText.match(/^([^\d]*)([\d.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const numericStr = match ? match[2] : "0";
  const suffix = match ? match[3] : "";
  const decimals = numericStr.includes(".") ? numericStr.split(".")[1].length : 0;
  const targetNum = parseFloat(numericStr);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = targetNum * eased;
            setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplay(targetText);
            }
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { display, ref };
}

function CountUpStat({
  value,
  className = "",
  durationMs = 1500,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const { display, ref } = useCountUp(value, durationMs);
  return (
    <div ref={ref} className={className}>
      {display}
    </div>
  );
}
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
  ...rest
}: {
  as?: 'div' | 'article';
  delayMs?: number;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const { ref, visible } = useReveal();
  return (
    <Tag ref={ref as React.RefObject<any>} className={`${className} ${reveal(visible, delayMs)}`} {...rest}>
      {children}
    </Tag>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
import { Menu, X } from "lucide-react";

export function Navbar({ onGetInTouch }: { onGetInTouch: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  // Shrink navbar slightly once the user scrolls past 20px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (item: string) => {
    scrollTo(item.toLowerCase().replace(/\s+/g, ''));
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-[0_2px_20px_rgba(15,23,42,0.08)] backdrop-blur-xl border-b'
          : 'backdrop-blur-md border-b'
      }`}
      style={{
        backgroundColor: scrolled
          ? 'rgba(248,250,252,0.97)'
          : 'rgba(248,250,252,0.85)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* ── Main bar ── */}
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center flex-shrink-0 focus-visible:outline-none"
          aria-label="Back to top"
        >
          <img
            src="/logo.svg"
            alt="AlmaNet"
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled ? 'h-16' : 'h-12'
            }`}
          />
        </button>

        {/* Divider — desktop only */}
        <div
          className="hidden md:block w-px h-6 mx-8 flex-shrink-0"
          style={{ backgroundColor: 'var(--color-border)' }}
        />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center justify-center gap-1 flex-1">

          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                         hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]
                         group"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {item}
              {/* Animated underline dot on hover */}
              <span
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full
                           opacity-0 group-hover:opacity-100 transition-all duration-200"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
            </button>
          ))}
        </nav>

        {/* Right side: CTA + hamburger */}
        <div className="flex items-center gap-3 ml-auto md:ml-0">
          {/* Desktop CTA */}
          <button
            onClick={onGetInTouch}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                       text-white transition-all duration-200
                       hover:-translate-y-px hover:shadow-lg active:scale-[0.97]"
            style={{
              background: 'var(--color-primary)',
              boxShadow: 'var(--shadow-btn)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-primary)')}
          >
            Get in Touch
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg
                       transition-colors duration-200
                       hover:bg-[var(--color-primary-light)]"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t ${
          mobileOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          backgroundColor: 'var(--color-surface-0)',
          borderColor: 'var(--color-border)',
        }}
      >
        <nav className="flex flex-col px-4 py-3 gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="text-left text-sm font-medium rounded-xl px-4 py-3
                         transition-colors duration-150
                         hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {item}
            </button>
          ))}

          {/* Divider */}
          <div className="my-2 h-px" style={{ backgroundColor: 'var(--color-border)' }} />

          {/* Mobile CTA — full width */}
          <button
            onClick={() => { onGetInTouch(); setMobileOpen(false); }}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                       text-sm font-semibold text-white transition-all duration-200
                       active:scale-[0.98]"
            style={{
              background: 'var(--color-primary)',
              boxShadow: 'var(--shadow-btn)',
            }}
          >
            Get in Touch
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </div>
    </header>
  );
}


// ─── Hero ─────────────────────────────────────────────────────────────────────
export function HeroSection({ onGetInTouch }: { onGetInTouch: () => void }) {
  const imageRef = useRef<HTMLDivElement>(null);

  // Subtle mouse parallax on the image card — desktop only
  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 5;
      const y = (e.clientY / window.innerHeight - 0.5) * -3;
      el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const STATS = [
    { val: '99.9%', label: 'Uptime SLA' },
    { val: '14+',   label: 'Modules'    },
    { val: '100%',  label: 'Compliant'  },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b"
      style={{
        paddingTop: 'calc(var(--section-pad-y) + 2rem)',
        paddingBottom: 'var(--section-pad-y)',
        backgroundColor: 'var(--color-surface-1)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* ── Background: grain + ambient blobs ── */}
      <div className="absolute inset-0 hero-grain pointer-events-none z-0 opacity-60" />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-80px', left: '38%',
          width: '52vw', height: '380px',
          background: 'var(--color-primary-light)',
          borderRadius: '9999px',
          filter: 'blur(120px)',
          opacity: 0.7,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0, right: 0,
          width: '30vw', height: '260px',
          background: 'var(--color-primary-light)',
          borderRadius: '9999px',
          filter: 'blur(100px)',
          opacity: 0.5,
        }}
      />

      {/* ── Content grid ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6
                   grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* ── LEFT: Copy ── */}
        <div className="flex flex-col gap-7 text-center md:text-left">

          {/* Eyebrow pill — outlined style, matches navbar tone */}
          <div className="flex justify-center md:justify-start">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                         text-xs font-semibold tracking-wide border"
              style={{
                color: 'var(--color-primary)',
                borderColor: 'var(--color-primary-mid)',
                backgroundColor: 'var(--color-primary-light)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
              Next Generation Digital Ecosystems
            </span>
          </div>

          {/* Headline */}
         <h1
              className="text-[2.1rem] sm:text-5xl lg:text-[3.6rem] font-black
                        tracking-tight leading-[1.1] max-w-2xl mx-auto md:mx-0"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Empowering Ideas via{' '}
              <span className="relative inline-block" style={{ color: 'var(--color-primary)' }}>
                Advanced Intelligence
              {/* Underline accent */}
              <span
                className="absolute left-0 -bottom-1 w-full h-[3px] rounded-full"
                style={{ background: 'var(--color-primary-mid)' }}
              />
            </span>
          </h1>

          {/* Body copy */}
          <p
            className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto md:mx-0"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Almanet designs enterprise-grade software ecosystems — from SAP transformation
            and custom automation to AI-driven analytics — built to run mission-critical
            operations across healthcare, sales, and supply chain.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-1">
            {/* Primary CTA — solid, matches navbar button */}
            <button
              onClick={() => scrollTo('products')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                         text-sm font-semibold text-white
                         transition-all duration-200 hover:-translate-y-px active:scale-[0.97]"
              style={{
                background: 'var(--color-primary)',
                boxShadow: 'var(--shadow-btn)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-primary)')}
            >
              Explore Products
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA — ghost/outline */}
            <button
              onClick={onGetInTouch}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                         text-sm font-semibold border
                         transition-all duration-200 hover:-translate-y-px active:scale-[0.97]
                         bg-white"
              style={{
                color: 'var(--color-text-primary)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary-mid)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
            >
              Register Platform
            </button>
          </div>

          {/* Stats row — separated by thin vertical lines */}
          <div
            className="flex flex-wrap justify-center md:justify-start
                      items-center gap-y-4 gap-x-0 pt-6 mt-1 border-t"
            style={{ borderColor: 'var(--color-border)' }}
          >
                      {STATS.map((s, i) => (
              <React.Fragment key={i}>
                <div className="px-4 sm:px-6 first:pl-0 text-center md:text-left">

                  <div
                    className="text-2xl sm:text-3xl font-black tracking-tight"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="text-[11px] font-semibold uppercase tracking-widest mt-0.5"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {s.label}
                  </div>
                </div>
                {/* Vertical separator — skip after last item */}
                {i < STATS.length - 1 && (
                  <div
                    className="w-px h-8 flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-border)' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Image ── */}
        <div className="relative flex justify-center items-center mt-8 md:mt-0">

          {/* Soft glow layer behind image */}
          <div
            className="absolute inset-6 rounded-3xl pointer-events-none"
            style={{
              background: 'var(--color-primary-light)',
              filter: 'blur(40px)',
              opacity: 0.6,
            }}
          />

          {/* Image card with mouse parallax */}
          <div
            ref={imageRef}
            className="relative z-10 w-full rounded-2xl overflow-hidden transition-transform duration-200 ease-out"
            style={{
              border: '1px solid var(--color-border)',
              boxShadow: '0 24px 64px rgba(37,99,235,0.10), 0 4px 16px rgba(15,23,42,0.06)',
              willChange: 'transform',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&auto=format&fit=crop&q=80"
              alt="Almanet enterprise analytics dashboard"
              width={900}
              height={600}
              priority
              className="w-full h-auto object-cover block"
            />
            {/* Very subtle inner vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(37,99,235,0.04) 0%, transparent 60%)',
              }}
            />
          </div>

          {/* Floating badge — bottom-left: live uptime signal */}
          <div
            className="absolute -bottom-3 left-2 sm:-left-5 sm:bottom-[-1rem] z-20
           flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl
           animate-bounce-slow scale-90 sm:scale-100"
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card-hover)',
            }}
          >
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span
              className="text-xs font-semibold whitespace-nowrap"
              style={{ color: 'var(--color-text-primary)' }}
            >
              99.9% Uptime
            </span>
          </div>

          {/* Floating badge — top-right: modules count */}
          <div
            className="absolute -top-3 right-2 sm:-right-5 sm:top-[-1rem] z-20
           flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl
           animate-bounce-slow-delay scale-90 sm:scale-100"
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card-hover)',
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--color-primary-light)' }}
            >
              <span className="text-[10px] font-black" style={{ color: 'var(--color-primary)' }}>14+</span>
            </div>
            <span
              className="text-xs font-semibold whitespace-nowrap"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Enterprise Modules
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
// ─── Product Types ────────────────────────────────────────────────────────────────────
interface ProductDisplay {
  title: string;
  desc: string;
  tag: string;
  color: { accent: string; iconBg: string };
  icon: React.ReactNode;
  slug: string;
}

// ─── Simple Icons (one per product, matches reference style) ─────────────────

const PathyaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M8 12h2l1.5-3 2 6 1.5-3H16" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrackintakeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <circle cx="12" cy="12" r="8.5" stroke="white" strokeWidth="1.8" />
    <path d="M12 6v6l4 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CRMIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <rect x="3" y="11" width="4" height="9" rx="1" stroke="white" strokeWidth="1.7" />
    <rect x="10" y="6" width="4" height="14" rx="1" stroke="white" strokeWidth="1.7" />
    <rect x="17" y="3" width="4" height="17" rx="1" stroke="white" strokeWidth="1.7" />
  </svg>
);

const NgoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const VendorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M3 7h18l-1.5 11a2 2 0 0 1-2 1.7H6.5a2 2 0 0 1-2-1.7L3 7z" stroke="white" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M8 7V5.5A3.5 3.5 0 0 1 11.5 2h1A3.5 3.5 0 0 1 16 5.5V7" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const LabIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M9 2v8.5L4.5 19A2 2 0 0 0 6.3 22h11.4a2 2 0 0 0 1.8-3L15 10.5V2" stroke="white" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M7 2h10" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M7.5 16h9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M9 3v6a3 3 0 0 0 6 0V3" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 3H7M15 3h2" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M5 9v3a7 7 0 0 0 14 0V9" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="19" cy="16" r="2" stroke="white" strokeWidth="1.6" />
  </svg>
);

// ─── Display config keyed by product id ───────────────────────────────────────
const PRODUCT_DISPLAY: Record<string, Omit<ProductDisplay, "title" | "desc" | "tag" | "slug">> = {
  pathyatech: {
    color: { accent: "#185FA5", iconBg: "linear-gradient(135deg,#2E8BE0,#185FA5)" },
    icon: <PathyaIcon />,
  },
  trackintake: {
    color: { accent: "#3B6D11", iconBg: "linear-gradient(135deg,#82C94E,#3B6D11)" },
    icon: <TrackintakeIcon />,
  },
  crm: {
    color: { accent: "#534AB7", iconBg: "linear-gradient(135deg,#8F86E8,#534AB7)" },
    icon: <CRMIcon />,
  },
  ngo: {
    color: { accent: "#0F6E56", iconBg: "linear-gradient(135deg,#27B894,#0F6E56)" },
    icon: <NgoIcon />,
  },
  vendor: {
    color: { accent: "#854F0B", iconBg: "linear-gradient(135deg,#D99A33,#854F0B)" },
    icon: <VendorIcon />,
  },
  lab: {
    color: { accent: "#993C1D", iconBg: "linear-gradient(135deg,#E07850,#993C1D)" },
    icon: <LabIcon />,
  },
 'medconsult-live': {
    color: { accent: "#993556", iconBg: "linear-gradient(135deg,#E0608E,#993556)" },
    icon: <MedIcon />,
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
      className="group bg-white border border-gray-100 rounded-2xl
                 flex flex-col p-8
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon + Title row (same line, like reference) */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: p.color.iconBg }}
        >
          {p.icon}
        </div>
        <div className="flex flex-col">
          <h3 className="text-[22px] font-bold text-gray-900 leading-tight flex items-center gap-1">
            {p.title}
            <sup className="text-[11px] font-normal text-gray-400">©</sup>
          </h3>
          <span className="text-[14px] font-semibold" style={{ color: p.color.accent }}>
            {p.tag}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[15px] text-gray-500 leading-relaxed flex-1 mb-5">
        {p.desc}
      </p>

      {/* Learn More link — gray, like reference */}
      <Link
        href={`/products/${p.slug}`}
        className="text-[15px] font-medium text-gray-500 inline-flex items-center gap-1.5
                   transition-all group-hover:gap-2.5 group-hover:text-gray-700"
      >
        Learn More <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-[#F4F6F9]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Core Products</h2>
          <p className="text-gray-500 text-base leading-relaxed">
            A suite of flagship enterprise modules designed to accelerate your digital
            transformation journey.
          </p>
        </div>

        {/* Grid — 2 columns, generous gap, no orphan card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {DISPLAY_PRODUCTS.map((p, i) => (
            <ProductCard key={p.slug} p={p} delay={i * 75} />
          ))}
        </div>
      </div>
    </section>
  );
}



// ─── Services ─────────────────────────────────────────────────────────────────
function ServiceCard({ service: s, delay }: { service: (typeof SERVICES)[0]; delay: number }) {
  const slug = s.title.toLowerCase().replace(/[\s&,/]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  return (
    <RevealItem
      delayMs={delay}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
    >
      {/* Gradient header strip — icon tile + tag chip */}
      <div
        className="relative h-28 flex items-center justify-between px-6"
        style={{ background: `linear-gradient(135deg, ${s.color.bg}, ${s.color.bg}cc)` }}
      >
        {/* Icon tile — white, elevated */}
        <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center flex-shrink-0">
          <s.icon className="w-6 h-6" style={{ color: s.color.icon }} />
        </div>

        {/* Tag chip */}
        <span
          className="text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full
                     bg-white/90 backdrop-blur-sm flex-shrink-0"
          style={{ color: s.color.icon }}
        >
          {s.color.tag}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="text-[17px] font-bold text-gray-900 leading-snug">
          {s.title}
        </h3>

        <p className="text-[14px] text-gray-500 leading-relaxed flex-1">
          {s.desc}
        </p>

        <Link
          href={`/services/${slug}`}
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold w-fit
                     transition-all duration-200 group-hover:gap-2.5"
          style={{ color: s.color.icon }}
        >
          Learn More
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </RevealItem>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ServicesSection() {
  const header = useReveal();

  return (
    <section id="services" className="py-28 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header — left heading/badge, right description (matches reference layout) */}
        <div
          ref={header.ref}
          className={`flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14 ${reveal(header.visible)}`}
        >
          <div className="space-y-3 max-w-md">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black
                             uppercase tracking-widest text-blue-700 bg-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              What We Do
            </span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Our Core Services
            </h2>
          </div>

          <div className="md:text-right max-w-sm space-y-1.5">
            <p className="text-gray-500 text-[15px] leading-relaxed">
              End-to-end IT solutions — helping organisations implement, optimise,
              and support mission-critical systems.
            </p>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {SERVICES.length} Service Areas
            </span>
          </div>
        </div>

        {/* Single responsive grid — no manual row splitting, no orphan card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} service={s} delay={i * 75} />
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
    <section
      id="events"
      className="relative py-28 border-t overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface-0)', borderColor: 'var(--color-border)' }}
    >
      {/* Ambient blob */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'var(--color-primary-light)', filter: 'blur(130px)', opacity: 0.55 }}
      />
      <div className="absolute inset-0 hero-grain pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header: left label + rule + right count badge ── */}
        <div
          ref={header.ref}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-14 ${reveal(header.visible)}`}
        >
          <div className="space-y-3 max-w-xl">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border"
              style={{
                color: 'var(--color-primary)',
                borderColor: 'var(--color-primary-mid)',
                backgroundColor: 'var(--color-primary-light)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-primary)' }} />
              Stay Sharp
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.07]"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Upcoming Events &amp; Workshops
            </h2>
          </div>
          <p
            className="text-[15px] leading-relaxed max-w-sm md:text-right"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Reserve a slot in our upcoming technical panels and direct deployment system deep-dives.
          </p>
        </div>

        {/* ── Event cards ── */}
        <div className="grid md:grid-cols-2 gap-7">
          {EVENTS.map((evt, i) => (
            <RevealItem
              key={evt.id}
              delayMs={i * 120}
              className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {/* Image area */}
              <div className="relative h-60 overflow-hidden flex-shrink-0">
                <Image
                  src={evt.img}
                  alt={evt.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

                {/* Index pill — top left */}
                <span
                  className="absolute top-4 left-4 h-8 w-8 rounded-xl flex items-center justify-center text-[11px] font-black backdrop-blur-md"
                  style={{
                    background: '#FFFFFF',
                    color: '#0F172A',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Location pill — top right */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-white backdrop-blur-md bg-white/10 border border-white/15">
                  <Activity className="w-3 h-3 flex-shrink-0" />
                  {evt.location}
                </div>

                {/* Date + time chips — bottom left, over gradient */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <span
                    className="px-3 py-1 rounded-lg text-[11px] font-bold text-white"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    {evt.date}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-[11px] font-semibold text-white bg-white/15 border border-white/20 backdrop-blur-sm">
                    {evt.time}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-7 gap-5">
                <div className="space-y-2 flex-1">
                  <h3
                    className="text-[19px] font-bold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[var(--color-primary)]"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {evt.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed line-clamp-2"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {evt.desc}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onRegister(evt)}
                  className="group/btn w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white
                             transition-all duration-200 active:scale-[0.98] hover:-translate-y-px"
                  style={{
                    background: 'var(--color-primary)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-primary)')}
                >
                  Register For Event
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── Blogs / Publications ─────────────────────────────────────────────────────
// ─── Blogs / Publications ─────────────────────────────────────────────────────
export function BlogsSection() {
  const header = useReveal();
  const featured = BLOGS[0];
  const rest = BLOGS.slice(1);

  return (
    <section id="blogs" className="py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header — left heading/desc, right "More Articles" link (matches reference) */}
        <div
          ref={header.ref}
          className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-14 ${reveal(header.visible)}`}
        >
          <div className="space-y-3 max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Blog &amp; Insights
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Explore how we leverage modern technology to drive efficiency, innovation,
              and measurable business results.
            </p>
          </div>

         
        </div>

        {/* Featured (left) + List (right) layout */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Featured article (left) ── */}
          {featured && (
            <RevealItem delayMs={0} className="flex flex-col">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden mb-6 bg-gray-100">
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </div>

              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-3">
                <Calendar className="w-3.5 h-3.5" /> {featured.date}
              </span>

              <Link href={`/blogs/${featured.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug mb-3
                               hover:text-blue-600 transition-colors">
                  {featured.title}
                </h3>
              </Link>

              <p className="text-[15px] text-gray-500 leading-relaxed">
                {featured.excerpt}
              </p>
            </RevealItem>
          )}

          {/* ── Article list (right) ── */}
          <div className="flex flex-col divide-y divide-gray-100">
            {rest.map((blog, i) => (
              <RevealItem
                key={blog.id}
                delayMs={(i + 1) * 75}
                as="article"
                className="flex gap-4 py-5 first:pt-0 group"
              >
                <Link
                  href={`/blogs/${blog.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0"
                >
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <Link href={`/blogs/${blog.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <h4 className="text-base font-bold text-gray-900 leading-snug line-clamp-2
                                   group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h4>
                  </Link>
                  <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <Calendar className="w-3 h-3" /> {blog.date}
                  </span>
                  <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>

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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
              </div>

              {/* Card body */}
              <div className="p-6 space-y-3 bg-white">
                <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <perk.Icon className="w-5 h-5 text-blue-600" />
                </div>
                
<h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
  {perk.title}
</h3>
<p className="text-[13px] text-gray-500 leading-relaxed">{perk.desc}</p>
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
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${TYPE_COLORS[job.type] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
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
            <p className="text-gray-500 leading-relaxed text-base max-w-lg">
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
                <div className="text-[12px] text-gray-400 font-medium">Regulatory & Data Privacy</div>
              </div>
            </div>

            {/* Floating card — top right */}
            <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4 flex items-center gap-3 z-10">
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-black text-blue-600">14+</span>
              </div>
              <div>
                <div className="text-sm font-black text-gray-900">Core Modules</div>
                <div className="text-[12px] text-gray-400 font-medium">Enterprise Ready</div>
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
                <CountUpStat
  value={stat.val}
  className="text-5xl sm:text-6xl font-black text-white group-hover:scale-105 transition-transform duration-300 inline-block"
/>
                <div className="text-xs font-black text-blue-200 uppercase tracking-widest mt-2">
                  {stat.label}
                </div>
                <p className="text-xs text-blue-200/90">{stat.desc}</p>
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

                  <h3 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
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
    <footer className="relative bg-[#0a0e1a] text-gray-400 pt-24 pb-10 text-sm overflow-hidden">
      {/* top gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/60 to-orange-500/60" />

      {/* soft ambient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Main grid: brand + link groups ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 gap-x-10 pb-16">

          {/* Brand column */}
          <div className="lg:col-span-4 space-y-6">
            <img src="/logo.svg" alt="AlmaNet" className="h-16 w-auto object-contain" />

            <p className="text-[14px] text-gray-500 leading-relaxed max-w-sm">
              Empowering organizations with next-generation enterprise suites, automated
              modules, and secure cloud pipelines.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
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

          {/* Link groups — sitemap + products share a tight 2-col rhythm on the right */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-12">

            {/* Sitemap */}
            <div className="space-y-5">
              <h4 className="text-[12px] font-bold tracking-[0.16em] text-white uppercase">
                Sitemap
              </h4>
              <ul className="space-y-3.5 text-[14px] font-medium text-gray-500">
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

            {/* Core Products */}
            <div className="space-y-5">
              <h4 className="text-[12px] font-bold tracking-[0.16em] text-white uppercase">
                Core Products
              </h4>
              <ul className="space-y-3.5 text-[14px] font-medium text-gray-500">
                {['Pathyatech ', 'Trackintake ', 'CRM Platform ', 'NgoConnect', 'VendorSync', 'LabCore LIMS', 'MedConsult Live'].map((prod) => (
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

            {/* Newsletter — spans remaining 2 columns on small screens, sits naturally on large */}
            <div className="col-span-2 sm:col-span-2 space-y-5">
              <h4 className="text-[12px] font-bold tracking-[0.16em] text-white uppercase">
                Stay Informed
              </h4>
              <p className="text-[14px] text-gray-500 leading-relaxed max-w-xs">
                Subscribe to unlock periodic engineering research insights.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); onGetInTouch(); }}
                className="flex flex-col sm:flex-row gap-3 max-w-sm"
              >
                <input
                  type="email"
                  required
                  placeholder="engineering@domain.com"
                  className="flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-white placeholder:text-gray-500 outline-none focus:border-blue-500/60 focus:bg-white/[0.06] transition-all"
                />
                <button
                  type="submit"
                  className="shrink-0 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl text-[14px] font-bold tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 whitespace-nowrap"
                >
                  Join
                  <ArrowRight size={14} strokeWidth={2.2} />
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-7 text-[13px] text-gray-500">
          <div className="flex flex-wrap items-center justify-center gap-2.5 order-2 sm:order-1">
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
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 order-1 sm:order-2">
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
