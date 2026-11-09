import React, { useState } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (divisionId?: string) => void;
  bookingCount: number;
  onOpenMyBookings: () => void;
  onNavigateToMaidHourly?: () => void;
  onNavigateToGardenerHourly?: () => void;
  onNavigateToAcademy?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  bookingCount,
  onOpenMyBookings,
  onNavigateToMaidHourly,
  onNavigateToGardenerHourly,
  onNavigateToAcademy,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Zone - Single text element wordmark */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 font-black flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform">
              M
            </span>
            <span>
              Mighty <span className="text-amber-600 font-semibold">Brands</span>
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean text links + Hourly Service links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a
              href="#divisions"
              className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              Divisions
            </a>

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

            {onNavigateToGardenerHourly && (
              <button
                type="button"
                onClick={onNavigateToGardenerHourly}
                className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-slate-700"
              >
                <span>Hourly Gardener</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
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
          <div className="flex items-center gap-3 shrink-0">
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
              className="px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all hover:shadow-md active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Service
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-2 font-semibold text-slate-700 text-sm">
            {onNavigateToMaidHourly && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToMaidHourly();
                }}
                className="flex items-center justify-between text-left py-2 px-3 rounded-xl bg-pink-50 text-pink-900 font-bold cursor-pointer"
              >
                <span>Book a Maid for Certain Hours</span>
                <span className="text-xs bg-pink-600 text-white px-2 py-0.5 rounded-full font-mono">
                  R100/hr (Min 3 hrs)
                </span>
              </button>
            )}

            {onNavigateToGardenerHourly && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToGardenerHourly();
                }}
                className="flex items-center justify-between text-left py-2 px-3 rounded-xl bg-emerald-50 text-emerald-950 font-bold cursor-pointer"
              >
                <span>Book a Gardener for Certain Hours</span>
                <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-mono">
                  R100/hr (Min 3 hrs)
                </span>
              </button>
            )}

            <a
              href="#divisions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-3 rounded-md hover:bg-slate-50"
            >
              Divisions Overview
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-3 rounded-md hover:bg-slate-50"
            >
              Frequently Asked Questions
            </a>
            {onNavigateToAcademy ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToAcademy();
                }}
                className="flex items-center justify-between text-left py-2 px-3 rounded-xl bg-purple-50 text-purple-900 font-bold cursor-pointer"
              >
                <span>Mighty Academy (Vocational Training)</span>
                <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-mono">
                  2027 Prospectus
                </span>
              </button>
            ) : (
              <a
                href="#academy"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-md hover:bg-slate-50 flex items-center justify-between text-amber-600 font-bold"
              >
                <span>Mighty Academy (Training)</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-sm">Cape Town</span>
              </a>
            )}
            <a
              href="#bundle"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-3 rounded-md hover:bg-slate-50"
            >
              Bundle & Save
            </a>
            {bookingCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="flex items-center gap-2 text-left py-2 px-3 rounded-xl text-emerald-700 bg-emerald-50 font-bold"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>My Bookings ({bookingCount})</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
