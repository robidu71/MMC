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

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(undefined);
  const [logoStyle, setLogoStyle] = useState<'botanical-palm' | 'zen-meridian' | 'monogram'>('botanical-palm');

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
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2e9] text-[#29483c] flex flex-col font-sans selection:bg-[#29483c]/15 selection:text-[#29483c]">
      
      {/* Top Banner & Header with Custom Logo */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        logoStyle={logoStyle}
        onChangeLogoStyle={setLogoStyle}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onExploreTreatments={handleExploreTreatments}
        />

        {/* The Approach & Services Pricing */}
        <ServicesSection
          onSelectServiceForBooking={(serviceId, duration) => handleOpenBooking(serviceId, duration)}
        />

        {/* Practitioner Section: Meet Masud, LMT */}
        <PractitionerSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Gallery of the Space */}
        <GallerySection
          onBookSession={() => handleOpenBooking()}
        />

        {/* Kind Words / Reviews & Studio FAQs */}
        <ReviewsAndFaq />

        {/* Dynamic Online Booking & Studio Location Visit */}
        <BookingSection
          onOpenBookingModal={(serviceId) => handleOpenBooking(serviceId)}
        />
      </main>

      {/* Quiet Footer with Logo */}
      <Footer logoStyle={logoStyle} />

      {/* Full-Featured Step-by-Step Online Booking Concierge Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceId}
        initialDuration={selectedDuration}
      />

    </div>
  );
}
