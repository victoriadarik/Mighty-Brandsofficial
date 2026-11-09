import React from 'react';
import { AlertCircle, PhoneCall, ArrowRight, ShieldAlert } from 'lucide-react';

interface EmergencyBannerProps {
  onOpenEmergencyBooking: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onOpenEmergencyBooking }) => {
  return (
    <section className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 text-white py-3.5 px-4 border-y border-sky-800/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-sky-600/30 text-sky-300 flex items-center justify-center shrink-0 border border-sky-500/40">
            <ShieldAlert className="w-5 h-5 text-sky-300" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5 justify-center sm:justify-start">
              <span>Mighty Plumbing Monthly Maintenance & General Care</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="text-[11px] text-sky-200">Bathroom & Sink Leak Sweeps · Clean Pipes</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              Proactive monthly leak detection rounds & general plumbing repairs—plus 24/7 rapid dispatch for urgent leaks.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+27878222984"
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-sky-300" />
            <span>087 8222 984</span>
          </a>
          <button
            onClick={onOpenEmergencyBooking}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white shadow-sm flex items-center gap-1.5 transition-all"
          >
            <span>Book Plumbing Care</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
