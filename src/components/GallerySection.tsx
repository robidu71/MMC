import { useState } from 'react';
import { GALLERY_SPACES } from '../data/massageData';
import { GallerySpace } from '../types';
import { Maximize2, X, Volume2, Thermometer, Sun, Check, ArrowUpRight } from 'lucide-react';
import { SanctuaryVisual } from './SanctuaryVisuals';

interface GallerySectionProps {
  onBookSession: () => void;
}

export function GallerySection({ onBookSession }: GallerySectionProps) {
  const [activeLightboxSpace, setActiveLightboxSpace] = useState<GallerySpace | null>(null);

  return (
    <section id="gallery" className="px-5 py-16 md:px-10 md:py-24 lg:px-16 border-t border-[#ded9ce]">
      <div className="mx-auto max-w-[1440px]">
        
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow mb-3 text-[#9a7053]">
            The Studio Space
          </p>
          <h2 className="serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-[#29483c] text-balance">
            A quiet, personal room designed for deep ease.
          </h2>
          <p className="text-sm text-[#59675d] font-light mt-3 leading-relaxed">
            From filtered natural daylight to sound-softened walls and a heated memory-foam table, every sensory detail is tuned for unhurried comfort.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_SPACES.map((space) => (
            <div
              key={space.id}
              onClick={() => setActiveLightboxSpace(space)}
              className="group cursor-pointer rounded-[2px] border border-[#ded9ce] bg-[#f0eee5] overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-xs"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e4ded4]">
                {space.isRealPhoto ? (
                  <img
                    src={space.imageSrc}
                    alt={space.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <SanctuaryVisual type={space.type || 'suite'} className="w-full h-full" />
                )}

                <div className="absolute inset-0 bg-[#29483c]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-[#f5f2e9]/95 text-xs font-medium text-[#29483c] flex items-center gap-1 shadow-xs">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View details</span>
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="serif text-xl sm:text-2xl text-[#29483c] mb-1.5">
                    {space.title}
                  </h3>
                  <p className="text-xs text-[#59675d] font-light leading-relaxed mb-4">
                    {space.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ded9ce] text-[11px] text-[#718076] flex items-center justify-between">
                  <span>{space.specs.sound}</span>
                  <span className="text-[#9a7053] font-medium">{space.specs.temp.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxSpace && (
        <div className="fixed inset-0 z-50 bg-[#1f372e]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#f5f2e9] rounded-[3px] max-w-2xl w-full overflow-hidden border border-[#ded9ce] shadow-2xl relative my-8">
            
            <button
              onClick={() => setActiveLightboxSpace(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#f5f2e9]/80 text-[#29483c] hover:bg-[#eae3d5] transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-[#e4ded4]">
              {activeLightboxSpace.isRealPhoto ? (
                <img
                  src={activeLightboxSpace.imageSrc}
                  alt={activeLightboxSpace.title}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <SanctuaryVisual type={activeLightboxSpace.type || 'suite'} className="w-full h-full" />
              )}
            </div>

            <div className="p-6 sm:p-8">
              <p className="eyebrow text-[#9a7053] mb-1">
                Studio Space &amp; Environment
              </p>
              <h3 className="serif text-3xl text-[#29483c] mb-2">
                {activeLightboxSpace.title}
              </h3>
              <p className="text-sm text-[#59675d] font-light leading-relaxed mb-6">
                {activeLightboxSpace.subtitle}
              </p>

              {/* Environmental Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#ede8dc] rounded-[2px] border border-[#ded9ce] mb-6">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#738276] font-medium flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#29483c]" /> Sound
                  </div>
                  <div className="text-xs font-semibold text-[#29483c] mt-1">{activeLightboxSpace.specs.sound}</div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#738276] font-medium flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#29483c]" /> Temperature
                  </div>
                  <div className="text-xs font-semibold text-[#29483c] mt-1">{activeLightboxSpace.specs.temp}</div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#738276] font-medium flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-[#29483c]" /> Lighting
                  </div>
                  <div className="text-xs font-semibold text-[#29483c] mt-1">{activeLightboxSpace.specs.light}</div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#78857a]">
                  Space Features &amp; Appointments
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#526357]">
                  {activeLightboxSpace.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#29483c] shrink-0 mt-0.5" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#ded9ce] flex items-center justify-between">
                <button
                  onClick={() => setActiveLightboxSpace(null)}
                  className="text-xs font-medium text-[#647167] hover:text-[#29483c]"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setActiveLightboxSpace(null);
                    onBookSession();
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-[#29483c] px-5 py-2 text-xs font-medium text-[#f3eee3] hover:bg-[#1f372e] transition-colors"
                >
                  <span>Book in this space</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
