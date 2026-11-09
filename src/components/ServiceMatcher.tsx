import React, { useState } from 'react';
import { DIVISIONS } from '../data/divisions';
import { Compass, Sparkles, Check, ArrowRight, RotateCcw, Wrench } from 'lucide-react';
import { DivisionLogoRenderer } from './BrandLogos';

interface ServiceMatcherProps {
  onSelectDivision: (id: string) => void;
  onOpenBooking: (divisionId: string, notes?: string) => void;
}

export const ServiceMatcher: React.FC<ServiceMatcherProps> = ({
  onSelectDivision,
  onOpenBooking,
}) => {
  const [step, setStep] = useState<number>(1);
  const [need, setNeed] = useState<string>('cleaning');
  const [cadence, setCadence] = useState<string>('recurring');
  const [priority, setPriority] = useState<string>('peace-of-mind');

  // Match logic
  const getRecommendation = () => {
    let matchedId = 'maids';
    let title = 'Mighty Maids House Cleaning Subscription';
    let reason = 'Ideal for keeping your household consistently immaculate in Cape Town with dedicated cleaners.';

    if (need === 'childcare') {
      matchedId = 'nannies';
      title = 'Mighty Nannies Accredited Care';
      reason = 'Vetted, background-cleared childcare professionals aligned with your schedule.';
    } else if (need === 'moving') {
      matchedId = 'movers';
      title = 'Mighty Movers + Cleaners Relocation';
      reason = 'White-glove moving truck paired with cleaners to help pack, clean the old house, and wipe furniture at the new place.';
    } else if (need === 'plumbing') {
      matchedId = 'plumbing';
      title = 'Mighty Plumbing Monthly Maintenance';
      reason = 'Monthly rounds with bathroom/sink leak detection sweeps, clean pipes, and preventative fixes.';
    } else if (need === 'outdoor') {
      matchedId = 'gardeners';
      title = 'Mighty Gardeners Regular Home Rounds';
      reason = 'Lawn mowing, trimming, edging, weeding and general tidying on a regular round for homes.';
    } else if (need === 'repairs') {
      matchedId = 'handyman';
      title = 'Mighty Handyman + Gardeners Combo';
      reason = 'Equipped with own tools. Fixing services for doors, cupboards, tables, chairs, painting & gutters combined with garden care.';
    }

    const divisionObj = DIVISIONS.find((d) => d.id === matchedId) || DIVISIONS[0];

    return {
      division: divisionObj,
      title,
      reason,
    };
  };

  const rec = getRecommendation();

  const handleReset = () => {
    setStep(1);
    setNeed('cleaning');
    setCadence('recurring');
    setPriority('peace-of-mind');
  };

  return (
    <section id="matcher" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            <Compass className="w-4 h-4" />
            <span>Interactive Guide</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            Find Your Ideal Mighty Service Match
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Tell us about your home and timeline, and we’ll route you to the exact division, combo tier, and estimate.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Step {step} of 3
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  step >= 1 ? 'bg-slate-900' : 'bg-slate-200'
                }`}
              />
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  step >= 2 ? 'bg-slate-900' : 'bg-slate-200'
                }`}
              />
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  step >= 3 ? 'bg-slate-900' : 'bg-slate-200'
                }`}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                1. What is your primary home service need right now?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'cleaning', label: 'House Cleaning Subscription', sub: '2x–3x weekly, weekly, or monthly rounds (Cape Town)' },
                  { id: 'childcare', label: 'Vetted Childcare & Infant Care', sub: 'CPR-certified nannies & babysitters' },
                  { id: 'moving', label: 'Residential Move + Pre/Post Clean', sub: 'Truck, packing help, old house clean & furniture wipe' },
                  { id: 'plumbing', label: 'Monthly Plumbing & Leak Sweeps', sub: 'Bathroom & sink leak detections, clean pipes & fixes' },
                  { id: 'outdoor', label: 'Basic Regular Garden Maintenance', sub: 'Lawn mowing, trimming, edging, weeding & tidying' },
                  { id: 'repairs', label: 'Handyman Home Repairs (Own Tools)', sub: 'Doors, cupboards, tables/chairs, painting & gutters + Garden' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setNeed(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      need === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm">{item.label}</div>
                    <div
                      className={`text-xs mt-1 ${
                        need === item.id ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                2. What is your preferred schedule or subscription cadence?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'multi-weekly', label: 'More Than Once a Week', sub: '2x or 3x weekly hotel-level housekeeping' },
                  { id: 'recurring', label: 'Weekly or Monthly Round', sub: 'Consistent routine home & grounds maintenance' },
                  { id: 'one-time', label: 'Move / Scheduled Repair', sub: 'Turnover, deep refresh, relocation, or fixer round' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCadence(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      cadence === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm">{item.label}</div>
                    <div
                      className={`text-xs mt-1 ${
                        cadence === item.id ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <DivisionLogoRenderer divisionId={rec.division.id} size="md" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                      Your Recommended Division
                    </span>
                    <h4 className="text-xl font-black text-slate-900 mt-0.5">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-md">
                      {rec.reason}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs text-slate-500 block">Baseline Rate:</span>
                  <span className="text-xl font-bold text-slate-900 font-mono">
                    R{rec.division.baseRate.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {rec.division.rateUnit}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Quiz Over</span>
                </button>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      onSelectDivision(rec.division.id);
                      const el = document.getElementById('divisions');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                  >
                    Explore Division Details
                  </button>

                  <button
                    onClick={() =>
                      onOpenBooking(
                        rec.division.id,
                        `Matched via Service Quiz: ${rec.title}. Looking for ${cadence} service in South Africa.`
                      )
                    }
                    className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Get Detailed Quote Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
