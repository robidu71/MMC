interface MMCLogoProps {
  variant?: 'full' | 'mark-only' | 'footer' | 'compact';
  className?: string;
  theme?: 'dark' | 'light';
  logoStyle?: 'botanical-palm' | 'zen-meridian' | 'monogram';
}

export function MMCLogo({
  variant = 'full',
  className = '',
  theme = 'dark',
  logoStyle = 'botanical-palm',
}: MMCLogoProps) {
  const isLight = theme === 'light';
  const primaryStroke = isLight ? '#f5f2e9' : '#29483c';
  const accentFill = '#d6a982';
  const secondaryStroke = isLight ? '#aeb8a8' : '#78857a';

  // Render chosen logo mark
  const renderMark = () => {
    switch (logoStyle) {
      case 'zen-meridian':
        return (
          <svg
            className="w-full h-full"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Zen Circle */}
            <circle cx="22" cy="22" r="20" stroke={secondaryStroke} strokeWidth="1.2" strokeDasharray="3 1" />
            {/* Lotus Meridian Petals */}
            <path
              d="M 22 8 C 16 16 16 26 22 34 C 28 26 28 16 22 8 Z"
              fill={accentFill}
              fillOpacity="0.85"
            />
            {/* Side Leaves / Hands */}
            <path
              d="M 22 22 C 14 18 10 24 12 30 C 16 32 20 28 22 22 Z"
              stroke={primaryStroke}
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 22 22 C 30 18 34 24 32 30 C 28 32 24 28 22 22 Z"
              stroke={primaryStroke}
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        );

      case 'monogram':
        return (
          <svg
            className="w-full h-full"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Solid Ring */}
            <circle cx="22" cy="22" r="20" stroke={primaryStroke} strokeWidth="1.5" />
            {/* Minimalist Interlocking MMC Letters */}
            {/* Left M */}
            <path
              d="M 12 28 L 12 16 L 17 23 L 22 16 L 22 28"
              stroke={primaryStroke}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Flowing C curve enclosing */}
            <path
              d="M 33 16 C 30 14 26 14 24 17 C 22 20 22 24 24 27 C 26 30 30 30 33 28"
              stroke={accentFill}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="28" cy="22" r="2" fill={accentFill} />
          </svg>
        );

      case 'botanical-palm':
      default:
        return (
          <svg
            className="w-full h-full"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Calming Pebble Stone Ring */}
            <circle
              cx="22"
              cy="22"
              r="20.5"
              stroke={secondaryStroke}
              strokeWidth="1.2"
              className="opacity-70"
            />

            {/* Inner Organic Pebble */}
            <path
              d="M 22 6 C 31 6 38 13 38 22 C 38 31 31 38 22 38 C 13 38 6 31 6 22 C 6 13 13 6 22 6 Z"
              fill={isLight ? '#335043' : '#ede7dc'}
              className="transition-colors"
            />

            {/* Harmonious "M" Therapeutic Waves: Two soothing human touch arches */}
            <path
              d="M 12 27 C 12 18 16 15 19 17 C 21 19 22 23 22 25 C 22 23 23 19 25 17 C 28 15 32 18 32 27"
              stroke={primaryStroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Center Botanical Healing Leaf rising upward in warm terracotta/gold */}
            <path
              d="M 22 12 C 19 16 19 21 22 25 C 25 21 25 16 22 12 Z"
              fill={accentFill}
            />

            {/* Central Grounding Stone Point */}
            <circle cx="22" cy="28.5" r="1.5" fill={primaryStroke} />
          </svg>
        );
    }
  };

  if (variant === 'mark-only') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        {renderMark()}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <div className="w-10 h-10 shrink-0">
          {renderMark()}
        </div>
        <div>
          <span className="serif text-xl tracking-tight text-[#29483c] block font-normal leading-snug">
            Masud&apos;s Massage Center <span className="text-base text-[#9a7053] font-medium">(MMC)</span>
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#78857a] block font-sans">
            A quieter kind of care · Professional Bodywork
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Visual Logo Mark */}
      <div className="w-11 h-11 shrink-0 drop-shadow-2xs transition-transform hover:scale-105 duration-300">
        {renderMark()}
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="serif text-2xl tracking-[-0.02em] text-[#29483c] font-normal leading-none flex items-baseline gap-1.5">
          <span>Masud&apos;s Massage Center</span>
          <span className="text-base font-serif font-bold text-[#9a7053]">(MMC)</span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-[#718276] font-semibold mt-1">
          Bodywork studio · Licensed Care
        </span>
      </div>
    </div>
  );
}
