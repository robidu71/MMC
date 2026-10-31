import { ServiceItem, GallerySpace, ReviewItem, FAQItem } from '../types';

export const STUDIO_INFO = {
  name: 'Shairu',
  shortName: 'Shairu Mobile Massage',
  tagline: 'Mobile Massage Australia',
  heroSubtitle: 'Certified Male Therapist · 10+ Years Experience',
  heroDesc: 'Enjoy 5-star relaxation delivered directly to your room by our certified senior male therapist with 10+ years of professional clinical and luxury spa experience. We bring everything to your door—a heated memory-foam table, fresh organic linens, natural botanical oils, and soothing ambient music. Available 7 days a week from 8:00 AM to 10:00 PM for luxury hotel suites, private apartments, and homes across Australia.',
  address: 'Mobile Service across Australia (Sydney, Melbourne, Brisbane & metro hubs)',
  city: 'Australia',
  phone: '+61 433 556 409',
  phoneDisplay: '+61 433 556 409',
  whatsapp: '+61 433 556 409',
  whatsappUrl: 'https://wa.me/61433556409?text=Hi%20Shairu%20Mobile%20Massage%2C%20I%20would%20like%20to%20book%20a%20treatment%20in%20Australia',
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
    title: '10+ Years Experienced Male Therapist',
    desc: 'Accredited Australian qualifications, 10+ years of clinical & 5-star spa expertise, police-vetted and fully insured.',
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
    detail: 'A time-honored Ayurvedic therapy focused on acupressure points across the scalp, temples, neck, and upper shoulders. Highly recommended for relieving mental fatigue, screen strain, migraines, and tight neck muscles.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#ede5d8',
    imageSrc: '/src/assets/images/massage_hot_stones_luxury_1793430255272.jpg',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Warm organic botanical scalp & temple essential oils',
      'Cranial acupressure release for headache & screen relief',
      'Cervical spine, neck & trapezius muscle mobilization',
      'Gentle forehead and temple lymphatic drainage strokes',
      'Serene ambient soundscape for profound mental clarity',
    ],
  },
  {
    id: 'feet-massage',
    num: '02',
    title: 'Feet Massage',
    tagline: 'Reflexology & lower-leg relief',
    detail: 'An intensive restorative foot reflexology therapy that stimulates vital pressure zones on the soles, arches, ankles, and calves. Perfect for travelers, executives, and anyone standing or walking for long hours.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#dce3d8',
    imageSrc: '/src/assets/images/foot_reflexology_restorative_1793430297425.jpg',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Steamed botanical herbal towel compresses for tired feet',
      'Targeted plantar arch reflexology & energy pathway work',
      'Hydrating organic arnica and peppermint cooling balm',
      'Calf muscle, Achilles tendon & ankle decompression',
      'Promotes healthy circulation and whole-body vitality',
    ],
  },
  {
    id: 'back-massage',
    num: '03',
    title: 'Back Massage',
    tagline: 'Targeted spine & shoulder decompression',
    detail: 'Focused deep relief for upper back, scapulae, spinal erectors, and the lumbar zone. Specifically tailored to unravel postural fatigue, desk slouching, heavy lifting strain, and lower back soreness.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#e9ddd2',
    imageSrc: '/src/assets/images/relaxing_body_massage_therapy_1793430269067.jpg',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Deep spinal warming friction and targeted effleurage',
      'Scapular mobilization and rhomboid knot unraveling',
      'Warm herbal towel compress for lumbar spine comfort',
      'Custom therapeutic pressure calibrated to your comfort',
      'Instant relief for tight shoulders and spinal stiffness',
    ],
  },
  {
    id: 'deep-tissue',
    num: '04',
    title: 'Deep tissue Massage',
    tagline: 'Firm myofascial knot release',
    detail: 'Deliberate, firm therapeutic strokes designed to reach the deeper layers of muscle tissue and fascia. Ideal for athletes, active travelers, and anyone struggling with stubborn tension knots and chronic stiffness.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#e3dfd3',
    imageSrc: '/src/assets/images/sydney_luxury_massage_1793382660973.jpg',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Targeted myofascial release along chronic tension lines',
      'Trigger point knot melting with sustained thumb & elbow work',
      'Therapeutic arnica, eucalyptus & organic wintergreen balm',
      'Continuous pressure check-ins guided by your feedback',
      'Accelerates muscular recovery and increases range of motion',
    ],
  },
  {
    id: 'relaxation-spa',
    num: '05',
    title: 'Relaxation Spa',
    tagline: 'Gentle nervous system restoration',
    detail: 'A rhythmic Swedish-style massage that gently unwinds your nervous system, lowers cortisol, and promotes restorative sleep. Features warm botanical oils and long soothing strokes that melt away anxiety.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#ede8dd',
    imageSrc: '/src/assets/images/sydney_mobile_massage_1793382502662.jpg',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Flowing Swedish rhythmic effleurage and petrissage strokes',
      'Warm organic cotton compress draping across back and feet',
      'Single-origin French lavender and sweet chamomile aromatherapy',
      'Restores optimal nervous system balance and deep peaceful sleep',
      'Full heated table comfort brought right into your room',
    ],
  },
  {
    id: 'signature-whole-body',
    num: '06',
    title: 'Signature Whole Body massage',
    tagline: 'Comprehensive head-to-toe journey',
    detail: 'Our ultimate 5-star mobile therapy. A seamless full-body integration encompassing head and scalp acupressure, neck mobilization, focused back work, leg tension release, and grounding foot reflexology.',
    durations: '1h · 1.5h · 2h',
    priceDisplay: '$100 / $140 / $170',
    color: '#dfe5dc',
    imageSrc: '/src/assets/images/hotel_suite_massage_sanctuary_1793430281840.jpg',
    durationOptions: [
      { minutes: 60, price: 100, label: '1 hour' },
      { minutes: 90, price: 140, label: '1.5 hours' },
      { minutes: 120, price: 170, label: '2 hours' },
    ],
    included: [
      'Comprehensive head-to-toe luxury bodywork journey',
      'Heated basalt volcanic stones placed on lumbar spine',
      'Integrated scalp pressure points & foot reflexology finish',
      'Cold-pressed golden organic jojoba & almond oils',
      'Ultimate complete physical and mental renewal',
    ],
  },
];

