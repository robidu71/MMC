import { ServiceItem, GallerySpace, ReviewItem, FAQItem } from '../types';

export const STUDIO_INFO = {
  name: "Masud's Massage Center (MMC)",
  shortName: 'MMC',
  tagline: 'A quieter kind of care',
  heroSubtitle: 'Space to soften, room to breathe',
  heroDesc: 'Thoughtful, one-to-one massage for the places that hold the day. A welcoming pause, shaped around what you need.',
  address: '428 Maple St, Suite 2B, Peaceful Arts Quarter',
  phone: '(415) 890-7662',
  email: 'hello@masudmassagecenter.com',
  hours: 'Monday – Saturday: 9:00 AM – 8:00 PM · By appointment',
};

export const APPROACH_PILLARS = [
  {
    num: '01',
    title: 'Unrushed check-in',
    description: 'We begin with a few quiet minutes to talk about how your body is feeling today, what areas hold tension, and what kind of session serves you best.',
  },
  {
    num: '02',
    title: 'Pressure you guide',
    description: 'No guessing, no white-knuckling. You set the depth, and we adjust as we go. From gentle restorative touch to focused, intentional deep work.',
  },
  {
    num: '03',
    title: 'Room to settle',
    description: 'A quiet, private room with warm organic linens, natural sunlight, and generous time to settle in and out without watching the clock.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'restorative',
    num: '01',
    title: 'Restorative massage',
    tagline: 'Flowing full-body relaxation',
    detail: 'A flowing, full-body session to quiet the noise and let your system settle.',
    durations: '60 min',
    priceDisplay: '$100 – $115',
    color: '#ede5d8',
    durationOptions: [
      { minutes: 60, price: 100, label: 'Standard session' },
      { minutes: 60, price: 115, label: 'First visit / peak' },
    ],
    included: [
      'Full-body Swedish effleurage glides',
      'Warm botanical compresses for feet and back',
      'Cold-pressed golden jojoba & lavender oil',
      'Unhurried check-in and post-session water',
    ],
  },
  {
    id: 'focused',
    num: '02',
    title: 'Focused relief',
    tagline: 'Targeted myofascial & trigger point',
    detail: 'Intentional work for stubborn tension, with pressure and pace guided by you.',
    durations: '75 min',
    priceDisplay: '$120 – $149',
    color: '#dce3d8',
    durationOptions: [
      { minutes: 75, price: 120, label: 'Focused session' },
      { minutes: 75, price: 149, label: 'Intensive deep work' },
    ],
    included: [
      'Targeted neck, shoulder & spinal decompression',
      'Gentle passive traction and fascia melting',
      'Arnica & hypericum connective tissue balm',
      'Postural ergonomics check-in',
    ],
  },
  {
    id: 'more-time',
    num: '03',
    title: 'A little more time',
    tagline: 'Longer exhale & whole-body ease',
    detail: 'A longer exhale. More room to address the whole body without watching the clock.',
    durations: '90 min',
    priceDisplay: '$150 – $200',
    color: '#e9ddd2',
    durationOptions: [
      { minutes: 90, price: 150, label: 'Unhurried 90 min' },
      { minutes: 90, price: 200, label: 'Comprehensive hot stone ritual' },
    ],
    included: [
      'Comprehensive unhurried 90-minute session',
      'Heated basalt stones for lumbar & shoulders',
      'Slow scalp acupressure & foot reflexology',
      'Quiet transition time in the private studio',
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
    name: 'Mara L.',
    service: 'Restorative massage',
    quote: 'The room felt peaceful from the moment I arrived. Masud took time to understand what kind of session I wanted.',
  },
  {
    id: 'r2',
    name: 'Elliot R.',
    service: 'Focused relief',
    quote: 'I appreciated how clearly we talked through pressure and focus before getting started. The whole visit felt considered.',
  },
  {
    id: 'r3',
    name: 'Nina C.',
    service: 'A little more time',
    quote: 'Having a little extra time made the session feel wonderfully unhurried. I never felt like I needed to watch the clock.',
  },
  {
    id: 'r4',
    name: 'Devon P.',
    service: 'Restorative massage',
    quote: 'A warm welcome, a quiet space, and a thoughtful pace. It was easy to settle in and be present.',
  },
  {
    id: 'r5',
    name: 'Tessa M.',
    service: 'Focused relief',
    quote: 'I could ask for adjustments at any point, and the session stayed centered on what felt comfortable to me.',
  },
  {
    id: 'r6',
    name: 'Caleb W.',
    service: 'A little more time',
    quote: 'The longer session gave us room to check in and take things at a pace that felt right.',
  },
  {
    id: 'r7',
    name: 'Priya S.',
    service: 'Restorative massage',
    quote: 'Everything felt personal without being fussy. I left feeling glad I had made the time for myself.',
  },
  {
    id: 'r8',
    name: 'Graham B.',
    service: 'Focused relief',
    quote: 'A genuinely attentive experience. We agreed on a plan together and the chronic tightness in my shoulders has finally released.',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'How do I choose a session length?',
    answer: 'A 60-minute visit is a lovely starting point. If you’d like broader focus or more time to settle in, consider a 75 or 90-minute session. We can help you decide when you reach out or book online.',
  },
  {
    question: 'What should I expect at my first visit?',
    answer: 'We begin with a few quiet minutes to discuss your goals, areas holding tension, and what depth of pressure feels good. You will have full privacy to undress to your comfort level, and you will always be professionally draped with clean linens.',
  },
  {
    question: 'Can I ask for a different pressure or focus?',
    answer: 'Always. You are in complete control of the depth and pace. If you’d like lighter or firmer pressure at any moment, simply speak up—adjustments are always welcomed and encouraged.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Life happens. We kindly ask for 24 hours notice to reschedule or cancel so we can offer that reserved time to someone waiting.',
  },
  {
    question: 'Do you take insurance or provide receipts?',
    answer: 'Yes! We provide itemized receipts with all professional licensing credentials and national provider numbers for submission to your extended health benefits plan.',
  },
];
