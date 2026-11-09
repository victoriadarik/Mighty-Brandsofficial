import React from 'react';
import { DIVISIONS } from '../data/divisions';
import { Phone, Mail, MapPin, Shield, CreditCard } from 'lucide-react';
import { DivisionLogoRenderer } from './BrandLogos';

interface FooterProps {
  onSelectDivision: (id: string) => void;
  onOpenBooking: (divisionId?: string) => void;
  onNavigateToMaidHourly?: () => void;
  onNavigateToGardenerHourly?: () => void;
  onNavigateToAcademy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectDivision,
  onOpenBooking,
  onNavigateToMaidHourly,
  onNavigateToGardenerHourly,
  onNavigateToAcademy,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-lg">
                M
              </span>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Mighty <span className="text-amber-400">Brands</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier unified home services network in Cape Town and South Africa. Providing residential housekeeping subscriptions, 
              accredited childcare, careful relocation with pre/post cleans, monthly plumbing rounds, regular garden rounds, and tool-equipped handyman services 
              under one verified umbrella.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>7-Tier Background Screening & Mighty Academy Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Office Direct: <strong>087 8222 984</strong> · WhatsApp: <strong>066 322 7557</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>info@mightybrands.co.za · victoria@mightybrands.co.za</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cape Town & Surrounding Suburbs, Western Cape</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PayFast Instant EFT: Capitec, FNB, Standard Bank, Nedbank, Absa & more</span>
              </div>
            </div>
          </div>

          {/* Division Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Our Six Divisions
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {DIVISIONS.map((div) => (
                <li key={div.id}>
                  <button
                    onClick={() => {
                      onSelectDivision(div.id);
                      const el = document.getElementById('divisions');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>{div.name}</span>
                    {div.id === 'handyman' && (
                      <span className="text-[9px] text-amber-400 font-bold bg-amber-950 px-1 rounded">
                        New
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Resources & Program
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {onNavigateToMaidHourly && (
                <li>
                  <button
                    type="button"
                    onClick={onNavigateToMaidHourly}
                    className="hover:text-pink-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Hourly Maid Booking</span>
                    <span className="text-[9px] bg-pink-900/60 text-pink-300 font-bold px-1 rounded">R100/hr</span>
                  </button>
                </li>
              )}
              {onNavigateToGardenerHourly && (
                <li>
                  <button
                    type="button"
                    onClick={onNavigateToGardenerHourly}
                    className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Hourly Gardener Booking</span>
                    <span className="text-[9px] bg-emerald-900/60 text-emerald-300 font-bold px-1 rounded">R100/hr</span>
                  </button>
                </li>
              )}
              <li>
                <a href="#standard" className="hover:text-amber-400 transition-colors">
                  The Mighty Standard
                </a>
              </li>
              <li>
                {onNavigateToAcademy ? (
                  <button
                    type="button"
                    onClick={onNavigateToAcademy}
                    className="hover:text-purple-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                  >
                    <span>Mighty Academy (2027 Prospectus & Rates)</span>
                    <span className="text-[9px] bg-purple-900/60 text-purple-300 font-bold px-1 rounded">CPT</span>
                  </button>
                ) : (
                  <a href="#academy" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span>Mighty Academy (Training & Credentials)</span>
                    <span className="text-[9px] bg-amber-400/20 text-amber-300 font-bold px-1 rounded">CPT</span>
                  </a>
                )}
              </li>
              <li>
                <a href="#bundle" className="hover:text-amber-400 transition-colors">
                  Multi-Service Bundle Savings
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Interactive Service FAQ
                </a>
              </li>
              <li>
                <a href="#matcher" className="hover:text-amber-400 transition-colors">
                  Service Matcher Quiz
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Customer Verified Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Service Guarantee Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              Instant Online EFT
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Book online and generate an itemized quote with full physical address details. Pay directly via PayFast Instant EFT with zero transaction delays.
            </p>
            <button
              onClick={() => onOpenBooking()}
              className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm"
            >
              Get Itemized Quote Breakdown
            </button>
          </div>
        </div>

        {/* Official Brand Badges Strip */}
        <div className="py-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Verified Mighty Brands Family:
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {DIVISIONS.map((div) => (
              <button
                key={div.id}
                onClick={() => {
                  onSelectDivision(div.id);
                  const el = document.getElementById('divisions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-colors flex items-center gap-2 cursor-pointer"
                title={div.name}
              >
                <DivisionLogoRenderer divisionId={div.id} size="sm" showText={false} />
                <span className="text-xs font-semibold text-slate-300 pr-1.5">{div.name}</span>
              </button>
            ))}
            {onNavigateToAcademy ? (
              <button
                type="button"
                onClick={onNavigateToAcademy}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-400/50 transition-colors flex items-center gap-2 cursor-pointer"
                title="Explore Mighty Academy 2027 Prospectus & Rates"
              >
                <DivisionLogoRenderer divisionId="academy" size="sm" showText={false} />
                <span className="text-xs font-semibold text-slate-300 pr-1.5">Mighty Academy</span>
              </button>
            ) : (
              <a
                href="#academy"
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-400/50 transition-colors flex items-center gap-2 cursor-pointer"
                title="Mighty Academy"
              >
                <DivisionLogoRenderer divisionId="academy" size="sm" showText={false} />
                <span className="text-xs font-semibold text-slate-300 pr-1.5">Mighty Academy</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div>&copy; {new Date().getFullYear()} Mighty Brands South Africa (Pty) Ltd. All rights reserved. Cape Town, Western Cape.</div>
            <div className="text-[11px] text-slate-400">
              * All cost breakdowns are an estimate quote (final quote could be a bit less or more than estimated; the office sends final confirmed quote).
            </div>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">PayFast EFT Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
