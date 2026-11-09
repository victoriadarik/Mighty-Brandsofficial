import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Trees,
  CheckCircle2,
  MapPin,
  Building2,
  Calendar,
  Phone,
  Mail,
  User,
  ShieldCheck,
  CreditCard,
  Download,
  Wrench,
  Hammer,
  AlertCircle
} from 'lucide-react';
import { MAID_PROPERTY_TYPES } from '../data/maidPricing';
import { QuoteRecord } from './QuoteBreakdownLandingPage';
import { BookingRecord } from './BookingModal';
import { PayFastModal } from './PayFastModal';

interface HourlyGardenerBookingPageProps {
  onBackToApp: () => void;
  onBookingSubmitted: (booking: BookingRecord, quote: QuoteRecord) => void;
  onViewQuoteBreakdown: (quote: QuoteRecord) => void;
}

export const HourlyGardenerBookingPage: React.FC<HourlyGardenerBookingPageProps> = ({
  onBackToApp,
  onBookingSubmitted,
  onViewQuoteBreakdown,
}) => {
  // Hourly Settings (Strict user rules: R100/hr, minimum 3 hrs)
  const HOURLY_RATE = 100;
  const MIN_HOURS = 3;

  const [hours, setHours] = useState<number>(3);

  // Garden tasks to focus on
  const [tasks, setTasks] = useState<{ [key: string]: boolean }>({
    lawnMowing: true,
    edgeTrimming: true,
    weedingBeds: true,
    hedgePruning: false,
    leafRakingSweeping: true,
    greenWasteBagging: true,
  });

  // Optional Handyman Combo (with own tools for fixing services)
  const [includeHandymanFixes, setIncludeHandymanFixes] = useState<boolean>(false);
  const [handyDoors, setHandyDoors] = useState<boolean>(true);
  const [handyCupboards, setHandyCupboards] = useState<boolean>(false);
  const [handyTablesChairs, setHandyTablesChairs] = useState<boolean>(false);
  const [handyPainting, setHandyPainting] = useState<boolean>(false);
  const [handyGutters, setHandyGutters] = useState<boolean>(true);

  // Physical Address Fields
  const [propertyType, setPropertyType] = useState<string>('Garden Town House');
  const [houseNumber, setHouseNumber] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [suburb, setSuburb] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');

  // Schedule & Contact Info
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Morning (08:00 - 12:00)');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPayFastOpen, setIsPayFastOpen] = useState<boolean>(false);
  const [pendingQuote, setPendingQuote] = useState<QuoteRecord | null>(null);

  const toggleTask = (taskKey: string) => {
    setTasks((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));
  };

  // Financial Calculations
  const laborSubtotal = Math.max(MIN_HOURS, hours) * HOURLY_RATE;
  const handymanFee = includeHandymanFixes ? 250 : 0; // Coordinated fixing session
  const subtotalZAR = laborSubtotal + handymanFee;
  const vatZAR = Math.round(subtotalZAR * 0.15);
  const totalZAR = subtotalZAR;

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid email is required';
    if (!phone.trim() || phone.length < 8) errs.phone = 'Valid phone number is required';
    if (!houseNumber.trim()) errs.houseNumber = 'House / Unit # required';
    if (!streetName.trim()) errs.streetName = 'Street name required';
    if (!suburb.trim()) errs.suburb = 'Suburb required (e.g. Constantia, Newlands, Rondebosch)';
    if (!zipCode.trim()) errs.zipCode = 'Postal / Zip code required';
    if (!preferredDate) errs.preferredDate = 'Please select a preferred service date';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const createQuoteAndBooking = (): { quote: QuoteRecord; booking: BookingRecord } => {
    const refCode = 'HR-GD-' + Math.floor(10000 + Math.random() * 90000);
    const quoteNum = 'QUO-HR-GD-' + Math.floor(10000 + Math.random() * 90000);
    const fullAddress = `${houseNumber} ${streetName}, ${suburb}, Cape Town, ${zipCode}`;
    const todayStr = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' });

    const activeTasksList = Object.entries(tasks)
      .filter(([_, active]) => active)
      .map(([key]) => {
        switch (key) {
          case 'lawnMowing':
            return 'Lawn mowing & edge trimming';
          case 'edgeTrimming':
            return 'Kerb & path weed whacking';
          case 'weedingBeds':
            return 'Flowerbed weeding & soil aeration';
          case 'hedgePruning':
            return 'Hedge pruning & shrub shaping';
          case 'leafRakingSweeping':
            return 'Leaf raking, patio & driveway sweeping';
          case 'greenWasteBagging':
            return 'Garden waste bagging & clearing';
          default:
            return key;
        }
      });

    const divisionIds = ['gardeners'];
    const divisionNames = ['Mighty Gardeners'];

    const lineItems: QuoteRecord['lineItems'] = [
      {
        divisionId: 'gardeners',
        divisionName: 'Mighty Gardeners',
        title: `Hourly Gardener Service (${hours} Hours Work @ R${HOURLY_RATE}/hr)`,
        description: `Professional groundskeeper with standard commercial mowing & trimming tools for ${hours} hours. Focus: ${activeTasksList.slice(0, 4).join(', ')}. Minimum 3 hours rate strictly honored.`,
        unitPriceZAR: HOURLY_RATE,
        quantity: hours,
        totalZAR: laborSubtotal,
      },
    ];

    const specialInclusions = [
      `Hourly Gardener Service: ${hours} hours at R${HOURLY_RATE}/hr (Minimum 3 hrs).`,
      `Tasks Selected: ${activeTasksList.join(', ')}.`,
      'Equipment & fuel provided by Mighty Gardeners (mower, weed eater, rakes, garden bags).',
      'Staffed by Mighty Academy Certified groundskeepers with verified criminal background checks.',
    ];

    if (includeHandymanFixes) {
      divisionIds.push('handyman');
      divisionNames.push('Mighty Handyman');

      const handyTasksList: string[] = [];
      if (handyDoors) handyTasksList.push('Fixing doors & minor latches');
      if (handyCupboards) handyTasksList.push('Cupboards & hinges');
      if (handyTablesChairs) handyTasksList.push('Tables & chairs tightening');
      if (handyPainting) handyTasksList.push('Touch-up painting');
      if (handyGutters) handyTasksList.push('Gutter cleaning & downpipe clearing');

      lineItems.push({
        divisionId: 'handyman',
        divisionName: 'Mighty Handyman',
        title: 'Mighty Handyman Fixing Services (Combined with Garden Visit)',
        description: `Handyman equipped with own tools for fixing services: ${handyTasksList.join(', ')}.`,
        unitPriceZAR: handymanFee,
        quantity: 1,
        totalZAR: handymanFee,
      });

      specialInclusions.push(
        `Combined with Mighty Handyman (own tools included): ${handyTasksList.join(', ')}.`
      );
    }

    const quote: QuoteRecord = {
      id: 'quote-' + Date.now(),
      quoteNumber: quoteNum,
      createdAt: todayStr,
      validUntil: 'Valid for 30 days',
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
      timeSlot,
      divisionIds,
      divisionNames,
      lineItems,
      specialInclusions,
      notes: specialNotes || `Hourly gardener booking for ${hours} hours at R${HOURLY_RATE}/hr.`,
      subtotalZAR,
      discountPercent: 0,
      discountZAR: 0,
      vatZAR,
      totalZAR,
      status: 'Quote Generated',
    };

    const booking: BookingRecord = {
      id: 'book-' + Date.now(),
      referenceCode: quoteNum,
      divisionIds,
      divisionNames,
      serviceType: `Hourly Gardener (${hours} hrs @ R${HOURLY_RATE}/hr)`,
      date: preferredDate,
      timeSlot,
      fullName,
      email,
      phone,
      houseNumber,
      streetName,
      suburb,
      zipCode,
      propertyType,
      address: fullAddress,
      notes: specialNotes || `Hourly gardener booking for ${hours} hours at R${HOURLY_RATE}/hr.`,
      createdAt: todayStr,
      status: 'Dispatch Pending',
      paymentMethod: 'payfast-eft',
      paymentStatus: 'Pay Upon Invoice',
      amountZAR: totalZAR,
    };

    return { quote, booking };
  };

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const { quote, booking } = createQuoteAndBooking();

    // Store in localStorage
    try {
      const storedQuotes = localStorage.getItem('mighty_quotes');
      const qList = storedQuotes ? JSON.parse(storedQuotes) : [];
      qList.unshift(quote);
      localStorage.setItem('mighty_quotes', JSON.stringify(qList));

      const storedBookings = localStorage.getItem('mighty_bookings');
      const bList = storedBookings ? JSON.parse(storedBookings) : [];
      bList.unshift(booking);
      localStorage.setItem('mighty_bookings', JSON.stringify(bList));
    } catch {
      // ignore
    }

    onBookingSubmitted(booking, quote);
    onViewQuoteBreakdown(quote);
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const { quote } = createQuoteAndBooking();
    setPendingQuote(quote);
    setIsPayFastOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16 animate-fadeIn">
      {/* Top Banner Navigation */}
      <div className="bg-slate-900 text-white sticky top-0 z-30 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBackToApp}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to All Mighty Divisions</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-mono">Mighty Gardeners · Hourly Service</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Page Hero Header */}
        <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/40 relative overflow-hidden mb-8">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-lg border border-emerald-300 flex items-center justify-center shrink-0">
                <img
                  src="/assets/aistudio/mighty_gardners_52f6dd9b.png"
                  alt="Mighty Gardeners Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <Trees className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Official Hourly Work Booking · Cape Town</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                  Book a Gardener for Certain Hours Work
                </h1>
              </div>
            </div>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Equipped, reliable groundskeepers for your home or complex in Cape Town. 
              Book exactly the hours required for lawn mowing, weeding, pruning, and tidying, with the option to pair with handyman fixing repairs.
            </p>

            {/* Strict Rate Notice Pill */}
            <div className="inline-flex flex-wrap items-center gap-3 pt-2">
              <div className="bg-white text-slate-900 font-black text-sm px-4 py-2 rounded-xl shadow-md font-mono flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>R100 per Hour</span>
              </div>
              <div className="bg-emerald-800/80 text-emerald-100 font-bold text-xs px-3 py-2 rounded-xl border border-emerald-600/40">
                Minimum 3 Hours (From R300)
              </div>
              <div className="bg-slate-900/80 text-emerald-200 font-medium text-xs px-3 py-2 rounded-xl border border-emerald-700/40 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tools & Fuel Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form & Live Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Booking Form Column */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-8">
            {/* Step 1: Hour Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>1. Select Hours of Garden Work</span>
                </label>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  R{HOURLY_RATE}/hr · Min {MIN_HOURS} hrs
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { h: 3, label: '3 Hours', sub: 'R300 (Small Yard)' },
                  { h: 4, label: '4 Hours', sub: 'R400 (Standard)' },
                  { h: 5, label: '5 Hours', sub: 'R500 (Medium Garden)' },
                  { h: 6, label: '6 Hours', sub: 'R600 (Large Grounds)' },
                  { h: 8, label: '8 Hours', sub: 'R800 (Full Day Reset)' },
                ].map((item) => (
                  <button
                    key={item.h}
                    type="button"
                    onClick={() => setHours(item.h)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      hours === item.h
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40'
                    }`}
                  >
                    <div className="text-sm font-bold">{item.label}</div>
                    <div className={`text-[11px] font-mono mt-0.5 ${hours === item.h ? 'text-emerald-100' : 'text-slate-500'}`}>
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Hours Counter */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Custom Duration</div>
                  <div className="text-[11px] text-slate-500">Need specific hours? Adjust below (min 3 hrs).</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setHours((prev) => Math.max(MIN_HOURS, prev - 1))}
                    disabled={hours <= MIN_HOURS}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center text-base"
                  >
                    -
                  </button>
                  <span className="text-base font-black font-mono text-slate-900 min-w-10 text-center">
                    {hours} hrs
                  </span>
                  <button
                    type="button"
                    onClick={() => setHours((prev) => Math.min(12, prev + 1))}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer flex items-center justify-center text-base"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Garden Tasks to Prioritize */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Trees className="w-4 h-4 text-emerald-600" />
                  <span>2. Priority Garden Tasks (Included in your {hours} hours)</span>
                </label>
                <span className="text-[11px] text-slate-500">Select tasks for your gardener</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'lawnMowing', label: 'Lawn mowing & perimeter lawn edging' },
                  { key: 'edgeTrimming', label: 'Weed-whacking paths, fences & kerbs' },
                  { key: 'weedingBeds', label: 'Flowerbed weeding & soil turning' },
                  { key: 'hedgePruning', label: 'Hedge trimming, bush shaping & pruning' },
                  { key: 'leafRakingSweeping', label: 'Raking leaves, patio & paving blow/sweep' },
                  { key: 'greenWasteBagging', label: 'Green garden waste bagging & clearing' },
                ].map((t) => (
                  <label
                    key={t.key}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                      tasks[t.key]
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!tasks[t.key]}
                      onChange={() => toggleTask(t.key)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Optional Handyman Fixing Combination (Strict rule: pairs only with gardeners, has own tools) */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-600" />
                  <span>3. Combine with Mighty Handyman Fixing (+R250)</span>
                </label>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                  Equipped with Own Tools
                </span>
              </div>

              <label className="flex items-start gap-3 p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl cursor-pointer hover:bg-amber-100/50 transition-colors">
                <input
                  type="checkbox"
                  checked={includeHandymanFixes}
                  onChange={(e) => setIncludeHandymanFixes(e.target.checked)}
                  className="mt-0.5 rounded text-amber-700 focus:ring-amber-600"
                />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-amber-950 flex items-center justify-between">
                    <span>Add Mighty Handyman Fixing Services (+R250)</span>
                    <span className="font-mono font-bold text-amber-800">+R250</span>
                  </div>
                  <p className="text-[11px] text-amber-900/80 leading-relaxed">
                    Our handyman brings their own full professional tools. Fixing services only, combined with your garden appointment for seamless property care.
                  </p>
                </div>
              </label>

              {includeHandymanFixes && (
                <div className="p-3 bg-white rounded-xl border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={handyDoors}
                      onChange={(e) => setHandyDoors(e.target.checked)}
                      className="rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>Fixing doors & minor things</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={handyCupboards}
                      onChange={(e) => setHandyCupboards(e.target.checked)}
                      className="rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>Cupboards & shelf hinges</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={handyTablesChairs}
                      onChange={(e) => setHandyTablesChairs(e.target.checked)}
                      className="rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>Tables & chairs tightening</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={handyPainting}
                      onChange={(e) => setHandyPainting(e.target.checked)}
                      className="rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>Touch-up painting</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={handyGutters}
                      onChange={(e) => setHandyGutters(e.target.checked)}
                      className="rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>Gutter cleanings & downpipe leaf clearing</span>
                  </label>
                </div>
              )}
            </div>

            {/* Step 4: Physical Address & Property Type */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>4. Physical Address & Property Type</span>
                </label>
                <span className="text-[11px] text-slate-500">Cape Town grounds dispatch</span>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Property Type *</span>
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium text-slate-800"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    House / Unit # *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unit 4B or 18"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      errors.houseNumber ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.houseNumber && (
                    <p className="text-[10px] text-rose-600 mt-0.5">{errors.houseNumber}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rhodes Avenue or Constantia Main"
                    value={streetName}
                    onChange={(e) => setStreetName(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      errors.streetName ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.streetName && (
                    <p className="text-[10px] text-rose-600 mt-0.5">{errors.streetName}</p>
                  )}
                </div>
              </div>

              {/* Suburb & Zip Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Suburb (Cape Town) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Constantia, Newlands, Rondebosch"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      errors.suburb ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.suburb && (
                    <p className="text-[10px] text-rose-600 mt-0.5">{errors.suburb}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Postal / Zip Code *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 7806 or 7700"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      errors.zipCode ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.zipCode && (
                    <p className="text-[10px] text-rose-600 mt-0.5">{errors.zipCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 5: Schedule & Contact */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>5. Schedule & Contact Information</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      errors.preferredDate ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.preferredDate && (
                    <p className="text-[10px] text-rose-600 mt-0.5">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option>Morning (08:00 - 12:00)</option>
                    <option>Midday (11:00 - 15:00)</option>
                    <option>Afternoon (13:00 - 17:00)</option>
                    <option>Full Day (08:30 - 16:30)</option>
                  </select>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      errors.fullName ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.fullName && (
                    <p className="text-[10px] text-rose-600 mt-0.5">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-rose-600 mt-0.5">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    South African Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="072 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      errors.phone ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-rose-600 mt-0.5">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Garden Notes & Gate Access Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Side gate access, water point location, dogs on property, or specific flowerbed guidelines..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Right Summary & Action Card */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-sm text-slate-900">Hourly Rate Summary</h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ZAR
                </span>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Gardener Rate:</span>
                  <span className="font-mono font-bold text-slate-900">R{HOURLY_RATE} / hr</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Duration:</span>
                  <span className="font-mono font-bold text-slate-900">{hours} Hours</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Gardening Labor:</span>
                  <span className="font-mono font-bold text-slate-900">R{laborSubtotal.toLocaleString()}</span>
                </div>

                {includeHandymanFixes && (
                  <div className="flex justify-between items-center text-amber-900 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200">
                    <span>Mighty Handyman Fixing (Own tools):</span>
                    <span className="font-mono font-bold">+R{handymanFee}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-black text-slate-900">Estimated Total:</span>
                    <div className="text-[10px] text-slate-500">Includes 15% South African VAT</div>
                  </div>
                  <span className="text-2xl font-black font-mono text-emerald-700">
                    R{totalZAR.toLocaleString()}
                  </span>
                </div>

                {/* Estimate Quote Disclaimer Notice */}
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl space-y-1 text-slate-800 text-[11px] leading-relaxed">
                  <div className="font-extrabold text-amber-900 flex items-center gap-1.5 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Cost Estimate Notice</span>
                  </div>
                  <p className="text-slate-700">
                    All cost breakdowns are an <strong>estimate quote</strong> and could be a bit less or more than estimated. The office reviews your schedule and sends the <strong>final quote</strong>.
                  </p>
                  <div className="pt-1 border-t border-amber-200/80 text-[10px] text-slate-600 space-y-0.5">
                    <div>Office: <strong className="text-slate-900">087 8222 984</strong> · WhatsApp: <strong className="text-slate-900">066 322 7557</strong></div>
                    <div>info@mightybrands.co.za · victoria@mightybrands.co.za</div>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 space-y-2 text-[11px] text-emerald-950">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>The Mighty Gardeners Guarantee:</span>
                </div>
                <ul className="space-y-1 text-slate-600 text-[10px] pl-1">
                  <li>• Certified through Mighty Academy Cape Town</li>
                  <li>• Commercial lawn mowers & weed trimmers provided</li>
                  <li>• Transparent hourly rate (R100/hr, minimum 3 hrs)</li>
                  <li>• Automated itemized quote on separate landing page</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleGenerateQuote}
                  className="w-full py-3 px-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Generate Quote & View Breakdown</span>
                </button>

                <button
                  type="button"
                  onClick={handlePayNow}
                  className="w-full py-3 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                >
                  <CreditCard className="w-4 h-4 text-white" />
                  <span>Pay Now via PayFast Instant EFT</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                Quotes are automatically generated with an itemized breakdown and download option. Office sends final confirmed quote.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PayFast Modal */}
      {isPayFastOpen && pendingQuote && (
        <PayFastModal
          isOpen={isPayFastOpen}
          onClose={() => setIsPayFastOpen(false)}
          bookingReference={pendingQuote.quoteNumber}
          amount={pendingQuote.totalZAR}
          customerName={pendingQuote.fullName}
          serviceTitle={`Mighty Gardeners (${hours} hrs @ R100/hr)`}
          onPaymentSuccess={(details) => {
            const updated: QuoteRecord = {
              ...pendingQuote,
              status: 'Paid via PayFast Instant EFT',
              payFastTxId: details.transactionId,
              bankUsed: details.bankName,
            };
            setIsPayFastOpen(false);
            onViewQuoteBreakdown(updated);
          }}
        />
      )}
    </div>
  );
};
