import { ServiceItem, GallerySpace, ReviewItem, FAQItem } from '../types';

export const STUDIO_INFO = {
  name: 'Shairu',
  shortName: 'Shairu Mobile Massage',
  tagline: 'Mobile Massage Australia',
  heroSubtitle: 'Space to soften, delivered to your door',
  heroDesc: 'Australia’s premier 5-star mobile massage service. Certified therapists bring luxury heated tables, organic oils, and deep relaxation directly to your Home, Hotel room, or Executive suite across Australia.',
  address: 'Mobile Service across Australia (Sydney, Melbourne, Brisbane & metro hubs)',
  city: 'Australia',
  phone: '+61 433 556 409',
  phoneDisplay: '+61 433 556 409',
  whatsapp: '+61 433 556 409',
  whatsappUrl: 'https://wa.me/61433556409?text=Hi%20Shairu%20Mobile%20Massage%2C%20I%20would%20like%20to%20book%20a%20treatment%20in%20Australia',
  email: 'bookings@shairumobilemassage.com.au',
  hours: 'Monday – Sunday: 8:00 AM – 10:00 PM · 7 Days On-Demand Mobile Service',
  travelFeeNote: 'No travel fee across major metropolitan hotel & residential zones',
};

export const SYDNEY_AREAS = [
  'Sydney CBD & Darling Harbour',
  'Eastern Suburbs (Bondi, Double Bay, Coogee)',
  'North Sydney & Lower North Shore',
  'Inner West (Newtown, Balmain, Surry Hills)',
  'Northern Beaches (Manly & surrounds)',
  'Western Suburbs & Parramatta',
];

export const MOBILE_PERKS = [
  {
    icon: 'table',
    title: 'We Bring Everything',
    desc: 'Heated portable massage table, fresh luxury cotton linens, and soothing ambient soundscapes.',
  },
  {
    icon: 'hotel',
    title: 'Hotel & Home Friendly',
    desc: 'Discreet, prompt arrival at private apartments, suburban houses, and Sydney luxury hotels & suites.',
  },
  {
    icon: 'certified',
    title: 'Vetted & Qualified',
    desc: 'Fully insured, certified remedial & relaxation therapists with continuous background checks.',
  },
  {
    icon: 'clock',
    title: '7 Days: 8 AM – 10 PM',
    desc: 'On-demand morning, afternoon, and evening appointments with simple online confirmation.',
  },
];

export const PRICING_TIERS = [
  {
    hours: '1 hour',
    minutes: 60,
    price: 100,
    label: '1 Hour Session',
    desc: 'Ideal for targeted muscle relief, back decompression, or a focused relaxation break.',
    popular: false,
  },
  {
    hours: '1.5 hours',
    minutes: 90,
    price: 140,
    label: '1.5 Hours Session',
    desc: 'Most popular · Ample time to deeply unwind from head to toe without watching the clock.',
    popular: true,
  },
  {
    hours: '2 hours',
    minutes: 120,
    price: 170,
    label: '2 Hours Session',
    desc: 'The ultimate immersive whole-body rejuvenation experience delivered right to your door.',
    popular: false,
  },
];

