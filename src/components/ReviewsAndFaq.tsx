import { useState } from 'react';
import { REVIEWS, FAQS } from '../data/massageData';
import { ChevronLeft, ChevronRight, Star, ShieldCheck, HelpCircle } from 'lucide-react';

export function ReviewsAndFaq() {
  const [currentPage, setCurrentPage] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const totalPages = Math.ceil(REVIEWS.length / 2);
  const currentReviews = [REVIEWS[currentPage * 2], REVIEWS[currentPage * 2 + 1]].filter(Boolean);

  const prevReview = () => {
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
  };

  const nextReview = () => {
    setCurrentPage((p) => (p + 1) % totalPages);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <>
      {/* Testimonials Section */}
      <section id="reviews" aria-labelledby="reviews-title" className="bg-slate-50 px-4 sm:px-8 lg:px-12 py-16 sm:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-[1240px]">
          
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#007a87] flex items-center gap-1.5 mb-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                Verified Guest Reviews
              </span>
              <h2 id="reviews-title" className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Trusted by Guests &amp; Residents Across Sydney
              </h2>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                aria-label="Previous testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:border-[#007a87] hover:text-[#007a87] transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:border-[#007a87] hover:text-[#007a87] transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {currentReviews.map((review) => (
              <article
                key={review.id}
                className="flex min-h-[220px] flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:border-[#007a87] transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-normal italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                  <span className="font-bold text-slate-900">{review.name}</span>
                  <span className="text-[#007a87] font-semibold">{review.service}</span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white px-4 sm:px-8 lg:px-12 py-16 sm:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-[880px]">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#007a87] flex items-center justify-center gap-1.5 mb-2">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Everything You Need to Know
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Quick answers about our Sydney mobile massage delivery, booking times, and equipment.
            </p>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full cursor-pointer items-center justify-between text-left text-base sm:text-lg font-bold text-slate-900 hover:text-[#007a87] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`ml-4 text-2xl font-light text-[#007a87] transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 text-sm leading-relaxed text-slate-600 font-light pr-8 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
