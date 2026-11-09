export interface Review {
  id: string;
  author: string;
  role: string;
  neighborhood: string;
  divisionId: string;
  divisionName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    role: 'Homeowner & Mother of 3',
    neighborhood: 'Oakridge Estates',
    divisionId: 'maids',
    divisionName: 'Mighty Maids',
    rating: 5,
    date: '3 weeks ago',
    title: 'The only cleaners who treat our home like their own',
    comment: 'We have had Mighty Maids for over a year now on their alternate Thursday schedule. Their 50-point checklist is real—they clean behind faucets and inside baseboards without ever being asked.'
  },
  {
    id: 'rev-2',
    author: 'David & Sarah Chen',
    role: 'Dual-Career Parents',
    neighborhood: 'Westlake Terrace',
    divisionId: 'nannies',
    divisionName: 'Mighty Nannies',
    rating: 5,
    date: '1 month ago',
    title: 'Found an angel for our 18-month old twins',
    comment: 'The vetting procedure is head and shoulders above random classified apps. Our nanny Maria came pediatric CPR certified and has brought calm structure to our daily work-from-home routine.'
  },
  {
    id: 'rev-3',
    author: 'Marcus Vance',
    role: 'Architect',
    neighborhood: 'Highland Park',
    divisionId: 'movers',
    divisionName: 'Mighty Movers',
    rating: 5,
    date: '2 weeks ago',
    title: 'Zero dings on custom walnut furniture during a 4-bedroom move',
    comment: 'I was dreading moving our mid-century credenza and heavy marble kitchen table. The Mighty Movers crew wrapped every single leg in heavy quilted blankets and laid floor runners throughout the house.'
  },
  {
    id: 'rev-4',
    author: 'Rachel Steinberg',
    role: 'Property Manager',
    neighborhood: 'Northgate Common',
    divisionId: 'plumbing',
    divisionName: 'Mighty Plumbing Services',
    rating: 5,
    date: 'Just recently',
    title: 'Fixed a midnight basement valve leak in 45 minutes',
    comment: 'Our main valve began spraying at 11 PM on a Sunday. Mighty Plumbing took our dispatch call immediately, and technician Brandon arrived with boot covers, identified the fatigue crack, and replaced it cleanly.'
  },
  {
    id: 'rev-5',
    author: 'Kenneth Miller',
    role: 'Homeowner',
    neighborhood: 'Pinecrest Valley',
    divisionId: 'gardeners',
    divisionName: 'Mighty Gardeners Landscaping',
    rating: 5,
    date: '1 month ago',
    title: 'Transformed our overgrown hedges into immaculate estate gardens',
    comment: 'Our boxwoods were completely wild and overgrown after winter. The crew shaped them with laser precision, laid dark organic mulch, and blew every last leaf off the stone driveway.'
  },
  {
    id: 'rev-6',
    author: 'Amara & Julian Hayes',
    role: 'Recent Homebuyers',
    neighborhood: 'Brookside Village',
    divisionId: 'movers',
    divisionName: 'Mighty Movers',
    rating: 5,
    date: '2 months ago',
    title: 'Bundled Mighty Movers + Mighty Maids for move-in day',
    comment: 'Having one company coordinate the moving truck arrival in the morning and a 3-person deep cleaning crew in the afternoon before unpack was genuinely life-changing. Saved 15% with their Mighty Bundle too!'
  }
];
