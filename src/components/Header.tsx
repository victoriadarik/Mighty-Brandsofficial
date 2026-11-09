import React, { useState } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (divisionId?: string) => void;
  bookingCount: number;
  onOpenMyBookings: () => void;
  onNavigateToMaidHourly?: () => void;
  onNavigateToAcademy?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  bookingCount,
  onOpenMyBookings,
  onNavigateToMaidHourly,
  onNavigateToAcademy,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 md:gap-8">
          {/* Zone 1: Brand Zone - Single text element wordmark */}
          <a
            href="#"
            className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 text-amber-400 font-black flex items-center justify-center text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform">
              M
            </span>
            <span>
              Mighty <span className="text-amber-600 font-semibold">Brands</span>
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean text links + Hourly Service links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">

            {/* Dedicated Hourly Pages */}
            {onNavigateToMaidHourly && (
              <button
                type="button"
                onClick={onNavigateToMaidHourly}
                className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-slate-700"
              >
                <span>Hourly Maid</span>
                <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-1.5 py-0.5 rounded-full">
                  R100/hr
                </span>
              </button>
            )}


            <a
              href="#faq"
              className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
            {onNavigateToAcademy ? (
              <button
                type="button"
                onClick={onNavigateToAcademy}
                className="hover:text-purple-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-slate-700"
              >
                <span>Mighty Academy</span>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded-full">2027 Prospectus</span>
              </button>
            ) : (
              <a
                href="#academy"
                className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span>Mighty Academy</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">Training</span>
              </a>
            )}
            <a
              href="#bundle"
              className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              Bundle & Save
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {bookingCount > 0 && (
              <button
                onClick={onOpenMyBookings}
                className="relative hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                title="View your saved service bookings & estimates"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <span>My Bookings ({bookingCount})</span>
              </button>
            )}

            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all hover:shadow-md active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Service
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Positioned absolutely with z-50 to eliminate overlap) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[calc(100dvh-4.5rem)] overflow-y-auto z-50 animate-fadeIn">
          <nav className="flex flex-col space-y-2.5 font-semibold text-slate-700 text-sm">
            {onNavigateToMaidHourly && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToMaidHourly();
                }}
                className="w-full text-left p-3 rounded-xl bg-pink-50 hover:bg-pink-100/70 text-pink-950 font-bold transition-colors cursor-pointer border border-pink-200/60"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm">Hourly Maid Booking</span>
                  <span className="shrink-0 text-[11px] bg-pink-600 text-white px-2 py-0.5 rounded-full font-mono font-bold whitespace-nowrap">
                    R100/hr (Min 3 hrs)
                  </span>
                </div>
                <div className="text-[11px] text-pink-700 font-normal mt-0.5">
                  Vetted maid for specific chores & maintenance
                </div>
              </button>
            )}

            {onNavigateToAcademy ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToAcademy();
                }}
                className="w-full text-left p-3 rounded-xl bg-purple-50 hover:bg-purple-100/70 text-purple-950 font-bold transition-colors cursor-pointer border border-purple-200/60"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm">Mighty Academy</span>
                  <span className="shrink-0 text-[11px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-mono font-bold whitespace-nowrap">
                    2027 Prospectus
                  </span>
                </div>
                <div className="text-[11px] text-purple-700 font-normal mt-0.5">
                  BnB cleaning curriculum, vocational rates & internships
                </div>
              </button>
            ) : (
              <a
                href="#academy"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block p-3 rounded-xl bg-purple-50 hover:bg-purple-100/70 text-purple-950 font-bold border border-purple-200/60"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm">Mighty Academy</span>
                  <span className="shrink-0 text-[11px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-mono font-bold whitespace-nowrap">
                    2027 Prospectus
                  </span>
                </div>
              </a>
            )}

            <a
              href="#bundle"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-100 text-slate-800 font-semibold flex items-center justify-between text-sm transition-colors border border-transparent hover:border-slate-200"
            >
              <span>Bundle & Save</span>
              <span className="text-xs text-amber-600 font-bold">5% Off</span>
            </a>

            {bookingCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="flex items-center justify-between text-left py-2.5 px-3 rounded-xl text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-bold border border-emerald-200 transition-colors cursor-pointer text-sm"
              >
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  <span>My Bookings</span>
                </div>
                <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-mono">
                  {bookingCount}
                </span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
