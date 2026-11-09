import React, { useState } from 'react';
import { DIVISIONS, POPULAR_BUNDLES, BundleCombo } from '../data/divisions';
import { Sparkles, Check, ArrowRight, ShieldCheck, Tag, CreditCard, Home, Wrench, Hammer, Trees } from 'lucide-react';
import { DivisionLogoRenderer } from './BrandLogos';

interface BundleCalculatorProps {
  onOpenBooking: (divisionId?: string, notes?: string, selectedDivisions?: string[]) => void;
}

export const BundleCalculator: React.FC<BundleCalculatorProps> = ({ onOpenBooking }) => {
  // Default to the Gardeners + Handyman bundle
  const [selectedDivs, setSelectedDivs] = useState<string[]>(['gardeners', 'handyman']);
  const [bundleFilter, setBundleFilter] = useState<'all' | 'indoor-family' | 'property-grounds'>('all');

  const toggleDivision = (id: string) => {
    if (selectedDivs.includes(id)) {
      if (selectedDivs.length > 1) {
        setSelectedDivs(selectedDivs.filter((item) => item !== id));
      }
    } else {
      // Handy Man rule: fixing services only can be added or combined with gardeners
      if (id === 'handyman' && !selectedDivs.includes('gardeners')) {
        setSelectedDivs([...selectedDivs, 'handyman', 'gardeners']);
      } else {
        setSelectedDivs([...selectedDivs, id]);
      }
    }
  };

  const getDiscountPercent = (divIds: string[]): number => {
    const count = divIds.length;
    if (count >= 3) return 20;
    if (count === 2) return 15;
    return 0;
  };

  const discount = getDiscountPercent(selectedDivs);

  // Approximate typical baseline calculation in South African Rand (ZAR)
  const baselineTotal = selectedDivs.reduce((sum, id) => {
    switch (id) {
      case 'maids':
        return sum + 420; // e.g. R420 standard visit
      case 'nannies':
        return sum + 650; // weekly placement block
      case 'movers':
        return sum + 1300; // 2 hour base dispatch
      case 'plumbing':
        return sum + 480; // monthly leak detection & pipe clean round
      case 'gardeners':
        return sum + 280; // regular round
      case 'handyman':
        return sum + 380; // fixing session with own tools
      default:
        return sum + 350;
    }
  }, 0);

  const discountAmount = Math.round(baselineTotal * (discount / 100));
  const finalEstimate = baselineTotal - discountAmount;

  const handleSelectPrebuilt = (bundle: BundleCombo) => {
    setSelectedDivs(bundle.divisionIds);
  };

  const filteredBundles =
    bundleFilter === 'all'
      ? POPULAR_BUNDLES
      : POPULAR_BUNDLES.filter((b) => b.category === bundleFilter);

  return (
    <section id="bundle" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mighty Multi-Division Synergy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Bundle Your Services & Pay Easily via PayFast EFT
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            Maids, Nannies, and Movers bundle together for seamless home & life transitions, 
            while Gardeners, Handyman (with own tools), and Plumbing bundle up for complete property maintenance rounds. 
            All settled via secure South African Instant EFT online through PayFast.
          </p>
        </div>

        {/* Bundle Family Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-800/80 rounded-2xl max-w-2xl mx-auto mb-10 border border-slate-700">
          <button
            onClick={() => setBundleFilter('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              bundleFilter === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            All Mighty Bundles
          </button>
          <button
            onClick={() => setBundleFilter('indoor-family')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              bundleFilter === 'indoor-family'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Maids + Nannies + Movers</span>
          </button>
          <button
            onClick={() => setBundleFilter('property-grounds')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              bundleFilter === 'property-grounds'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Gardeners + Handyman + Plumbing</span>
          </button>
        </div>

        {/* Popular Pre-Engineered Combos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filteredBundles.map((b, idx) => {
            const isCurrent =
              b.divisionIds.length === selectedDivs.length &&
              b.divisionIds.every((id) => selectedDivs.includes(id));

            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-slate-800/90 border-amber-400 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/30'
                    : 'bg-slate-800/40 border-slate-700/80 hover:bg-slate-800/70 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        b.category === 'indoor-family'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {b.category === 'indoor-family' ? 'Family & Living' : 'Property & Repairs'}
                    </span>
                    <span className="text-xs font-black text-amber-400 font-mono">
                      SAVE {b.discountPct}%
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white mb-1.5">{b.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{b.tagline}</p>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60 text-xs text-slate-300 mb-4">
                    <span className="font-bold text-amber-300 block mb-1">Synergy Advantage:</span>
                    {b.highlight}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/70 flex items-center justify-between">
                  <div className="flex items-center -space-x-1">
                    {b.divisionIds.map((id) => (
                      <div
                        key={id}
                        className="w-7 h-7 rounded-full bg-slate-700 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-amber-300 shadow-xs"
                        title={id}
                      >
                        {id[0].toUpperCase()}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSelectPrebuilt(b)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    {isCurrent ? 'Selected' : 'Load Bundle'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Bundle Calculator Bar */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-700 gap-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Custom Bundle Builder
              </div>
              <h3 className="text-xl font-black text-white mt-0.5">
                Toggle Divisions to Combine & Calculate Savings
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Automatic Discount:</span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {discount}% OFF
              </span>
            </div>
          </div>

          {/* Division Pills */}
          <div className="py-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {DIVISIONS.map((div) => {
              const isSelected = selectedDivs.includes(div.id);
              return (
                <button
                  key={div.id}
                  onClick={() => toggleDivision(div.id)}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-300/40'
                      : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="truncate">
                    <span>{div.name}</span>
                    {div.id === 'handyman' && (
                      <span className="block text-[10px] font-normal opacity-80 truncate">
                        Own tools · With Gardeners
                      </span>
                    )}
                  </div>
                  {isSelected && <span className="font-black text-sm">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Pricing Outcome Strip */}
          <div className="pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white font-mono">
                  R{finalEstimate.toLocaleString()}
                </span>
                {discount > 0 && (
                  <span className="text-sm text-slate-400 line-through font-mono">
                    R{baselineTotal.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-slate-400">estimated start / round</span>
              </div>
              <div className="text-xs text-emerald-400 font-medium mt-1">
                {discount > 0 ? (
                  <span>
                    You save ~R{discountAmount.toLocaleString()} ({discount}%) by combining {selectedDivs.length} Mighty divisions!
                  </span>
                ) : (
                  <span className="text-slate-400">
                    Add a second division to unlock 15% bundle savings.
                  </span>
                )}
              </div>
              <div className="text-[11px] text-amber-300/90 mt-1 font-medium">
                * All cost breakdowns are an estimate quote (final quote could be a bit less or more; the office sends final quote).
              </div>
            </div>

            <button
              onClick={() =>
                onOpenBooking(
                  undefined,
                  `Custom Bundle Request (${selectedDivs.join(' + ')}): Estimated R${finalEstimate.toLocaleString()} with ${discount}% bundle savings.`,
                  selectedDivs
                )
              }
              className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Get Itemized Breakdown Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