export const GALLERY_SPACES: GallerySpace[] = [
  {
    id: 'space-inhome',
    title: 'Eco-Luxe In-Home Sanctuary',
    subtitle: 'Sunlit living room setup with organic unbleached linen, living eucalyptus greenery, and ergonomic heated massage table.',
    imageSrc: '/src/assets/images/in_home_botanical_spa_1793436289912.jpg',
    isRealPhoto: true,
    specs: {
      sound: 'Gentle Acoustic Calm',
      temp: 'Warm 23°C Heated Table',
      light: 'Filtered Natural Daylight',
    },
    amenities: [
      'Eco-friendly unbleached organic linen draping',
      'Whisper-quiet heated memory-foam mobile table',
      'Amber glass organic botanical oil bottles',
      'Handcrafted natural timber side setup',
    ],
  },
  {
    id: 'space-room',
    title: 'Luxury Hotel Suite Retreat',
    subtitle: 'Private in-room transformation with heated table, plush organic linens, and serene harbor views.',
    imageSrc: '/src/assets/images/hotel_suite_massage_sanctuary_1793430281840.jpg',
    isRealPhoto: true,
    specs: {
      sound: 'Soundproof Sanctuary',
      temp: 'Adjustable Heated Bed',
      light: 'Soft Amber Twilight Glow',
    },
    amenities: [
      'Discreet mobile dispatch to 4 & 5-star hotels',
      'Ultra-wide heated plush table setup',
      'Pure organic cotton sheets and thermal blanket',
      'Complimentary binaural soundscape audio',
    ],
  },
  {
    id: 'space-scalp',
    title: 'Herbal Oil & Scalp Acupressure',
    subtitle: 'Warm organic jojoba, sweet almond oil, and fresh lavender infusion for soothing cranial stress relief.',
    imageSrc: '/src/assets/images/herbal_scalp_relaxation_1793436303081.jpg',
    isRealPhoto: true,
    specs: {
      sound: 'Aromatherapy Stillness',
      temp: 'Warm Herbal Compresses',
      light: 'Golden Beeswax Candlelight',
    },
    amenities: [
      'Cold-pressed certified organic golden jojoba oil',
      'Fresh botanical eucalyptus and lavender sprigs',
      'Artisanal handcrafted clay warming vessels',
      'Targeted tension relief for scalp and temple knots',
    ],
  },
  {
    id: 'space-soak',
    title: 'Botanical Foot Soak & Reflexology',
    subtitle: 'Warm copper basin with wild eucalyptus, lavender blossoms, and grounding reflexology pressure points.',
    imageSrc: '/src/assets/images/botanical_foot_soak_care_1793436317955.jpg',
    isRealPhoto: true,
    specs: {
      sound: 'Soft Water & Earth Tones',
      temp: 'Warm Herbal Thermal Soak',
      light: 'Warm Gentle Sunbeams',
    },
    amenities: [
      'Hammered pure copper foot basin ritual',
      'Wild-harvested Australian eucalyptus & lavender',
      'Organic waffle-weave bamboo fiber towels',
      'Grounding relief for travel stiffness & plantar tension',
    ],
  },
  {
    id: 'space-session',
    title: 'Therapeutic Bodywork Effleurage',
    subtitle: 'Gentle, restorative touch with rhythmic Swedish strokes on heated memory-foam bedding.',
    imageSrc: '/src/assets/images/relaxing_body_massage_therapy_1793430269067.jpg',
    isRealPhoto: true,
    specs: {
      sound: 'Soft Ambient Quietude',
      temp: 'Thermostatic Temperature Control',
      light: 'Dimmable Warm Candlelight',
    },
    amenities: [
      'Collaborative pressure and pacing check-in',
      'Warm towel compresses for feet and neck',
      'Unscented or gentle botanical oil options',
      'Generous buffer time between appointments',
    ],
  },
  {
    id: 'space-apothecary',
    title: 'Heated Basalt & Organic Botanicals',
    subtitle: 'Smooth volcanic stones, jasmine & lavender essential oils, and plush Egyptian cotton.',
    imageSrc: '/src/assets/images/massage_hot_stones_luxury_1793430255272.jpg',
    isRealPhoto: true,
    specs: {
      sound: 'Tranquil Acoustic Sanctuary',
      temp: 'Warm Volcanic Basalt Stones',
      light: 'Golden Ambient Luminescence',
    },
    amenities: [
      'Pure organic jojoba, sweet almond, and camellia seed oils',
      'Single-origin French lavender and sweet marjoram',
      'Smooth hand-polished basalt stones for lumbar heat',
      'Hypoallergenic botanical preparations for sensitive skin',
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

