import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Search,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Users,
  Calendar,
  HeartHandshake,
  Wrench,
  Truck,
  Trees,
  Hammer,
  ArrowRight,
  BadgeCheck,
  Clock,
  MapPin,
  X,
  Send,
  Building2,
  FileCheck2,
  ExternalLink,
  Download
} from 'lucide-react';
import { MightyAcademyLogo } from './BrandLogos';

const ACADEMY_TRACKS = [
  {
    id: 'maids',
    title: 'Housekeeping & Sanitization',
    divisionName: 'Mighty Maids',
    icon: <Sparkles className="w-5 h-5 text-pink-600" />,
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    duration: '40 Practical Hours',
    modules: [
      { name: 'Eco-Chemical Safety & Detergent Dosing', desc: 'Understanding pH balances, delicate surface care, and pet-friendly cleaners' },
      { name: '50-Point Standard Inspection', desc: 'Systematic top-to-bottom bedroom, kitchen, and bathroom sanitization' },
      { name: 'Fabric & Garment Steam Mastery', desc: 'Fine fabric ironing, crease lines, and curtain steaming' },
      { name: 'Cross-Contamination Prevention', desc: 'Strict color-coded microfiber cloth systems for sterile food & bath zones' }
    ],
    outcome: 'Mighty Certified Residential Housekeeper Diploma'
  },
  {
    id: 'nannies',
    title: 'Childcare & Early Development',
    divisionName: 'Mighty Nannies',
    icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    duration: '60 Practical Hours + CPR',
    modules: [
      { name: 'Pediatric CPR & Choking First Aid', desc: 'Accredited infant and toddler life support and emergency response' },
      { name: 'Early Sensory & Cognitive Play', desc: 'Age-appropriate stimulation, fine motor skill exercises, and music' },
      { name: 'Infant Feeding & Hygiene Care', desc: 'Sterilization, balanced toddler nutrition, and safe sleep routines' },
      { name: 'Positive Discipline & Emotional Safety', desc: 'Patience, co-regulation techniques, and trusted household communication' }
    ],
    outcome: 'Accredited Early Childhood Domestic Caregiver Certificate'
  },
  {
    id: 'handyman',
    title: 'Handyman & Minor Repairs',
    divisionName: 'Mighty Handyman',
    icon: <Hammer className="w-5 h-5 text-amber-700" />,
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
    duration: '50 Hands-on Workshop Hours',
    modules: [
      { name: 'Tool Operation & Equipment Care', desc: 'Precision usage of drills, levels, clamps, and safety goggles' },
      { name: 'Door & Hinge Calibration', desc: 'Fixing squeaks, latch realignment, handle tightening, and planing' },
      { name: 'Cabinet & Furniture Fixing', desc: 'Shelf leveling, bracket replacement, table steadiness, and drawer slides' },
      { name: 'Gutter Clearance & Painting Prep', desc: 'Downpipe flushing, exterior ladder safety, and clean taping lines' }
    ],
    outcome: 'Mighty Certified Residential Handyman Competency'
  },
  {
    id: 'gardeners',
    title: 'Gardening & Grounds Care',
    divisionName: 'Mighty Gardeners',
    icon: <Trees className="w-5 h-5 text-emerald-600" />,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    duration: '40 Field Hours',
    modules: [
      { name: 'Precision Lawn Mowing & Edging', desc: 'Grass health, neat perimeter edging, and clean walkway blowing' },
      { name: 'Cape Fynbos & Shrub Pruning', desc: 'Seasonal cutbacks, rose trimming, and indigenous soil nourishment' },
      { name: 'Organic Weed Management', desc: 'Non-toxic root pulling and garden bed mulching' },
      { name: 'Equipment Safety & Cordless Tech', desc: 'Safe blade sharpening, trimmer guards, and quiet low-emission tools' }
    ],
    outcome: 'Mighty Certified Grounds Maintenance Certificate'
  },
  {
    id: 'plumbing',
    title: 'Plumbing Diagnostics & Upkeep',
    divisionName: 'Mighty Plumbers',
    icon: <Wrench className="w-5 h-5 text-cyan-600" />,
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    duration: '60 Workshop & Field Hours',
    modules: [
      { name: 'Non-Invasive Leak Detection', desc: 'Under-sink pressure checks, toilet cistern leaks, and meter auditing' },
      { name: 'Drain Cleaning & Trap Maintenance', desc: 'Hair snare removal, eco-friendly enzymes, and pipe clearance' },
      { name: 'Geyser Valve & Thermostat Check', desc: 'Pressure control valve checks and overflow pipe inspections' },
      { name: 'Water Conservation Upgrades', desc: 'Low-flow aerators and washer replacements for Cape Town homes' }
    ],
    outcome: 'Mighty Preventive Plumbing Technician Credential'
  },
  {
    id: 'movers',
    title: 'Relocation & Safe Transit',
    divisionName: 'Mighty Movers',
    icon: <Truck className="w-5 h-5 text-blue-600" />,
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    duration: '45 Practical Hours',
    modules: [
      { name: 'Ergonomic Heavy Lifting', desc: 'Lifting straps, spine alignment, and staircase maneuvering' },
      { name: 'Furniture Wrapping & Corner Padding', desc: 'Scratch-free blanket wrapping, shrink wrapping, and TV crating' },
      { name: 'Pre & Post-Move Clean Staging', desc: 'Coordinated cleaning with Mighty Maids before move-in' },
      { name: 'Truck Packing & Weight Distribution', desc: 'Securing straps to prevent shifting during transit' }
    ],
    outcome: 'Mighty Certified Logistics & Move Specialist'
  }
];

