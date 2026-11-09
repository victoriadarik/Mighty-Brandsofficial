import React from 'react';
import { ShieldCheck, PhoneCall, ArrowRight, Sparkles, Award } from 'lucide-react';

interface BrandBannerProps {
  onOpenBooking: () => void;
  onExploreDivisions?: () => void;
}

export const BrandBanner: React.FC<BrandBannerProps> = ({
  onOpenBooking,
  onExploreDivisions,
}) => {
  const handleScrollToDivisions = () => {
    if (onExploreDivisions) {
      onExploreDivisions();
    } else {
      const el = document.getElementById('divisions');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-3.5 px-4 border-b border-amber-500/20 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Brand identity & value statement */}
        <div className="flex items-center gap-3.5 text-center lg:text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Mighty Brands South Africa
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 hidden sm:inline-block" />
              <span className="text-slate-300 font-semibold normal-case">
                Cape Town’s Verified Home & Property Ecosystem
              </span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
              6 Specialized Divisions · 7-Tier Vetting · Mighty Academy™ Certified · Single-Account Billing
            </div>
          </div>
        </div>

        {/* Brand contact numbers & quick service action */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-2.5 shrink-0">
          {/* Central Office Phone */}
          <a
            href="tel:+27878222984"
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-xs"
            title="Call Mighty Brands Central Office"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span className="whitespace-nowrap">Office: 087 8222 984</span>
          </a>

          {/* WhatsApp Direct Line */}
          <a
            href="https://wa.me/27663227557"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-xs font-bold text-emerald-300 flex items-center gap-1.5 transition-all shadow-xs"
            title="Chat on WhatsApp: 066 322 7557"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="whitespace-nowrap">WhatsApp: 066 322 7557</span>
          </a>

          {/* Explore Divisions Link */}
          <button
            type="button"
            onClick={handleScrollToDivisions}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-all cursor-pointer whitespace-nowrap hidden sm:inline-flex items-center gap-1"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>6 Divisions</span>
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Book Any Service</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>
      </div>
    </section>
  );
};