export const APPROACH_PILLARS = [
  {
    num: '01',
    title: 'Unrushed check-in',
    description: 'We begin with a few quiet minutes to discuss how your body feels today, what areas hold tension, and what kind of session serves you best.',
  },
  {
    num: '02',
    title: 'Pressure you guide',
    description: 'No guessing, no discomfort. You set the depth, and we adjust as we go. From gentle restorative touch to focused, intentional deep work.',
  },
  {
    num: '03',
    title: 'Room to settle',
    description: 'A quiet, private sanctuary room with warm organic linens, natural sunlight, and generous time to transition peacefully.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'indian-head',
    num: '01',
    title: 'Indian Head Massage',
    tagline: 'Scalp, neck & mental decompression',
    detail: 'A time-honored therapy releasing tension across the scalp, cranial acupoints, neck, and shoulders to clear mental fog and ease head tension.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#ede5d8',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Warm botanical scalp & temple oil',
      'Cranial pressure point release',
      'Neck, trapezius & upper shoulder mobilization',
      'Unhurried arrival and herbal tea transition',
    ],
  },
  {
    id: 'feet-massage',
    num: '02',
    title: 'Feet Massage',
    tagline: 'Reflexology & lower-leg relief',
    detail: 'Restorative foot reflexology and lower-leg therapy targeting tired arches, plantar tension, and restoring a feeling of lightness to every step.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#dce3d8',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Warm botanical towel compresses',
      'Targeted reflexology acupoint work',
      'Hydrating organic arnica balm',
      'Calf & Achilles tendon gentle decompression',
    ],
  },
  {
    id: 'back-massage',
    num: '03',
    title: 'Back Massage',
    tagline: 'Targeted spine & shoulder decompression',
    detail: 'Focused therapy for upper back, scapulae, spinal erectors, and lumbar area. Designed to relieve postural fatigue and persistent tightness.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#e9ddd2',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Deep spinal muscle warming & friction',
      'Scapular mobilization and rhomboid release',
      'Warm herbal compress for lumbar comfort',
      'Customized pressure tailored to your spine',
    ],
  },
  {
    id: 'deep-tissue',
    num: '04',
    title: 'Deep tissue Massage',
    tagline: 'Firm myofascial knot release',
    detail: 'Slow, deliberate strokes targeting deeper muscle layers and chronic adhesions. Guided collaboratively to release deep-seated tension.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#e3dfd3',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Targeted myofascial decompression',
      'Trigger point knot melting',
      'Therapeutic arnica & hypericum balm',
      'Continuous pressure check-ins',
    ],
  },
  {
    id: 'relaxation-spa',
    num: '05',
    title: 'Relaxation Spa',
    tagline: 'Gentle nervous system restoration',
    detail: 'A rhythmic, peaceful whole-body session designed to calm the sensory nervous system, reduce cortisol, and envelop you in serene tranquility.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#ede8dd',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Flowing Swedish effleurage strokes',
      'Warm organic cotton compress draping',
      'Single-origin French lavender aromatherapy',
      'Peaceful acoustic soundscape environment',
    ],
  },
  {
    id: 'signature-whole-body',
    num: '06',
    title: 'Signature Whole Body massage',
    tagline: 'Comprehensive head-to-toe journey',
    detail: 'Our premier bespoke experience combining scalp acupressure, full-body restorative strokes, targeted back relief, and foot reflexology.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#dfe5dc',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Seamless head-to-toe full bodywork ritual',
      'Heated basalt stone placement for lumbar',
      'Scalp acupressure & foot reflexology integration',
      'Cold-pressed golden jojoba botanical oils',
    ],
  },
];

