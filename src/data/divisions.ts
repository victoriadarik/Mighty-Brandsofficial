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
      'Detergents Supplied Upon Request'
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
    pricingNote: 'Pricing applies to Daily Cleaning Activities (Maintenance). All cost breakdowns are an estimate quote (actual quote could be a bit less or more; the office sends final quote). Detergents supplied on request. Pay securely via PayFast Instant EFT.',
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
    name: 'Mighty Plumbing Services',
    bundleGroup: 'property-grounds',
    brandKicker: 'Monthly Maintenance & General Plumbing',
    tagline: 'Proactive monthly plumbing rounds, bathroom and sink leak detection, clean pipes, and general maintenance for homes.',
    status: 'Expanding Now',
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
    overview: 'Prevent costly water damage, dripping taps, and backed-up drains before they start. Our dedicated monthly plumbing rounds inspect every bathroom, sink, shutoff valve, and pipe run—detecting hairline leaks, descaling pipes, testing water pressure, and cleaning drain traps. Bundles together with Mighty Gardeners and Mighty Handyman for complete property upkeep.',
    heroHeadline: 'Monthly plumbing rounds & general maintenance: bathroom/sink leak sweeps & clean pipes.',
    credentials: [
      'Multi-point bathroom & sink leak detection sweeps',
      'Preventative drain clearing & pipe descaling rounds',
      'General plumbing fixes: taps, traps, valves & running toilets',
      'Bundles seamlessly with Mighty Gardeners & Mighty Handyman',
      'PayFast Instant EFT monthly recurring billing'
    ],
    keyHighlights: [
      'Monthly Scheduled Plumbing Care Rounds',
      'Under-Sink, Toilet & Bath Leak Detection',
      'Preventative Pipe Cleaning & Trap Flushes',
      'General Faucet, Valve & Fixture Maintenance'
    ],
    services: [
      {
        id: 'monthly-round',
        name: 'Monthly Home Plumbing Round',
        description: 'Complete inspection of all home bathrooms, sinks, faucets, and supply valves with moisture sensors and pressure audit.',
        typicalRate: 'From R480 / month',
        popularFor: 'Residential homes, preventing hidden leaks and water rot'
      },
      {
        id: 'pipe-clean',
        name: 'Pipe & Drain Cleaning Sweep',
        description: 'Preventative trap clearing, mechanical line cleaning, and enzyme pipe descaling to keep water flowing freely.',
        typicalRate: 'From R350 / visit (or included in monthly)',
        popularFor: 'Kitchen grease traps, bathroom sink buildup, slow tubs'
      },
      {
        id: 'fixture-audit',
        name: 'General Plumbing Repairs & Fixes',
        description: 'Cartridge replacements, aerator cleanouts, toilet flapper tuning, and repair of weeping sink joints.',
        typicalRate: 'From R250 / service call',
        popularFor: 'Dripping faucets, running toilets, mineral scale'
      }
    ],
    pricingNote: 'Fixed monthly maintenance plans in ZAR. Bundle with Mighty Gardeners for combined savings.',
    instantQuoteType: 'rooms',
    baseRate: 480,
    rateUnit: 'per monthly round'
  },
  {
    id: 'gardeners',
    slug: 'mighty-gardeners',
    name: 'Mighty Gardeners Landscaping',
    bundleGroup: 'property-grounds',
    brandKicker: 'Regular Garden Rounds, Mowing & Tidying',
    tagline: 'Basic regular garden maintenance: lawn mowing, trimming, edging, weeding and general tidying on a regular round - for homes.',
    status: 'Expanding Now',
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
    overview: 'Your home’s regular garden round. We keep residential grounds looking pristine with scheduled lawn mowing, perimeter border edging, hedge and bush trimming, thorough flowerbed weeding, and full walkway and patio tidying. Greener spaces, better lives. Bundles directly with Mighty Handyman and Mighty Plumbing for complete home and grounds maintenance.',
    heroHeadline: 'Basic regular garden maintenance: mowing, trimming, edging, weeding & general tidying.',
    credentials: [
      'Scheduled recurring residential rounds (weekly or bi-weekly)',
      'Precision lawn cut, walkway edging, and border trimming',
      'Hand weeding of flowerbeds, gravel, and paving joints',
      'Bundles directly with Mighty Handyman & Mighty Plumbing',
      'PayFast Instant EFT supported'
    ],
    keyHighlights: [
      'Regular Residential Garden Rounds',
      'Lawn Mowing & Clean Perimeter Edging',
      'Hedge, Bush & Shrub Trimming',
      'Flowerbed Weeding & General Yard Tidying'
    ],
    services: [
      {
        id: 'regular-round',
        name: 'The Regular Garden Round',
        description: 'Our signature recurring home visit: lawn mowing, trimming, edging, weeding and general tidying on a regular round - for homes.',
        typicalRate: 'From R280 / round',
        popularFor: 'Standard residential homes on weekly or bi-weekly schedules'
      },
      {
        id: 'weeding-tidying',
        name: 'Bed Weeding & General Yard Tidy',
        description: 'Detailed hand-pulling of weeds from flowerbeds and driveways, leaf collection, pruning deadheads, and outdoor sweep.',
        typicalRate: 'From R350 / visit',
        popularFor: 'Homes needing extra attention to flowerbeds and paving'
      },
      {
        id: 'trimming-hedges',
        name: 'Hedge & Bush Trimming Round',
        description: 'Clean geometric shaping of perimeter hedges, shrubs, and ornamental garden bushes with haul-away.',
        typicalRate: 'From R390 / round',
        popularFor: 'Overgrown boundary hedges, seasonal shrub care'
      }
    ],
    pricingNote: 'Dependable regular round calendar in ZAR. Combine with Mighty Handyman for complete grounds & repair care.',
    instantQuoteType: 'sqft',
    baseRate: 280,
    rateUnit: 'per scheduled garden round'
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
    discountPct: 15,
    highlight: 'Movers transport everything while maids pack, scrub the old house for deposit return, and wipe furniture at the new place.'
  },
  {
    name: 'The Busy Family Sanctuary',
    category: 'indoor-family',
    tagline: 'Mighty Maids housekeeping subscriptions paired with trusted Mighty Nannies childcare.',
    divisionIds: ['maids', 'nannies'],
    discountPct: 15,
    highlight: 'Recurring weekly or multi-weekly house cleaning paired with certified, CPR-vetted nanny support.'
  },
  {
    name: 'Complete Family Move & Care Transition',
    category: 'indoor-family',
    tagline: 'Movers transport, maids pack and clean, while nannies care for the children.',
    divisionIds: ['movers', 'maids', 'nannies'],
    discountPct: 20,
    highlight: 'Zero chaos on move day: movers handle heavy lifting, cleaners tackle pre/post cleans, and a nanny cares for your kids.'
  },

  // 2. Property & Grounds Care Bundles (Gardeners + Handyman + Plumbing)
  {
    name: 'Garden Round + Mighty Handyman Fixes',
    category: 'property-grounds',
    tagline: 'Regular garden round (mowing, trimming, weeding) combined with handyman fixing services with own tools.',
    divisionIds: ['gardeners', 'handyman'],
    discountPct: 15,
    highlight: 'Mighty Handyman brings its own tools to fix doors, cupboards, tables, chairs, painting & gutters while gardeners mow, edge & tidy the grounds.'
  },
  {
    name: 'Mighty Property & Grounds Maintenance',
    category: 'property-grounds',
    tagline: 'Monthly plumbing leak detection & clean pipes bundled with regular garden rounds.',
    divisionIds: ['plumbing', 'gardeners'],
    discountPct: 15,
    highlight: 'Mighty Plumbing monthly rounds (bathroom/sink leak sweeps & clean pipes) + Mighty Gardeners (mowing, trimming, edging, weeding & tidying).'
  },
  {
    name: 'The Complete Home Exterior & Infrastructure Trio',
    category: 'property-grounds',
    tagline: 'Garden rounds + Handyman fixing services + Monthly plumbing leak sweeps.',
    divisionIds: ['gardeners', 'handyman', 'plumbing'],
    discountPct: 20,
    highlight: 'Total peace of mind: lush garden upkeep, squeak-free doors & cupboards with own tools, and leak-free bathroom & sink pipes.'
  }
];
