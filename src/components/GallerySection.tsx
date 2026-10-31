import { useState } from 'react';
import { GALLERY_SPACES } from '../data/massageData';
import { GallerySpace } from '../types';
import { Maximize2, X, Volume2, Thermometer, Sun, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { SanctuaryVisual } from './SanctuaryVisuals';

interface GallerySectionProps {
  onBookSession: () => void;
}

export function GallerySection({ onBookSession }: GallerySectionProps) {
  const [activeLightboxSpace, setActiveLightboxSpace] = useState<GallerySpace | null>(null);

  return (
    <section id="gallery" className="px-4 sm:px-8 lg:px-12 py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-[1440px]">
        
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#007a87] flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4" />
            The Mobile Experience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            How We Transform Your Room Into a 5-Star Spa
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light mt-3 leading-relaxed">
            From luxury heated memory-foam tables to sanitized organic cotton draping and soothing botanical essential oils, every detail is handled with clinical elegance.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_SPACES.map((space) => (
            <div
              key={space.id}
              onClick={() => setActiveLightboxSpace(space)}
              className="group cursor-pointer rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#007a87] hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                {space.isRealPhoto ? (
                  <img
                    src={space.imageSrc}
                    alt={space.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <SanctuaryVisual type={space.type || 'suite'} className="w-full h-full" />
                )}

                <div className="absolute inset-0 bg-[#007a87]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-white text-xs font-bold text-[#007a87] flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                    <span>View Setup</span>
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-[#007a87] transition-colors">
                    {space.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                    {space.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>{space.specs.sound}</span>
                  <span className="text-[#007a87] font-bold">{space.specs.temp.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxSpace && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden border border-slate-200 shadow-2xl relative my-8">
            
            <button
              onClick={() => setActiveLightboxSpace(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-slate-100">
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#007a87] block mb-1">
                Mobile Setup &amp; Equipment
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {activeLightboxSpace.title}
              </h3>
              <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                {activeLightboxSpace.subtitle}
              </p>

              {/* Environmental Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#007a87]" /> Acoustic Sound
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">{activeLightboxSpace.specs.sound}</div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#007a87]" /> Heated Bed
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">{activeLightboxSpace.specs.temp}</div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-[#007a87]" /> Room Ambiance
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">{activeLightboxSpace.specs.light}</div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Equipment Provided By Therapist
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {activeLightboxSpace.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#007a87] shrink-0 mt-0.5" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveLightboxSpace(null)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setActiveLightboxSpace(null);
                    onBookSession();
                  }}
                  className="flex items-center gap-2 rounded-full bg-[#007a87] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#00636e] transition-colors shadow-sm cursor-pointer"
                >
                  <span>Book This Mobile Setup</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
