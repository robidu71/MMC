import { useState } from 'react';
import { GALLERY_SPACES, STUDIO_INFO } from '../data/massageData';
import { GallerySpace } from '../types';
import { Maximize2, X, Volume2, Thermometer, Sun, Check, MessageCircle, Sparkles } from 'lucide-react';
import { SanctuaryVisual } from './SanctuaryVisuals';

interface GallerySectionProps {
  onBookSession: () => void;
}

export function GallerySection({ onBookSession }: GallerySectionProps) {
  const [activeLightboxSpace, setActiveLightboxSpace] = useState<GallerySpace | null>(null);

  return (
    <section id="gallery" className="px-4 sm:px-8 lg:px-12 py-16 sm:py-24 bg-[#fbfaf7] border-t border-[#e5dfd5]">
      <div className="mx-auto max-w-[1440px]">
        
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#285244] flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-4 h-4 text-[#285244]" />
            Natural Sanctuary &amp; Mobile Setup
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1b3127] tracking-tight">
            How We Transform Your Room Into an Eco-Luxe Spa
          </h2>
          <p className="text-sm sm:text-base text-[#475b51] font-light mt-3 leading-relaxed">
            Every session arrives with heated ergonomic memory-foam beds, unbleached organic cotton linens, soothing acoustic ambient soundscapes, and pure cold-pressed botanical oils.
          </p>
        </div>

        {/* Gallery Grid (6 Creative Relaxed Setups) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {GALLERY_SPACES.map((space) => (
            <div
              key={space.id}
              onClick={() => setActiveLightboxSpace(space)}
              className="group cursor-pointer rounded-2xl border border-[#ded8cc] bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#285244] hover:shadow-xl shadow-xs"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f0ece3]">
                {space.isRealPhoto ? (
                  <img
                    src={space.imageSrc}
                    alt={space.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <SanctuaryVisual type={space.type || 'suite'} className="w-full h-full" />
                )}

                <div className="absolute inset-0 bg-[#285244]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                  <span className="px-4 py-2 rounded-full bg-white text-xs font-bold text-[#285244] flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                    <span>View Setup</span>
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg font-bold text-[#1b3127] mb-2 group-hover:text-[#285244] transition-colors leading-snug">
                    {space.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#4d6056] font-light leading-relaxed mb-4">
                    {space.subtitle}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#f0ece3] text-[11px] text-[#697d73] flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#285244]" />
                    {space.specs.sound}
                  </span>
                  <span className="text-[#285244] font-bold bg-[#eef4f0] px-2 py-0.5 rounded border border-[#d2e2d8]">
                    {space.specs.temp.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxSpace && (
        <div className="fixed inset-0 z-50 bg-[#16241e]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#fcfbf9] rounded-2xl max-w-2xl w-full overflow-hidden border border-[#ded8cc] shadow-2xl relative my-8">
            
            <button
              onClick={() => setActiveLightboxSpace(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-[#285244] hover:bg-white transition-colors cursor-pointer shadow-sm"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-[#f0ece3]">
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#285244] block mb-1">
                Eco-Friendly Mobile Setup
              </span>
              <h3 className="text-2xl font-bold text-[#1b3127] mb-2">
                {activeLightboxSpace.title}
              </h3>
              <p className="text-sm text-[#475b51] font-light leading-relaxed mb-6">
                {activeLightboxSpace.subtitle}
              </p>

              {/* Environmental Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#f4f2ec] rounded-xl border border-[#ded8cc] mb-6">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#697d73] font-semibold flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#285244]" /> Acoustic Sound
                  </div>
                  <div className="text-xs font-bold text-[#1b3127] mt-1">{activeLightboxSpace.specs.sound}</div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#697d73] font-semibold flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#285244]" /> Heated Bed
                  </div>
                  <div className="text-xs font-bold text-[#1b3127] mt-1">{activeLightboxSpace.specs.temp}</div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#697d73] font-semibold flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-[#285244]" /> Room Ambiance
                  </div>
                  <div className="text-xs font-bold text-[#1b3127] mt-1">{activeLightboxSpace.specs.light}</div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1b3127]">
                  Eco-Certified Equipment Provided By Therapist
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#475b51]">
                  {activeLightboxSpace.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#285244] shrink-0 mt-0.5" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#ded8cc] flex items-center justify-between">
                <button
                  onClick={() => setActiveLightboxSpace(null)}
                  className="text-xs font-bold text-[#5c6e65] hover:text-[#1b3127] cursor-pointer"
                >
                  Close
                </button>

                <a
                  href={`https://wa.me/61433556409?text=Hi%20Shairu%2C%20I%20would%20like%20to%20request%20the%20${encodeURIComponent(activeLightboxSpace.title)}%20setup%20in%20Australia.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm cursor-pointer transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Book via WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
