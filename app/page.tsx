'use client';

import React, { useState } from 'react';
import { EVENTS } from './constants';

// ─── Sections ─────────────────────────────────────────────────────────────────
import {
  Navbar, HeroSection, ProductsSection, ServicesSection, TrainingSection,
  EventsSection, BlogsSection, CareersSection, AboutSection, Footer,
} from './components/Sections';

// ─── Modals ───────────────────────────────────────────────────────────────────
import { RegisterModal, EventRegistrationModal, ApplyModal } from './components/Modals';

// ─── Types ────────────────────────────────────────────────────────────────────
type EventType = typeof EVENTS[0];

export default function AlmanetWebsite() {
  const [registerOpen, setRegisterOpen]     = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent]   = useState<EventType | null>(null);
  const [selectedJob, setSelectedJob]       = useState<string | null>(null);

  const handleCloseRegister = () => {
    setRegisterOpen(false);
    setSelectedCourse(null);
  };

  return (
<div className="min-h-screen w-full bg-white text-gray-900 antialiased overflow-visible">

      <Navbar          onGetInTouch={() => { setSelectedCourse(null); setRegisterOpen(true); }} />
      <HeroSection     onGetInTouch={() => { setSelectedCourse(null); setRegisterOpen(true); }} />
      <ProductsSection />
      <ServicesSection />
      <TrainingSection onEnroll={(courseTitle) => { setSelectedCourse(courseTitle); setRegisterOpen(true); }} />
      <EventsSection   onRegister={(evt) => setSelectedEvent(evt)} />
      <BlogsSection />
      <CareersSection  onApply={(jobTitle) => setSelectedJob(jobTitle)} />
      <AboutSection />
      <Footer          onGetInTouch={() => { setSelectedCourse(null); setRegisterOpen(true); }} />

      {registerOpen  && (
        <RegisterModal
          onClose={handleCloseRegister}
          defaultInterest={selectedCourse ? "Professional Training" : undefined}
          defaultMessage={selectedCourse ? `Interested in ${selectedCourse} training program. Please share syllabus and upcoming batch schedule.` : undefined}
        />
      )}
      {selectedEvent && <EventRegistrationModal eventTitle={selectedEvent.title} eventDate={selectedEvent.date} onClose={() => setSelectedEvent(null)} />}
      {selectedJob   && <ApplyModal jobTitle={selectedJob} onClose={() => setSelectedJob(null)} />}

    </div>
  );
}