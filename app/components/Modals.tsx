'use client';

import React, { useState } from 'react';
import { sendContactForm, sendJobApplication } from '../lib/emailServices';

// ─── Shared: Modal Shell ──────────────────────────────────────────────────────
function ModalShell({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(30,40,80,0.45)', backdropFilter: 'blur(6px)' }}>
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden">
        <button onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-bold z-20 h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          &times;
        </button>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

// ─── Shared: Success Screen ───────────────────────────────────────────────────
function SuccessScreen({ title, message, onClose }: { title: string; message: React.ReactNode; onClose: () => void }) {
  return (
    <div className="text-center py-10 space-y-4">
      <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500">{message}</p>
      <button onClick={onClose} className="mt-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">Done</button>
    </div>
  );
}

// ─── Shared: Input Row ────────────────────────────────────────────────────────
function InputRow({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}{required && ' *'}</label>
      <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
        {children}
      </div>
    </div>
  );
}

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return submitted ? (
    <SuccessScreen title="Welcome Back!" message="You have been signed in successfully." onClose={onClose} />
  ) : (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sign In</h2>
        <p className="text-sm text-slate-400">Welcome back to Almanet.</p>
      </div>

      <InputRow label="Email" required>
        <input type="email" required placeholder="name@co.com" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none" />
      </InputRow>

      <InputRow label="Password" required>
        <input type="password" required placeholder="••••••••" className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none" />
      </InputRow>

      <button
        onClick={() => setSubmitted(true)}
        className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
      >
        Sign In
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>

      <p className="text-center text-sm text-slate-400">
        Don't have an account?{' '}
        <button type="button" onClick={onBack} className="text-blue-600 font-semibold hover:underline">Register</button>
      </p>
    </div>
  );
}

