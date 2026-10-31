interface MMCLogoProps {
  variant?: 'full' | 'mark-only' | 'footer' | 'compact';
  className?: string;
  theme?: 'dark' | 'light' | 'teal';
}

export function MMCLogo({
  variant = 'full',
  className = '',
  theme = 'teal',
}: MMCLogoProps) {
  const isDark = theme === 'dark' || theme === 'light';

  // Symmetrical Luxury Zen Lotus & Therapeutic Healing Hands Emblem
  const renderEmblem = () => (
    <svg
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      <defs>
        {/* Deep Ocean to Bright Vibrant Teal Gradient */}
        <linearGradient id="shairuTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00525c" />
          <stop offset="50%" stopColor="#007a87" />
          <stop offset="100%" stopColor="#00b4c6" />
        </linearGradient>

        {/* Luminous Champagne Gold Accent */}
        <linearGradient id="shairuGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>

        {/* White / Platinum for Dark Backgrounds */}
        <linearGradient id="shairuWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ccfbf1" />
        </linearGradient>
      </defs>

      {/* Outer Harmonious Zen Halo Ring */}
      <circle
        cx="27"
        cy="27"
        r="24"
        stroke={isDark ? "url(#shairuWhiteGrad)" : "url(#shairuTealGrad)"}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="130 18"
        className="opacity-95"
      />

      {/* Left Soothing Hand / Lotus Petal Curve */}
      <path
        d="M 15 35 C 13 25 18 17 27 12 C 23 20 23 29 27 38 C 21 38 17 38 15 35 Z"
        fill={isDark ? "url(#shairuWhiteGrad)" : "url(#shairuTealGrad)"}
        opacity={isDark ? "0.95" : "0.92"}
      />

      {/* Right Soothing Hand / Lotus Petal Curve */}
      <path
        d="M 39 35 C 41 25 36 17 27 12 C 31 20 31 29 27 38 C 33 38 37 38 39 35 Z"
        fill={isDark ? "url(#shairuWhiteGrad)" : "url(#shairuTealGrad)"}
        opacity={isDark ? "0.95" : "0.92"}
      />

      {/* Center Botanical Bud / Essence Droplet */}
      <path
        d="M 27 16 C 29 21 31 25 27 31 C 23 25 25 21 27 16 Z"
        fill="url(#shairuGoldGrad)"
      />

      {/* Golden Equilibrium Sun / Pearl at Center */}
      <circle
        cx="27"
        cy="25"
        r="3"
        fill="url(#shairuGoldGrad)"
        className="drop-shadow-xs"
      />

      {/* Soothing Calming Water Wave Foundation (Represents Relaxing Mobile Massage Flow) */}
      <path
        d="M 18 42 C 22 40 24 43 27 41 C 30 43 32 40 36 42"
        stroke="url(#shairuGoldGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'mark-only') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        {renderEmblem()}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3.5 select-none ${className}`}>
        <div className="w-12 h-12 shrink-0">
          {renderEmblem()}
        </div>
        <div>
          <div className="flex items-center gap-1 font-sans font-black tracking-[0.16em] text-2xl text-white leading-none">
            <span>SHAIRU</span>
            <span className="text-[10px] font-bold align-top text-amber-400">®</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.26em] text-teal-200/90 block font-semibold mt-1">
            Luxury Mobile Massage · Australia
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 select-none group ${className}`}>
        <div className="w-9 h-9 shrink-0">
          {renderEmblem()}
        </div>
        <span className="font-sans font-black text-xl tracking-[0.14em] text-[#007a87]">
          SHAIRU
        </span>
      </div>
    );
  }

  // Full Header Brand Logo (Primary Nav)
  return (
    <div className={`flex items-center gap-3 sm:gap-4 select-none group py-0.5 ${className}`}>
      {/* Brand Emblem */}
      <div className="w-10 sm:w-12 h-10 sm:h-12 shrink-0">
        {renderEmblem()}
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1 font-sans font-black text-2xl sm:text-3xl tracking-[0.15em] text-[#007a87] leading-none transition-colors group-hover:text-[#005e68]">
          <span>SHAIRU</span>
          <span className="text-xs font-bold text-amber-500 self-start -mt-0.5">®</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.24em] uppercase font-bold text-slate-500 transition-colors group-hover:text-slate-700">
            Mobile Massage &amp; Spa
          </span>
        </div>
      </div>
    </div>
  );
}
