export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  typicalRate: string;
  popularFor: string;
}

export interface Division {
  id: string;
  slug: string;
  name: string;
  bundleGroup: 'indoor-family' | 'property-grounds';
  brandKicker: string;
  tagline: string;
  status: 'Established' | 'Expanding Now';
  image: string;
  colorName: string;
  theme: {
    primary: string;
    primaryHover: string;
    bgSoft: string;
    border: string;
    text: string;
    accent: string;
    ring: string;
  };
  overview: string;
  heroHeadline: string;
  credentials: string[];
  keyHighlights: string[];
  services: ServiceItem[];
  pricingNote: string;
  instantQuoteType: 'hourly' | 'fixed' | 'sqft' | 'rooms';
  baseRate: number;
  rateUnit: string;
  logo?: string;
}

export const DIVISIONS: Division[] = [
  {
    id: 'maids',
    slug: 'mighty-maids',
    name: 'Mighty Maids',
    bundleGroup: 'indoor-family',
    brandKicker: 'House Cleaning Subscriptions & Turnover · Cape Town',
    tagline: 'Reliable maids in Cape Town. Subscriptions for 2x–3x weekly, weekly, or monthly with dedicated cleaners.',
    status: 'Established',
    image: '/src/assets/images/division_mighty_maids_1792449769254.jpg',
    logo: '/assets/aistudio/Mighty_Maids_Booking_Guide_cleaned_734ef4d8.png',
    colorName: 'Rose & Navy',
    theme: {
      primary: 'bg-pink-600',
      primaryHover: 'hover:bg-pink-700',
      bgSoft: 'bg-pink-50',
      border: 'border-pink-200',
      text: 'text-pink-700',
      accent: 'text-pink-600',
      ring: 'focus:ring-pink-500',
    },
    overview: 'Our flagship Cape Town cleaning division offers flexible recurring subscriptions: whether you need 2–3 visits a week for hotel-style housekeeping, weekly deep maintenance, bi-weekly resets, or monthly deep refreshes. Cleaner homes, happier lives. Seamlessly bundles with Mighty Nannies and Mighty Movers. Paid easily via PayFast Instant EFT.',
    heroHeadline: 'Reliable maids in Cape Town: multi-weekly, weekly, or monthly house cleaning peace of mind.',
    credentials: [
      'Reliable maids in Cape Town · Office: 087 8222 984 · WhatsApp: +27 66 322 7557',
      'Daily Cleaning Activities (Maintenance): Kitchen, Tidying, Bathroom & Waste',
      'Once Off, Twice A Week & 3x A Week rates from R400 to R1,400',
      'Domestic Cleaning Call Out Subscriptions from R150/mo to R400/mo',
      'Supplies for home: Detergents supplied only when requested & quoted',
      '100% Satisfaction Guarantee & PayFast Instant EFT supported'
    ],
    keyHighlights: [
      'Daily Cleaning Activities (Maintenance)',
      'Once Off, Twice A Week & 3x A Week Plans',
      'Domestic Call Out Subscriptions (R150–R400/mo)',
      'Detergents Supplied Upon Request (+R180)',
      'Add-ons: Ironing (+R185), Windows (+R120), Oven (+R100), Carpet (+R135)'
    ],
    services: [
      {
        id: 'daily-maintenance-activity',
        name: 'Daily Cleaning Activities (Maintenance)',
        description: 'Kitchen (dishes, dishwasher, countertops, stovetop, floors), General Tidying (shared spaces/lounge), Bathroom (shower doors & sinks), Waste disposal.',
        typicalRate: 'From R400 (Once Off) · R750 (2x/wk) · R1100 (3x/wk)',
        popularFor: '2–3 Bed Apts, Townhouses, Houses, Double Story & Villas'
      },
      {
        id: 'callout-subscriptions',
        name: 'Domestic Cleaning Call Out Subscription',
        description: 'Monthly recurring call-out plans: Standard (R150/mo), Standard Plus (R250/mo), Standard Gold (R350/mo), Standard Platinum (R400/mo).',
        typicalRate: 'R150 – R400 / month',
        popularFor: 'Scheduled monthly maintenance, window/carpet/fridge/furniture care'
      },
      {
        id: 'turnover-move-clean',
        name: 'Pre/Post Move Turnover & Deep Cleaning',
        description: 'Complete move-in/out house deep scrub. Bundles with Mighty Movers with detergents supplied on request.',
        typicalRate: 'From R480 (Custom quote for 4-Bed / Double Story / Villa)',
        popularFor: 'Tenant turnover, property sales, new home arrivals'
      }
    ],
    pricingNote: 'Pricing applies to Daily Cleaning Activities (Maintenance). Optional add-ons: Cleaning detergents (+R180), Ironing clothing & bed linen (+R185), Window cleaning (+R120), Oven cleaning (+R100), Carpet cleaning (+R135). All cost breakdowns are an estimate quote (actual quote sent by office). Pay securely via PayFast Instant EFT.',
    instantQuoteType: 'rooms',
    baseRate: 400,
    rateUnit: 'per scheduled visit'
  },
  {
    id: 'nannies',
    slug: 'mighty-nannies',
    name: 'Mighty Nannies',
    bundleGroup: 'indoor-family',
    brandKicker: 'Accredited Childcare & Newborn Support',
    tagline: 'Warm, dependable, and thoroughly screened caregivers for your children.',
    status: 'Established',
    image: '/src/assets/images/division_mighty_nannies_1792449769860.jpg',
    logo: '/assets/aistudio/Mighty_Maids_Booking_Guide_cleaned_734ef4d8.png',
    colorName: 'Pink & Navy',
    theme: {
      primary: 'bg-rose-500',
      primaryHover: 'hover:bg-rose-600',
      bgSoft: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-700',
      accent: 'text-rose-500',
      ring: 'focus:ring-rose-500',
    },
    overview: 'Childcare rooted in safety, emotional warmth, and developmental milestones. We conduct strict 7-tier background checks, in-person interviews, and pediatric CPR/First Aid validations for every placement. Bundles perfectly with Mighty Maids and Mighty Movers.',
    heroHeadline: 'Peace of mind while you work, travel, or recharge.',
    credentials: [
      'Pediatric CPR & First Aid Certified',
      'Strict 7-tier background & criminal checks',
      'Verified references & minimum 3+ years experience',
      'Early childhood enrichment trained',
      'PayFast Instant EFT automated billing'
    ],
    keyHighlights: [
      'Full-Time & Part-Time Nanny Placements',
      'Date Night & Weekend On-Call Sitters',
      'Infant Care & Night Nurse Specialists',
      'Bundles with Mighty Maids & Movers'
    ],
    services: [
      {
        id: 'fulltime-nanny',
        name: 'Full-Time & Part-Time Placement',
        description: 'Dedicated long-term family match aligned with your parenting philosophy, routine, and dietary habits.',
        typicalRate: 'From R75 – R110 / hour',
        popularFor: 'Working parents, ongoing weekly consistency'
      },
      {
        id: 'date-night',
        name: 'On-Demand & Weekend Sitter',
        description: 'Vetted, reliable sitter ready for evening events, weekend getaways, or emergencies on short notice.',
        typicalRate: 'From R85 / hour (3 hr min)',
        popularFor: 'Evenings out, school breaks, weekend coverage'
      },
      {
        id: 'infant-care',
        name: 'Newborn Care & Night Specialist',
        description: 'Gentle nocturnal support for sleep training, soothing, feeding support, and postpartum peace.',
        typicalRate: 'From R120 / hour',
        popularFor: 'First-time parents, newborns 0–6 months'
      }
    ],
    pricingNote: 'Direct caregiver matching with clear hourly rates in ZAR and zero retained agency lock-in penalties.',
    instantQuoteType: 'hourly',
    baseRate: 75,
    rateUnit: 'per hour'
  },
  {
    id: 'movers',
    slug: 'mighty-movers',
    name: 'Mighty Movers',
    bundleGroup: 'indoor-family',
    brandKicker: 'Residential Moving, Pre/Post Cleaning & Packing',
    tagline: 'Moving transport tightly integrated with pre-move packing, pre-clean, old house move-out turnover, and new place furniture cleaning.',
    status: 'Expanding Now',
    image: '/src/assets/images/division_mighty_movers_1792449771793.jpg',
    logo: '/assets/aistudio/mighty_movers_Red_0254f3cd.png',
    colorName: 'Red & Black',
    theme: {
      primary: 'bg-red-600',
      primaryHover: 'hover:bg-red-700',
      bgSoft: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      accent: 'text-red-600',
      ring: 'focus:ring-red-500',
    },
    overview: 'Taking the entire friction out of residential relocation. Mighty Movers works directly with our Mighty Maids and Mighty Nannies teams. Choose cleaners to help pack boxes and clean before moving, deep clean your old home for landlord deposit returns, and help unpack or wipe down furniture at the new place. While movers load, nannies keep the kids happy and safe.',
    heroHeadline: 'Move, pack, pre-clean, and post-clean your old & new home—all in one.',
    credentials: [
      'Direct synchronization with Mighty Maids & Mighty Nannies',
      'Pre-move packing assistance & pre-move room cleaning',
      'Old house post-move turnover clean (deposit return guaranteed)',
      'New home pre-clean, unpacking help, and furniture wipe-down',
      'PayFast Instant EFT payment supported'
    ],
    keyHighlights: [
      'Turnkey Residential Moving + Cleaning Crew',
      'Pre-Move Packing Assistance & Room Cleaning',
      'Post-Move Old House Turnover Clean',
      'New Place Setup & Post-Move Furniture Wiping'
    ],
    services: [
      {
        id: 'move-clean-complete',
        name: 'The Complete Move & Clean Transition',
        description: 'Movers transport your furnishings while cleaners help pack, clean the old house after move-out, and wipe furniture clean upon delivery.',
        typicalRate: 'From R650/hr movers + R120/hr cleaners',
        popularFor: 'Full turnkey home transitions, zero-stress moving'
      },
      {
        id: 'pre-move-pack-clean',
        name: 'Pre-Move Packing & Pre-Clean',
        description: 'Maids help box kitchenware, wardrobes, and delicate items, plus pre-clean floors and surfaces before movers arrive.',
        typicalRate: 'From R220 / hour + materials',
        popularFor: 'Families needing an extra pair of hands before move day'
      },
      {
        id: 'post-move-turnover',
        name: 'Old House Clean + New Home Furniture Wipe',
        description: 'Detailed move-out clean of your old house for landlords or buyers, plus wiping down furniture and counters at your new address.',
        typicalRate: 'From R850 / flat turnover package',
        popularFor: 'Renters securing full deposit returns, buyers moving into clean spaces'
      }
    ],
    pricingNote: 'Transparent moving rates in ZAR with synchronized maid discounts when booking pre-move or post-move cleaning.',
    instantQuoteType: 'rooms',
    baseRate: 650,
    rateUnit: 'per hour (crew + truck)'
  },
  {
    id: 'plumbing',
    slug: 'mighty-plumbing',
    name: 'Mighty Plumbers',
    bundleGroup: 'property-grounds',
    brandKicker: 'Practical Plumbing Solutions · Cape Town',
    tagline: 'Practical plumbing. Less disruption. From a leaking tap to a new plumbing installation, get help with the everyday problems that keep your home from running smoothly.',
    status: 'Established',
    image: '/src/assets/images/division_mighty_plumbing_1792449786043.jpg',
    logo: '/assets/aistudio/mighty_plumbers_1_bba592e7.png',
    colorName: 'Sky Blue',
    theme: {
      primary: 'bg-sky-600',
      primaryHover: 'hover:bg-sky-700',
      bgSoft: 'bg-sky-50',
      border: 'border-sky-200',
      text: 'text-sky-800',
      accent: 'text-sky-600',
      ring: 'focus:ring-sky-500',
    },
    overview: 'Practical plumbing solutions across Cape Town with clear conversation about the work required. Whether repairing a persistent drip, clearing slow-draining sinks and backed-up waste pipes, fixing loose fittings and running toilets, or preparing new sink and fixture installations. Transparent quotes, prompt dispatch, and follow-up recommendations. Visit our dedicated portal at www.plumbing.mightybrands.co.za.',
    heroHeadline: 'Practical plumbing. Less disruption. Leak repairs, blocked drains, taps, toilets & installations.',
    credentials: [
      'Call & WhatsApp: 066 322 7557 · Office: 087 8222 984 · callout@mightyplumbers.co.za',
      'Leak detection & repairs: Dripping pipes, damp patches, unexplained leaks',
      'Blocked drains: Slow-draining sinks and backed-up waste pipes',
      'Tap & toilet repairs: Dripping taps, loose fittings, running toilets',
      'Plumbing installations: New sinks, basins, taps, toilets & connections',
      'Dedicated website: www.plumbing.mightybrands.co.za'
    ],
    keyHighlights: [
      'Leak Detection & Pipe Repairs',
      'Blocked Drain Clearing',
      'Tap & Running Toilet Repairs',
      'Plumbing & Fixture Installations'
    ],
    services: [
      {
        id: 'leak-repairs',
        name: 'Leak Detection & Pipe Repairs',
        description: 'Dripping pipes, damp patches or unexplained leaks. We assess the problem, discuss the repair, and restore a sound water connection.',
        typicalRate: 'From R480 (Assessment & repair quote)',
        popularFor: 'Dripping pipes, ceiling damp patches, mystery water leaks'
      },
      {
        id: 'blocked-drains',
        name: 'Blocked Drains & Waste Pipe Clearing',
        description: 'Slow-draining sinks, backed-up waste pipes, and drain clears with proper mechanical unblocking and flow check.',
        typicalRate: 'From R450 (Based on blockage access & scope)',
        popularFor: 'Kitchen grease traps, bathroom sinks, backed-up shower drains'
      },
      {
        id: 'tap-toilet-repairs',
        name: 'Tap & Toilet Repairs',
        description: 'Dripping taps, loose fittings, constantly running toilets, cartridge swaps, and valve replacements suited to the fixture.',
        typicalRate: 'From R350 (Repair or replacement options)',
        popularFor: 'Running toilet cisterns, dripping mixers, loose shutoff valves'
      },
      {
        id: 'plumbing-installations',
        name: 'Plumbing Installations',
        description: 'Planning a new sink, basin, tap, toilet or appliance hookup. We discuss connection requirements before starting.',
        typicalRate: 'Custom Quotation',
        popularFor: 'New sinks, bathroom fixture upgrades, dishwasher/washing connections'
      }
    ],
    pricingNote: 'Practical solutions for your home. All cost breakdowns are an estimate quote (final quote could be a bit less or more; the office sends final quote). Contact callout@mightyplumbers.co.za or WhatsApp 066 322 7557.',
    instantQuoteType: 'rooms',
    baseRate: 480,
    rateUnit: 'per service call'
  },
  {
    id: 'gardeners',
    slug: 'mighty-gardeners',
    name: 'Mighty Gardeners Landscaping',
    bundleGroup: 'property-grounds',
    brandKicker: 'Workload & Task-Based Garden Care · Cape Town',
    tagline: 'Reliable garden care for Cape Town homes & businesses: lawn care, garden clean-ups, pruning and landscaping quoted strictly by workload and tasks.',
    status: 'Established',
    image: '/src/assets/images/division_mighty_gardeners_1792449770857.jpg',
    logo: '/assets/aistudio/mighty_gardners_52f6dd9b.png',
    colorName: 'Emerald & Gold',
    theme: {
      primary: 'bg-emerald-600',
      primaryHover: 'hover:bg-emerald-700',
      bgSoft: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      accent: 'text-emerald-600',
      ring: 'focus:ring-emerald-500',
    },
    overview: 'Every garden is different. We quote according to the size of the garden, condition of the property, work required, and frequency of visits—not an hourly rate. From regular lawn mowing, edging, weeding, and plant-bed maintenance to once-off overgrown garden clean-ups, hedge trimming, and monthly packages. Greener spaces, better lives. Bundles directly with Mighty Handyman fixes and Mighty Plumbing.',
    heroHeadline: 'Reliable garden care: quoted strictly by workload, garden size & tasks to be done.',
    credentials: [
      'No hourly rates: Quoted by garden size, workload & tasks to be done',
      'Small (R350–R500), Medium (R500–R800), Large (R800+) garden scope',
      'One-off garden clean-ups & resets from R1,200–R1,500 (site quote for overgrown)',
      'Monthly packages: Mighty Basic (R1,400/mo), Mighty Care (R2,000/mo), Mighty Complete (R3,000/mo)',
      'Equipped with commercial mowers, trimmers, shears & safety gear',
      'Direct WhatsApp: 066 322 7557 · Office: 087 8222 984'
    ],
    keyHighlights: [
      'Workload & Task-Based Quotation',
      'Regular Garden Maintenance (Weekly/Fortnightly/Monthly)',
      'One-Off Garden Clean-Ups & Resets',
      'Lawn Mowing, Edging, Weeding & Hedge Trimming'
    ],
    services: [
      {
        id: 'garden-maintenance-workload',
        name: 'Regular Garden Maintenance (By Workload)',
        description: 'Lawn mowing, lawn edging, weeding, garden tidying, basic pruning, plant-bed maintenance, leaf clearing. Small garden R350–R500, Medium R500–R800, Large R800+.',
        typicalRate: 'R350 – R800+ (Based on yard size & tasks)',
        popularFor: 'Residential homes, townhouse gardens, complexes, estates'
      },
      {
        id: 'onceoff-garden-cleanup',
        name: 'One-Off Garden Clean-Up / Reset',
        description: 'Cut back overgrown vegetation, weed removal, grass cutting, general clearing, and refuse removal for neglected or overgrown gardens.',
        typicalRate: 'From R1,200 – R1,500 (Site quote for heavily overgrown)',
        popularFor: 'Overgrown seasonal yards, pre-sale property staging, tenant move resets'
      },
      {
        id: 'monthly-garden-packages',
        name: 'Monthly Maintenance Packages',
        description: 'Mighty Basic (R1,400/mo, 2 visits), Mighty Care (R2,000/mo, 4 visits), Mighty Complete (R3,000/mo, weekly visits with priority care).',
        typicalRate: 'R1,400 – R3,000 / month',
        popularFor: 'Consistent all-year grounds care with dedicated rounds'
      },
      {
        id: 'hedge-tree-landscaping',
        name: 'Hedge Trimming, Landscaping & Lawn Installation',
        description: 'Hedge trimming (from R650), instant lawn per m² quote, and simple landscaping solutions designed around property needs.',
        typicalRate: 'Quoted by linear metre / m² / site visit',
        popularFor: 'Perimeter hedge shaping, new roll-on lawn, garden beautification'
      }
    ],
    pricingNote: 'No hourly rate — pricing is based strictly on garden size, workload, and tasks to be done. All cost breakdowns are an estimate quote (final quote could be a bit less or more; the office sends final quote).',
    instantQuoteType: 'sqft',
    baseRate: 450,
    rateUnit: 'per garden visit / workload'
  },
  {
    id: 'handyman',
    slug: 'mighty-handyman',
    name: 'Mighty Handyman',
    bundleGroup: 'property-grounds',
    brandKicker: 'Equipped with Own Tools · Add-on to Gardeners',
    tagline: 'Equipped with our own professional tools. Fixing services only: doors, cupboards, tables, chairs, painting, gutter cleanings & minor things.',
    status: 'Expanding Now',
    image: '/src/assets/images/division_mighty_handyman_1792451844119.jpg',
    logo: '/assets/aistudio/mighty_handyman_1_480d47fa.png',
    colorName: 'Bronze Brown',
    theme: {
      primary: 'bg-amber-800',
      primaryHover: 'hover:bg-amber-900',
      bgSoft: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      accent: 'text-amber-700',
      ring: 'focus:ring-amber-700',
    },
    overview: 'Mighty Handyman brings its own full suite of heavy-duty tools, cordless drills, saws, and hardware to tackle essential home fixes. Per our operating model, Mighty Handyman is an exclusive fixing service that can be added or combined directly with Mighty Gardeners grounds rounds. From aligning sticking doors and hanging cupboards to reinforcing dining tables, touch-up painting, and clearing clogged gutters, we fix the things that keep your home functioning smoothly.',
    heroHeadline: 'Equipped with our own tools. Fixing doors, cupboards, tables, chairs, painting & gutters.',
    credentials: [
      'Fully equipped with our own power tools, ladders, and diagnostic gear',
      'Exclusive fixing service: can be added or combined with Mighty Gardeners',
      'Fixing of doors, loose hinges, handles, locks, and latch alignment',
      'Kitchen cupboards, shelves, drawer runners, and tables & chairs repair',
      'Touch-up painting, trims, and comprehensive gutter cleanings',
      'PayFast Instant EFT secure payment'
    ],
    keyHighlights: [
      'Arrives with Own Complete Toolset & Equipment',
      'Only Added or Combined with Mighty Gardeners',
      'Door Alignments, Hinges, Locks & Minor Fixtures',
      'Cupboards, Drawers, Tables & Chairs Repair',
      'Gutter Cleanings & Interior Touch-Up Painting'
    ],
    services: [
      {
        id: 'doors-minor-fixes',
        name: 'Door Alignment, Hinges & Minor Things',
        description: 'Fixing sticking or rubbing doors, lubricating & replacing hinges, door handles, strike plates, latches, curtain rods, and loose wall fixtures.',
        typicalRate: 'From R320 / service call',
        popularFor: 'Sticking bedroom doors, drafty entry doors, loose door handles'
      },
      {
        id: 'cupboards-furniture',
        name: 'Cupboards, Tables & Chairs Fixing',
        description: 'Adjusting dropped cupboard hinges, fixing kitchen drawer glides, reinforcing wobbly dining chairs, securing table legs, and cabinet repairs.',
        typicalRate: 'From R350 / visit',
        popularFor: 'Kitchen cupboard alignment, unstable chairs, loose dining tables'
      },
      {
        id: 'gutter-cleaning',
        name: 'Gutter Cleanings & Downspout Clearing',
        description: 'Clearing packed leaves, moss, and roof sediment from roof gutters, testing downpipe flow, and securing loose gutter brackets.',
        typicalRate: 'From R420 / single-story home',
        popularFor: 'Preventing rainwater overflow, roof rot, and foundation damp'
      },
      {
        id: 'painting-touchups',
        name: 'Minor Painting & Surface Touch-Ups',
        description: 'Sanding, priming, and touch-up painting of scuffed interior walls, chipped doorframes, baseboards, and window trim patches.',
        typicalRate: 'From R380 / session + paint',
        popularFor: 'Post-furniture moves, doorframe scuffs, peeling trim'
      }
    ],
    pricingNote: 'Fixed rates with own tools included. Combined directly with Mighty Gardeners rounds for 15% combined savings.',
    instantQuoteType: 'hourly',
    baseRate: 320,
    rateUnit: 'per repair session (tools included)'
  }
];