// ─── Modal 1: Register / Get in Touch ────────────────────────────────────────
export function RegisterModal({
  onClose,
  defaultInterest,
  defaultMessage,
}: {
  onClose: () => void;
  defaultInterest?: string;
  defaultMessage?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      tab: 'Inquiries',
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      interest: formData.get('interest') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Submission failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setSubmitted(false);
    setShowLogin(false);
    onClose();
  }

  return (
    <ModalShell onClose={handleClose}>
      {showLogin ? (
        <LoginForm onBack={() => setShowLogin(false)} onClose={handleClose} />
      ) : submitted ? (
        <SuccessScreen
          title="Request Submitted!"
          message="Thank you! Our enterprise team will reach out within one business cycle."
          onClose={handleClose}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Get in Touch</h2>
            <p className="text-sm text-slate-400">Fill in your details below. We'll reach out shortly.</p>
          </div>

          <InputRow label="Full Name" required>
            <input
              name="fullName"
              type="text"
              required
              placeholder="John Doe"
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
          </InputRow>

          <div className="grid grid-cols-2 gap-3">
            <InputRow label="Email" required>
              <input
                name="email"
                type="email"
                required
                placeholder="name@co.com"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0"
              />
            </InputRow>
            <InputRow label="Phone">
              <input
                name="phone"
                type="tel"
                placeholder="10-digit"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0"
              />
            </InputRow>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Interest *</label>
            <div className="border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <select
                name="interest"
                required
                defaultValue={defaultInterest || ""}
                className="w-full bg-transparent text-sm text-slate-800 outline-none"
              >
                <option value="">Select an option...</option>
                <option value="Professional Training">Professional Training (SAP ABAP / Advanced Excel)</option>
                <option value="SAP Consulting">SAP Consulting</option>
                <option value="Product Integration">Product Integration</option>
                <option value="Custom AI Development">Custom AI Development</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</label>
            <div className="border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <textarea
                name="message"
                rows={3}
                defaultValue={defaultMessage || ""}
                placeholder="Tell us about your requirements..."
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70"
          >
            {loading ? (
              <span>Submitting...</span>
            ) : (
              <>
                Submit
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already registered?{' '}
            <button type="button" onClick={() => setShowLogin(true)} className="text-blue-600 font-semibold hover:underline">Sign in</button>
          </p>
        </form>
      )}
    </ModalShell>
  );
}

// ─── Modal 2: Event Registration ─────────────────────────────────────────────
export function EventRegistrationModal({
  eventTitle,
  eventDate,
  onClose,
}: {
  eventTitle: string;
  eventDate: string;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      tab: 'Events',
      eventTitle,
      eventDate,
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      organization: formData.get('organization') as string,
      interest: formData.get('interest') as string,
      questions: formData.get('questions') as string,
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setSubmitted(false);
    onClose();
  }

  return (
    <ModalShell onClose={handleClose}>
      {submitted ? (
        <SuccessScreen
          title="Registration Confirmed!"
          message={<>You're registered for <span className="text-blue-600 font-semibold">{eventTitle}</span>. We'll send access details to your email.</>}
          onClose={handleClose}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Event Registration</h2>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-center">{eventTitle}</span>
            <span className="text-xs text-slate-400">{eventDate}</span>
          </div>

          <InputRow label="Full Name" required>
            <input
              name="fullName"
              type="text"
              required
              placeholder="John Doe"
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
          </InputRow>

          <div className="grid grid-cols-2 gap-3">
            <InputRow label="Email" required>
              <input
                name="email"
                type="email"
                required
                placeholder="you@mail.com"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0"
              />
            </InputRow>
            <InputRow label="Phone">
              <input
                name="phone"
                type="tel"
                placeholder="10-digit"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0"
              />
            </InputRow>
          </div>

          <InputRow label="Organization / Company">
            <input
              name="organization"
              type="text"
              placeholder="Your company name"
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
          </InputRow>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Interest</label>
            <div className="border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <select name="interest" className="w-full bg-transparent text-sm text-slate-800 outline-none">
                <option value="Professional Training">Professional Training</option>
                <option value="Product Integration">Product Integration</option>
                <option value="SAP Consulting">SAP Consulting</option>
                <option value="Custom AI Development">Custom AI Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Any Questions?</label>
            <div className="border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <textarea
                name="questions"
                rows={2}
                placeholder="Any specific topics you'd like covered..."
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70"
          >
            {loading ? (
              <span>Registering...</span>
            ) : (
              <>
                Confirm Registration
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </ModalShell>
  );
}

// ─── Modal 3: Apply Now / Career ─────────────────────────────────────────────
export function ApplyModal({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      tab: 'Careers',
      jobTitle,
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      portfolio: formData.get('portfolio') as string,
      coverNote: formData.get('coverNote') as string,
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Application submission failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setSubmitted(false);
    onClose();
  }

  return (
    <ModalShell onClose={handleClose}>
      {submitted ? (
        <SuccessScreen
          title="Application Submitted!"
          message="Thank you! We'll review your profile and our talent team will reach out soon."
          onClose={handleClose}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Apply Now</h2>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">{jobTitle}</span>
            <p className="text-sm text-slate-400">Fill in your details. Our HR team will reach out shortly.</p>
          </div>

          <InputRow label="Full Name" required>
            <input
              name="fullName"
              type="text"
              required
              placeholder="John Doe"
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
          </InputRow>

          <div className="grid grid-cols-2 gap-3">
            <InputRow label="Email" required>
              <input
                name="email"
                type="email"
                required
                placeholder="you@mail.com"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0"
              />
            </InputRow>
            <InputRow label="Phone">
              <input
                name="phone"
                type="tel"
                placeholder="10-digit"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0"
              />
            </InputRow>
          </div>

          <InputRow label="Portfolio / LinkedIn URL">
            <input
              name="portfolio"
              type="url"
              placeholder="https://linkedin.com/in/yourname"
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
          </InputRow>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Cover Note</label>
            <div className="border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <textarea
                name="coverNote"
                rows={3}
                placeholder="Why are you a great fit for this role?"
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70"
          >
            {loading ? (
              <span>Submitting Application...</span>
            ) : (
              <>
                Submit Application
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </ModalShell>
  );
}