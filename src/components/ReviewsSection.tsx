import React, { useState } from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, CheckCircle } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredReviews =
    activeFilter === 'all'
      ? REVIEWS
      : REVIEWS.filter((r) => r.divisionId === activeFilter);

  const filters = [
    { id: 'all', label: 'All Reviews' },
    { id: 'maids', label: 'Mighty Maids' },
    { id: 'nannies', label: 'Mighty Nannies' },
    { id: 'movers', label: 'Mighty Movers' },
    { id: 'plumbing', label: 'Mighty Plumbing' },
    { id: 'gardeners', label: 'Mighty Gardeners' },
  ];

  return (
    <section id="reviews" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Verified Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Real Reviews From Real Families
          </h2>
          <p className="mt-3 text-base text-slate-600">
            See how Mighty Brands delivers consistent peace of mind across our divisions.
          </p>
        </div>

        {/* Filter Controls (interactive segmented buttons, allowed per constitution) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-200/70 rounded-xl max-w-2xl mx-auto mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeFilter === f.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating & Division text */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-700">
                    {rev.divisionName}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  "{rev.title}"
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author Attribution */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    <span>{rev.author}</span>
                    <span title="Verified Customer" className="inline-flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  </div>
                  <div className="text-slate-400">
                    {rev.role} · {rev.neighborhood}
                  </div>
                </div>
                <div className="text-slate-400 font-medium">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
