'use client';

import React, { useState } from 'react';
import { EVENTS } from './constants';

// ─── Sections ─────────────────────────────────────────────────────────────────
import {
  Navbar, HeroSection, ProductsSection, ServicesSection,
  EventsSection, BlogsSection, CareersSection, AboutSection, Footer,
} from './components/Sections';

// ─── Modals ───────────────────────────────────────────────────────────────────
import { RegisterModal, EventRegistrationModal, ApplyModal } from './components/Modals';

// ─── Types ────────────────────────────────────────────────────────────────────
type EventType = typeof EVENTS[0];

export default function AlmanetWebsite() {
  const [registerOpen, setRegisterOpen]   = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [selectedJob, setSelectedJob]     = useState<string | null>(null);

  return (
<div className="min-h-screen w-full bg-white text-gray-900 antialiased overflow-visible">

      <Navbar          onGetInTouch={() => setRegisterOpen(true)} />
      <HeroSection     onGetInTouch={() => setRegisterOpen(true)} />
      <ProductsSection />
      <ServicesSection />
      <EventsSection   onRegister={(evt) => setSelectedEvent(evt)} />
      <BlogsSection />
      <CareersSection  onApply={(jobTitle) => setSelectedJob(jobTitle)} />
      <AboutSection />
      <Footer          onGetInTouch={() => setRegisterOpen(true)} />

      {registerOpen  && <RegisterModal onClose={() => setRegisterOpen(false)} />}
      {selectedEvent && <EventRegistrationModal eventTitle={selectedEvent.title} eventDate={selectedEvent.date} onClose={() => setSelectedEvent(null)} />}
      {selectedJob   && <ApplyModal jobTitle={selectedJob} onClose={() => setSelectedJob(null)} />}

    </div>
  );
}