import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import {
  ChevronDown,
  HelpCircle,
  Search,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  X
} from 'lucide-react';

interface ServiceFAQProps {
  currentDivisionId?: string;
  onOpenBooking: (divisionId?: string, notes?: string) => void;
}

export const ServiceFAQ: React.FC<ServiceFAQProps> = ({
  currentDivisionId = 'all',
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    currentDivisionId !== 'all' ? currentDivisionId : 'all'
  );
  const [openIds, setOpenIds] = useState<string[]>(['gen-1', 'maid-1']);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'maids', label: 'Mighty Maids' },
    { id: 'nannies', label: 'Mighty Nannies' },
    { id: 'movers', label: 'Mighty Movers' },
    { id: 'plumbing', label: 'Mighty Plumbing' },
    { id: 'gardeners', label: 'Mighty Gardeners' },
  ];

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenIds(filteredFAQs.map((f) => f.id));
  };

  const handleCollapseAll = () => {
    setOpenIds([]);
  };

  const filteredFAQs = FAQS.filter((faq) => {
    const matchesCategory =
      activeCategory === 'all' ||
      faq.divisionId === activeCategory ||
      (activeCategory === 'all' && faq.divisionId === 'all');

    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.divisionName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="hidden md:block py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
            Everything you need to know about our division guarantees, booking procedures, 
            and unified home care standards.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-8">
          {/* Category Tabs (Segmented filter buttons per constitution) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-200/60 rounded-xl max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box & Quick Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions (e.g. supplies, emergency, vetting)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 self-end sm:self-auto font-medium">
              <span>{filteredFAQs.length} questions shown</span>
              <span aria-hidden="true">·</span>
              <button
                onClick={handleExpandAll}
                className="hover:text-slate-900 transition-colors"
              >
                Expand all
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={handleCollapseAll}
                className="hover:text-slate-900 transition-colors"
              >
                Collapse all
              </button>
            </div>
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">
                No matching questions found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing your search term or select "All Questions" to browse our full FAQ guide.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openIds.includes(faq.id);

              return (
                <div
                  key={faq.id}
                  className={`border rounded-2xl transition-all duration-200 bg-white overflow-hidden ${
                    isOpen
                      ? 'border-slate-300 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 transition-colors hover:bg-slate-50/50"
                  >
                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                        <span>{faq.divisionName}</span>
                        {faq.popular && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-600 font-bold">Popular</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-slate-900 text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Have a specific request or unusual home layout?</span>
            </h4>
            <p className="text-xs text-slate-500">
              Our concierge team is available 7 days a week to build custom quotes and bundles.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:+27878222984"
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>087 8222 984</span>
            </a>
            <button
              onClick={() => onOpenBooking(activeCategory !== 'all' ? activeCategory : undefined)}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs"
            >
              Ask Our Concierge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
