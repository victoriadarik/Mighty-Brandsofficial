import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Wrench,
  Sparkles,
  CreditCard,
  FileText
} from 'lucide-react';
import { DIVISIONS, Division } from '../data/divisions';
import {
  MAID_PROPERTY_TYPES,
  MAID_FREQUENCY_RATES,
  DOMESTIC_CALL_OUT_SUBSCRIPTIONS,
  DAILY_CLEANING_ACTIVITIES,
  MaidPropertyType,
  MaidFrequency,
} from '../data/maidPricing';
import { PayFastModal } from './PayFastModal';
import { QuoteRecord } from './QuoteBreakdownLandingPage';
import { DivisionLogoRenderer } from './BrandLogos';

export interface BookingRecord {
  id: string;
  referenceCode: string;
  divisionIds: string[];
  divisionNames: string[];
  serviceType: string;
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  // Physical Address Details
  houseNumber: string;
  streetName: string;
  suburb: string;
  zipCode: string;
  propertyType: string;
  address: string;
  notes: string;
  createdAt: string;
  status: 'Confirmed' | 'Dispatch Pending';
  paymentMethod: 'payfast-eft' | 'invoice';
  paymentStatus: 'Paid via PayFast Instant EFT' | 'Pay Upon Invoice';
  amountZAR: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDivisionId?: string;
  initialNotes?: string;
  preSelectedDivisions?: string[];
  onBookingSubmitted: (booking: BookingRecord, quote: QuoteRecord) => void;
  onViewQuoteBreakdown: (quote: QuoteRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultDivisionId,
  initialNotes = '',
  preSelectedDivisions = [],
  onBookingSubmitted,
  onViewQuoteBreakdown,
}) => {
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>(['maids']);
  const [serviceTier, setServiceTier] = useState<string>('Standard Residential Service');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('Morning (8:00 AM - 12:00 PM)');

  // Contact Info
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Physical Address Details (Strict requirement)
  const [houseNumber, setHouseNumber] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [suburb, setSuburb] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('2 Bed Apartment');
  const [notes, setNotes] = useState<string>('');

  // Mighty Maids Specific: Daily Activities vs Call Out Subscription + Detergents
  const [maidPlanMode, setMaidPlanMode] = useState<'daily' | 'subscription'>('daily');
  const [maidFrequency, setMaidFrequency] = useState<MaidFrequency>('once-off');
  const [maidCallOutPlanId, setMaidCallOutPlanId] = useState<string>('standard');
  const [maidDetergentsRequested, setMaidDetergentsRequested] = useState<boolean>(false);

  // Specialized Options: Move & Clean
  const [movePackHelp, setMovePackHelp] = useState(false);
  const [movePreClean, setMovePreClean] = useState(false);
  const [movePostCleanOldHouse, setMovePostCleanOldHouse] = useState(false);
  const [moveNewPlaceUnpack, setMoveNewPlaceUnpack] = useState(false);
  const [moveFurnitureWipe, setMoveFurnitureWipe] = useState(false);

  // Specialized Options: Handy Man (own tools, doors, cupboards, tables/chairs, painting, gutters)
  const [handyDoorsMinor, setHandyDoorsMinor] = useState(true);
  const [handyCupboards, setHandyCupboards] = useState(false);
  const [handyTablesChairs, setHandyTablesChairs] = useState(false);
  const [handyPainting, setHandyPainting] = useState(false);
  const [handyGutterCleaning, setHandyGutterCleaning] = useState(false);

  // Specialized Options: Plumbing & Gardeners
  const [plumbingMonthlyRound, setPlumbingMonthlyRound] = useState(false);
  const [gardeningRegularRound, setGardeningRegularRound] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (preSelectedDivisions && preSelectedDivisions.length > 0) {
        setSelectedDivisions(preSelectedDivisions);
      } else if (defaultDivisionId) {
        setSelectedDivisions([defaultDivisionId]);
      } else {
        setSelectedDivisions(['maids']);
      }

      if (initialNotes) {
        setNotes(initialNotes);

        // Smart parse initialNotes to pre-select matching options
        if (initialNotes.includes('Domestic Call Out Subscription') || initialNotes.includes('Call Out Subscription')) {
          setMaidPlanMode('subscription');
          if (initialNotes.includes('STANDARD PLUS')) setMaidCallOutPlanId('standard-plus');
          else if (initialNotes.includes('STANDARD GOLD')) setMaidCallOutPlanId('standard-gold');
          else if (initialNotes.includes('STANDARD PLATINUM')) setMaidCallOutPlanId('standard-platinum');
          else if (initialNotes.includes('STANDARD')) setMaidCallOutPlanId('standard');
        } else {
          setMaidPlanMode('daily');
          if (initialNotes.includes('3x A Week') || initialNotes.includes('3x / Week')) setMaidFrequency('3x-a-week');
          else if (initialNotes.includes('Twice A Week') || initialNotes.includes('2x / Week')) setMaidFrequency('twice-a-week');
          else if (initialNotes.includes('Once Off')) setMaidFrequency('once-off');

          for (const pt of MAID_PROPERTY_TYPES) {
            if (initialNotes.includes(pt)) {
              setPropertyType(pt);
              break;
            }
          }
        }

        if (initialNotes.includes('Detergents requested: Yes') || initialNotes.includes('with detergents requested')) {
          setMaidDetergentsRequested(true);
        }
      }
      setErrors({});
    }
  }, [isOpen, defaultDivisionId, preSelectedDivisions, initialNotes]);

  if (!isOpen) return null;

  const toggleDivision = (id: string) => {
    if (selectedDivisions.includes(id)) {
      if (selectedDivisions.length > 1) {
        setSelectedDivisions(selectedDivisions.filter((d) => d !== id));
      }
    } else {
      // Rule: Handy Man fixing services only can be added or combined with Gardeners
      if (id === 'handyman' && !selectedDivisions.includes('gardeners')) {
        setSelectedDivisions([...selectedDivisions, 'handyman', 'gardeners']);
      } else {
        setSelectedDivisions([...selectedDivisions, id]);
      }
    }
  };

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid email is required';
    if (!phone.trim() || phone.length < 8) errs.phone = 'Valid South African phone number is required';
    if (!houseNumber.trim()) errs.houseNumber = 'House / Unit # required';
    if (!streetName.trim()) errs.streetName = 'Street name required';
    if (!suburb.trim()) errs.suburb = 'Suburb is required (e.g., Sea Point, Camps Bay)';
    if (!zipCode.trim()) errs.zipCode = 'Postal / Zip code required';
    if (!preferredDate) errs.preferredDate = 'Please select a preferred date';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const calculateFullQuote = (): QuoteRecord => {
    const refCode = 'MGT-' + Math.floor(10000 + Math.random() * 90000);
    const quoteNum = 'QUO-' + Math.floor(10000 + Math.random() * 90000);

    const divNames = selectedDivisions.map(
      (id) => DIVISIONS.find((d) => d.id === id)?.name || id
    );

    const lineItems: QuoteRecord['lineItems'] = [];
    const specialInclusions: string[] = [];

    // Line items based on selected divisions
    selectedDivisions.forEach((id) => {
      const div = DIVISIONS.find((d) => d.id === id);
      if (!div) return;

      if (id === 'maids') {
        if (maidPlanMode === 'subscription') {
          const plan =
            DOMESTIC_CALL_OUT_SUBSCRIPTIONS.find((p) => p.id === maidCallOutPlanId) ||
            DOMESTIC_CALL_OUT_SUBSCRIPTIONS[0];
          lineItems.push({
            divisionId: 'maids',
            divisionName: div.name,
            title: `Mighty Maids Call Out Subscription - ${plan.name} (${plan.badge})`,
            description: `Monthly domestic retainer: ${plan.inclusions.join(', ')}. [Excludes: ${
              plan.exclusions.length > 0 ? plan.exclusions.join(', ') : 'None'
            }].`,
            unitPriceZAR: plan.priceMonthlyZAR,
            quantity: 1,
            totalZAR: plan.priceMonthlyZAR,
          });
          specialInclusions.push(
            `Domestic Cleaning Call Out Subscription: ${plan.name} (R${plan.priceMonthlyZAR}/mo)`
          );
        } else {
          // Daily Cleaning Activities (Maintenance)
          const freqData = MAID_FREQUENCY_RATES[maidFrequency];
          const matchedProperty = (
            MAID_PROPERTY_TYPES.includes(propertyType as any)
              ? propertyType
              : '2 Bed Apartment'
          ) as MaidPropertyType;
          const rateInfo = freqData.rates[matchedProperty];
          const isQuote = rateInfo.price === 'QUOTE';
          const basePrice: number = typeof rateInfo.price === 'number' ? rateInfo.price : 650;

          lineItems.push({
            divisionId: 'maids',
            divisionName: div.name,
            title: `Mighty Maids Daily Maintenance - ${rateInfo.serviceType} (${matchedProperty})`,
            description: `Daily Cleaning Activities (Maintenance): Kitchen (dishes, dishwasher, countertops, stovetop, floors), Lounge/Shared Spaces tidying, Bathroom (shower doors & sinks), Waste disposal. Frequency: ${freqData.label}.${
              isQuote ? ' (Custom quote required for large property)' : ''
            }`,
            unitPriceZAR: basePrice,
            quantity: 1,
            totalZAR: basePrice,
          });

          specialInclusions.push(
            'Daily Cleaning Activities (Maintenance) Scope: Kitchen, General Tidying (living room), Bathroom (shower doors & sinks), Waste disposal.'
          );
          specialInclusions.push(
            `Property & Schedule: ${matchedProperty} on ${freqData.label} schedule (${rateInfo.serviceType}).`
          );
        }

        // Home cleaning detergents option
        if (maidDetergentsRequested) {
          lineItems.push({
            divisionId: 'maids',
            divisionName: 'Mighty Maids Supplies',
            title: 'Home Cleaning Detergent Supplies (Requested)',
            description: 'Full eco-friendly cleaning detergents provided for this visit (supplied on request)',
            unitPriceZAR: 65,
            quantity: 1,
            totalZAR: 65,
          });
          specialInclusions.push('Supplies for home: Cleaning detergents supplied upon request (+R65).');
        } else {
          specialInclusions.push('Supplies for home: Client supplies own household cleaning detergents & supplies.');
        }
      } else if (id === 'movers') {
        lineItems.push({
          divisionId: 'movers',
          divisionName: div.name,
          title: 'Mighty Movers Residential Transport',
          description: 'Enclosed truck with 3-man professional moving crew (base 3 hrs)',
          unitPriceZAR: 650,
          quantity: 3,
          totalZAR: 1950,
        });

        if (movePackHelp) {
          lineItems.push({
            divisionId: 'movers',
            divisionName: 'Mighty Movers + Maids',
            title: 'Pre-Move Packing & Boxing Assistance',
            description: 'Cleaners/packers help pack kitchenware, clothes & fragile items before moving day',
            unitPriceZAR: 220,
            quantity: 3,
            totalZAR: 660,
          });
          specialInclusions.push('Cleaners & packers assist packing boxes before move');
        }

        if (movePreClean) {
          lineItems.push({
            divisionId: 'movers',
            divisionName: 'Mighty Maids',
            title: 'Pre-Move Room Deep Clean',
            description: 'Deep scrubbing of floors and empty spaces prior to moving truck loading',
            unitPriceZAR: 480,
            quantity: 1,
            totalZAR: 480,
          });
          specialInclusions.push('Pre-move deep clean of rooms before furniture loaded');
        }

        if (movePostCleanOldHouse) {
          lineItems.push({
            divisionId: 'movers',
            divisionName: 'Mighty Maids',
            title: 'Old House Move-Out Turnover Clean',
            description: 'Guaranteed landlord deposit-ready move-out clean of old property',
            unitPriceZAR: 850,
            quantity: 1,
            totalZAR: 850,
          });
          specialInclusions.push('Post-move clean of old house (landlord deposit & sale ready)');
        }

        if (moveNewPlaceUnpack) {
          lineItems.push({
            divisionId: 'movers',
            divisionName: 'Mighty Movers + Maids',
            title: 'New Home Unpacking & Setup Help',
            description: 'Hands-on unpacking of boxes and wardrobe organizing at new residence',
            unitPriceZAR: 220,
            quantity: 2,
            totalZAR: 440,
          });
          specialInclusions.push('Cleaners assist unpacking boxes at new place');
        }

        if (moveFurnitureWipe) {
          lineItems.push({
            divisionId: 'movers',
            divisionName: 'Mighty Maids',
            title: 'Post-Move Furniture Sanitizing & Wipe-Down',
            description: 'Wiping down tables, bedframes, cabinets and leather/wood furniture after placement',
            unitPriceZAR: 320,
            quantity: 1,
            totalZAR: 320,
          });
          specialInclusions.push('Clean & wipe furniture after move once placed in new home');
        }
      } else if (id === 'handyman') {
        const handyTasks: string[] = [];
        if (handyDoorsMinor) handyTasks.push('Doors & Minor Fixtures');
        if (handyCupboards) handyTasks.push('Kitchen Cupboards & Shelves');
        if (handyTablesChairs) handyTasks.push('Tables & Chairs Fixing');
        if (handyPainting) handyTasks.push('Painting Touch-Ups');
        if (handyGutterCleaning) handyTasks.push('Gutter Cleanings');

        lineItems.push({
          divisionId: 'handyman',
          divisionName: div.name,
          title: 'Mighty Handyman Fixing Services (Own Tools Included)',
          description: `Equipped with complete toolset. Scope: ${handyTasks.join(', ') || 'General repairs'} (Combined with Gardeners round)`,
          unitPriceZAR: 380,
          quantity: 2,
          totalZAR: 760,
        });

        specialInclusions.push(
          'Mighty Handyman arrives with own professional power tools & equipment'
        );
        specialInclusions.push(
          'Fixing services combined directly with Mighty Gardeners round'
        );
        if (handyDoorsMinor) specialInclusions.push('Fixing of doors, sticking edges, locks & loose handles');
        if (handyCupboards) specialInclusions.push('Kitchen cupboards hinge alignment & drawer runner repair');
        if (handyTablesChairs) specialInclusions.push('Tables & chairs structural fixing and joint tightening');
        if (handyPainting) specialInclusions.push('Surface scuff & doorframe touch-up painting');
        if (handyGutterCleaning) specialInclusions.push('Gutter cleaning & downpipe debris clearing');
      } else if (id === 'gardeners') {
        lineItems.push({
          divisionId: 'gardeners',
          divisionName: div.name,
          title: 'Mighty Gardeners Regular Round',
          description: 'Basic regular garden maintenance: lawn mowing, trimming, edging, weeding and general tidying on a regular round for homes',
          unitPriceZAR: 280,
          quantity: 2,
          totalZAR: 560,
        });
        specialInclusions.push(
          'Regular garden round: lawn mowing, trimming, edging, weeding and general tidying'
        );
      } else if (id === 'plumbing') {
        lineItems.push({
          divisionId: 'plumbing',
          divisionName: div.name,
          title: 'Mighty Plumbing Monthly Maintenance Round',
          description: 'Bathroom and sink leak detection sweeps, preventative pipe cleaning & fixture tuning',
          unitPriceZAR: 480,
          quantity: 1,
          totalZAR: 480,
        });
        specialInclusions.push(
          'Monthly plumbing maintenance: bathroom & sink leak detection + clean pipes'
        );
      } else if (id === 'nannies') {
        lineItems.push({
          divisionId: 'nannies',
          divisionName: div.name,
          title: 'Mighty Nannies Accredited Care Block',
          description: 'Vetted, CPR-certified caregiver (20 hour introductory weekly block)',
          unitPriceZAR: 85,
          quantity: 20,
          totalZAR: 1700,
        });
      }
    });

    const subtotalZAR = lineItems.reduce((acc, item) => acc + item.totalZAR, 0);

    // Multi-service bundle discount
    let discountPercent = 0;
    if (selectedDivisions.length >= 3) {
      discountPercent = 20;
    } else if (selectedDivisions.length === 2) {
      discountPercent = 15;
    }

    const discountZAR = Math.round(subtotalZAR * (discountPercent / 100));
    const discountedSubtotal = subtotalZAR - discountZAR;
    const vatZAR = Math.round(discountedSubtotal * 0.15); // 15% South African VAT
    const totalZAR = discountedSubtotal + vatZAR;

    const fullAddress = `${houseNumber} ${streetName}, ${suburb}, ${zipCode} (${propertyType})`;

    const todayStr = new Date().toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const validUntilDate = new Date();
    validUntilDate.setDate(validUntilDate.getDate() + 30);
    const validUntilStr = validUntilDate.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return {
      id: 'quo-' + Date.now(),
      quoteNumber: quoteNum,
      createdAt: todayStr,
      validUntil: validUntilStr,
      fullName,
      email,
      phone,
      houseNumber,
      streetName,
      suburb,
      zipCode,
      propertyType,
      fullAddress,
      preferredDate,
      timeSlot: preferredTime,
      divisionIds: selectedDivisions,
      divisionNames: divNames,
      lineItems,
      specialInclusions,
      notes,
      subtotalZAR,
      discountPercent,
      discountZAR,
      vatZAR,
      totalZAR,
      status: 'Quote Generated',
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedQuote = calculateFullQuote();

    const newBooking: BookingRecord = {
      id: 'book-' + Date.now(),
      referenceCode: generatedQuote.quoteNumber,
      divisionIds: selectedDivisions,
      divisionNames: generatedQuote.divisionNames,
      serviceType: serviceTier,
      date: preferredDate,
      timeSlot: preferredTime,
      fullName,
      email,
      phone,
      houseNumber,
      streetName,
      suburb,
      zipCode,
      propertyType,
      address: generatedQuote.fullAddress,
      notes,
      createdAt: generatedQuote.createdAt,
      status: 'Dispatch Pending',
      paymentMethod: 'payfast-eft',
      paymentStatus: 'Pay Upon Invoice',
      amountZAR: generatedQuote.totalZAR,
    };

    // Save quote and booking in localStorage
    try {
      const existingQuotes = localStorage.getItem('mighty_quotes');
      const qList = existingQuotes ? JSON.parse(existingQuotes) : [];
      qList.unshift(generatedQuote);
      localStorage.setItem('mighty_quotes', JSON.stringify(qList));

      const existingBookings = localStorage.getItem('mighty_bookings');
      const bList = existingBookings ? JSON.parse(existingBookings) : [];
      bList.unshift(newBooking);
      localStorage.setItem('mighty_bookings', JSON.stringify(bList));
    } catch {
      // ignore
    }

    onBookingSubmitted(newBooking, generatedQuote);
    onClose();
    // Direct user immediately to the separate Quote Breakdown Landing Page!
    onViewQuoteBreakdown(generatedQuote);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-4 animate-scaleIn">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mighty Brands Concierge & Quote Generator</span>
            </div>
            <h3 className="text-xl font-black text-white mt-0.5">
              Schedule Service & Get Detailed Quote Breakdown
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Step 1: Division Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Select Mighty Divisions Needed
              </label>
              <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                Bundle 2+ save 15% · Bundle 3+ save 20%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {DIVISIONS.map((div) => {
                const isChecked = selectedDivisions.includes(div.id);
                return (
                  <button
                    key={div.id}
                    type="button"
                    onClick={() => toggleDivision(div.id)}
                    className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex flex-col justify-between ${
                      isChecked
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-slate-50/70 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <DivisionLogoRenderer divisionId={div.id} size="sm" showText={false} className="shrink-0 scale-90 origin-left" />
                        <span className="truncate">{div.name}</span>
                      </div>
                      {isChecked && <span className="text-amber-400 font-bold ml-1 shrink-0">✓</span>}
                    </div>
                    <span
                      className={`text-[10px] font-normal mt-1 truncate ${
                        isChecked ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {div.id === 'handyman'
                        ? 'Own Tools · Pairs with Garden'
                        : div.id === 'maids'
                        ? 'Cape Town Subscriptions'
                        : div.id === 'plumbing'
                        ? 'Monthly Leak Sweeps'
                        : div.id === 'gardeners'
                        ? 'Regular Round & Mowing'
                        : div.brandKicker}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Handy Man info notice */}
            {selectedDivisions.includes('handyman') && (
              <div className="mt-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2">
                <Wrench className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Mighty Handyman Tool Guarantee & Gardener Pairing:</span>
                  <div className="text-[11px] text-amber-900 mt-0.5">
                    Our handyman brings their own full set of professional tools. Fixing services only (doors, cupboards, tables/chairs, painting, gutter cleanings), automatically combined with Mighty Gardeners grounds rounds.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Service Inclusions / Checkboxes */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            {/* Mighty Maids Service Options & Daily Maintenance Scope */}
            {selectedDivisions.includes('maids') && (
              <div className="p-3.5 bg-pink-50/60 border border-pink-200 rounded-2xl space-y-3 text-xs">
                {/* Daily Cleaning Activities Scope Notice */}
                <div className="bg-white/90 border border-pink-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-pink-950 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                      <span>Daily Cleaning Activities (Maintenance) Scope</span>
                    </span>
                    <span className="text-[10px] text-pink-700 font-semibold bg-pink-100 px-2 py-0.5 rounded-full">
                      Cape Town Standard
                    </span>
                  </div>
                  <p className="text-[11px] text-pink-900 bg-pink-50/80 p-1.5 rounded-lg border border-pink-100 font-medium">
                    📌 <strong>Notice:</strong> This pricing only applies to Daily Cleaning Activities (Maintenance).
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-700">
                    <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="font-bold text-pink-950">Kitchen:</span> Wash dishes, dishwasher load/unload, wipe countertops, stovetop & sweep floors.
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="font-bold text-pink-950">General Tidying:</span> Put away items in shared spaces (living room).
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="font-bold text-pink-950">Bathroom:</span> Clean shower doors and wipe down sinks.
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="font-bold text-pink-950">Waste:</span> Take out trash and recycling as needed.
                    </div>
                  </div>
                </div>

                {/* Service Mode Selector */}
                <div className="flex bg-white p-1 rounded-xl border border-pink-200 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setMaidPlanMode('daily')}
                    className={`flex-1 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
                      maidPlanMode === 'daily'
                        ? 'bg-pink-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Daily Maintenance Activities
                  </button>
                  <button
                    type="button"
                    onClick={() => setMaidPlanMode('subscription')}
                    className={`flex-1 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
                      maidPlanMode === 'subscription'
                        ? 'bg-pink-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Domestic Call Out Subscription
                  </button>
                </div>

                {maidPlanMode === 'daily' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center font-bold text-pink-950">
                      <span>Select Maintenance Frequency:</span>
                      {(() => {
                        const matchedPt = (
                          MAID_PROPERTY_TYPES.includes(propertyType as any)
                            ? propertyType
                            : '2 Bed Apartment'
                        ) as MaidPropertyType;
                        const r = MAID_FREQUENCY_RATES[maidFrequency].rates[matchedPt];
                        return (
                          <span className="text-[11px] font-black text-pink-700 bg-white px-2 py-0.5 rounded-lg border border-pink-200 font-mono">
                            {matchedPt}: {r.price === 'QUOTE' ? 'QUOTE' : `R${r.price}`} ({r.serviceType})
                          </span>
                        );
                      })()}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(['once-off', 'twice-a-week', '3x-a-week'] as MaidFrequency[]).map((freq) => {
                        const f = MAID_FREQUENCY_RATES[freq];
                        const isSelected = maidFrequency === freq;
                        const matchedPt = (
                          MAID_PROPERTY_TYPES.includes(propertyType as any)
                            ? propertyType
                            : '2 Bed Apartment'
                        ) as MaidPropertyType;
                        const r = f.rates[matchedPt];
                        return (
                          <button
                            key={freq}
                            type="button"
                            onClick={() => setMaidFrequency(freq)}
                            className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-pink-600 text-white border-pink-600 font-bold shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-pink-50'
                            }`}
                          >
                            <div className="font-bold">{f.label}</div>
                            <div
                              className={`text-[10px] font-mono ${
                                isSelected ? 'text-pink-100 font-bold' : 'text-slate-500'
                              }`}
                            >
                              {r.price === 'QUOTE' ? 'QUOTE' : `R${r.price}`}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="font-bold text-pink-950">
                      Select Monthly Call Out Subscription Tier:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {DOMESTIC_CALL_OUT_SUBSCRIPTIONS.map((plan) => {
                        const isSelected = maidCallOutPlanId === plan.id;
                        return (
                          <button
                            key={plan.id}
                            type="button"
                            onClick={() => setMaidCallOutPlanId(plan.id)}
                            className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-pink-50'
                            }`}
                          >
                            <div className="text-[9px] font-bold uppercase tracking-wider truncate opacity-80">
                              {plan.badge}
                            </div>
                            <div className="font-black text-xs truncate">{plan.name}</div>
                            <div className="text-xs font-mono font-bold mt-1">
                              R{plan.priceMonthlyZAR}/mo
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Home Supplies - Detergents on Request Option */}
                <div className="pt-2 border-t border-pink-200/70">
                  <label className="flex items-start gap-2 cursor-pointer bg-white/90 p-2.5 rounded-xl border border-pink-200 hover:bg-white">
                    <input
                      type="checkbox"
                      checked={maidDetergentsRequested}
                      onChange={(e) => setMaidDetergentsRequested(e.target.checked)}
                      className="mt-0.5 rounded text-pink-600 focus:ring-pink-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>Request cleaning detergents for home (+R65)</span>
                        <span className="text-[10px] text-pink-700 font-bold bg-pink-100 px-2 py-0.5 rounded-full">
                          On Request Only
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Supplies for home: Detergents are supplied only when requested and quoted accordingly (+R65). Otherwise, the client provides their own cleaning detergents.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Handyman Fixing Scope */}
            {selectedDivisions.includes('handyman') && (
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2 text-xs">
                <div className="font-bold text-amber-950 flex items-center justify-between">
                  <span>Mighty Handyman Fixing Services (Select tasks to address):</span>
                  <span className="text-[10px] text-amber-700 font-semibold">Own tools included</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <label className="flex items-start gap-2 cursor-pointer hover:text-slate-950">
                    <input
                      type="checkbox"
                      checked={handyDoorsMinor}
                      onChange={(e) => setHandyDoorsMinor(e.target.checked)}
                      className="mt-0.5 rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>Fixing doors & minor things (sticking doors, hinges, locks, handles)</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer hover:text-slate-950">
                    <input
                      type="checkbox"
                      checked={handyCupboards}
                      onChange={(e) => setHandyCupboards(e.target.checked)}
                      className="mt-0.5 rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>Kitchen cupboards & shelves (hinge adjustments & drawer glides)</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer hover:text-slate-950">
                    <input
                      type="checkbox"
                      checked={handyTablesChairs}
                      onChange={(e) => setHandyTablesChairs(e.target.checked)}
                      className="mt-0.5 rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>Tables & chairs fixing (tightening wobbling legs & joints)</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer hover:text-slate-950">
                    <input
                      type="checkbox"
                      checked={handyPainting}
                      onChange={(e) => setHandyPainting(e.target.checked)}
                      className="mt-0.5 rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>Painting & touch-ups (scuffs, door frames, patch priming)</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer hover:text-slate-950 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={handyGutterCleaning}
                      onChange={(e) => setHandyGutterCleaning(e.target.checked)}
                      className="mt-0.5 rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>Gutter cleanings & downpipe clearing (preventing rainwater blockages)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Move & Clean Specific Options */}
            {selectedDivisions.includes('movers') && (
              <div className="p-3.5 bg-red-50/60 border border-red-200/80 rounded-2xl space-y-2 text-xs">
                <div className="font-bold text-red-950 flex items-center justify-between">
                  <span>Residential Move, Pack & Clean Inclusions:</span>
                  <span className="text-[10px] text-red-700 font-medium">Synchronized crew</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <label className="flex items-start gap-2 cursor-pointer hover:text-slate-950">
                    <input
                      type="checkbox"
                      checked={movePackHelp}
                      onChange={(e) => setMovePackHelp(e.target.checked)}
                      className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                    />
                    <span>Cleaners help pack boxes before move</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer hover:text-slate-950">
                    <input
                      type="checkbox"
                      checked={movePreClean}
                      onChange={(e) => setMovePreClean(e.target.checked)}
                      className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                    />
                    <span>Pre-move deep clean of rooms before loading</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer hover:text-slate-950">
                    <input
                      type="checkbox"
                      checked={movePostCleanOldHouse}
                      onChange={(e) => setMovePostCleanOldHouse(e.target.checked)}
                      className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                    />
                    <span>Post-move clean of old house (deposit return guaranteed)</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer hover:text-slate-950">
                    <input
                      type="checkbox"
                      checked={moveNewPlaceUnpack}
                      onChange={(e) => setMoveNewPlaceUnpack(e.target.checked)}
                      className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                    />
                    <span>Help unpack boxes at new place</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer hover:text-slate-950 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={moveFurnitureWipe}
                      onChange={(e) => setMoveFurnitureWipe(e.target.checked)}
                      className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                    />
                    <span>Clean & wipe furniture after move once placed in new house</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Physical Service Address (Strict User Requirement) */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>2. Physical Service Address & Property Type</span>
              </label>
              <span className="text-[11px] text-slate-500">South Africa residential dispatch</span>
            </div>

            {/* Property Type Dropdown */}
            <div>
              <label className="block text-xs text-slate-600 mb-1 flex items-center gap-1 font-medium">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Type of Property *</span>
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white font-medium text-slate-800"
              >
                {MAID_PROPERTY_TYPES.map((pt) => (
                  <option key={pt} value={pt}>
                    {pt}
                  </option>
                ))}
              </select>
            </div>

            {/* Street & House Number */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  House / Unit # *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Unit 4B or 142"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.houseNumber ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                />
                {errors.houseNumber && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.houseNumber}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  Street Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kloof Road or Main Road"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.streetName ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                />
                {errors.streetName && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.streetName}</p>
                )}
              </div>
            </div>

            {/* Suburb & Zip Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  Suburb * (e.g. Sea Point, Camps Bay, Rondebosch)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sea Point, Cape Town"
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.suburb ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                />
                {errors.suburb && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.suburb}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  Zip / Postal Code * (e.g. 8005)
                </label>
                <input
                  type="text"
                  placeholder="8005"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.zipCode ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                />
                {errors.zipCode && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.zipCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Contact & Schedule */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
              3. Contact Information & Timing
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1 flex items-center gap-1 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="Sarah Jansen"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.fullName ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                />
                {errors.fullName && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1 flex items-center gap-1 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>South African Mobile *</span>
                </label>
                <input
                  type="tel"
                  placeholder="+27 82 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.phone ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                />
                {errors.phone && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1 flex items-center gap-1 font-medium">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  placeholder="sarah@example.co.za"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                />
                {errors.email && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preferred Date *</span>
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.preferredDate ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                />
                {errors.preferredDate && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.preferredDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Arrival Window</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                >
                  <option>Morning (8:00 AM - 12:00 PM)</option>
                  <option>Afternoon (12:00 PM - 4:00 PM)</option>
                  <option>Late Afternoon (4:00 PM - 7:00 PM)</option>
                  <option>Emergency / Immediate Dispatch</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-1 font-medium">
                Access Code, Gate Details or Special Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Gate intercom code, complex parking bay, pets present, urgent door/gutter details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Estimate Quote Disclaimer Notice */}
          <div className="p-3.5 bg-amber-50/90 border border-amber-300 rounded-2xl space-y-1.5 text-slate-800">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Important: All Cost Breakdowns Are An Estimate Quote</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-700">
              Please note: All cost breakdowns and generated figures are an <strong>estimated quote</strong> and could be a bit less or more than estimated. Our office reviews all requirements and sends your <strong>final confirmed quote</strong>.
            </p>
            <div className="pt-1.5 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-600 font-medium">
              <span>Direct Office: <strong className="text-slate-900">087 8222 984</strong></span>
              <span>Email: <strong className="text-slate-900">info@mightybrands.co.za</strong></span>
              <span>Head of Operations: <strong className="text-slate-900">victoria@mightybrands.co.za</strong></span>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full itemized quote generated instantly with download option & PayFast EFT</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Generate Breakdown Quote</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
