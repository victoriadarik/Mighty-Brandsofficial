import React from 'react';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const DIVISION_LOGOS: Record<string, string> = {
  movers: '/assets/aistudio/mighty_movers_Red_0254f3cd.png',
  plumbing: '/assets/aistudio/mighty_plumbers_1_bba592e7.png',
  gardeners: '/assets/aistudio/mighty_gardners_52f6dd9b.png',
  handyman: '/assets/aistudio/mighty_handyman_1_480d47fa.png',
  academy: '/assets/aistudio/mughty_academy_black_4c5bb5e0.png',
};

const getSizeDim = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  switch (size) {
    case 'sm':
      return 'w-10 h-10';
    case 'lg':
      return 'w-20 h-20';
    case 'xl':
      return 'w-28 h-28';
    case 'md':
    default:
      return 'w-14 h-14';
  }
};

export const MightyMaidsLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const dim = getSizeDim(size);
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${dim} shrink-0 relative flex items-center justify-center bg-white rounded-xl shadow-xs border border-pink-200 p-1`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Archway */}
          <path d="M20 90V42C20 24 33 12 50 12C67 12 80 24 80 42V90H20Z" fill="#F43F5E" />
          <path d="M28 90V44C28 30 38 20 50 20C62 20 72 30 72 44V90H28Z" fill="#0F172A" />
          {/* Cleaner silhouette with apron & broom */}
          <circle cx="50" cy="30" r="7" fill="#FDE047" />
          <path d="M42 42C42 38 46 36 50 36C54 36 58 38 58 42L62 70H38L42 42Z" fill="#FFFFFF" />
          {/* Apron tie and mop handle */}
          <path d="M40 70L36 90H64L60 70H40Z" fill="#F43F5E" />
          <line x1="68" y1="28" x2="34" y2="90" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Mop head */}
          <path d="M28 89C28 87 34 87 40 89L38 92H26L28 89Z" fill="#FDE047" />
        </svg>
      </div>
      {showText && (
        <div>
          <div className="font-extrabold tracking-tight text-pink-600 text-sm leading-tight uppercase">
            Mighty Maids
          </div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
            Cape Town Subscriptions
          </div>
        </div>
      )}
    </div>
  );
};

export const MightyNanniesLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const dim = getSizeDim(size);
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${dim} shrink-0 relative flex items-center justify-center bg-white rounded-xl shadow-xs border border-rose-200 p-1`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Nanny Head */}
          <circle cx="48" cy="22" r="8" fill="#EC4899" />
          {/* Nanny Body */}
          <path d="M38 34C36 34 35 36 37 40L41 68H55L59 40C61 36 60 34 58 34H38Z" fill="#EC4899" />
          <rect x="42" y="68" width="5" height="22" rx="2.5" fill="#EC4899" />
          <rect x="50" y="68" width="5" height="22" rx="2.5" fill="#EC4899" />
          {/* Infant on left hip */}
          <circle cx="33" cy="28" r="6" fill="#F472B6" />
          <path d="M26 38C26 35 30 35 34 38L38 52H28L26 38Z" fill="#F472B6" />
          {/* Toddler holding hand */}
          <circle cx="72" cy="38" r="6" fill="#EC4899" />
          <path d="M66 48C64 48 64 50 66 54L68 76H76L78 54C80 50 80 48 78 48H66Z" fill="#EC4899" />
          <path d="M70 76L67 90H71L73 76H70Z" fill="#EC4899" />
          <path d="M75 76L77 90H81L78 76H75Z" fill="#EC4899" />
          {/* Hand holding link */}
          <path d="M57 48C62 48 64 50 67 52" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      {showText && (
        <div>
          <div className="font-extrabold tracking-tight text-rose-600 text-sm leading-tight uppercase">
            Mighty Nannies
          </div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
            Certified Childcare
          </div>
        </div>
      )}
    </div>
  );
};

