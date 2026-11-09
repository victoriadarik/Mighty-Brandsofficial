import React from 'react';
import { ShieldCheck, UserCheck, CreditCard, Sparkles, Award, Clock, GraduationCap } from 'lucide-react';

export const MightyStandard: React.FC = () => {
  const pillars = [
    {
      icon: <UserCheck className="w-6 h-6 text-amber-600" />,
      title: 'Rigorously Screened & Vetted Personnel',
      description: 'Zero random gig workers. Every maid, nanny, mover, plumber, gardener, and handyman undergoes 7-tier criminal background screening, verified reference checks, and comprehensive skill assessment.'
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
      title: 'Mighty Academy Certified Professionals',
      description: 'Every professional completes rigorous hands-on training, equipment safety, and certified quality standard protocols at our Cape Town Mighty Academy before ever entering your home.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
      title: 'Unified Account & PayFast Instant EFT',
      description: 'Eliminate chaotic scattered invoices. Pay online instantly using South African Instant EFT via PayFast (Capitec, FNB, Standard Bank, Nedbank, Absa & TymeBank).'
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: '24-Hour Happiness Guarantee',
      description: 'If any service visit does not meet our meticulous 50-point standard, notify our concierge within 24 hours and we dispatch a senior lead to make it right at zero expense.'
    },
    {
      icon: <Clock className="w-6 h-6 text-teal-600" />,
      title: 'Punctuality & Guaranteed Windows',
      description: 'We respect your family routine. Receive real-time arrival text updates, clear 1-hour dispatch windows, and prompt service every visit.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      title: 'Eco-Friendly & Family Safe Supplies',
      description: 'We utilize plant-derived, allergen-safe solutions, HEPA filtration systems, and low-emission cordless outdoor equipment around children and pets.'
    }
  ];

  return (
    <section id="standard" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            The Mighty Difference
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            The Mighty Standard: Trust in Every Single Visit
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Finding reliable home service specialists shouldn’t feel like a lottery. 
            Mighty Brands standardizes safety, accountability, and professionalism.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200 space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