export interface BundleCombo {
  name: string;
  category: 'indoor-family' | 'property-grounds';
  tagline: string;
  divisionIds: string[];
  discountPct: number;
  highlight: string;
}

export const POPULAR_BUNDLES: BundleCombo[] = [
  // 1. Indoor & Family Bundles (Maids + Nannies + Movers work together)
  {
    name: 'Turnkey Move & Pre/Post Clean',
    category: 'indoor-family',
    tagline: 'Moving combined with cleaners to help pack, pre-clean, clean old home, and wipe new furniture.',
    divisionIds: ['movers', 'maids'],
    discountPct: 5,
    highlight: 'Movers transport everything while maids pack, scrub the old house for deposit return, and wipe furniture at the new place.'
  },
  {
    name: 'The Busy Family Sanctuary',
    category: 'indoor-family',
    tagline: 'Mighty Maids housekeeping subscriptions paired with trusted Mighty Nannies childcare.',
    divisionIds: ['maids', 'nannies'],
    discountPct: 5,
    highlight: 'Recurring weekly or multi-weekly house cleaning paired with certified, CPR-vetted nanny support.'
  },
  {
    name: 'Complete Family Move & Care Transition',
    category: 'indoor-family',
    tagline: 'Movers transport, maids pack and clean, while nannies care for the children.',
    divisionIds: ['movers', 'maids', 'nannies'],
    discountPct: 5,
    highlight: 'Zero chaos on move day: movers handle heavy lifting, cleaners tackle pre/post cleans, and a nanny cares for your kids.'
  },

  // 2. Property & Grounds Care Bundles (Gardeners + Handyman + Plumbing)
  {
    name: 'Garden Round + Mighty Handyman Fixes',
    category: 'property-grounds',
    tagline: 'Regular garden round (mowing, trimming, weeding) combined with handyman fixing services with own tools.',
    divisionIds: ['gardeners', 'handyman'],
    discountPct: 5,
    highlight: 'Mighty Handyman brings its own tools to fix doors, cupboards, tables, chairs, painting & gutters while gardeners mow, edge & tidy the grounds.'
  },
  {
    name: 'Mighty Property & Grounds Maintenance',
    category: 'property-grounds',
    tagline: 'Monthly plumbing leak detection & clean pipes bundled with regular garden rounds.',
    divisionIds: ['plumbing', 'gardeners'],
    discountPct: 5,
    highlight: 'Mighty Plumbing monthly rounds (bathroom/sink leak sweeps & clean pipes) + Mighty Gardeners (mowing, trimming, edging, weeding & tidying).'
  },
  {
    name: 'The Complete Home Exterior & Infrastructure Trio',
    category: 'property-grounds',
    tagline: 'Garden rounds + Handyman fixing services + Monthly plumbing leak sweeps.',
    divisionIds: ['gardeners', 'handyman', 'plumbing'],
    discountPct: 5,
    highlight: 'Total peace of mind: lush garden upkeep, squeak-free doors & cupboards with own tools, and leak-free bathroom & sink pipes.'
  }
];
