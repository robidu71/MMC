interface VisualProps {
  type: 'hero' | 'suite' | 'couples' | 'tea' | 'apothecary' | 'steam' | 'solitude';
  className?: string;
}

export function SanctuaryVisual({ type, className = '' }: VisualProps) {
  switch (type) {
    case 'hero':
      return (
        <div className={`relative w-full h-full overflow-hidden rounded-2xl bg-[#EBE4DC] ${className}`}>
          {/* Ambient Lighting & Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#312B25]/35 via-transparent to-[#F7F2EC]/40 pointer-events-none" />
          
          <svg className="w-full h-full object-cover" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EDE5DC" />
                <stop offset="100%" stopColor="#DFD5C8" />
              </linearGradient>
              <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A88B77" />
                <stop offset="100%" stopColor="#7E6352" />
              </linearGradient>
              <linearGradient id="linenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FAF7F2" />
                <stop offset="100%" stopColor="#E9DFD3" />
              </linearGradient>
              <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F5B041" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#F5B041" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#F5B041" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background Minimalist Wall & Timber Slats */}
            <rect width="800" height="500" fill="url(#wallGrad)" />

            {/* Japanese Hinoki Wood Screen Wall (Right Side) */}
            <g opacity="0.85">
              {[620, 640, 660, 680, 700, 720, 740, 760, 780].map((x, i) => (
                <rect key={i} x={x} y="0" width="8" height="500" fill="#937562" />
              ))}
              <rect x="610" y="0" width="10" height="500" fill="#6A5344" />
              <rect x="610" y="140" width="190" height="6" fill="#6A5344" />
              <rect x="610" y="320" width="190" height="6" fill="#6A5344" />
            </g>

            {/* Floor Surface */}
            <rect x="0" y="390" width="800" height="110" fill="#D3C7B8" />
            <line x1="0" y1="390" x2="800" y2="390" stroke="#B8A896" strokeWidth="1.5" />
            
            {/* Woven Jute Rug */}
            <polygon points="120,410 680,410 740,490 60,490" fill="#C4B5A2" opacity="0.75" />

            {/* Treatment Bed Silhouette */}
            {/* Legs */}
            <rect x="220" y="300" width="14" height="115" rx="3" fill="url(#woodGrad)" />
            <rect x="520" y="300" width="14" height="115" rx="3" fill="url(#woodGrad)" />
            <rect x="230" y="360" width="294" height="10" rx="2" fill="#755B4B" />

            {/* Bed Mattress & Organic Linens */}
            <rect x="180" y="270" width="400" height="42" rx="14" fill="url(#linenGrad)" stroke="#DFD4C6" strokeWidth="1" />
            
            {/* Draped Organic Throw Sheet */}
            <path d="M 195 275 Q 380 282 565 275 L 570 340 Q 380 348 190 340 Z" fill="#F4EDE4" opacity="0.9" />
            <path d="M 190 340 Q 380 348 570 340 L 565 352 Q 380 360 195 352 Z" fill="#E2D6C7" opacity="0.8" />

            {/* Ergonomic Head Cradle */}
            <ellipse cx="145" cy="290" rx="30" ry="20" fill="url(#linenGrad)" stroke="#DFD4C6" strokeWidth="1" />
            <ellipse cx="145" cy="290" rx="16" ry="10" fill="#D9CCBE" />
            <rect x="170" y="285" width="16" height="10" rx="2" fill="#7E6352" />

            {/* Volcanic Basalt Stones Arranged on Linens */}
            <ellipse cx="330" cy="272" rx="14" ry="7" fill="#2E2C2B" />
            <ellipse cx="370" cy="271" rx="18" ry="8" fill="#262423" />
            <ellipse cx="415" cy="272" rx="15" ry="7.5" fill="#312F2E" />
            <ellipse cx="455" cy="273" rx="12" ry="6" fill="#282625" />

            {/* Fresh Botanical Eucalyptus Sprig on Bed */}
            <path d="M 480 274 Q 515 268 535 272" stroke="#476253" strokeWidth="2" strokeLinecap="round" />
            <circle cx="495" cy="270" r="5" fill="#5A7967" />
            <circle cx="510" cy="268" r="6" fill="#6A8A77" />
            <circle cx="525" cy="271" r="5" fill="#5A7967" />

            {/* Floating Cedar Shelf with Candle & Ceramic Teapot */}
            <rect x="60" y="190" width="110" height="12" rx="2" fill="url(#woodGrad)" />
            {/* Candle Amber Glow */}
            <circle cx="90" cy="180" r="45" fill="url(#candleGlow)" />
            <rect x="85" y="172" width="10" height="18" rx="2" fill="#FFFDF8" />
            <circle cx="90" cy="168" r="2.5" fill="#E59866" />
            <ellipse cx="90" cy="166" rx="1.5" ry="3" fill="#F9E79F" />

            {/* Ceramic Stoneware Vase with Dried Willow Branch */}
            <path d="M 125 190 Q 120 170 128 155 L 138 155 Q 146 170 141 190 Z" fill="#C9B9A6" />
            <path d="M 133 155 Q 128 120 145 90" stroke="#877567" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 136 128 Q 150 120 156 125" stroke="#877567" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 131 115 Q 118 108 116 114" stroke="#877567" strokeWidth="1.2" strokeLinecap="round" />

            {/* Zen Courtyard Window View (Left Arch) */}
            <g opacity="0.9">
              <path d="M 0 0 L 0 350 L 50 350 L 50 0 Z" fill="#D8CFBE" opacity="0.6" />
              <path d="M 20 80 Q 25 150 15 220" stroke="#7A8E7C" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="22" cy="110" r="6" fill="#88A18B" />
              <circle cx="18" cy="140" r="7" fill="#759079" />
              <circle cx="25" cy="170" r="6" fill="#88A18B" />
              <circle cx="16" cy="200" r="5" fill="#759079" />
            </g>
          </svg>
        </div>
      );

    case 'suite':
      return (
        <div className={`relative w-full h-full overflow-hidden rounded-xl bg-[#EFE9E0] ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 600 450" fill="none">
            <rect width="600" height="450" fill="#E6DED3" />
            {/* Architectural wall panels */}
            <rect x="0" y="0" width="180" height="450" fill="#D9CFC1" />
            <line x1="180" y1="0" x2="180" y2="450" stroke="#C4B8A6" strokeWidth="1" />
            <line x1="380" y1="0" x2="380" y2="450" stroke="#C4B8A6" strokeWidth="1" />
            <rect x="0" y="340" width="600" height="110" fill="#CEC1AF" />
            {/* Treatment Bed */}
            <rect x="160" y="240" width="320" height="34" rx="8" fill="#FDFBF7" stroke="#DFD4C5" />
            <path d="M 170 245 Q 320 252 470 245 L 472 290 Q 320 298 168 290 Z" fill="#F4EFE6" />
            <rect x="190" y="274" width="10" height="80" rx="2" fill="#7E6352" />
            <rect x="420" y="274" width="10" height="80" rx="2" fill="#7E6352" />
            <ellipse cx="135" cy="256" rx="24" ry="16" fill="#FAF6EE" stroke="#DFD4C5" />
            {/* Warm Basalt stones on bed */}
            <ellipse cx="280" cy="242" rx="12" ry="6" fill="#282625" />
            <ellipse cx="315" cy="241" rx="14" ry="7" fill="#22201F" />
            <ellipse cx="350" cy="242" rx="12" ry="6" fill="#2B2928" />
            {/* Ambient lamp */}
            <rect x="520" y="200" width="28" height="60" rx="4" fill="#FDF7EA" stroke="#D3A867" strokeWidth="1" />
            <circle cx="534" cy="230" r="18" fill="#F5B041" opacity="0.25" />
            <rect x="515" y="260" width="38" height="6" fill="#7A604F" />
          </svg>
        </div>
      );

    case 'couples':
      return (
        <div className={`relative w-full h-full overflow-hidden rounded-xl bg-[#EFE9E0] ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 600 450" fill="none">
            <rect width="600" height="450" fill="#DFD4C6" />
            {/* Dual bed setup */}
            <rect x="0" y="330" width="600" height="120" fill="#C2B29F" />
            {/* Bed 1 */}
            <rect x="60" y="220" width="200" height="30" rx="6" fill="#FBF9F5" stroke="#D6C9B8" />
            <ellipse cx="40" cy="235" rx="18" ry="12" fill="#F6F1E8" stroke="#D6C9B8" />
            <rect x="80" y="250" width="8" height="90" fill="#7A604F" />
            <rect x="230" y="250" width="8" height="90" fill="#7A604F" />
            <ellipse cx="140" cy="222" rx="10" ry="5" fill="#262423" />
            <ellipse cx="165" cy="221" rx="12" ry="6" fill="#262423" />
            {/* Bed 2 */}
            <rect x="340" y="220" width="200" height="30" rx="6" fill="#FBF9F5" stroke="#D6C9B8" />
            <ellipse cx="320" cy="235" rx="18" ry="12" fill="#F6F1E8" stroke="#D6C9B8" />
            <rect x="360" y="250" width="8" height="90" fill="#7A604F" />
            <rect x="510" y="250" width="8" height="90" fill="#7A604F" />
            <ellipse cx="420" cy="222" rx="10" ry="5" fill="#262423" />
            <ellipse cx="445" cy="221" rx="12" ry="6" fill="#262423" />
            {/* Center stone fireplace ribbon */}
            <rect x="275" y="80" width="50" height="200" fill="#746A5E" rx="4" />
            <rect x="285" y="160" width="30" height="45" rx="2" fill="#1C1814" />
            <ellipse cx="300" cy="185" rx="8" ry="12" fill="#E59866" opacity="0.9" />
            <ellipse cx="300" cy="188" rx="4" ry="7" fill="#F9E79F" />
          </svg>
        </div>
      );

    case 'tea':
      return (
        <div className={`relative w-full h-full overflow-hidden rounded-xl bg-[#EFE9E0] ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 600 450" fill="none">
            <rect width="600" height="450" fill="#E8E0D5" />
            <rect x="0" y="320" width="600" height="130" fill="#D3C5B3" />
            {/* Japanese Shoji sliding screen grid */}
            {[50, 150, 250, 350, 450, 550].map((x, i) => (
              <line key={i} x1={x} y1="0" x2={x} y2="320" stroke="#BCAB97" strokeWidth="1" />
            ))}
            {[60, 120, 180, 240].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="600" y2={y} stroke="#BCAB97" strokeWidth="1" />
            ))}
            {/* Low Solid Oak Tea Table */}
            <rect x="180" y="290" width="240" height="18" rx="4" fill="#6B5444" />
            <rect x="210" y="308" width="14" height="40" fill="#584334" />
            <rect x="376" y="308" width="14" height="40" fill="#584334" />
            {/* Ceramic Teaware */}
            {/* Teapot */}
            <path d="M 285 290 Q 280 270 295 265 L 305 265 Q 320 270 315 290 Z" fill="#3D3A37" />
            <path d="M 280 278 Q 270 276 270 282" stroke="#3D3A37" strokeWidth="3" strokeLinecap="round" />
            <path d="M 312 268 Q 324 260 320 278" stroke="#3D3A37" strokeWidth="2.5" fill="none" />
            {/* Tea Cups */}
            <path d="M 245 290 Q 242 278 252 278 L 258 278 Q 268 278 265 290 Z" fill="#938779" />
            <path d="M 335 290 Q 332 278 342 278 L 348 278 Q 358 278 355 290 Z" fill="#938779" />
            {/* Soft Linen Floor Cushions */}
            <ellipse cx="140" cy="345" rx="38" ry="14" fill="#FAF6EE" stroke="#D1C3B2" />
            <ellipse cx="460" cy="345" rx="38" ry="14" fill="#FAF6EE" stroke="#D1C3B2" />
          </svg>
        </div>
      );

    case 'apothecary':
      return (
        <div className={`relative w-full h-full overflow-hidden rounded-xl bg-[#EFE9E0] ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 600 450" fill="none">
            <rect width="600" height="450" fill="#E2D7C9" />
            {/* Shelves */}
            <rect x="40" y="140" width="520" height="14" fill="#6A5344" rx="2" />
            <rect x="40" y="270" width="520" height="14" fill="#6A5344" rx="2" />
            {/* Amber Glass Bottles on Shelf 1 */}
            {[90, 150, 210, 270, 330, 390, 450, 500].map((x, i) => (
              <g key={i}>
                <rect x={x} y="80" width="24" height="60" rx="3" fill="#884A22" />
                <rect x={x + 7} y="68" width="10" height="12" fill="#5E3013" />
                <rect x={x + 3} y="95" width="18" height="24" fill="#FAF5ED" opacity="0.9" />
                <line x1={x + 6} y1="103" x2={x + 18} y2="103" stroke="#884A22" strokeWidth="1" />
              </g>
            ))}
            {/* Botanical Dried Jars on Shelf 2 */}
            {[100, 180, 260, 340, 420, 490].map((x, i) => (
              <g key={i}>
                <rect x={x} y="200" width="40" height="70" rx="6" fill="#D3C9BD" opacity="0.6" stroke="#AA9C8C" />
                <circle cx={x + 20} cy={235} r="12" fill={i % 2 === 0 ? '#587361' : '#A97C50'} opacity="0.7" />
                <rect x={x + 5} y="192" width="30" height="8" rx="2" fill="#755E4C" />
              </g>
            ))}
            {/* Mortar & Pestle */}
            <rect x="0" y="380" width="600" height="70" fill="#CBBDAA" />
            <ellipse cx="300" cy="380" rx="40" ry="22" fill="#5C554E" />
            <ellipse cx="300" cy="378" rx="32" ry="16" fill="#443F3A" />
            <line x1="300" y1="375" x2="335" y2="340" stroke="#756D65" strokeWidth="10" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'steam':
      return (
        <div className={`relative w-full h-full overflow-hidden rounded-xl bg-[#28322E] ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 600 450" fill="none">
            <rect width="600" height="450" fill="#242D2A" />
            {/* Natural Slate Tiles */}
            {[0, 150, 300, 450].map((y, row) => (
              <g key={row}>
                {[0, 100, 200, 300, 400, 500].map((x, col) => (
                  <rect key={col} x={x} y={y} width="98" height="148" fill="#2C3733" stroke="#1E2623" strokeWidth="1.5" />
                ))}
              </g>
            ))}
            {/* Soft Steam Mist Haze */}
            <ellipse cx="300" cy="220" rx="220" ry="120" fill="#D9E6DF" opacity="0.12" />
            <ellipse cx="400" cy="180" rx="160" ry="90" fill="#D9E6DF" opacity="0.15" />
            <ellipse cx="200" cy="260" rx="180" ry="100" fill="#D9E6DF" opacity="0.1" />
            {/* River Pebble Reflexology Floor */}
            <rect x="0" y="360" width="600" height="90" fill="#1C2320" />
            {[50, 120, 190, 260, 330, 400, 470, 540].map((x, i) => (
              <ellipse key={i} cx={x} cy={390} rx="16" ry="10" fill="#424D48" />
            ))}
            {[80, 150, 220, 290, 360, 430, 500].map((x, i) => (
              <ellipse key={i} cx={x} cy={415} rx="14" ry="9" fill="#363F3B" />
            ))}
            {/* Hanging Eucalyptus Branches */}
            <path d="M 280 0 Q 285 70 270 140" stroke="#486B5A" strokeWidth="2" />
            <circle cx="275" cy="50" r="8" fill="#5A816E" opacity="0.8" />
            <circle cx="282" cy="80" r="9" fill="#6B9681" opacity="0.8" />
            <circle cx="270" cy="115" r="7" fill="#5A816E" opacity="0.8" />
          </svg>
        </div>
      );

    case 'solitude':
    default:
      return (
        <div className={`relative w-full h-full overflow-hidden rounded-xl bg-[#1B221E] ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 600 450" fill="none">
            <rect width="600" height="450" fill="#19201C" />
            {/* Fiber Optic Constellation Ceiling */}
            {[
              [80, 40], [140, 70], [210, 30], [280, 80], [350, 50], [420, 90], [510, 40],
              [90, 110], [170, 130], [250, 110], [330, 140], [400, 120], [490, 130],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="1.5" fill="#E8DEC8" opacity={0.6 + (i % 3) * 0.15} />
            ))}
            {/* Singing bowl */}
            <rect x="0" y="350" width="600" height="100" fill="#111613" />
            <ellipse cx="300" cy="310" rx="55" ry="32" fill="#B38E5D" />
            <ellipse cx="300" cy="306" rx="46" ry="24" fill="#917042" />
            {/* Felt acoustic cushions */}
            <rect x="180" y="340" width="240" height="20" rx="6" fill="#2E3832" />
          </svg>
        </div>
      );
  }
}
