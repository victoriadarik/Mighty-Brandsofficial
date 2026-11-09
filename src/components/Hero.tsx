import React from 'react';
import { DIVISIONS, Division } from '../data/divisions';
import { ShieldCheck, Sparkles, ArrowRight, PhoneCall, CheckCircle } from 'lucide-react';
import { DivisionLogoRenderer } from './BrandLogos';

interface HeroProps {
  selectedDivisionId: string;
  onSelectDivision: (id: string) => void;
  onOpenBooking: (divisionId?: string) => void;
  onNavigateToMaidHourly?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedDivisionId,
  onSelectDivision,
  onOpenBooking,
  onNavigateToMaidHourly,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-4 pb-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Division Selector Strip */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
            The Mighty Family:
          </span>
          {DIVISIONS.map((div) => {
            const isSelected = selectedDivisionId === div.id;
            return (
              <button
                key={div.id}
                onClick={() => {
                  onSelectDivision(div.id);
                  const el = document.getElementById('divisions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/10'
                    : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                }`}
              >
                <span>{div.name}</span>
                {div.status === 'Established' ? (
                  <span className={`text-[9px] font-medium px-1.5 py-0.2 rounded-sm ${isSelected ? 'bg-slate-800 text-pink-300' : 'bg-pink-50 text-pink-700'}`}>
                    Active
                  </span>
                ) : (
                  <span className={`text-[9px] font-medium px-1.5 py-0.2 rounded-sm ${isSelected ? 'bg-slate-800 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
                    New
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 2-Column Balanced Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="text-amber-600 font-bold tracking-wider uppercase">Cape Town & South Africa</span>
              <span aria-hidden="true">·</span>
              <span>Single Account Billing</span>
              <span aria-hidden="true">·</span>
              <span>PayFast Instant EFT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              One trusted standard for every corner of your home, garden, and family life.
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              From recurring Cape Town house cleaning subscriptions and accredited nannies to turnkey residential moving with pre/post clean, monthly plumbing leak sweeps, regular garden rounds, and tool-equipped handyman fixing—Mighty Brands brings vetted excellence together.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap active:scale-98"
              >
                <span>Get Detailed Quote Breakdown</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
              <a
                href="#bundle"
                className="px-5 py-3.5 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap text-center"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Calculate Bundle Savings</span>
              </a>
            </div>

            {/* Hourly Booking Fast Links */}
            {onNavigateToMaidHourly && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-500 font-semibold">Hourly Housekeeping:</span>
                <button
                  type="button"
                  onClick={onNavigateToMaidHourly}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold border border-pink-200 transition-all cursor-pointer shadow-2xs"
                >
                  <span>Book Maid Hourly (R100/hr · Min 3 hrs)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Quick Emergency / Direct Support Micro Bar */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>7-Tier Vetting · PayFast Instant EFT Gateway</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="tel:+27878222984"
                  className="font-bold text-slate-800 hover:text-slate-950 flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                  <span>Office: 087 8222 984</span>
                </a>
                <a
                  href="https://wa.me/27663227557"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                >
                  <span>WhatsApp: 066 322 7557</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with subtle overlay badge */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-16/10 group">
              <img
                src="/src/assets/images/hero_mighty_brands_1792449768192.jpg"
                alt="Contemporary family home cared for by Mighty Brands"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs font-extrabold text-amber-400 uppercase tracking-widest mb-1">
                  The Complete Mighty South Africa Ecosystem
                </div>
                <div className="text-sm sm:text-base font-semibold text-slate-100 text-balance">
                  Mighty Maids · Mighty Nannies · Mighty Movers · Mighty Plumbers · Mighty Gardeners · Mighty Handyman
                </div>
              </div>
            </div>

            {/* Official Brand Badges Carousel Strip */}
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
              {DIVISIONS.map((div) => (
                <button
                  key={div.id}
                  onClick={() => {
                    onSelectDivision(div.id);
                    const el = document.getElementById('divisions');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
                  title={`Explore ${div.name}`}
                >
                  <DivisionLogoRenderer divisionId={div.id} size="sm" showText={false} className="pointer-events-none mb-1.5" />
                  <span className="text-[11px] font-bold text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-1">
                    {div.name.replace('Mighty ', '')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Full-width proof strip below hero */}
        <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              18,400+
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Residential Visits in Cape Town
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              100%
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              7-Tier Background Checked
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              6 Divisions
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Unified Single Account Billing
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              PayFast EFT
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Instant South African Bank Clearing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