export const GALLERY_SPACES: GallerySpace[] = [
  {
    id: 'space-room',
    title: 'The Treatment Room',
    subtitle: 'Sunlight falling across a calm massage room with natural textures',
    imageSrc: '/studio-room.jpg',
    isRealPhoto: true,
    specs: {
      sound: 'Acoustic Sound Isolation',
      temp: 'Warm 23°C / 73°F Heated Bed',
      light: 'Filtered Morning & Afternoon Light',
    },
    amenities: [
      'Ultra-wide heated memory-foam hydraulic table',
      'Pure organic cotton and washed linen draping',
      'Private in-room dressing bench',
      'Medical-grade HEPA air filtration',
    ],
  },
  {
    id: 'space-session',
    title: 'Hands-on Practice',
    subtitle: 'A quiet, respectful bodywork environment centered on client comfort',
    imageSrc: '/massage-session.jpg',
    isRealPhoto: true,
    specs: {
      sound: 'Soft Ambient Quietude',
      temp: 'Thermostatic Temperature Control',
      light: 'Dimmable Warm Lighting',
    },
    amenities: [
      'Collaborative pressure and pacing check-in',
      'Warm towel compresses for feet and neck',
      'Unscented or gentle botanical oil options',
      'Generous buffer time between appointments',
    ],
  },
  {
    id: 'space-lounge',
    title: 'The Welcome & Tea Corner',
    subtitle: 'Unhurried arrival with artisanal loose-leaf herbal teas and fresh water',
    imageSrc: '',
    isRealPhoto: false,
    type: 'tea',
    specs: {
      sound: 'Subtle Cascading Water Fountain',
      temp: 'Comfortable Room Air',
      light: 'Warm Shoji Screen Glow',
    },
    amenities: [
      'Complimentary herbal teas (chamomile, spearmint, lemon balm)',
      'Shoes-off arrival area with clean felt slippers',
      'Calming reading materials on body mechanics',
      'A moment to take a breath before beginning',
    ],
  },
  {
    id: 'space-apothecary',
    title: 'Botanical Apothecary Bar',
    subtitle: 'Pure cold-pressed carrier oils and steam-distilled organic extracts',
    imageSrc: '',
    isRealPhoto: false,
    type: 'apothecary',
    specs: {
      sound: 'Whisper-Quiet Consultation Area',
      temp: 'Fresh Ambient Climate',
      light: 'Natural Task Lighting',
    },
    amenities: [
      'Pure organic jojoba, sweet almond, and camellia seed oils',
      'Single-origin French lavender and sweet marjoram',
      'Fragrance-free options for sensitive skin',
      'Customized aroma pairing for each visit',
    ],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Sarah M.',
    service: 'Signature Whole Body massage',
    quote: 'Booking Shairu to our hotel suite in Sydney CBD was the best decision after a 14-hour flight. The therapist arrived with a plush heated bed and calming lavender oils. Pure perfection.',
  },
  {
    id: 'r2',
    name: 'Liam D.',
    service: 'Deep tissue Massage',
    quote: 'Having a high-caliber deep tissue therapist come directly to my apartment in Bondi saved me so much hassle. Transparent $140 for 90 minutes with zero travel fees. Unmatched service.',
  },
  {
    id: 'r3',
    name: 'Amelia T.',
    service: 'Indian Head Massage',
    quote: 'The Indian Head Massage melted away weeks of corporate screen fatigue right in my living room in North Sydney. Professional, punctual, and respectful.',
  },
  {
    id: 'r4',
    name: 'Devon P.',
    service: 'Back Massage',
    quote: 'Having straightforward flat pricing ($100 for an hour) made booking effortless. The therapist arrived on time at our Darling Harbour hotel with fresh linens and warm towels.',
  },
  {
    id: 'r5',
    name: 'Chloe & Marcus',
    service: 'Relaxation Spa',
    quote: 'The 2-hour Relaxation Spa session at home in the Inner West was bliss. Organic aromatherapy, warm stone lumbar placement, and completely unhurried care.',
  },
  {
    id: 'r6',
    name: 'Caleb W.',
    service: 'Feet Massage',
    quote: 'After the City2Surf run, having Shairu come to my home for the Feet Massage and reflexology brought my tired legs back to life immediately.',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'How does your mobile massage in Sydney work?',
    answer: 'We bring the complete 5-star spa experience directly to your door anywhere in Sydney. Our licensed therapist brings a professional heated massage table, sanitized organic cotton linens, warm compresses, and botanical essential oils. All you need to provide is a quiet space with enough room for the table.',
  },
  {
    question: 'How does your pricing work?',
    answer: 'We maintain 100% transparent flat pricing across all 6 treatments with no surprise clinic or travel fees within our core Sydney coverage areas: $100 for 1 hour (60 min), $140 for 1.5 hours (90 min), and $170 for 2 hours (120 min).',
  },
  {
    question: 'Do you visit hotels and serviced apartments in Sydney?',
    answer: 'Yes! We regularly visit luxury hotels, Airbnb apartments, and serviced suites across Sydney CBD, Darling Harbour, Barangaroo, and surrounding suburbs. Simply specify your hotel name and room number when booking.',
  },
  {
    question: 'What areas in Sydney do you cover?',
    answer: 'We cover Greater Sydney including Sydney CBD, Darling Harbour, Eastern Suburbs (Bondi, Double Bay, Coogee), North Sydney, Lower North Shore, Inner West (Newtown, Balmain, Surry Hills), and Western Suburbs.',
  },
  {
    question: 'What should I prepare before the therapist arrives?',
    answer: 'Very little! Just ensure there is enough floor space (approx 2m x 3m) to set up the massage table. Your therapist will arrive 5–10 minutes before the scheduled hands-on time to set up the bed, warm the oils, and conduct a brief consultation.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We kindly request at least 24 hours notice for any cancellation or rescheduling so our travelling therapists can adjust their Sydney transit schedules.',
  },
];

