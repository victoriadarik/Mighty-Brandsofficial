import React, { useState } from 'react';
import {
  ArrowLeft,
  GraduationCap,
  Download,
  ExternalLink,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Building2,
  ShieldCheck,
  Send,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { MightyAcademyLogo } from './BrandLogos';

interface MightyAcademyPageProps {
  onBackToApp: () => void;
}

interface CourseItem {
  id: string;
  number: string;
  name: string;
  duration: string;
  rate: string;
  highlightRate?: boolean;
  category: 'Home & Care' | 'Property & Trades' | 'Specialist';
  description: string;
  syllabusHighlights: string[];
}

const ACADEMY_COURSES: CourseItem[] = [
  {
    id: 'bnb-cleaning',
    number: 'Specialised Course',
    name: 'Mighty Maids BnB Cleaning Training Program',
    duration: '2-Day Intensive Course',
    rate: 'Airbnb & BnB Excellence',
    highlightRate: true,
    category: 'Home & Care',
    description: 'Equips maids with the skills, standards, and professionalism required for Airbnb & BnB cleaning excellence: foundations, room-by-room techniques, guest turnovers, and 5-star quality control.',
    syllabusHighlights: [
      'Day 1: Foundations, guest experience mindset, hygiene & eco-chemical safety',
      'Day 2: Fast guest turnovers, hotel linen presentation & restocking essentials',
      'Time management under pressure & professional host communication',
      'Practical Session: Simulation, bed making, deep clean & Mighty Maids BnB Certificate'
    ]
  },
  {
    id: 'culinary',
    number: 'Course 13',
    name: 'Culinary & Baking Essentials',
    duration: '2 Days',
    rate: 'R1,400',
    highlightRate: true,
    category: 'Specialist',
    description: 'Gain confidence preparing simple meals, portion control, kitchen safety, and everyday baked favourites.',
    syllabusHighlights: ['Kitchen Safety & Hygiene', 'Basic Cooking & Balanced Portions', 'Basic Baking & Easy Recipes', 'Food Presentation & Cleanliness']
  },
  {
    id: 'smart-home',
    number: 'Course 14',
    name: 'Smart Homes Operating & Homework Support',
    duration: '1 Day',
    rate: 'R1,000',
    highlightRate: true,
    category: 'Specialist',
    description: 'Build digital confidence for connected households, smart lighting, appliances, and primary school homework assistance.',
    syllabusHighlights: ['Everyday Digital Skills & Wi-Fi', 'Smart Home Device Operation', 'Guided Homework Support', 'Privacy & Child Online Safety']
  },
  {
    id: 'household-mgmt',
    number: 'Course 02',
    name: 'Household Management Course',
    duration: '2 Weeks',
    rate: 'Enquire for fees',
    category: 'Home & Care',
    description: 'Everyday skills to keep a household clean, organised, and running smoothly with professional standards.',
    syllabusHighlights: ['Planning the Home Routine', 'Room-by-Room Cleaning & Cupboards', 'Fabric & Laundry Steam Care', 'Professional Employer Etiquette']
  },
  {
    id: 'childcare',
    number: 'Course 01',
    name: 'Childcare Course',
    duration: '4 Weeks',
    rate: 'Enquire for fees',
    category: 'Home & Care',
    description: 'Learn to care for infants and children with patience, confidence, healthy nutrition, and safe daily routines.',
    syllabusHighlights: ['Understanding Children & Age Groups', 'Feeding, Bathing & Hygiene Care', 'Early Play & Cognitive Activities', 'Child Safety & Parent Reporting']
  },
  {
    id: 'office-cleaning',
    number: 'Course 03',
    name: 'Office Cleaning Course',
    duration: '2 Weeks',
    rate: 'Enquire for fees',
    category: 'Home & Care',
    description: 'Reliable commercial cleaning routines for professional, hygienic, and cross-contamination-free workplaces.',
    syllabusHighlights: ['Equipment & Eco Chemical Handling', 'Workstations & Boardroom Care', 'Kitchens & Washroom Sanitisation', 'Checklists & Inspection Standards']
  },
  {
    id: 'basic-plumbing',
    number: 'Course 06',
    name: 'Basic Plumbing Skills - Level 1',
    duration: '8 Weeks',
    rate: 'Enquire for fees',
    category: 'Property & Trades',
    description: 'Get started with plumbing tools, fittings, washer replacements, traps, and supervised maintenance tasks.',
    syllabusHighlights: ['Tools & Water Main Shut-Off Safety', 'Measuring, Cutting & Joining Pipes', 'Taps & Common Household Leaks', 'Sink Traps & Toilet Cistern Upkeep']
  },
  {
    id: 'intermediate-plumbing',
    number: 'Course 07',
    name: 'Intermediate Plumbing Skills - Level 2',
    duration: '8 Weeks',
    rate: 'Enquire for fees',
    category: 'Property & Trades',
    description: 'Build on basic plumbing with fault finding, slow drainage fixes, and supervised repair practice.',
    syllabusHighlights: ['Diagnostic Fault Identification', 'Drainage & Cistern Overhaul', 'Pipework Layout Assembly', 'Pressure Testing & Work Sign-Off']
  },
  {
    id: 'basic-carpentry',
    number: 'Course 08',
    name: 'Basic Carpentry & Handyman Skills',
    duration: '8 Weeks',
    rate: 'Enquire for fees',
    category: 'Property & Trades',
    description: 'Useful tool skills for woodwork, hinges, brackets, cupboard repairs, and household minor fixes.',
    syllabusHighlights: ['Hand & Cordless Power Tool Safety', 'Measuring, Cutting & Sanding', 'Wall Anchors, Brackets & Fixings', 'Cupboards, Doors & Shelf Mounting']
  },
  {
    id: 'basic-gardening',
    number: 'Course 10',
    name: 'Basic Gardening Skills Course',
    duration: '4 Weeks',
    rate: 'Enquire for fees',
    category: 'Property & Trades',
    description: 'Develop practical skills to maintain neat lawns, edging, trimming, and healthy indigenous gardens.',
    syllabusHighlights: ['Garden Tool Selection & Maintenance', 'Lawn Mowing & Crisp Edge Trimming', 'Weeding & Fynbos Bed Planting', 'Routine Garden Care & Green Waste']
  },
  {
    id: 'solar-panel',
    number: 'Course 04',
    name: 'Solar Panel Cleaning Course',
    duration: '4 Weeks',
    rate: 'Enquire for fees',
    category: 'Property & Trades',
    description: 'Careful cleaning methods, de-ionized water equipment, and safety awareness before starting work.',
    syllabusHighlights: ['Identifying Solar Panels & Tools', 'Ground-Level & Roof Access Safety', 'Manufacturer-Approved Wash Methods', 'Inspection & Defect Reporting']
  },
  {
    id: 'packing-shelving',
    number: 'Course 09',
    name: 'Packing, Unpacking, Packaging & Shelving',
    duration: '1 Week',
    rate: 'Enquire for fees',
    category: 'Specialist',
    description: 'Protect, label, wrap, and organise belongings for residential moving, staging, and storeroom shelving.',
    syllabusHighlights: ['Sorting & Packaging Material Choice', 'Bubble Wrap & Fragile Protection', 'Inventory Labeling & Recording', 'Safe Lifting & Walkway Staging']
  },
  {
    id: 'window-cleaning',
    number: 'Course 11',
    name: 'Window Cleaning - Homes & Offices',
    duration: '2 Weeks',
    rate: 'Enquire for fees',
    category: 'Home & Care',
    description: 'Learn a clear, professional routine for streak-free glass, frame restoration, and clean window tracks.',
    syllabusHighlights: ['Cloths, Squeegees & Blade Handling', 'Streak-Free Glass Washing Routine', 'Frame & Track Deep Detailing', 'Ladder Safety & Surface Protection']
  },
  {
    id: 'bathroom-deep-clean',
    number: 'Course 12',
    name: 'Bathroom Deep Cleaning Course',
    duration: '2 Weeks',
    rate: 'Enquire for fees',
    category: 'Home & Care',
    description: 'A thorough bathroom deep-cleaning routine with descaling, tile hygiene, and safe product handling.',
    syllabusHighlights: ['PPE, Ventilation & Chemical Safety', 'Disinfecting Toilets & Basins Separately', 'Grout Descaling & Glass Shower Doors', 'Drying, Polishing & Final Checklists']
  },
  {
    id: 'carpet-cleaning',
    number: 'Course 05',
    name: 'Carpet Cleaning Course',
    duration: '2 Weeks',
    rate: 'Enquire for fees',
    category: 'Specialist',
    description: 'Practical carpet care from fibre inspection to extraction and safe drying.',
    syllabusHighlights: ['Carpet Pile Types & Care Labels', 'Pre-Vacuum & Spot Stain Chemistry', 'Deep Wet Extraction Techniques', 'Rapid Drying & Fibre Grooming']
  }
];

export const MightyAcademyPage: React.FC<MightyAcademyPageProps> = ({ onBackToApp }) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('culinary');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Home & Care' | 'Property & Trades' | 'Specialist'>('All');

  // Simple Enquiry Form State
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    courseChoice: 'culinary',
    learnerType: 'individual',
    fundingNeeded: false,
    notes: ''
  });

  const filteredCourses = activeFilter === 'All'
    ? ACADEMY_COURSES
    : ACADEMY_COURSES.filter(c => c.category === activeFilter);

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const stored = localStorage.getItem('mighty_academy_enquiries');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift({ ...form, id: 'enq-' + Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('mighty_academy_enquiries', JSON.stringify(list));
    } catch {
      // ignore
    }
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20 selection:bg-purple-600 selection:text-white">
      {/* Top Banner & Quick Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToApp}
              className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
              title="Return to Mighty Brands Home"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              <span>Back to Main Website</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 pl-2 border-l border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>2027 Prospectus & Enrolments Open</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a
              href="https://www.academy.mightybrands.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 text-purple-300 hover:text-white hover:bg-purple-900 border border-purple-800/60 font-semibold transition-all"
              title="Visit official stand-alone academy portal"
            >
              <span>academy.mightybrands.co.za</span>
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Headline & Core Purpose */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-black border border-purple-500/50 p-1 flex items-center justify-center shrink-0 shadow-lg shadow-purple-950/50">
                  <img
                    src="/assets/aistudio/mughty_academy_black_4c5bb5e0.png"
                    alt="Mighty Academy Official Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-purple-400">
                    Mighty Brands Skills Training Division · Cape Town
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Mighty Academy
                  </h1>
                </div>
              </div>

              <p className="text-slate-300 text-base leading-relaxed">
                Practical, expert-led vocational courses in Cape Town. We train adults aged 18+ preparing for skills-based 
                employment, household staff developing new capabilities, and existing service workers sharpening their trade.
              </p>

              {/* Learning Method & Key Pillars Pill Strip */}
              <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Demonstrations + Guided Practice + Assessments</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>2-Month Practical Internship Pathway</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Ages 18+ · Youth & Adult Bursary Support</span>
                </span>
              </div>

              {/* Action Buttons: Download PDF & Link to Main Website */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="/assets/aistudio/mighty-academy-course-catalogue-2027_cb5b8396.pdf"
                  download="Mighty-Academy-2027-Prospectus.pdf"
                  className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download 2027 Prospectus (PDF)</span>
                </a>

                <a
                  href="/assets/aistudio/mighty-brands-company-profile_0ff18be1.pdf"
                  download="Mighty-Brands-Company-Profile.pdf"
                  className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 font-bold text-xs transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Company Profile (PDF)</span>
                </a>

                <a
                  href="/assets/aistudio/_MIGHTY_MAIDS_BnB_CLEANING_TRAINING_PROGRAM_FOR_COMMERCIAL_44924c5c.pdf"
                  download="Mighty-Maids-BnB-Cleaning-Program.pdf"
                  className="px-4 py-3 rounded-xl bg-pink-950/70 hover:bg-pink-900 text-pink-200 border border-pink-800/60 font-bold text-xs transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-pink-400" />
                  <span>Maids BnB Syllabus (PDF)</span>
                </a>

                <button
                  onClick={onBackToApp}
                  className="px-4 py-3 rounded-xl text-slate-400 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
                >
                  <span>Visit Main Website for Home Services</span>
                </button>
              </div>
            </div>

            {/* Right: Quick Fast Facts & Rates Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 shadow-2xl relative space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    Official Fee Schedule & Rates
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded-md border border-emerald-800">
                    2027 Intake
                  </span>
                </div>

                {/* Confirmed Fixed Rates */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>Culinary & Baking Essentials</span>
                      </div>
                      <div className="text-xs text-purple-300">2 Days Intensive · Complete Kitchen Cooking</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-400 font-mono">R1,400</div>
                      <div className="text-[10px] text-slate-400">Total course fee</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>Smart Home & Homework Support</span>
                      </div>
                      <div className="text-xs text-purple-300">1 Day · Connected Home & Digital Skills</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-400 font-mono">R1,000</div>
                      <div className="text-[10px] text-slate-400">Total course fee</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                    <div className="font-semibold text-slate-200">12 Additional Vocational Programmes:</div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Childcare (4 wks), Household Management (2 wks), Office Cleaning (2 wks), Plumbing Levels 1 & 2 (8 wks each), 
                      Carpentry & Handyman (8 wks), Gardening (4 wks), Solar Panel Cleaning (4 wks), Window Cleaning (2 wks), 
                      Bathroom Deep Clean (2 wks), Packing (1 wk).
                    </p>
                    <div className="pt-1 text-[11px] text-amber-400 font-medium">
                      Fees confirmed upon enquiry with bursary and sponsorship options available.
                    </div>
                  </div>
                </div>

                {/* Direct Hotline strip */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-purple-400" />
                    <span>Office: <strong>087 8222 984</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp: <strong>066 322 7557</strong></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area: 14 Courses Grid & Quick Enquiry */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-14">
        
        {/* Section 1: What We Do at Mighty Academy */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl font-black text-white">
              What We Do at Mighty Academy
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Mighty Academy is the official skills development and practical training division of Mighty Brands. 
              We bridge the gap between motivated job seekers and high-standard residential and commercial households in Cape Town.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-900/40 text-purple-400 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">Practical Short Courses</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Step-by-step demonstrations, guided practice, and clear practical assessments. Open to anyone 18+ looking for skills or upgrading their capabilities.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-900/40 text-emerald-400 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">Paid Internship Placement</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Eligible learners access a 2-month practical internship within Mighty Brands divisions (housekeeping, gardening, handyman, moving, plumbing), paid per job attended.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-900/40 text-amber-400 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">Funding & Employer Sponsorship</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We partner with employers investing in their staff and donors providing learner sponsorships to tackle youth unemployment in marginalized Cape Town communities.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 14 Course Directory & Fees */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Full 2027 Course Catalogue
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Explore All 14 Vocational Courses
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 text-xs">
              {(['All', 'Home & Care', 'Property & Trades', 'Specialist'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  course.highlightRate
                    ? 'bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border-purple-500/50 shadow-md ring-1 ring-purple-500/30'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">
                      {course.number}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                      {course.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-300">
                      {course.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Key Syllabus:</div>
                    <ul className="text-xs text-slate-300 space-y-0.5">
                      {course.syllabusHighlights.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-[11px]">
                          <span className="text-purple-400 font-bold">✓</span>
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400">Rate / Investment:</div>
                    <div className={`text-sm font-black font-mono ${course.highlightRate ? 'text-amber-400 text-base' : 'text-slate-200'}`}>
                      {course.rate}
                    </div>
                  </div>

                  <a
                    href="#enquiry-form"
                    onClick={() => {
                      setForm(prev => ({ ...prev, courseChoice: course.id }));
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-purple-600 text-white transition-colors cursor-pointer"
                  >
                    Register Interest
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Register Interest / Fast Enrolment Card */}
        <section id="enquiry-form" className="bg-gradient-to-br from-slate-900 to-purple-950/40 border border-purple-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Simple Registration & Enquiries</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Start Your Next Step with Mighty Academy
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you are an individual learner building new practical abilities, an employer sponsoring domestic staff, 
                or seeking funding support, submit your details below. Our admissions team will reach out within 24 hours.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Office Direct: <strong>087 8222 984</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp: <strong>066 322 7557</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Office: <strong>info@mightybrands.co.za</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Head of Operations: <strong>victoria@mightybrands.co.za</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Admissions & Funding: <strong>training@mightyacademy.co.za</strong></span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Enquiry Received</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{form.fullName}</strong>. Our admissions coordinator has received your enquiry for{' '}
                    <strong>{ACADEMY_COURSES.find(c => c.id === form.courseChoice)?.name || 'Mighty Academy'}</strong> and 
                    will contact you via WhatsApp or phone at {form.phone}.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="e.g. Sipho Ndlovu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="e.g. 066 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="e.g. sipho@example.co.za"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Course of Interest *</label>
                      <select
                        value={form.courseChoice}
                        onChange={e => setForm(prev => ({ ...prev, courseChoice: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                      >
                        {ACADEMY_COURSES.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.rate} · {c.duration})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={form.fundingNeeded}
                        onChange={e => setForm(prev => ({ ...prev, fundingNeeded: e.target.checked }))}
                        className="rounded border-slate-700 text-purple-600 focus:ring-purple-500"
                      />
                      <span>I am applying for funding / bursary support</span>
                    </label>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Course Enquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* Section 4: Return Link to Main Website */}
        <section className="text-center pt-8 border-t border-slate-800/80 space-y-4">
          <p className="text-slate-400 text-xs max-w-xl mx-auto">
            Mighty Academy is proud to train the certified housekeepers, nannies, movers, plumbers, gardeners, and handymen 
            who serve homes across Cape Town through the Mighty Brands family.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onBackToApp}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              <span>Visit Main Website for Cleaning, Moving & Trades</span>
            </button>
            <a
              href="https://www.academy.mightybrands.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-800/60 text-xs font-bold transition-all flex items-center gap-2"
            >
              <span>Visit Official Academy Portal (academy.mightybrands.co.za)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

      </main>
    </div>
  );
};
