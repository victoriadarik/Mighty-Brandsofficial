export type MaidPropertyType =
  | '2 Bed Apartment'
  | '3 Bed Apartment'
  | 'Complex Town House'
  | 'Garden Town House'
  | '2 bedroomed House'
  | '3 bedroomed House'
  | '4 bedroomed House'
  | 'Double Story House'
  | 'Villa House';

export type MaidFrequency = 'once-off' | 'twice-a-week' | '3x-a-week';

export const MAID_PROPERTY_TYPES: MaidPropertyType[] = [
  '2 Bed Apartment',
  '3 Bed Apartment',
  'Complex Town House',
  'Garden Town House',
  '2 bedroomed House',
  '3 bedroomed House',
  '4 bedroomed House',
  'Double Story House',
  'Villa House',
];

export const DAILY_CLEANING_ACTIVITIES = {
  title: 'Daily Cleaning Activities (Maintenance)',
  notice: 'Please note this pricing only applies to Daily Cleaning Activities (Maintenance)',
  categories: [
    {
      category: 'Kitchen',
      items: [
        'Wash dishes',
        'Load / unload the dishwasher',
        'Wipe countertops',
        'Wipe the stovetop',
        'Sweep the floor',
      ],
    },
    {
      category: 'General Tidying',
      items: ['Put away items in shared spaces (living room)'],
    },
    {
      category: 'Bathroom',
      items: ['Clean shower doors and wipe down sinks'],
    },
    {
      category: 'Waste',
      items: ['Take out trash and recycling as needed'],
    },
  ],
};

export interface MaidRateInfo {
  price: number | 'QUOTE';
  serviceType: 'General House Chores' | 'General House Cleaning';
}

export const MAID_FREQUENCY_RATES: Record<
  MaidFrequency,
  {
    id: MaidFrequency;
    label: string;
    sublabel: string;
    badge?: string;
    rates: Record<MaidPropertyType, MaidRateInfo>;
  }
> = {
  'once-off': {
    id: 'once-off',
    label: 'Once Off',
    sublabel: 'Single maintenance or chores dispatch',
    rates: {
      '2 Bed Apartment': { price: 400, serviceType: 'General House Chores' },
      '3 Bed Apartment': { price: 450, serviceType: 'General House Chores' },
      'Complex Town House': { price: 480, serviceType: 'General House Cleaning' },
      'Garden Town House': { price: 500, serviceType: 'General House Chores' },
      '2 bedroomed House': { price: 450, serviceType: 'General House Cleaning' },
      '3 bedroomed House': { price: 470, serviceType: 'General House Cleaning' },
      '4 bedroomed House': { price: 'QUOTE', serviceType: 'General House Cleaning' },
      'Double Story House': { price: 'QUOTE', serviceType: 'General House Cleaning' },
      'Villa House': { price: 'QUOTE', serviceType: 'General House Cleaning' },
    },
  },
  'twice-a-week': {
    id: 'twice-a-week',
    label: 'Twice A Week',
    sublabel: 'Regular upkeep for active households',
    badge: 'Popular',
    rates: {
      '2 Bed Apartment': { price: 750, serviceType: 'General House Chores' },
      '3 Bed Apartment': { price: 850, serviceType: 'General House Cleaning' },
      'Complex Town House': { price: 950, serviceType: 'General House Chores' },
      'Garden Town House': { price: 950, serviceType: 'General House Chores' },
      '2 bedroomed House': { price: 850, serviceType: 'General House Cleaning' },
      '3 bedroomed House': { price: 920, serviceType: 'General House Cleaning' },
      '4 bedroomed House': { price: 'QUOTE', serviceType: 'General House Cleaning' },
      'Double Story House': { price: 'QUOTE', serviceType: 'General House Cleaning' },
      'Villa House': { price: 'QUOTE', serviceType: 'General House Cleaning' },
    },
  },
  '3x-a-week': {
    id: '3x-a-week',
    label: '3x A Week',
    sublabel: 'Hotel-grade continuous freshness & tidying',
    badge: 'Best Value',
    rates: {
      '2 Bed Apartment': { price: 1100, serviceType: 'General House Cleaning' },
      '3 Bed Apartment': { price: 1300, serviceType: 'General House Cleaning' },
      'Complex Town House': { price: 1400, serviceType: 'General House Cleaning' },
      'Garden Town House': { price: 1400, serviceType: 'General House Cleaning' },
      '2 bedroomed House': { price: 1300, serviceType: 'General House Cleaning' },
      '3 bedroomed House': { price: 1400, serviceType: 'General House Cleaning' },
      '4 bedroomed House': { price: 'QUOTE', serviceType: 'General House Cleaning' },
      'Double Story House': { price: 'QUOTE', serviceType: 'General House Cleaning' },
      'Villa House': { price: 'QUOTE', serviceType: 'General House Cleaning' },
    },
  },
};

export interface DomesticCallOutPlan {
  id: string;
  name: string;
  badge: string;
  tier: 'POPULAR' | 'RECOMMENDED' | 'ADVANCED' | 'PREMIUM';
  priceMonthlyZAR: number;
  inclusions: string[];
  exclusions: string[];
}

export const DOMESTIC_CALL_OUT_SUBSCRIPTIONS: DomesticCallOutPlan[] = [
  {
    id: 'standard',
    name: 'STANDARD',
    badge: 'POPULAR / FEATURED',
    tier: 'POPULAR',
    priceMonthlyZAR: 150,
    inclusions: [
      'Kitchen Cleaning',
      'Lounge Cleaning',
      'Bathroom Cleaning',
    ],
    exclusions: [
      'No Bedroom Cleaning',
      'No Carpet Cleaning',
      'No Windows Cleaning',
    ],
  },
  {
    id: 'standard-plus',
    name: 'STANDARD PLUS',
    badge: 'RECOMMENDED',
    tier: 'RECOMMENDED',
    priceMonthlyZAR: 250,
    inclusions: [
      'Kitchen Cleaning',
      'Lounge Cleaning',
      'Bathroom Cleaning',
      '1x Windows Cleaning',
    ],
    exclusions: [
      'No Bedroom Cleaning',
      'No Carpet Cleaning',
    ],
  },
  {
    id: 'standard-gold',
    name: 'STANDARD GOLD',
    badge: 'ADVANCED',
    tier: 'ADVANCED',
    priceMonthlyZAR: 350,
    inclusions: [
      'Kitchen Cleaning',
      'Lounge Cleaning',
      'Bathroom Cleaning',
      '1x Carpet Cleaning',
      '1x Refrigerator Cleaning',
      '1x Windows Cleaning',
      '1x Bedroom Cleaning',
    ],
    exclusions: [],
  },
  {
    id: 'standard-platinum',
    name: 'STANDARD PLATINUM',
    badge: 'PREMIUM',
    tier: 'PREMIUM',
    priceMonthlyZAR: 400,
    inclusions: [
      'Kitchen Cleaning',
      'Lounge Cleaning',
      'Bathroom Cleaning',
      '1x Carpet Cleaning',
      '1x Windows Cleaning',
      '1x Bedroom Cleaning',
      '1x Fridge Cleaning',
      '1x Furniture Vacuum',
    ],
    exclusions: [],
  },
];
