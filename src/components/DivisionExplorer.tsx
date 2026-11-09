import React, { useState } from 'react';
import { DIVISIONS, Division } from '../data/divisions';
import {
  MAID_PROPERTY_TYPES,
  MAID_FREQUENCY_RATES,
  DOMESTIC_CALL_OUT_SUBSCRIPTIONS,
  DAILY_CLEANING_ACTIVITIES,
  MaidPropertyType,
  MaidFrequency,
} from '../data/maidPricing';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Shield,
  ShieldCheck,
  ArrowRight,
  Layers,
  Wrench,
  Truck,
  HeartHandshake,
  Trees,
  Check,
  Hammer
} from 'lucide-react';
import { DivisionLogoRenderer } from './BrandLogos';

interface DivisionExplorerProps {
  selectedDivisionId: string;
  onSelectDivision: (id: string) => void;
  onOpenBooking: (divisionId: string, initialNotes?: string) => void;
  onNavigateToMaidHourly?: () => void;
  onNavigateToGardenerHourly?: () => void;
}

export const DivisionExplorer: React.FC<DivisionExplorerProps> = ({
  selectedDivisionId,
  onSelectDivision,
  onOpenBooking,
  onNavigateToMaidHourly,
  onNavigateToGardenerHourly,
}) => {
  const currentDivision = DIVISIONS.find((d) => d.id === selectedDivisionId) || DIVISIONS[0];

  // Estimator State per division
  // Mighty Maids: Daily Activities by Property & Frequency OR Domestic Call Out Subscription
  const [maidPricingModel, setMaidPricingModel] = useState<'daily' | 'subscription'>('daily');
  const [maidPropertyType, setMaidPropertyType] = useState<MaidPropertyType>('2 Bed Apartment');
  const [maidFrequency, setMaidFrequency] = useState<MaidFrequency>('once-off');
  const [maidCallOutPlanId, setMaidCallOutPlanId] = useState<string>('standard');
  const [maidDetergentAddon, setMaidDetergentAddon] = useState<boolean>(false);

  const [nannyHours, setNannyHours] = useState(20);
  const [moverRooms, setMoverRooms] = useState(2);
  const [includePreMovePackClean, setIncludePreMovePackClean] = useState(true);
  const [includeOldHouseTurnover, setIncludeOldHouseTurnover] = useState(true);
  const [includeNewPlaceUnpackWipe, setIncludeNewPlaceUnpackWipe] = useState(false);
  const [plumbingBaths, setPlumbingBaths] = useState(2);
  const [plumbingServiceMode, setPlumbingServiceMode] = useState<'monthly-round' | 'general-maintenance'>('monthly-round');
  const [gardenCadence, setGardenCadence] = useState<'weekly' | 'biweekly'>('biweekly');
  const [gardenHomeSize, setGardenHomeSize] = useState<'standard' | 'large'>('standard');

  // Handyman state (own tools, fixing services only, combined with gardeners)
  const [handyFixDoors, setHandyFixDoors] = useState(true);
  const [handyFixCupboards, setHandyFixCupboards] = useState(true);
  const [handyFixTablesChairs, setHandyFixTablesChairs] = useState(false);
  const [handyFixPainting, setHandyFixPainting] = useState(false);
  const [handyFixGutters, setHandyFixGutters] = useState(true);
  const [handyIncludeGardenRound, setHandyIncludeGardenRound] = useState(true);

  // Compute live estimate based on selected division
  const calculateEstimate = (div: Division): { amount: number; description: string } => {
    switch (div.id) {
      case 'maids': {
        if (maidPricingModel === 'subscription') {
          const plan =
            DOMESTIC_CALL_OUT_SUBSCRIPTIONS.find((p) => p.id === maidCallOutPlanId) ||
            DOMESTIC_CALL_OUT_SUBSCRIPTIONS[0];
          return {
            amount: plan.priceMonthlyZAR,
            description: `Domestic Call Out Subscription: ${plan.name} (${plan.badge}) · R${plan.priceMonthlyZAR} / mo (${plan.inclusions.join(', ')})`,
          };
        }

        const freqData = MAID_FREQUENCY_RATES[maidFrequency];
        const rateInfo = freqData.rates[maidPropertyType];
        const detergentFee = maidDetergentAddon ? 65 : 0;

        if (rateInfo.price === 'QUOTE') {
          return {
            amount: 0,
            description: `Daily Maintenance (${rateInfo.serviceType}) for ${maidPropertyType} · ${freqData.label} — Custom Inspection & Dedicated Crew Quote Required`,
          };
        }

        const finalTotal = rateInfo.price + detergentFee;
        return {
          amount: finalTotal,
          description: `Daily Maintenance (${rateInfo.serviceType}) for ${maidPropertyType} · ${freqData.label}: R${rateInfo.price}${
            maidDetergentAddon ? ' + R65 Detergents on request' : ' (Client provides detergents)'
          }`,
        };
      }
      case 'nannies': {
        const est = nannyHours * 85;
        return { amount: est, description: `Estimated weekly investment for ${nannyHours} hours/week of vetted care (R${est.toLocaleString()}/wk)` };
      }
      case 'movers': {
        const hours = moverRooms <= 1 ? 3 : moverRooms <= 3 ? 5 : 8;
        let baseMoverCost = hours * 650;
        let addOns = [];
        let addOnCost = 0;

        if (includePreMovePackClean) {
          addOnCost += 450;
          addOns.push('Pre-move packing & clean');
        }
        if (includeOldHouseTurnover) {
          addOnCost += 650;
          addOns.push('Old house move-out scrub');
        }
        if (includeNewPlaceUnpackWipe) {
          addOnCost += 400;
          addOns.push('New home unpack & furniture wipe');
        }

        const discount = addOns.length > 0 ? Math.round((baseMoverCost + addOnCost) * 0.15) : 0;
        const total = baseMoverCost + addOnCost - discount;

        const addOnText = addOns.length > 0 ? ` + ${addOns.join(' + ')} (15% Bundle Discount applied)` : '';
        return {
          amount: total,
          description: `Residential move (${hours}h crew & truck)${addOnText}`,
        };
      }
      case 'plumbing': {
        if (plumbingServiceMode === 'general-maintenance') {
          return {
            amount: 350,
            description: 'General plumbing maintenance visit: sink trap cleaning, faucet servicing, valve inspection & running toilet fixes',
          };
        }
        const est = plumbingBaths <= 2 ? 480 : plumbingBaths <= 4 ? 680 : 880;
        return {
          amount: est,
          description: `Monthly maintenance round for ${plumbingBaths} bathrooms & kitchen: bathroom/sink leak detections & cleaning pipes`,
        };
      }
      case 'gardeners': {
        const base = gardenHomeSize === 'standard' ? (gardenCadence === 'weekly' ? 280 : 350) : (gardenCadence === 'weekly' ? 420 : 520);
        return {
          amount: base,
          description: `${gardenCadence === 'weekly' ? 'Weekly' : 'Bi-weekly'} home garden round: lawn mowing, trimming, edging, weeding & general tidying`,
        };
      }
      case 'handyman': {
        let baseHandy = 380;
        const items: string[] = [];
        if (handyFixDoors) {
          baseHandy += 120;
          items.push('Doors & Minor');
        }
        if (handyFixCupboards) {
          baseHandy += 150;
          items.push('Cupboards');
        }
        if (handyFixTablesChairs) {
          baseHandy += 110;
          items.push('Tables & Chairs');
        }
        if (handyFixPainting) {
          baseHandy += 180;
          items.push('Painting');
        }
        if (handyFixGutters) {
          baseHandy += 240;
          items.push('Gutters');
        }

        let gardenAddon = handyIncludeGardenRound ? 280 : 0;
        let subtotal = baseHandy + gardenAddon;
        let discount = handyIncludeGardenRound ? Math.round(subtotal * 0.15) : 0;
        let total = subtotal - discount;

        const pairedText = handyIncludeGardenRound
          ? ' + Combined with Mighty Gardeners round (15% Combo Discount)'
          : '';
        return {
          amount: total,
          description: `Handyman fixing session with own tools (${items.join(', ') || 'Minor fixes'})${pairedText}`,
        };
      }
      default:
        return { amount: 350, description: 'Base standard service call' };
    }
  };

  const estimate = calculateEstimate(currentDivision);

  const getDivisionIcon = (id: string) => {
    switch (id) {
      case 'maids':
        return <Sparkles className="w-5 h-5" />;
      case 'nannies':
        return <HeartHandshake className="w-5 h-5" />;
      case 'movers':
        return <Truck className="w-5 h-5" />;
      case 'plumbing':
        return <Wrench className="w-5 h-5" />;
      case 'gardeners':
        return <Trees className="w-5 h-5" />;
      case 'handyman':
        return <Hammer className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section id="divisions" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Multi-Discipline Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Explore All Six Mighty Divisions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every division operates with dedicated specialists, industry-grade equipment, 
            and the same unwavering Mighty accountability across Cape Town and South Africa.
          </p>
        </div>

        {/* Interactive Division Navigation Bar with active layout animation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 p-1.5 bg-slate-100 rounded-2xl max-w-5xl mx-auto mb-12 border border-slate-200/80">
          {DIVISIONS.map((div) => {
            const isSelected = selectedDivisionId === div.id;
            return (
              <button
                key={div.id}
                onClick={() => onSelectDivision(div.id)}
                className={`relative px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap z-10 ${
                  isSelected
                    ? 'text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {isSelected && (
                  <div
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/80 -z-10 transition-all duration-200"
                  />
                )}
                <span className={isSelected ? div.theme.accent : 'text-slate-400'}>
                  {getDivisionIcon(div.id)}
                </span>
                <span>{div.name}</span>
                <span
                  className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                    div.status === 'Established'
                      ? 'bg-pink-100 text-pink-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {div.status === 'Established' ? 'Live' : 'New'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Division Stage */}
        <div
          key={currentDivision.id}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch transition-opacity duration-200 animate-fadeIn"
        >
            {/* Visual Column & Trust Credentials */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-4/3 bg-slate-100 group">
                <img
                  src={currentDivision.image}
                  alt={`${currentDivision.name} professional service in action`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 shadow-md backdrop-blur-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mighty Academy Certified</span>
                  </span>
                </div>
              </div>

              {/* Division Credentials Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>The {currentDivision.name} Guarantee</span>
                  </h4>
                  <DivisionLogoRenderer divisionId={currentDivision.id} size="sm" showText={false} />
                </div>
                <ul className="space-y-2.5">
                  {currentDivision.credentials.map((cred, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </span>
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Details & Interactive Estimator Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div>
                {/* Division Title & Tagline */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-2">
                  <span className="font-bold text-slate-800">{currentDivision.brandKicker}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentDivision.status === 'Established' ? 'Active Cape Town Full-Service' : 'Fleet & Territory Expansion'}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                  {currentDivision.heroHeadline}
                </h3>

                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {currentDivision.overview}
                </p>

                {/* Key Service Offerings */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Core Available Offerings
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentDivision.services.map((svc) => (
                      <div
                        key={svc.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all"
                      >
                        <div className="font-bold text-sm text-slate-900 mb-1">
                          {svc.name}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-2 mb-2">
                          {svc.description}
                        </div>
                        <div className="text-xs font-semibold text-amber-700 tabular-nums">
                          {svc.typicalRate}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Instant Estimate Builder */}
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Instant Cost Estimator (ZAR)</span>
                    </span>
                    <span className="text-xs text-slate-500">Live preview</span>
                  </div>

                  {/* Dynamic controls per division */}
                  {currentDivision.id === 'maids' && (
                    <div className="space-y-4">
                      {/* Hourly Maid Work Quick Link Card */}
                      {onNavigateToMaidHourly && (
                        <div className="p-3.5 bg-gradient-to-r from-pink-500/10 via-pink-50 to-white border border-pink-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
                          <div>
                            <div className="font-extrabold text-pink-950 flex items-center gap-1.5 text-sm">
                              <Clock className="w-4 h-4 text-pink-600" />
                              <span>Book a Maid for Certain Hours Work</span>
                            </div>
                            <p className="text-pink-900 text-[11px] mt-0.5">
                              Charge per hour: <strong>R100 an hour</strong> (minimum 3 hours). Dedicated page with full live quote breakdown.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={onNavigateToMaidHourly}
                            className="px-3.5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl whitespace-nowrap cursor-pointer transition-all shadow-xs text-xs self-stretch sm:self-auto text-center"
                          >
                            Go to Hourly Booking Page →
                          </button>
                        </div>
                      )}

                      {/* Mandatory Scope Notice */}
                      <div className="bg-pink-50/90 border border-pink-200 rounded-2xl p-4 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-pink-950 uppercase tracking-wide">
                          <Sparkles className="w-4 h-4 text-pink-600 shrink-0" />
                          <span>Daily Cleaning Activities (Maintenance) Scope</span>
                        </div>
                        <p className="text-xs text-pink-900 font-medium bg-white/80 p-2 rounded-xl border border-pink-100">
                          📌 <strong>Please note:</strong> This pricing only applies to Daily Cleaning Activities (Maintenance).
                        </p>

                        {/* 4 Task Categories */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <div className="bg-white/90 p-2.5 rounded-xl border border-pink-100 text-[11px] space-y-1">
                            <div className="font-bold text-pink-950 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                              <span>Kitchen</span>
                            </div>
                            <p className="text-slate-600 leading-snug">
                              Wash dishes, load/unload the dishwasher, wipe countertops, wipe the stovetop, and sweep the floor.
                            </p>
                          </div>

                          <div className="bg-white/90 p-2.5 rounded-xl border border-pink-100 text-[11px] space-y-1">
                            <div className="font-bold text-pink-950 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                              <span>General Tidying</span>
                            </div>
                            <p className="text-slate-600 leading-snug">
                              Put away items in shared spaces (living room).
                            </p>
                          </div>

                          <div className="bg-white/90 p-2.5 rounded-xl border border-pink-100 text-[11px] space-y-1">
                            <div className="font-bold text-pink-950 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                              <span>Bathroom</span>
                            </div>
                            <p className="text-slate-600 leading-snug">
                              Clean shower doors and wipe down sinks.
                            </p>
                          </div>

                          <div className="bg-white/90 p-2.5 rounded-xl border border-pink-100 text-[11px] space-y-1">
                            <div className="font-bold text-pink-950 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                              <span>Waste</span>
                            </div>
                            <p className="text-slate-600 leading-snug">
                              Take out trash and recycling as needed.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Model Switcher Tabs */}
                      <div className="flex bg-slate-200/70 p-1 rounded-xl text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setMaidPricingModel('daily')}
                          className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                            maidPricingModel === 'daily'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Property Type & Frequency Pricing
                        </button>
                        <button
                          type="button"
                          onClick={() => setMaidPricingModel('subscription')}
                          className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                            maidPricingModel === 'subscription'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Domestic Call Out Subscriptions
                        </button>
                      </div>

                      {maidPricingModel === 'daily' ? (
                        <div className="space-y-3">
                          {/* Frequency Selector: Once Off, Twice A Week, 3x A Week */}
                          <div>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              <span>Select Frequency:</span>
                              <span className="text-pink-700 text-[11px] normal-case font-semibold">
                                {MAID_FREQUENCY_RATES[maidFrequency].sublabel}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {(['once-off', 'twice-a-week', '3x-a-week'] as MaidFrequency[]).map((freq) => {
                                const f = MAID_FREQUENCY_RATES[freq];
                                const isSelected = maidFrequency === freq;
                                return (
                                  <button
                                    key={freq}
                                    type="button"
                                    onClick={() => setMaidFrequency(freq)}
                                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-pink-600 text-white border-pink-600 shadow-xs font-bold'
                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                    }`}
                                  >
                                    <div className="text-xs font-bold flex items-center justify-center gap-1">
                                      <span>{f.label}</span>
                                      {f.badge && (
                                        <span
                                          className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase ${
                                            isSelected ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-800'
                                          }`}
                                        >
                                          {f.badge}
                                        </span>
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Property Type Grid */}
                          <div>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              <span>Select Property Type:</span>
                              <span className="text-slate-400 text-[11px] font-normal">Click to see exact rate</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {MAID_PROPERTY_TYPES.map((pt) => {
                                const isSelected = maidPropertyType === pt;
                                const rateInfo = MAID_FREQUENCY_RATES[maidFrequency].rates[pt];
                                return (
                                  <button
                                    key={pt}
                                    type="button"
                                    onClick={() => setMaidPropertyType(pt)}
                                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-pink-50/90 border-pink-500 shadow-xs ring-1 ring-pink-500 text-pink-950'
                                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between text-xs font-bold">
                                      <span>{pt}</span>
                                      <span
                                        className={`tabular-nums font-black ${
                                          isSelected ? 'text-pink-700' : 'text-slate-900'
                                        }`}
                                      >
                                        {rateInfo.price === 'QUOTE' ? 'QUOTE' : `R${rateInfo.price}`}
                                      </span>
                                    </div>
                                    <div className="text-[10px] text-slate-500 mt-0.5">
                                      {rateInfo.serviceType}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Detergent Supply Option */}
                          <div className="pt-2 border-t border-slate-200">
                            <label className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70">
                              <input
                                type="checkbox"
                                checked={maidDetergentAddon}
                                onChange={(e) => setMaidDetergentAddon(e.target.checked)}
                                className="mt-0.5 rounded text-pink-600 focus:ring-pink-500"
                              />
                              <div className="text-xs">
                                <div className="font-bold text-slate-900 flex items-center justify-between gap-2">
                                  <span>Request Home Cleaning Detergents (+R65)</span>
                                  <span className="text-[10px] text-pink-700 font-semibold bg-pink-100 px-2 py-0.5 rounded-full">
                                    Supplied when requested
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  Supplies for home: Detergents are supplied only when requested and quoted accordingly. Leave unchecked if using your own household supplies.
                                </p>
                              </div>
                            </label>
                          </div>
                        </div>
                      ) : (
                        /* Domestic Cleaning Call Out Subscription Plans */
                        <div className="space-y-3">
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Domestic Cleaning Call Out Subscription (Monthly Retainer):
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {DOMESTIC_CALL_OUT_SUBSCRIPTIONS.map((plan) => {
                              const isSelected = maidCallOutPlanId === plan.id;
                              return (
                                <div
                                  key={plan.id}
                                  onClick={() => setMaidCallOutPlanId(plan.id)}
                                  className={`p-3 rounded-2xl border transition-all cursor-pointer relative ${
                                    isSelected
                                      ? 'bg-pink-50/90 border-pink-500 shadow-xs ring-1 ring-pink-500'
                                      : 'bg-white border-slate-200 hover:border-slate-300'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span
                                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                        plan.tier === 'POPULAR'
                                          ? 'bg-amber-100 text-amber-900'
                                          : plan.tier === 'RECOMMENDED'
                                          ? 'bg-pink-100 text-pink-900'
                                          : plan.tier === 'ADVANCED'
                                          ? 'bg-purple-100 text-purple-900'
                                          : 'bg-slate-900 text-white'
                                      }`}
                                    >
                                      {plan.badge}
                                    </span>
                                    <div className="text-base font-extrabold text-slate-900 font-mono">
                                      R {plan.priceMonthlyZAR}{' '}
                                      <span className="text-xs text-slate-500 font-normal">/ mo</span>
                                    </div>
                                  </div>
                                  <div className="font-bold text-sm text-slate-900 mb-2">{plan.name}</div>
                                  <ul className="text-[11px] space-y-1 text-slate-700 mb-2">
                                    {plan.inclusions.map((inc, i) => (
                                      <li key={i} className="flex items-center gap-1.5 text-emerald-700 font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span>{inc}</span>
                                      </li>
                                    ))}
                                    {plan.exclusions.map((exc, i) => (
                                      <li key={i} className="flex items-center gap-1.5 text-slate-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                        <span>{exc}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <button
                                    type="button"
                                    className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-pink-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                  >
                                    {isSelected ? '✓ Selected Plan' : 'Choose Plan'}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {currentDivision.id === 'handyman' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-950 uppercase tracking-wider">
                        <span>Equipped with Own Tools · Select Fixing Services:</span>
                        <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                          Only with Gardeners
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-amber-400">
                          <input
                            type="checkbox"
                            checked={handyFixDoors}
                            onChange={(e) => setHandyFixDoors(e.target.checked)}
                            className="rounded text-amber-700 focus:ring-amber-600"
                          />
                          <span>Fixing doors & minor things</span>
                        </label>

                        <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-amber-400">
                          <input
                            type="checkbox"
                            checked={handyFixCupboards}
                            onChange={(e) => setHandyFixCupboards(e.target.checked)}
                            className="rounded text-amber-700 focus:ring-amber-600"
                          />
                          <span>Kitchen cupboards & shelves</span>
                        </label>

                        <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-amber-400">
                          <input
                            type="checkbox"
                            checked={handyFixTablesChairs}
                            onChange={(e) => setHandyFixTablesChairs(e.target.checked)}
                            className="rounded text-amber-700 focus:ring-amber-600"
                          />
                          <span>Tables & chairs fixing</span>
                        </label>

                        <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-amber-400">
                          <input
                            type="checkbox"
                            checked={handyFixPainting}
                            onChange={(e) => setHandyFixPainting(e.target.checked)}
                            className="rounded text-amber-700 focus:ring-amber-600"
                          />
                          <span>Touch-up painting & scuffs</span>
                        </label>

                        <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-amber-400 sm:col-span-2">
                          <input
                            type="checkbox"
                            checked={handyFixGutters}
                            onChange={(e) => setHandyFixGutters(e.target.checked)}
                            className="rounded text-amber-700 focus:ring-amber-600"
                          />
                          <span>Gutter cleanings & roof downpipe clearing</span>
                        </label>
                      </div>

                      {/* Gardener pairing toggle */}
                      <div className="pt-2 border-t border-slate-200">
                        <label className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl cursor-pointer">
                          <div className="flex items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={handyIncludeGardenRound}
                              onChange={(e) => setHandyIncludeGardenRound(e.target.checked)}
                              className="rounded text-emerald-600 focus:ring-emerald-500"
                            />
                            <div>
                              <span className="font-bold text-emerald-950">Combine with Mighty Gardeners Regular Round</span>
                              <div className="text-[10px] text-emerald-700">
                                Lawn mowing, trimming, edging & weeding + Handyman repairs in one coordinated visit (Save 15%)
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-black text-emerald-800 font-mono">
                            +R238
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {currentDivision.id === 'nannies' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold text-slate-700">
                        <span>Care Hours: {nannyHours} hrs / week</span>
                        <span className="text-xs text-slate-500">R85/hr average</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="5"
                        value={nannyHours}
                        onChange={(e) => setNannyHours(Number(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                        <span>5 hrs (Part-time)</span>
                        <span>25 hrs (After school)</span>
                        <span>50 hrs (Full-time)</span>
                      </div>
                    </div>
                  )}

                  {currentDivision.id === 'movers' && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-semibold text-slate-700">
                        <span>Move Scope: {moverRooms} Furnished Room{moverRooms > 1 ? 's' : ''}</span>
                        <span className="text-xs text-red-700 font-bold">2-Pro Crew + Truck</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={moverRooms}
                        onChange={(e) => setMoverRooms(Number(e.target.value))}
                        className="w-full accent-red-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                        <span>Studio / 1 Room</span>
                        <span>3 Rooms (Townhome)</span>
                        <span>6+ Rooms (Large Home)</span>
                      </div>

                      {/* Integrated Maids & Cleaners Add-ons */}
                      <div className="pt-2 border-t border-slate-200/80 space-y-2">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                          <span>Pair with Mighty Maids & Cleaners:</span>
                          <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                            Save 15% Bundled
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setIncludePreMovePackClean(!includePreMovePackClean)}
                            className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                              includePreMovePackClean
                                ? 'bg-red-50/90 border-red-400 text-red-950 font-semibold'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold">1. Pre-Move</span>
                              <span className={`text-xs ${includePreMovePackClean ? 'text-red-600 font-bold' : 'text-slate-300'}`}>
                                {includePreMovePackClean ? '✓' : '+'}
                              </span>
                            </div>
                            <div className="text-[11px] mt-0.5 text-slate-500">
                              Cleaners help pack & clean before move
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setIncludeOldHouseTurnover(!includeOldHouseTurnover)}
                            className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                              includeOldHouseTurnover
                                ? 'bg-red-50/90 border-red-400 text-red-950 font-semibold'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold">2. Post-Move</span>
                              <span className={`text-xs ${includeOldHouseTurnover ? 'text-red-600 font-bold' : 'text-slate-300'}`}>
                                {includeOldHouseTurnover ? '✓' : '+'}
                              </span>
                            </div>
                            <div className="text-[11px] mt-0.5 text-slate-500">
                              Clean old house after loading (deposit ready)
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setIncludeNewPlaceUnpackWipe(!includeNewPlaceUnpackWipe)}
                            className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                              includeNewPlaceUnpackWipe
                                ? 'bg-red-50/90 border-red-400 text-red-950 font-semibold'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold">3. At New Place</span>
                              <span className={`text-xs ${includeNewPlaceUnpackWipe ? 'text-red-600 font-bold' : 'text-slate-300'}`}>
                                {includeNewPlaceUnpackWipe ? '✓' : '+'}
                              </span>
                            </div>
                            <div className="text-[11px] mt-0.5 text-slate-500">
                              Help unpack & wipe clean furniture after move
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentDivision.id === 'plumbing' && (
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-700 mb-1.5 flex justify-between">
                          <span>Plumbing Service Plan:</span>
                          <span className="text-xs text-sky-700 font-bold">Monthly & General Care</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setPlumbingServiceMode('monthly-round')}
                            className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                              plumbingServiceMode === 'monthly-round'
                                ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            Monthly Maintenance Round
                          </button>
                          <button
                            type="button"
                            onClick={() => setPlumbingServiceMode('general-maintenance')}
                            className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                              plumbingServiceMode === 'general-maintenance'
                                ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            General Maintenance & Repairs
                          </button>
                        </div>
                      </div>

                      {plumbingServiceMode === 'monthly-round' ? (
                        <>
                          <div className="flex justify-between text-sm font-semibold text-slate-700">
                            <span>Home Size: {plumbingBaths} Bathroom{plumbingBaths > 1 ? 's' : ''} + Kitchen Sinks</span>
                            <span className="text-xs text-sky-700 font-bold">Monthly Round</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            value={plumbingBaths}
                            onChange={(e) => setPlumbingBaths(Number(e.target.value))}
                            className="w-full accent-sky-600 cursor-pointer"
                          />
                          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                            <span>1-2 Baths (R480/mo)</span>
                            <span>3-4 Baths (R680/mo)</span>
                            <span>5+ Baths (R880/mo)</span>
                          </div>
                          <div className="text-[11px] text-slate-500 bg-sky-50/70 p-2 rounded-lg border border-sky-100 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span>Monthly Round: Bathroom & sinks leak detections + clean pipes and trap descaling</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-[11px] text-slate-600 bg-sky-50/70 p-2.5 rounded-lg border border-sky-100 space-y-1">
                          <div className="font-bold text-sky-950 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span>General Plumbing Maintenance & Fixes:</span>
                          </div>
                          <p className="text-slate-600 pl-4.5">
                            Sink & basin leak repairs, running toilets, faucet cartridge rebuilds, slow drain trap snaking, and valve tune-ups.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {currentDivision.id === 'gardeners' && (
                    <div className="space-y-3">
                      {/* Hourly Gardener Work Quick Link Card */}
                      {onNavigateToGardenerHourly && (
                        <div className="p-3.5 bg-gradient-to-r from-emerald-500/10 via-emerald-50 to-white border border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
                          <div>
                            <div className="font-extrabold text-emerald-950 flex items-center gap-1.5 text-sm">
                              <Clock className="w-4 h-4 text-emerald-600" />
                              <span>Book a Gardener for Certain Hours Work</span>
                            </div>
                            <p className="text-emerald-900 text-[11px] mt-0.5">
                              Charge per hour: <strong>R100 an hour</strong> (minimum 3 hours). Commercial mowers & tools included.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={onNavigateToGardenerHourly}
                            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl whitespace-nowrap cursor-pointer transition-all shadow-xs text-xs self-stretch sm:self-auto text-center"
                          >
                            Go to Hourly Booking Page →
                          </button>
                        </div>
                      )}

                      <div>
                        <div className="text-sm font-semibold text-slate-700 mb-1.5 flex justify-between">
                          <span>Regular Home Round Schedule:</span>
                          <span className="text-xs text-emerald-700 font-bold">Regular Home Rounds</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setGardenCadence('biweekly')}
                            className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                              gardenCadence === 'biweekly'
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            Bi-Weekly Round (R350/rd)
                          </button>
                          <button
                            type="button"
                            onClick={() => setGardenCadence('weekly')}
                            className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                              gardenCadence === 'weekly'
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            Weekly Round (R280/rd)
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100 space-y-1">
                        <div className="font-bold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Basic Regular Garden Maintenance - Included in Every Round:</span>
                        </div>
                        <p className="text-slate-600 pl-4.5">
                          Lawn mowing, trimming, edging, weeding and general tidying on a regular round - for homes.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Calculated Price Display */}
                  <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                        {currentDivision.id === 'maids' && estimate.amount === 0
                          ? 'QUOTE (Custom Inspection)'
                          : `R${estimate.amount.toLocaleString()}`}
                      </div>
                      <div className="text-xs text-slate-500">
                        {estimate.description}
                      </div>
                      <div className="text-[11px] text-amber-700 font-medium mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>All cost breakdowns are an estimate quote (final quote could be a bit less or more; the office sends final quote).</span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onOpenBooking(
                          currentDivision.id,
                          currentDivision.id === 'maids'
                            ? (maidPricingModel === 'daily'
                                ? `Mighty Maids Daily Maintenance (${MAID_FREQUENCY_RATES[maidFrequency].rates[maidPropertyType].serviceType}) for ${maidPropertyType} · ${MAID_FREQUENCY_RATES[maidFrequency].label}${
                                    maidDetergentAddon ? ' [Detergents requested: Yes (+R65)]' : ' [Detergents requested: No (Client supplies)]'
                                  }`
                                : `Mighty Maids Domestic Call Out Subscription: ${DOMESTIC_CALL_OUT_SUBSCRIPTIONS.find((p) => p.id === maidCallOutPlanId)?.name} (R${DOMESTIC_CALL_OUT_SUBSCRIPTIONS.find((p) => p.id === maidCallOutPlanId)?.priceMonthlyZAR}/mo)`)
                            : `Inquiring for ${currentDivision.name}: ${estimate.description} (~R${estimate.amount.toLocaleString()})`
                        )
                      }
                      className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Book with this Estimate</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenBooking(currentDivision.id)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white text-sm transition-all shadow-sm hover:shadow-md ${currentDivision.theme.primary} ${currentDivision.theme.primaryHover} flex items-center justify-center gap-2`}
                >
                  <span>Book {currentDivision.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>No upfront credit card required to request date</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};