export const MightyMoversLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const dim = getSizeDim(size);
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${dim} shrink-0 relative flex items-center justify-center bg-white rounded-xl shadow-xs border border-red-200 p-1 overflow-hidden`}>
        <img
          src="/assets/aistudio/mighty_movers_Red_0254f3cd.png"
          alt="Mighty Movers official logo"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      {showText && (
        <div>
          <div className="font-black italic tracking-tight text-red-600 text-sm leading-tight uppercase">
            Mighty Movers
          </div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
            Turnkey Relocation & Clean
          </div>
        </div>
      )}
    </div>
  );
};

export const MightyPlumbersLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const dim = getSizeDim(size);
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${dim} shrink-0 relative flex items-center justify-center bg-white rounded-xl shadow-xs border border-sky-200 p-1 overflow-hidden`}>
        <img
          src="/assets/aistudio/mighty_plumbers_1_bba592e7.png"
          alt="Mighty Plumbers official logo"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      {showText && (
        <div>
          <div className="font-extrabold italic tracking-tight text-sky-600 text-sm leading-tight uppercase">
            Mighty Plumbers
          </div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
            Monthly Rounds & Leak Sweeps
          </div>
        </div>
      )}
    </div>
  );
};

export const MightyGardenersLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const dim = getSizeDim(size);
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${dim} shrink-0 relative flex items-center justify-center bg-white rounded-xl shadow-xs border border-emerald-200 p-1 overflow-hidden`}>
        <img
          src="/assets/aistudio/mighty_gardners_52f6dd9b.png"
          alt="Mighty Gardeners official logo"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      {showText && (
        <div>
          <div className="font-extrabold tracking-tight text-emerald-700 text-sm leading-tight uppercase">
            Mighty Gardeners
          </div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
            Regular Rounds & Tidying
          </div>
        </div>
      )}
    </div>
  );
};

export const MightyHandymanLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const dim = getSizeDim(size);
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${dim} shrink-0 relative flex items-center justify-center bg-white rounded-xl shadow-xs border border-amber-300 p-1 overflow-hidden`}>
        <img
          src="/assets/aistudio/mighty_handyman_1_480d47fa.png"
          alt="Mighty Handyman official logo"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      {showText && (
        <div>
          <div className="font-black tracking-tight text-amber-900 text-sm leading-tight uppercase">
            Mighty Handyman
          </div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
            Own Tools · Pairs with Gardeners
          </div>
        </div>
      )}
    </div>
  );
};

export const MightyAcademyLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const dim = getSizeDim(size);
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${dim} shrink-0 relative flex items-center justify-center bg-black rounded-xl shadow-xs border border-purple-500/50 p-1 overflow-hidden`}>
        <img
          src="/assets/aistudio/mughty_academy_black_4c5bb5e0.png"
          alt="Mighty Academy official logo"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      {showText && (
        <div>
          <div className="font-black tracking-tight text-slate-900 dark:text-white text-sm leading-tight uppercase flex items-center gap-1.5">
            <span>Mighty Academy</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-purple-100 text-purple-900 font-bold border border-purple-200">
              CPT
            </span>
          </div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
            Accredited Cape Town Institute
          </div>
        </div>
      )}
    </div>
  );
};

export const DivisionLogoRenderer: React.FC<{
  divisionId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}> = ({
  divisionId,
  size = 'md',
  showText = true,
  className = '',
}) => {
  switch (divisionId) {
    case 'maids':
      return <MightyMaidsLogo size={size} showText={showText} className={className} />;
    case 'nannies':
      return <MightyNanniesLogo size={size} showText={showText} className={className} />;
    case 'movers':
      return <MightyMoversLogo size={size} showText={showText} className={className} />;
    case 'plumbing':
      return <MightyPlumbersLogo size={size} showText={showText} className={className} />;
    case 'gardeners':
      return <MightyGardenersLogo size={size} showText={showText} className={className} />;
    case 'handyman':
      return <MightyHandymanLogo size={size} showText={showText} className={className} />;
    case 'academy':
      return <MightyAcademyLogo size={size} showText={showText} className={className} />;
    default:
      return <MightyMaidsLogo size={size} showText={showText} className={className} />;
  }
};
