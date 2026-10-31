import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PractitionerSection } from './components/PractitionerSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ChatAgent } from './components/ChatAgent';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string, duration?: number) => {
    setSelectedServiceId(serviceId);
    setSelectedDuration(duration);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedServiceId(undefined);
    setSelectedDuration(undefined);
  };

  const handleExploreTreatments = () => {
    const el = document.getElementById('treatments') || document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#24372f] flex flex-col font-sans selection:bg-[#285244]/20 selection:text-[#285244]">
      
      {/* Top Banner & Header matching Rejuvenators navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
      />

      <main className="flex-1">
        {/* Rejuvenators Full-Width Hero Panoramic Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onExploreTreatments={handleExploreTreatments}
        />

        {/* 4 Core Services & 6 Treatments Pricing ($100 for 1h, $140 for 1.5h, $170 for 2h) */}
        <ServicesSection
          onSelectServiceForBooking={(serviceId, duration) => handleOpenBooking(serviceId, duration)}
        />

        {/* Certified Therapists & 30+ Years Standards */}
        <PractitionerSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* In-Room Setup & Sanctuary Transformation */}
        <GallerySection
          onBookSession={() => handleOpenBooking()}
        />

        {/* Guest Reviews & Australia Mobile FAQs */}
        <ReviewsAndFaq />

        {/* Online Booking Concierge & Sydney Coverage */}
        <BookingSection
          onOpenBookingModal={(serviceId) => handleOpenBooking(serviceId)}
        />
      </main>

      {/* Rejuvenators Australia Network Footer */}
      <Footer />

      {/* Interactive Step-by-Step Online Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceId}
        initialDuration={selectedDuration}
      />

      {/* Floating 5-Star AI Concierge Chat Agent with Google Grounding & WhatsApp */}
      <ChatAgent onOpenBooking={(serviceId) => handleOpenBooking(serviceId)} />

    </div>
  );
}
