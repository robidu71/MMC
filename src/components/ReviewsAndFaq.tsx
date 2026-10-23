import { useState } from 'react';
import { REVIEWS, FAQS } from '../data/massageData';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

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
      {/* Kind Words / Reviews Section */}
      <section id="reviews" aria-labelledby="reviews-title" className="overflow-hidden bg-[#f0eee5] px-5 py-16 md:px-10 md:py-24 lg:px-16 border-t border-[#ded9ce]">
        <div className="mx-auto max-w-[1240px]">
          
          <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-4 text-[#a16f4d]">
                Notes from the studio
              </p>
              <h2 id="reviews-title" className="serif text-5xl tracking-[-.035em] text-[#29483c] md:text-6xl">
                A few kind words.
              </h2>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                aria-label="Previous testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#aeb8a8] text-[#29483c] hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#aeb8a8] text-[#29483c] hover:bg-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {currentReviews.map((review) => (
              <article
                key={review.id}
                className="flex min-h-[220px] flex-col justify-between rounded-[2px] border border-[#ded9ce] bg-[#f5f2e9] p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="serif text-2xl sm:text-3xl leading-snug text-[#29483c] font-normal">
                  &ldquo;{review.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-[#29483c]/15 pt-4 text-xs">
                  <span className="font-semibold text-[#29483c]">{review.name}</span>
                  <span className="text-[#78857a]">{review.service}</span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-5 py-16 md:px-10 md:py-24 lg:px-16 border-t border-[#ded9ce]">
        <div className="mx-auto max-w-[840px]">
          
          <div className="text-center mb-12">
            <p className="eyebrow mb-3 text-[#9a7053]">
              Notes from the studio
            </p>
            <h2 className="serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-[#29483c]">
              Questions you might have.
            </h2>
          </div>

          <div className="divide-y divide-[#29483c]/15 border-y border-[#29483c]/15">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-6">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full cursor-pointer items-center justify-between text-left text-base sm:text-lg font-semibold text-[#29483c] hover:text-[#426453] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`ml-4 text-2xl font-light text-[#a16f4d] transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-4 text-sm leading-6 text-[#59675d] font-light max-w-[680px] animate-in fade-in duration-200">
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
