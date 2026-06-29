// Beautiful, inline SVG illustrations for products to work 100% offline
// Unified color scheme matching the cinematic dark red Netflix-style theme

function createSvg(content: string, highlightColor: string = '#ef4444'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <!-- Unified dark cinematic background gradient -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1c1c24;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#0b0b0e;stop-opacity:1" />
      </linearGradient>
      <!-- Item highlight gradients -->
      <linearGradient id="itemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:0.8" />
      </linearGradient>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${highlightColor};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.2" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000" flood-opacity="0.6"/>
      </filter>
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)" />
    <!-- Cinematic abstract light beams -->
    <circle cx="200" cy="-50" r="220" fill="url(#glowGrad)" opacity="0.15" filter="url(#glow)" />
    <!-- Tech grid lines -->
    <path d="M 0 80 L 400 80 M 0 160 L 400 160 M 0 240 L 400 240 M 0 320 L 400 320" fill="none" stroke="white" stroke-opacity="0.02" stroke-width="1" />
    <path d="M 80 0 L 80 400 M 160 0 L 160 400 M 240 0 L 240 400 M 320 0 L 320 400" fill="none" stroke="white" stroke-opacity="0.02" stroke-width="1" />
    <g filter="url(#shadow)">
      ${content}
    </g>
  </svg>`;
  
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getProductImage(id: string): string {
  switch (id) {
    case 'prod-1': // Headphones
      return createSvg(
        `<circle cx="200" cy="200" r="75" fill="none" stroke="url(#itemGrad)" stroke-width="14" stroke-linecap="round" stroke-dasharray="270 100" transform="rotate(-135 200 200)"/>
         <!-- Cushions -->
         <rect x="100" y="165" width="26" height="70" rx="13" fill="#ffffff" stroke="#ef4444" stroke-width="2" />
         <rect x="274" y="165" width="26" height="70" rx="13" fill="#ffffff" stroke="#ef4444" stroke-width="2" />
         <!-- Headband cushions -->
         <path d="M 155 145 Q 200 120 245 145" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round" opacity="0.8" />
         <circle cx="200" cy="200" r="25" fill="#ef4444" opacity="0.25" filter="url(#glow)" />`,
        '#ef4444'
      );
    case 'prod-2': // Smartwatch
      return createSvg(
        `<rect x="155" y="70" width="90" height="260" rx="15" fill="#2d3748" opacity="0.6" stroke="#ef4444" stroke-width="1.5" />
         <rect x="135" y="125" width="130" height="150" rx="35" fill="url(#itemGrad)" stroke="#475569" stroke-width="2" />
         <rect x="145" y="135" width="110" height="130" rx="25" fill="#0c0a09" />
         <!-- Widgets & Numbers -->
         <circle cx="200" cy="180" r="40" fill="none" stroke="#ef4444" stroke-width="6" stroke-dasharray="190 70" />
         <text x="200" y="187" font-family="monospace" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">10:45</text>
         <text x="200" y="215" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ef4444" text-anchor="middle">▲ 7,420</text>
         <circle cx="260" cy="200" r="7" fill="#ef4444" filter="url(#glow)" />`,
        '#ef4444'
      );
    case 'prod-3': // Keyboard
      return createSvg(
        `<rect x="70" y="130" width="260" height="140" rx="16" fill="url(#itemGrad)" stroke="#ef4444" stroke-width="2" />
         <rect x="80" y="140" width="240" height="120" rx="10" fill="#09090b" />
         <!-- Keycaps lines grid -->
         <rect x="90" y="150" width="40" height="20" rx="4" fill="#ef4444" opacity="0.9" />
         <rect x="140" y="150" width="30" height="20" rx="4" fill="#27272a" />
         <rect x="180" y="150" width="30" height="20" rx="4" fill="#27272a" />
         <rect x="220" y="150" width="30" height="20" rx="4" fill="#27272a" />
         <rect x="260" y="150" width="50" height="20" rx="4" fill="#27272a" />
         
         <rect x="90" y="180" width="50" height="20" rx="4" fill="#27272a" />
         <rect x="150" y="180" width="30" height="20" rx="4" fill="#ef4444" opacity="0.9" />
         <rect x="190" y="180" width="30" height="20" rx="4" fill="#27272a" />
         <rect x="230" y="180" width="40" height="20" rx="4" fill="#27272a" />
         <rect x="280" y="180" width="30" height="20" rx="4" fill="#27272a" />
         
         <!-- Spacebar -->
         <rect x="130" y="210" width="140" height="20" rx="4" fill="#ef4444" filter="url(#glow)" opacity="0.9" />
         <rect x="90" y="210" width="30" height="20" rx="4" fill="#27272a" />
         <rect x="280" y="210" width="30" height="20" rx="4" fill="#27272a" />`,
        '#ef4444'
      );
    case 'prod-13': // Range Extender
      return createSvg(
        `<rect x="140" y="140" width="120" height="150" rx="20" fill="url(#itemGrad)" stroke="#475569" stroke-width="2" />
         <!-- Antennas with Red tips -->
         <line x1="150" y1="140" x2="120" y2="40" stroke="url(#itemGrad)" stroke-width="8" stroke-linecap="round" />
         <line x1="250" y1="140" x2="280" y2="40" stroke="url(#itemGrad)" stroke-width="8" stroke-linecap="round" />
         <circle cx="120" cy="40" r="6" fill="#ef4444" filter="url(#glow)" />
         <circle cx="280" cy="40" r="6" fill="#ef4444" filter="url(#glow)" />
         <!-- Status Lights -->
         <circle cx="180" cy="210" r="5" fill="#ef4444" filter="url(#glow)" />
         <circle cx="200" cy="210" r="5" fill="#ef4444" opacity="0.4" />
         <circle cx="220" cy="210" r="5" fill="#ef4444" opacity="0.4" />
         <path d="M 180 180 Q 200 160 220 180" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />`,
        '#ef4444'
      );
    case 'prod-14': // Clip vlog cam
      return createSvg(
        `<rect x="120" y="120" width="160" height="160" rx="30" fill="url(#itemGrad)" stroke="#ef4444" stroke-width="2" />
         <rect x="135" y="135" width="130" height="130" rx="20" fill="#09090b" />
         <!-- Lens -->
         <circle cx="200" cy="200" r="45" fill="#18181b" stroke="#ef4444" stroke-width="4" />
         <circle cx="200" cy="200" r="25" fill="#09090b" />
         <circle cx="190" cy="190" r="8" fill="#ef4444" opacity="0.8" filter="url(#glow)" />
         <!-- Red recording ring -->
         <circle cx="250" cy="155" r="6" fill="#ef4444" filter="url(#glow)" />`,
        '#ef4444'
      );
    case 'prod-4': // Fleece Hoodie
      return createSvg(
        `<path d="M 120 110 L 280 110 L 320 270 L 280 270 L 265 170 L 245 320 L 155 320 L 135 170 L 120 270 L 80 270 Z" fill="url(#itemGrad)" />
         <!-- Red Accent stripes -->
         <path d="M 120 110 L 135 170" stroke="#ef4444" stroke-width="4" />
         <path d="M 280 110 L 265 170" stroke="#ef4444" stroke-width="4" />
         <!-- Drawstrings -->
         <line x1="185" y1="110" x2="185" y2="160" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
         <line x1="215" y1="110" x2="215" y2="160" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
         <circle cx="185" cy="160" r="4" fill="#ffffff" />
         <circle cx="215" cy="160" r="4" fill="#ffffff" />`,
        '#ef4444'
      );
    case 'prod-5': // Shoes
      return createSvg(
        `<path d="M 70 240 L 130 135 L 190 135 L 220 180 L 320 200 C 340 210, 340 250, 310 250 L 110 250 Z" fill="url(#itemGrad)" />
         <!-- Sleek Red sole plate -->
         <path d="M 90 250 L 320 250 C 330 260, 310 270, 290 270 L 110 270 Z" fill="#ef4444" filter="url(#glow)" />
         <!-- Side Swish -->
         <path d="M 180 170 Q 240 160 270 210" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round" />`,
        '#ef4444'
      );
    case 'prod-6': // Backpack
      return createSvg(
        `<path d="M 130 120 C 130 70, 270 70, 270 120 L 290 310 C 290 330, 110 330, 110 310 Z" fill="url(#itemGrad)" />
         <!-- Red pocket zipper -->
         <path d="M 135 190 L 265 190" stroke="#ef4444" stroke-width="4" stroke-linecap="round" />
         <rect x="140" y="210" width="120" height="90" rx="10" fill="#0f0f12" stroke="#475569" stroke-width="2" />
         <circle cx="200" cy="255" r="16" fill="#ef4444" opacity="0.3" filter="url(#glow)" />
         <path d="M 160 90 L 240 90" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />`,
        '#ef4444'
      );
    case 'prod-15': // Windcheater
      return createSvg(
        `<path d="M 110 110 L 290 110 L 330 250 L 290 250 L 270 170 L 250 310 L 150 310 L 130 170 L 110 250 L 70 250 Z" fill="url(#itemGrad)" />
         <path d="M 110 110 C 110 60, 290 60, 290 110 Z" fill="#ef4444" opacity="0.35" />
         <!-- Red front zip line -->
         <line x1="200" y1="110" x2="200" y2="310" stroke="#ef4444" stroke-width="3.5" />`,
        '#ef4444'
      );
    case 'prod-16': // Sunglasses
      return createSvg(
        `<path d="M 80 180 C 80 220, 160 220, 175 180 C 185 180, 215 180, 225 180 C 240 220, 320 220, 320 180" fill="none" stroke="url(#itemGrad)" stroke-width="12" stroke-linecap="round" />
         <!-- Dark Red Lenses -->
         <circle cx="130" cy="188" r="28" fill="#ef4444" opacity="0.8" filter="url(#glow)"/>
         <circle cx="270" cy="188" r="28" fill="#ef4444" opacity="0.8" filter="url(#glow)"/>
         <line x1="170" y1="175" x2="230" y2="175" stroke="url(#itemGrad)" stroke-width="5" />`,
        '#ef4444'
      );
    case 'prod-7': // Frother
      return createSvg(
        `<rect x="180" y="80" width="40" height="180" rx="10" fill="url(#itemGrad)" stroke="#475569" stroke-width="1.5" />
         <line x1="200" y1="260" x2="200" y2="330" stroke="#ffffff" stroke-width="4" />
         <!-- Whisk ring at bottom -->
         <circle cx="200" cy="335" r="14" fill="none" stroke="#ef4444" stroke-width="5" filter="url(#glow)" />
         <!-- Red button -->
         <circle cx="200" cy="130" r="8" fill="#ef4444" />`,
        '#ef4444'
      );
    case 'prod-8': // Seat cushion
      return createSvg(
        `<path d="M 100 200 C 100 140, 300 140, 300 200 C 300 240, 100 240, 100 200 Z" fill="url(#itemGrad)" stroke="#ef4444" stroke-width="2" />
         <!-- Ergonomic U shape cutout -->
         <path d="M 175 140 A 25 25 0 0 1 225 140 Z" fill="#0f0f12" />
         <!-- Red contour line -->
         <path d="M 110 200 Q 200 215 290 200" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />`,
        '#ef4444'
      );
    case 'prod-9': // Sunset lamp
      return createSvg(
        `<circle cx="200" cy="180" r="80" fill="#ef4444" filter="url(#glow)" opacity="0.9"/>
         <circle cx="200" cy="180" r="50" fill="#f59e0b" filter="url(#glow)"/>
         <!-- Metallic body structure -->
         <rect x="193" y="240" width="14" height="90" fill="url(#itemGrad)" />
         <ellipse cx="200" cy="330" rx="55" ry="12" fill="url(#itemGrad)" />`,
        '#ef4444'
      );
    case 'prod-17': // Throw blanket
      return createSvg(
        `<rect x="90" y="90" width="220" height="220" rx="25" fill="url(#itemGrad)" stroke="#ef4444" stroke-width="2" />
         <!-- Dynamic criss-cross visual pattern -->
         <path d="M 120 120 L 280 280 M 170 120 L 280 230 M 220 120 L 280 180" stroke="#ef4444" stroke-width="6" opacity="0.6"/>
         <path d="M 280 120 L 120 280 M 230 120 L 120 230 M 180 120 L 120 180" stroke="#ef4444" stroke-width="6" opacity="0.6"/>
         <!-- Corner tassels -->
         <circle cx="90" cy="90" r="6" fill="#ef4444" />
         <circle cx="310" cy="90" r="6" fill="#ef4444" />
         <circle cx="90" cy="310" r="6" fill="#ef4444" />
         <circle cx="310" cy="310" r="6" fill="#ef4444" />`,
        '#ef4444'
      );
    case 'prod-18': // USB Air purifier
      return createSvg(
        `<rect x="140" y="90" width="120" height="220" rx="25" fill="url(#itemGrad)" stroke="#475569" stroke-width="2" />
         <rect x="155" y="105" width="90" height="110" rx="10" fill="#0c0a09" />
         <!-- Grid points -->
         <circle cx="175" cy="130" r="3" fill="#ef4444" filter="url(#glow)" />
         <circle cx="200" cy="130" r="3" fill="#ef4444" />
         <circle cx="225" cy="130" r="3" fill="#ef4444" />
         <circle cx="175" cy="160" r="3" fill="#ef4444" />
         <circle cx="200" cy="160" r="3" fill="#ef4444" filter="url(#glow)" />
         <circle cx="225" cy="160" r="3" fill="#ef4444" />
         <!-- Air exhaust wave -->
         <path d="M 160 330 Q 200 360 240 330" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round" filter="url(#glow)"/>`,
        '#ef4444'
      );
    case 'prod-10': // Yoga Mat
      return createSvg(
        `<rect x="80" y="180" width="240" height="50" rx="8" fill="url(#itemGrad)" stroke="#ef4444" stroke-width="1.5" />
         <ellipse cx="320" cy="205" rx="12" ry="24" fill="url(#itemGrad)" />
         <!-- Spiral rolled lines -->
         <circle cx="320" cy="205" r="6" fill="none" stroke="#ef4444" stroke-width="3" />
         <circle cx="320" cy="205" r="14" fill="none" stroke="#ef4444" stroke-width="2" />`,
        '#ef4444'
      );
    case 'prod-11': // Shaker
      return createSvg(
        `<path d="M 135 110 L 265 110 L 235 310 L 165 310 Z" fill="url(#itemGrad)" stroke="#475569" stroke-width="2" />
         <rect x="125" y="80" width="150" height="30" rx="5" fill="#18181b" stroke="#ef4444" stroke-width="2" />
         <rect x="180" y="55" width="40" height="25" rx="4" fill="#ef4444" filter="url(#glow)" />
         <!-- Dynamic grip lines -->
         <path d="M 155 170 L 245 170" stroke="#ef4444" stroke-width="3" />
         <path d="M 160 210 L 240 210" stroke="#ef4444" stroke-width="3" />`,
        '#ef4444'
      );
    case 'prod-12': // Skin Drops
      return createSvg(
        `<rect x="145" y="120" width="110" height="180" rx="20" fill="url(#itemGrad)" stroke="#475569" stroke-width="2" />
         <!-- Cap & pipette dropper -->
         <rect x="165" y="70" width="70" height="50" rx="5" fill="#18181b" stroke="#ef4444" stroke-width="2" />
         <line x1="200" y1="70" x2="200" y2="35" stroke="url(#itemGrad)" stroke-width="8" stroke-linecap="round" />
         <circle cx="200" cy="35" r="8" fill="#ef4444" filter="url(#glow)" />
         <!-- Glowing serum drop outline inside -->
         <path d="M 200 170 C 185 205, 215 205, 200 170 Z" fill="#ef4444" filter="url(#glow)" />`,
        '#ef4444'
      );
    case 'prod-19': // Body Fat scale
      return createSvg(
        `<rect x="90" y="90" width="220" height="220" rx="35" fill="url(#itemGrad)" stroke="#ef4444" stroke-width="2" />
         <rect x="105" y="105" width="190" height="190" rx="25" fill="#09090b" />
         <!-- LCD Display -->
         <rect x="155" y="120" width="90" height="35" rx="6" fill="#ef4444" filter="url(#glow)" opacity="0.85" />
         <text x="200" y="143" font-family="monospace" font-weight="bold" font-size="18" fill="#000000" text-anchor="middle">68.5</text>
         <!-- Steel electrode arcs -->
         <path d="M 130 180 Q 140 240 170 260" fill="none" stroke="url(#itemGrad)" stroke-width="6" stroke-linecap="round" />
         <path d="M 270 180 Q 260 240 230 260" fill="none" stroke="url(#itemGrad)" stroke-width="6" stroke-linecap="round" />`,
        '#ef4444'
      );
    case 'prod-20': // Massage gun
      return createSvg(
        `<path d="M 110 110 L 270 110 L 270 175 L 220 175 L 220 280 L 160 280 L 160 175 Z" fill="url(#itemGrad)" stroke="#ef4444" stroke-width="2" />
         <!-- Massager Round Ball -->
         <circle cx="80" cy="142" r="30" fill="#ef4444" filter="url(#glow)"/>
         <rect x="110" y="132" width="20" height="20" fill="#18181b" />
         <!-- Gripping ribs -->
         <line x1="175" y1="210" x2="205" y2="210" stroke="#ef4444" stroke-width="3" />
         <line x1="175" y1="230" x2="205" y2="230" stroke="#ef4444" stroke-width="3" />
         <line x1="175" y1="250" x2="205" y2="250" stroke="#ef4444" stroke-width="3" />`,
        '#ef4444'
      );
    default:
      return createSvg(
        `<circle cx="200" cy="200" r="60" fill="#ef4444" filter="url(#glow)"/>`,
        '#ef4444'
      );
  }
}
