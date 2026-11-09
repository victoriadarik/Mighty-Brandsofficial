export interface FAQItem {
  id: string;
  divisionId: 'all' | 'maids' | 'nannies' | 'movers' | 'plumbing' | 'gardeners' | 'handyman';
  divisionName: string;
  question: string;
  answer: string;
  popular?: boolean;
}

export const FAQS: FAQItem[] = [
  // General & Umbrella
  {
    id: 'gen-1',
    divisionId: 'all',
    divisionName: 'Mighty Brands',
    question: 'How does unified single-account billing and PayFast Instant EFT work?',
    answer: 'Regardless of how many Mighty divisions you use—such as weekly maid cleaning, garden rounds, or handyman repairs—everything is billed in South African Rand (ZAR) on one itemized quote or invoice. Payments are settled securely online via PayFast with instant EFT support for all major South African banks (Capitec, FNB, Standard Bank, Nedbank, Absa, TymeBank, etc.).',
    popular: true,
  },
  {
    id: 'gen-2',
    divisionId: 'all',
    divisionName: 'Mighty Brands',
    question: 'What is the Mighty Academy and how does certification work?',
    answer: 'Mighty Academy is our dedicated Cape Town training institute. Every staff member completes intensive practical coursework, 7-tier criminal background screening, first aid & safety certifications, and multi-point checklist mastery before dispatch. Cape Town homeowners can also enroll their own private staff in specialized short courses.',
    popular: true,
  },
  {
    id: 'gen-2b',
    divisionId: 'all',
    divisionName: 'Mighty Brands',
    question: 'Can I verify the Mighty Academy credentials of the team visiting my home?',
    answer: 'Yes. Every Mighty technician, maid, nanny, mover, plumber, and gardener carries an official digital Mighty Academy ID card with a QR code and verifiable certification ID reflecting their modules completed, background check date, and safety qualifications.',
  },
  {
    id: 'gen-3',
    divisionId: 'all',
    divisionName: 'Mighty Brands',
    question: 'How do the Mighty Bundle discounts apply?',
    answer: 'Maids, Nannies, and Movers bundle together for indoor and family transitions (up to 20% savings). Gardeners, Handyman, and Plumbing bundle together for complete property & grounds maintenance (15% to 20% savings). All discounts are automatically calculated on your itemized quote.',
    popular: true,
  },

  // Mighty Maids
  {
    id: 'maid-1',
    divisionId: 'maids',
    divisionName: 'Mighty Maids',
    question: 'What cleaning subscription cadences are available in Cape Town?',
    answer: 'We offer multi-weekly subscriptions (2x or 3x per week for active households), weekly maintenance, bi-weekly upkeep, or once-a-month deep clean resets. You get the same dedicated primary cleaner or pair for every visit.',
    popular: true,
  },
  {
    id: 'maid-2',
    divisionId: 'maids',
    divisionName: 'Mighty Maids',
    question: 'Can cleaners help pack before a move or clean the old house after moving?',
    answer: 'Yes! Mighty Maids integrates directly with Mighty Movers. You can book cleaners to help pack boxes and pre-clean rooms before the moving truck arrives, perform a move-out turnover clean of your old house to secure your deposit, and wipe down furniture at your new address.',
  },
  {
    id: 'maid-3',
    divisionId: 'maids',
    divisionName: 'Mighty Maids',
    question: 'Are cleaning detergents and supplies provided?',
    answer: 'Supplies for home: Detergents are supplied only when requested and quoted accordingly (+R65 per dispatch). If you do not request detergents, our cleaners utilize your preferred household supplies and equipment.',
    popular: true,
  },
  {
    id: 'maid-4',
    divisionId: 'maids',
    divisionName: 'Mighty Maids',
    question: 'What is covered under Daily Cleaning Activities (Maintenance)?',
    answer: 'Please note this pricing only applies to Daily Cleaning Activities (Maintenance): Kitchen (wash dishes, load/unload dishwasher, wipe countertops & stovetop, sweep floor), General Tidying (put away items in living room), Bathroom (clean shower doors and wipe down sinks), and Waste (take out trash & recycling). Monthly Domestic Call Out Subscriptions are also available from R150/mo to R400/mo.',
  },

  // Mighty Handyman
  {
    id: 'handy-1',
    divisionId: 'handyman',
    divisionName: 'Mighty Handyman',
    question: 'Does Mighty Handyman bring its own tools?',
    answer: 'Yes, absolutely! Mighty Handyman arrives fully equipped with our own complete heavy-duty toolset: cordless hammer drills, driver bits, saws, levels, ladders, socket sets, hand tools, and common fasteners. You do not need to provide any tools.',
    popular: true,
  },
  {
    id: 'handy-2',
    divisionId: 'handyman',
    divisionName: 'Mighty Handyman',
    question: 'Why can Mighty Handyman only be added or combined with Mighty Gardeners?',
    answer: 'Mighty Handyman operates as an exclusive fixing and repair service designed to synchronize with our Mighty Gardeners grounds rounds. By combining your garden care with handyman visits, our technicians address your lawn and hedge care outside while expertly fixing doors, cupboards, tables, chairs, painting, or cleaning gutters inside and around the property—maximizing efficiency and providing a 15% combo discount.',
    popular: true,
  },
  {
    id: 'handy-3',
    divisionId: 'handyman',
    divisionName: 'Mighty Handyman',
    question: 'What specific fixing services does Mighty Handyman handle?',
    answer: 'We handle fixing sticking or misaligned doors, replacing door handles and latch plates, adjusting dropping kitchen cupboards and drawer runners, repairing and reinforcing wobbly dining tables and chairs, touch-up painting for scuffs and trims, and clearing leaves and debris from roof gutters.',
  },

  // Mighty Gardeners
  {
    id: 'gard-1',
    divisionId: 'gardeners',
    divisionName: 'Mighty Gardeners',
    question: 'What is included in the basic Regular Garden Maintenance round for homes?',
    answer: 'Our signature regular garden round for residential homes covers scheduled lawn mowing, precision border edging along walkways and flowerbeds, hedge and shrub trimming, hand-weeding of garden beds and paving joints, and general outdoor tidying with debris collection.',
    popular: true,
  },
  {
    id: 'gard-2',
    divisionId: 'gardeners',
    divisionName: 'Mighty Gardeners',
    question: 'Can I combine Mighty Gardeners with Mighty Handyman and Plumbing?',
    answer: 'Yes! Gardeners and Handyman are designed to work together as a powerhouse property care pair. You can also bundle Mighty Plumbing for monthly bathroom and sink leak detection and clean pipes.',
  },

  // Mighty Movers
  {
    id: 'mov-1',
    divisionId: 'movers',
    divisionName: 'Mighty Movers',
    question: 'How is residential moving coordinated with pre-move and post-move cleaning?',
    answer: 'Our coordinator assigns both a moving truck crew and a specialized cleaning pair. Cleaners arrive ahead to help pack delicate items and pre-clean. After movers clear the old property, the cleaning team scrubs the premises for inspection. At your destination, cleaners wipe down furniture surfaces as the movers place them.',
    popular: true,
  },
  {
    id: 'mov-2',
    divisionId: 'movers',
    divisionName: 'Mighty Movers',
    question: 'Can Mighty Nannies assist during move day?',
    answer: 'Yes! Our "Complete Family Move & Care Transition" bundle assigns a certified nanny to keep children engaged, entertained, and safe at a park or play space while movers and cleaners operate.',
  },

  // Mighty Plumbing
  {
    id: 'plumb-1',
    divisionId: 'plumbing',
    divisionName: 'Mighty Plumbing',
    question: 'What is included in the monthly plumbing maintenance rounds?',
    answer: 'Our certified plumbers conduct multi-point bathroom and sink leak detection sweeps using digital acoustic and moisture sensors, clear drain traps, descale pipes, and tune fixture cartridges, valves, and running toilets to stop water waste and prevent emergency pipe failures.',
    popular: true,
  },

  // Mighty Nannies
  {
    id: 'nan-1',
    divisionId: 'nannies',
    divisionName: 'Mighty Nannies',
    question: 'How are Mighty Nannies caregivers vetted and screened?',
    answer: 'Every caregiver undergoes rigorous 7-tier background and criminal checks, in-person behavioral interviews, verified reference audits (minimum 3+ years childcare experience), and up-to-date pediatric CPR & First Aid certification.',
  }
];