interface MightyAcademyProps {
  onNavigateToAcademyPage?: () => void;
}

export const MightyAcademy: React.FC<MightyAcademyProps> = ({ onNavigateToAcademyPage }) => {
  const [activeTrack, setActiveTrack] = useState<string>('maids');

  // Enrollment Modal state
  const [showEnrollModal, setShowEnrollModal] = useState<boolean>(false);
  const [enrollSubmitted, setEnrollSubmitted] = useState<boolean>(false);
  const [enrollForm, setEnrollForm] = useState({
    candidateName: '',
    phone: '',
    email: '',
    suburb: 'Sea Point',
    track: 'maids',
    enrollmentType: 'homeowner-sponsor', // or 'self-applicant'
    preferredMonth: 'Next Available Cohort (March 2026)',
    notes: ''
  });

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollSubmitted(true);
  };

  const currentTrackData = ACADEMY_TRACKS.find(t => t.id === activeTrack) || ACADEMY_TRACKS[0];

  return (
    <section id="academy" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Academy Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-12 border-b border-slate-800">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-black border border-purple-500/40 p-1 flex items-center justify-center shrink-0 shadow-lg shadow-purple-950/40">
                <img
                  src="/assets/aistudio/mughty_academy_black_4c5bb5e0.png"
                  alt="Mighty Academy Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Mighty Academy Cape Town</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Where Cape Town’s Finest Home Care Specialists Are Trained
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Mighty Brands does not rely on random app gig workers. Every housekeeper, nanny, mover, plumber, 
              gardener, and handyman is rigorously trained, vetted, and certified at the <strong className="text-white">Mighty Academy</strong> before 
              ever stepping onto your property.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {onNavigateToAcademyPage && (
              <button
                onClick={onNavigateToAcademyPage}
                className="px-5 py-3 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span>Explore Academy Page & Rates</span>
              </button>
            )}

            <a
              href="https://www.academy.mightybrands.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl font-bold text-xs bg-purple-950/60 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-800/60 transition-all flex items-center justify-center gap-1.5"
              title="Visit official stand-alone academy portal"
            >
              <span>academy.mightybrands.co.za</span>
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
            </a>

            <button
              onClick={() => setShowEnrollModal(true)}
              className="px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enroll / Apply</span>
            </button>
          </div>
        </div>

        {/* Academy Training Hall Hero Image & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 aspect-16/9 group">
            <img
              src="/src/assets/images/mighty_academy_training_1792452474010.jpg"
              alt="Mighty Academy vocational training classroom in Cape Town"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
              <span className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                Cape Town Training Centre · Certified Skills Training
              </span>
              <span className="hidden sm:inline bg-amber-500/90 text-slate-950 px-3 py-1.5 rounded-lg font-bold">
                7-Tier Background Screening
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>The Mighty Academy Standards</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                South Africa’s premier vocational development platform for residential and property service professionals.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-2xl font-black text-amber-400">100%</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">7-Tier Criminal Vetted</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-2xl font-black text-emerald-400">14 Courses</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">2027 Prospectus</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-2xl font-black text-cyan-400">2 Months</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">Paid Practical Placement</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-2xl font-black text-purple-400">CPT</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">Cape Town Accredited</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/70 text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Includes ID validation, reference cross-checks, and quarterly refresher training.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Specialized Division Curriculum Tracks */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              6 Specialized Vocational Tracks
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Explore the exact coursework, safety certifications, and checklists our graduates master before deployment.
            </p>
          </div>

          {/* Track Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {ACADEMY_TRACKS.map(track => {
              const isActive = activeTrack === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {track.icon}
                  <span>{track.divisionName}</span>
                </button>
              );
            })}
          </div>

          {/* Active Track Detail Card */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-700 mb-6">
              <div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentTrackData.badgeColor}`}>
                  {currentTrackData.divisionName} Curriculum
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentTrackData.title}
                </h4>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentTrackData.duration}</span>
                </span>
                <span className="bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Diploma</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentTrackData.modules.map((mod, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Module {idx + 1}: {mod.name}</span>
                  </div>
                  <p className="text-xs text-slate-400 pl-6">
                    {mod.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Certification Outcome: <strong className="text-white">{currentTrackData.outcome}</strong></span>
              </div>
              <button
                onClick={() => {
                  setEnrollForm(prev => ({ ...prev, track: currentTrackData.id }));
                  setShowEnrollModal(true);
                }}
                className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <span>Enroll a candidate in this track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Concise 2027 Academy Course Catalogue & Rates Overview */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
                <BookOpen className="w-4 h-4" />
                <span>2027 School Prospectus & Rates</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Practical Vocational Courses · Cape Town
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Open to all adults aged 18+ in Cape Town. Focused short-courses with step-by-step demonstrations, 
                guided practice, simple practical assessments, and a 2-month paid practical internship pathway within Mighty Brands.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {onNavigateToAcademyPage && (
                <button
                  onClick={onNavigateToAcademyPage}
                  className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Full Academy Page</span>
                </button>
              )}
              <a
                href="/assets/aistudio/mighty-academy-course-catalogue-2027_cb5b8396.pdf"
                download="Mighty-Academy-2027-Prospectus.pdf"
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Download Prospectus (PDF)</span>
              </a>
              <a
                href="https://www.academy.mightybrands.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-800/60 font-bold text-xs transition-all flex items-center gap-1.5"
              >
                <span>academy.mightybrands.co.za</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Rates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-purple-800/50">
              <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Course 13 · Confirmed Rate</div>
              <div className="text-xl font-black text-white mt-1">Culinary & Baking Essentials</div>
              <div className="text-lg font-black text-amber-400 font-mono mt-1">R1,400 <span className="text-xs text-slate-400 font-normal">/ 2 Days</span></div>
              <div className="text-xs text-slate-400 mt-1">Cooking fundamentals, baking, kitchen hygiene & portion control.</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/90 border border-purple-800/50">
              <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Course 14 · Confirmed Rate</div>
              <div className="text-xl font-black text-white mt-1">Smart Homes & Homework</div>
              <div className="text-lg font-black text-amber-400 font-mono mt-1">R1,000 <span className="text-xs text-slate-400 font-normal">/ 1 Day</span></div>
              <div className="text-xs text-slate-400 mt-1">Connected lighting, appliances, Wi-Fi, and primary homework assistance.</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">12 Vocational Programmes</div>
              <div className="text-xl font-black text-white mt-1">Trades & Household Care</div>
              <div className="text-sm font-bold text-emerald-400 mt-1">Enquire for Dates & Fees</div>
              <div className="text-xs text-slate-400 mt-1">Childcare (4 wks), Household Mgmt (2 wks), Plumbing (8 wks), Handyman (8 wks), Gardening (4 wks).</div>
            </div>
          </div>

          {/* Contact Strip */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
            <div className="flex flex-wrap items-center gap-5">
              <span>Direct Office: <strong className="text-white">087 8222 984</strong></span>
              <span>WhatsApp: <strong className="text-emerald-400">066 322 7557</strong></span>
              <span>Training: <strong className="text-purple-300">training@mightyacademy.co.za</strong></span>
            </div>
            <div>
              <span>Head of Operations: <strong className="text-slate-200">victoria@mightybrands.co.za</strong></span>
            </div>
          </div>
        </div>

      </div>

      {/* Enrollment & Candidate Application Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowEnrollModal(false);
                setEnrollSubmitted(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!enrollSubmitted ? (
              <form onSubmit={handleEnrollSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                  <GraduationCap className="w-4 h-4" />
                  <span>Mighty Academy Cape Town</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Enroll Staff or Apply for Training
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Homeowners can sponsor their domestic worker or gardener for certified upskilling, or candidates can register for career training cohorts.
                </p>

                {/* Enrollment Type Choice */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEnrollForm(prev => ({ ...prev, enrollmentType: 'homeowner-sponsor' }))}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                      enrollForm.enrollmentType === 'homeowner-sponsor'
                        ? 'border-amber-400 bg-amber-400/10 text-white ring-1 ring-amber-400'
                        : 'border-slate-700 bg-slate-800/80 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>🏠 Homeowner Sponsoring Staff</div>
                    <div className="text-[10px] font-normal text-slate-400 mt-1">Upgrade your maid, nanny, or gardener</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEnrollForm(prev => ({ ...prev, enrollmentType: 'self-applicant' }))}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                      enrollForm.enrollmentType === 'self-applicant'
                        ? 'border-amber-400 bg-amber-400/10 text-white ring-1 ring-amber-400'
                        : 'border-slate-700 bg-slate-800/80 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>🎓 Job Seeker / Trainee</div>
                    <div className="text-[10px] font-normal text-slate-400 mt-1">Free/subsidized training & job placement</div>
                  </button>
                </div>

                {/* Candidate Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {enrollForm.enrollmentType === 'homeowner-sponsor' ? 'Staff Member Full Name' : 'Your Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Jacobs"
                      value={enrollForm.candidateName}
                      onChange={e => setEnrollForm(prev => ({ ...prev, candidateName: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Contact Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="082 123 4567"
                      value={enrollForm.phone}
                      onChange={e => setEnrollForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.co.za"
                      value={enrollForm.email}
                      onChange={e => setEnrollForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Cape Town Suburb
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Camps Bay, Claremont, Rondebosch"
                      value={enrollForm.suburb}
                      onChange={e => setEnrollForm(prev => ({ ...prev, suburb: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Track selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Select Training Track
                  </label>
                  <select
                    value={enrollForm.track}
                    onChange={e => setEnrollForm(prev => ({ ...prev, track: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="maids">Mighty Maids Track: Eco-Sanitization & Ironing</option>
                    <option value="nannies">Mighty Nannies Track: Pediatric CPR, First Aid & ECD</option>
                    <option value="handyman">Mighty Handyman Track: Tool Safety & Door/Cupboard Repairs</option>
                    <option value="gardeners">Mighty Gardeners Track: Lawn Edging & Indigenous Care</option>
                    <option value="plumbing">Mighty Plumbers Track: Leak Detection & Pipe Maintenance</option>
                    <option value="movers">Mighty Movers Track: Ergonomic Lifting & Packing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Notes / Household Specifics (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific focus areas or schedule requirements..."
                    value={enrollForm.notes}
                    onChange={e => setEnrollForm(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Submit Enrollment Registration</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Our Cape Town Academy coordinator will contact you via WhatsApp or Email within 24 hours.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white">
                  Registration Received!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{enrollForm.candidateName || 'Candidate'}</strong>. Your registration for the <strong className="text-amber-400">{enrollForm.track.toUpperCase()}</strong> track at Mighty Academy Cape Town has been logged.
                </p>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 text-left space-y-1">
                  <div>Registration Reference: <span className="font-mono text-amber-400 font-bold">MA-REG-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                  <div>Cohort Target: <span className="text-slate-200">Next Upcoming Intake (March 2026)</span></div>
                  <div>Campus: <span className="text-slate-200">Mighty Academy Cape Town Training Center</span></div>
                  <div>Hotline / WhatsApp: <span className="text-slate-200">+27 66 322 7557</span></div>
                </div>
                <button
                  onClick={() => {
                    setShowEnrollModal(false);
                    setEnrollSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
