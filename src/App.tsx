import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DivisionExplorer } from './components/DivisionExplorer';
import { MightyStandard } from './components/MightyStandard';
import { MightyAcademy } from './components/MightyAcademy';
import { BundleCalculator } from './components/BundleCalculator';
import { ServiceMatcher } from './components/ServiceMatcher';
import { ReviewsSection } from './components/ReviewsSection';
import { EmergencyBanner } from './components/EmergencyBanner';
import { ServiceFAQ } from './components/ServiceFAQ';
import { Footer } from './components/Footer';
import { BookingModal, BookingRecord } from './components/BookingModal';
import { MyBookingsDrawer } from './components/MyBookingsDrawer';
import { QuoteBreakdownLandingPage, QuoteRecord } from './components/QuoteBreakdownLandingPage';
import { HourlyMaidBookingPage } from './components/HourlyMaidBookingPage';
import { HourlyGardenerBookingPage } from './components/HourlyGardenerBookingPage';
import { MightyAcademyPage } from './components/MightyAcademyPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'maid-hourly' | 'gardener-hourly' | 'academy'>('home');
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('maids');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingDivision, setBookingDivision] = useState<string>('maids');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingPreselectedDivisions, setBookingPreselectedDivisions] = useState<string[]>([]);

  // Active Quote Breakdown Landing Page State
  const [activeQuote, setActiveQuote] = useState<QuoteRecord | null>(null);

  // My Bookings Drawer State
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  // Load bookings and quotes from localStorage on mount
  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem('mighty_bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleOpenBooking = (
    divisionId?: string,
    notes?: string,
    selectedDivisions?: string[]
  ) => {
    if (divisionId) setBookingDivision(divisionId);
    if (notes) setBookingNotes(notes);
    else setBookingNotes('');

    if (selectedDivisions && selectedDivisions.length > 0) {
      setBookingPreselectedDivisions(selectedDivisions);
    } else if (divisionId) {
      setBookingPreselectedDivisions([divisionId]);
    } else {
      setBookingPreselectedDivisions([selectedDivisionId]);
    }

    setIsBookingOpen(true);
  };

  const handleOpenEmergencyBooking = () => {
    setSelectedDivisionId('plumbing');
    handleOpenBooking(
      'plumbing',
      'URGENT EMERGENCY DISPATCH REQUEST: Pipe leak, burst, or water heater failure. Immediate crew required in Cape Town.',
      ['plumbing']
    );
  };

  const handleBookingSubmitted = (newBooking: BookingRecord, quote: QuoteRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
    setActiveQuote(quote);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuoteUpdated = (updatedQuote: QuoteRecord) => {
    setActiveQuote(updatedQuote);
    // Also update matching booking status
    setBookings((prev) =>
      prev.map((b) =>
        b.referenceCode === updatedQuote.quoteNumber
          ? {
              ...b,
              paymentStatus: 'Paid via PayFast Instant EFT',
              status: 'Confirmed',
            }
          : b
      )
    );
  };

  const handleOpenQuoteByReference = (refCode: string) => {
    try {
      const stored = localStorage.getItem('mighty_quotes');
      if (stored) {
        const quotes: QuoteRecord[] = JSON.parse(stored);
        const match = quotes.find((q) => q.quoteNumber === refCode);
        if (match) {
          setActiveQuote(match);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
    } catch {
      // ignore
    }

    // Fallback: search in bookings
    const bMatch = bookings.find((b) => b.referenceCode === refCode);
    if (bMatch) {
      const fallbackQuote: QuoteRecord = {
        id: bMatch.id,
        quoteNumber: bMatch.referenceCode,
        createdAt: bMatch.createdAt,
        validUntil: 'Valid for 30 days',
        fullName: bMatch.fullName,
        email: bMatch.email,
        phone: bMatch.phone,
        houseNumber: bMatch.houseNumber || '1',
        streetName: bMatch.streetName || 'Main Road',
        suburb: bMatch.suburb || 'Cape Town',
        zipCode: bMatch.zipCode || '8001',
        propertyType: bMatch.propertyType || 'Residential Home',
        fullAddress: bMatch.address,
        preferredDate: bMatch.date,
        timeSlot: bMatch.timeSlot,
        divisionIds: bMatch.divisionIds,
        divisionNames: bMatch.divisionNames,
        lineItems: bMatch.divisionNames.map((dName, idx) => ({
          divisionId: bMatch.divisionIds[idx] || 'service',
          divisionName: dName,
          title: `${dName} Scheduled Service`,
          description: 'Standard residential service scope and protocols',
          unitPriceZAR: Math.round((bMatch.amountZAR || 650) / bMatch.divisionNames.length),
          quantity: 1,
          totalZAR: Math.round((bMatch.amountZAR || 650) / bMatch.divisionNames.length),
        })),
        specialInclusions: ['The Mighty Standard 7-tier background checks & Mighty Academy certification'],
        notes: bMatch.notes,
        subtotalZAR: bMatch.amountZAR || 650,
        discountPercent: bMatch.divisionIds.length > 1 ? 15 : 0,
        discountZAR: bMatch.divisionIds.length > 1 ? Math.round((bMatch.amountZAR || 650) * 0.15) : 0,
        vatZAR: Math.round(((bMatch.amountZAR || 650) * 0.85) * 0.15),
        totalZAR: bMatch.amountZAR || 650,
        status: bMatch.paymentStatus === 'Paid via PayFast Instant EFT' ? 'Paid via PayFast Instant EFT' : 'Quote Generated',
      };
      setActiveQuote(fallbackQuote);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    try {
      localStorage.setItem('mighty_bookings', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // If user is currently inspecting a separate Quote Breakdown Landing Page:
  if (activeQuote) {
    return (
      <QuoteBreakdownLandingPage
        quote={activeQuote}
        onBackToApp={() => setActiveQuote(null)}
        onQuoteUpdated={handleQuoteUpdated}
      />
    );
  }

  // Dedicated Separate Page: Hourly Maid Booking (R100/hr, Min 3 hrs)
  if (currentPage === 'maid-hourly') {
    return (
      <HourlyMaidBookingPage
        onBackToApp={() => {
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBookingSubmitted={handleBookingSubmitted}
        onViewQuoteBreakdown={(quote) => {
          setActiveQuote(quote);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // Dedicated Separate Page: Hourly Gardener Booking (R100/hr, Min 3 hrs)
  if (currentPage === 'gardener-hourly') {
    return (
      <HourlyGardenerBookingPage
        onBackToApp={() => {
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBookingSubmitted={handleBookingSubmitted}
        onViewQuoteBreakdown={(quote) => {
          setActiveQuote(quote);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // Dedicated Separate Page: Mighty Academy (Vocational Training & 2027 Prospectus)
  if (currentPage === 'academy') {
    return (
      <MightyAcademyPage
        onBackToApp={() => {
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  const navigateToMaidHourly = () => {
    setCurrentPage('maid-hourly');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToGardenerHourly = () => {
    setCurrentPage('gardener-hourly');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAcademy = () => {
    setCurrentPage('academy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* 1. Header with strict top bar contract & hourly direct links */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        bookingCount={bookings.length}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onNavigateToMaidHourly={navigateToMaidHourly}
        onNavigateToGardenerHourly={navigateToGardenerHourly}
        onNavigateToAcademy={navigateToAcademy}
      />

      {/* 2. Emergency 24/7 Dispatch Bar (Plumbing & Rapid Service) */}
      <EmergencyBanner onOpenEmergencyBooking={handleOpenEmergencyBooking} />

      <main className="flex-1">
        {/* 3. Hero Section with Value Proposition & Proof Metrics */}
        <Hero
          selectedDivisionId={selectedDivisionId}
          onSelectDivision={setSelectedDivisionId}
          onOpenBooking={handleOpenBooking}
          onNavigateToMaidHourly={navigateToMaidHourly}
          onNavigateToGardenerHourly={navigateToGardenerHourly}
        />

        {/* 4. Division Explorer with Live Estimators & Interactive Tabs */}
        <DivisionExplorer
          selectedDivisionId={selectedDivisionId}
          onSelectDivision={setSelectedDivisionId}
          onOpenBooking={handleOpenBooking}
          onNavigateToMaidHourly={navigateToMaidHourly}
          onNavigateToGardenerHourly={navigateToGardenerHourly}
        />

        {/* 4b. Interactive Service FAQ Section */}
        <ServiceFAQ
          currentDivisionId={selectedDivisionId}
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. The Mighty Standard (Trust, Vetting, Mighty Academy & Guarantees) */}
        <MightyStandard />

        {/* 5b. Mighty Academy (Cape Town Vocational Training & Certification Portal) */}
        <MightyAcademy onNavigateToAcademyPage={navigateToAcademy} />

        {/* 6. Multi-Service Bundle Savings Calculator */}
        <BundleCalculator onOpenBooking={handleOpenBooking} />

        {/* 7. Service Matcher Quiz */}
        <ServiceMatcher
          onSelectDivision={setSelectedDivisionId}
          onOpenBooking={handleOpenBooking}
        />

        {/* 8. Customer Reviews with Division Filtering */}
        <ReviewsSection />
      </main>

      {/* 9. Footer */}
      <Footer
        onSelectDivision={setSelectedDivisionId}
        onOpenBooking={handleOpenBooking}
        onNavigateToMaidHourly={navigateToMaidHourly}
        onNavigateToGardenerHourly={navigateToGardenerHourly}
        onNavigateToAcademy={navigateToAcademy}
      />

      {/* Booking & Estimate Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultDivisionId={bookingDivision}
        initialNotes={bookingNotes}
        preSelectedDivisions={bookingPreselectedDivisions}
        onBookingSubmitted={handleBookingSubmitted}
        onViewQuoteBreakdown={(quote) => {
          setActiveQuote(quote);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* My Bookings Slide-out Drawer */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onOpenNewBooking={() => handleOpenBooking()}
        onOpenQuoteByReference={handleOpenQuoteByReference}
      />
    </div>
  );
}
