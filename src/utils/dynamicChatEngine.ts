// Dynamic intelligent chat response engine for Shairu Mobile Massage Australia
// Provides context-aware, topic-specific, and multi-lingual (English, Bengali & Banglish) answers.

export interface ChatHistoryItem {
  sender: 'user' | 'bot';
  text: string;
}

export function generateDynamicChatResponse(
  rawQuery: string,
  _history?: ChatHistoryItem[]
): { reply: string; grounded: boolean } {
  const query = (rawQuery || '').trim();
  const q = query.toLowerCase();

  if (!query) {
    return {
      reply: 'Hello! How can I assist you with Shairu mobile massage treatments, pricing, or hotel visits across Australia today?',
      grounded: true,
    };
  }

  // 1. GREETINGS & PLEASANTRIES (English & Bengali/Banglish)
  if (
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|howdy|hola|yo)[\s!.]*$/i.test(q) ||
    /^(kemon\s+(acho|achen)|ki\s+khobor|hala|halo|salaam|assalamu\s*alaikum|namaste)[\s!.]*$/i.test(q)
  ) {
    if (q.includes('kemon') || q.includes('ki khobor') || q.includes('salaam') || q.includes('alaikum') || q.includes('namaste')) {
      return {
        reply: `হ্যালো! Shairu Mobile Massage Australia-তে আপনাকে স্বাগতম। 🌿
আমাদের সার্টিফাইড থেরাপিস্টরা সরাসরি আপনার হোটেল রুম বা বাসায় প্রিমিয়াম ম্যাসাজ সেবা পৌঁছে দেয়।

আমরা ৬টি স্পেশাল ট্রিটমেন্ট প্রদান করি ($১০০/১ ঘণ্টা, $১৪০/১.৫ ঘণ্টা, $১৭০/২ ঘণ্টা)। আপনি কোন সেবা বা এলাকা সম্পর্কে জানতে চান? বুকিং করতে সরাসরি WhatsApp-এ মেসেজ দিন: +61 433 556 409।`,
        grounded: true,
      };
    }

    return {
      reply: `Hello and welcome to Shairu Mobile Massage Australia! 🌿
We deliver 5-star luxury spa treatments directly to your hotel suite, executive apartment, or home 7 days a week (8:00 AM – 10:00 PM).

How can I help you today? I can assist with:
• Our 6 specialized treatments (Deep Tissue, Indian Head, Feet, Back, Relaxation, Whole Body)
• Transparent rates ($100 for 1h, $140 for 1.5h, $170 for 2h)
• Hotel room dispatch across Sydney, Melbourne, Brisbane & beyond
• Instant booking via WhatsApp at +61 433 556 409`,
      grounded: true,
    };
  }

  // 2. "HOW ARE YOU" / STATUS
  if (
    q.includes('how are you') ||
    q.includes('how r u') ||
    q.includes("how're you") ||
    q.includes('how do you do') ||
    q.includes('how is it going')
  ) {
    return {
      reply: `I am doing wonderfully, thank you for asking! 😊 
I'm here to ensure you experience effortless relaxation and find the perfect mobile massage treatment for your stay in Australia. 

Are you looking for a tension-relieving deep tissue, a soothing relaxation session, or an in-room hotel booking today?`,
      grounded: true,
    };
  }

  // 3. IDENTITY / "WHO ARE YOU" / "WHAT IS SHAIRU"
  if (
    /\bwho\s+are\s+you\b/i.test(q) ||
    /\bwhat\s+is\s+your\s+name\b/i.test(q) ||
    /\bwhat\s+do\s+you\s+do\b/i.test(q) ||
    q.includes('tumi ke') ||
    q.includes('apni ke') ||
    q.includes('naam ki') ||
    q.includes('what is shairu')
  ) {
    return {
      reply: `I am SHAIRU Chat, the official virtual concierge for Shairu Mobile Massage Australia. 

Shairu is Australia’s premier on-demand mobile massage service. We dispatch fully certified, background-vetted male and female therapists equipped with portable heated massage tables, fresh luxury linens, and organic botanical oils straight to your hotel room or home.

You can ask me anything about our treatments, coverage zones, therapist qualifications, or message our booking desk directly on WhatsApp at +61 433 556 409!`,
      grounded: true,
    };
  }

  // 4. BENGALI & BANGLISH SPECIFIC QUESTIONS
  if (q.includes('koto taka') || q.includes('dam koto') || q.includes('koto lagbe') || q.includes('rate koto')) {
    return {
      reply: `Shairu-তে আমাদের সব কয়টি ৬টি সিগনেচার ট্রিটমেন্টের রেট একদম স্বচ্ছ ও ফিক্সড:
• ১ ঘণ্টা (৬০ মিনিট): $১০০ AUD
• ১.৫ ঘণ্টা (৯০ মিনিট): $১৪০ AUD (সবচেয়ে জনপ্রিয়)
• ২ ঘণ্টা (১২০ মিনিট): $১৭০ AUD

*এতে পোর্টেবল হিটেড টেবিল, অর্গানিক অয়েল এবং ফ্রেশ লিনেন সেটআপ অন্তর্ভুক্ত। প্রধান মেট্রো এলাকায় কোনো অতিরিক্ত ট্রাভেল ফি নেই!*
বুক করতে মেসেজ দিন WhatsApp-এ: +61 433 556 409`,
      grounded: true,
    };
  }

  if (q.includes('kivabe book') || q.includes('booking kivabe') || q.includes('book korbo')) {
    return {
      reply: `বুকিং করা অত্যন্ত সহজ ও দ্রুত:
১. আমাদের WhatsApp নাম্বারে (+61 433 556 409) মেসেজ বা কল করুন।
২. আপনার পছন্দের ট্রিটমেন্ট (যেমন Deep Tissue, Swedish Relaxation বা Head Massage), কাঙ্ক্ষিত সময় এবং হোটেলের নাম ও রুম নাম্বার (অথবা বাসার ঠিকানা) জানান।
৩. আমাদের সার্টিফাইড থেরাপিস্ট হিটেড টেবিল ও সব সামগ্রী নিয়ে ঠিক সময়ে আপনার ঠিকানায় পৌঁছে যাবেন।

সরাসরি বুক করতে WhatsApp লিঙ্ক: +61 433 556 409`,
      grounded: true,
    };
  }

  if (q.includes('hotel e ashbe') || q.includes('hotel e ashte') || q.includes('hotel e hobe')) {
    return {
      reply: `হ্যাঁ, অবশ্যই! আমরা অস্ট্রেলিয়ার বিভিন্ন ৪-স্টার ও ৫-স্টার হোটেল (যেমন Four Seasons, Crown, Hilton, Meriton, Sofitel, Marriott, Hyatt) এবং এয়ারবিএনবি-তে ইন-রুম ম্যাসাজ সেবা দিয়ে থাকি।

থেরাপিস্ট সম্পূর্ণ পেশাদারভাবে হিটেড টেবিল, পরিষ্কার টাওয়েল ও অর্গানিক তেল নিয়ে আপনার রুমে এসে পুরো স্পা সেটআপ করবেন। আপনি রুমে বসেই প্রশান্তি উপভোগ করতে পারবেন।`,
      grounded: true,
    };
  }

  if (q.includes('ki ki massage') || q.includes('ki service') || q.includes('services ki')) {
    return {
      reply: `আমাদের ৬টি স্পেশালাইজড সিগনেচার ম্যাসাজ রয়েছে:
১. Indian Head Massage — মাথার চাপ, মাইগ্রেন ও ক্লান্তি দূরীকরণ
২. Restorative Feet Massage — পা ও পায়ের পাতার রিফ্লেক্সোলজি
৩. Targeted Back Massage — মেরুদণ্ড ও পিঠের মাংসপেশির ব্যথা উপশম
৪. Deep Tissue Massage — গভীর মাংসপেশির গিঁট ও দীর্ঘস্থায়ী টান মুক্তি
৫. Relaxation Spa — সুগন্ধি তেল সহ মৃদু সুইডিশ শান্তিদায়ক ম্যাসাজ
৬. Signature Whole Body — মাথা থেকে পা পর্যন্ত সম্পূর্ণ লাক্সারি রিস্টোর

মূল্য: ১ ঘণ্টা $১০০ | ১.৫ ঘণ্টা $১৪০ | ২ ঘণ্টা $১৭০। বুক করতে WhatsApp: +61 433 556 409`,
      grounded: true,
    };
  }

  // 5. COUPLES & TWO PEOPLE (Priority over generic hotel/room)
  if (
    q.includes('couple') ||
    q.includes('two') ||
    q.includes('2 people') ||
    q.includes('both of us') ||
    q.includes('partner') ||
    q.includes('together') ||
    q.includes('husband and wife')
  ) {
    return {
      reply: `We cater extensively to couples, partners, and traveling companions for hotel rooms and private homes!

Two options are available:
1. Back-to-Back: One therapist provides consecutive treatments (e.g. 1 hour each, or 90 minutes each). This is very easy to schedule.
2. Side-by-Side (Dual Therapists): Two therapists visit simultaneously with two tables for a synchronized in-room spa experience (subject to therapist availability in your zone).

Rates remain our standard transparent pricing per person:
• 1 Hour: $100 per person
• 1.5 Hours: $140 per person
• 2 Hours: $170 per person

Please message WhatsApp at +61 433 556 409 to confirm dual-therapist availability for your preferred time!`,
      grounded: true,
    };
  }

  // 6. PREGNANCY & PRENATAL
  if (
    q.includes('pregnant') ||
    q.includes('pregnancy') ||
    q.includes('prenatal') ||
    q.includes('maternity') ||
    q.includes('expecting')
  ) {
    return {
      reply: `Yes, we provide gentle, safe prenatal relaxation massage for expecting mothers in their 2nd and 3rd trimesters!

• Comfortable Side-Lying Position: With supportive cushioning to protect mother and baby.
• Targeted Relief: Gently alleviates lower back ache, hip stiffness, and ankle/foot fluid retention.
• Safe Oils: We use pure, pregnancy-safe, unscented organic oils.
• Qualified Practitioners: Administered by therapists trained in gentle prenatal care.

*Please note: We do not perform treatments during the first trimester. Kindly inform our team of your gestation week when booking via WhatsApp at +61 433 556 409.*`,
      grounded: true,
    };
  }

  // 7. SPECIFIC TREATMENT: INDIAN HEAD & SCALP & MIGRAINE
  if (
    q.includes('head') ||
    q.includes('scalp') ||
    q.includes('migraine') ||
    q.includes('headache') ||
    q.includes('indian head') ||
    q.includes('brain fog') ||
    q.includes('cranial')
  ) {
    return {
      reply: `Our Indian Head Massage ($100 for 1h, $140 for 1.5h, $170 for 2h) is an ancient restorative therapy focusing on acupressure meridians of the scalp, neck, temples, and shoulders:

• Relief for Headaches & Migraines: Dissolves vascular constriction, cranial pressure, and persistent tension headaches.
• Calms the Nervous System: Relieves mental fatigue, screen exhaustion, and insomnia.
• Upper Trapezius Release: Soothes stubborn stiffness in the neck and shoulder blades.
• Gentle Botanical Drops: Optional nourishing organic hair/scalp botanical drops upon request.

Highly recommended for travelers, busy executives, and anyone experiencing digital screen strain! Message WhatsApp +61 433 556 409 to book.`,
      grounded: true,
    };
  }

  // 8. SPECIFIC TREATMENT: FEET & REFLEXOLOGY
  if (
    q.includes('feet') ||
    q.includes('foot') ||
    q.includes('reflexology') ||
    q.includes('leg') ||
    q.includes('swollen') ||
    q.includes('walking') ||
    q.includes('plantar') ||
    q.includes('calf') ||
    q.includes('calves')
  ) {
    return {
      reply: `Our Restorative Feet Massage ($100 for 1h, $140 for 1.5h, $170 for 2h) revitalizes tired legs and feet through precise reflexology and acupressure points:

• Restores Tired Legs: Relieves swelling, travel fatigue, and soreness from walking around Australia’s sights or sitting on long-haul flights.
• Balances Body Energy: Stimulates reflexology zones corresponding to internal organs and full-body relaxation.
• Luxurious Care: Includes warm compression towels and hydrating botanical foot balm.
• Lymphatic Drainage: Improves lower limb circulation and reduces ankle tightness.

An absolute bliss after a long flight or walking tour! Message +61 433 556 409 on WhatsApp to book.`,
      grounded: true,
    };
  }

  // 9. SPECIFIC TREATMENT: BACK MASSAGE & POSTURE / SPINAL RELIEF
  if (
    q.includes('back') ||
    q.includes('spine') ||
    q.includes('spinal') ||
    q.includes('lumbar') ||
    q.includes('posture') ||
    q.includes('thoracic') ||
    q.includes('desk')
  ) {
    return {
      reply: `Our Targeted Back Massage ($100 for 1h, $140 for 1.5h, $170 for 2h) focuses on spinal alignment, shoulder blade tension, and lower back decompression:

• Alleviates Desk & Postural Fatigue: Releases chronic tightness along the erector spinae and rhomboids caused by long sitting.
• Lumbar Relief: Decompresses lower back muscles and eases sacroiliac tightness.
• Dual Modality: Blends rhythmic effleurage to warm muscles with focused trigger-point kneading.
• Heated Organic Oils: Deeply penetrates muscle tissues for long-lasting mobility and ease.

Available in 60, 90, or 120-minute sessions. Text WhatsApp +61 433 556 409 for fast booking!`,
      grounded: true,
    };
  }

  // 10. SPECIFIC TREATMENT: DEEP TISSUE & REMEDIAL / KNOTS / MUSCLE PAIN
  if (
    q.includes('deep tissue') ||
    q.includes('knot') ||
    q.includes('pain') ||
    q.includes('sore') ||
    q.includes('tight') ||
    q.includes('muscle') ||
    q.includes('stiff') ||
    q.includes('sciatica') ||
    q.includes('gym') ||
    q.includes('sports') ||
    q.includes('remedial') ||
    q.includes('firm') ||
    q.includes('hard pressure') ||
    q.includes('pressure')
  ) {
    return {
      reply: `Our Deep Tissue Massage ($100 for 1h, $140 for 1.5h, $170 for 2h) is engineered specifically for relieving stubborn myofascial knots and chronic muscle tension:

• Targeted Technique: Utilizes slow, deliberate strokes and deep finger/forearm pressure across deeper muscle layers and connective tissue.
• Common Targets: Upper shoulder knots, lower back stiffness, tight hamstrings, and postural strain from desk work or flights.
• Tailored Intensity: Your certified therapist constantly calibrates pressure to your exact comfort threshold—from medium-firm to strong therapeutic depth.
• Includes: Warm therapeutic oils to promote blood flow and faster recovery.

Would you like to book a 60, 90, or 120-minute Deep Tissue session? Message +61 433 556 409 on WhatsApp!`,
      grounded: true,
    };
  }

  // 11. SPECIFIC TREATMENT: RELAXATION SPA & SWEDISH / SLEEP
  if (
    q.includes('relaxation') ||
    q.includes('relax') ||
    q.includes('swedish') ||
    q.includes('gentle') ||
    q.includes('calm') ||
    q.includes('sleep') ||
    q.includes('insomnia') ||
    q.includes('aromatherapy') ||
    q.includes('peace') ||
    q.includes('light pressure')
  ) {
    return {
      reply: `Our Relaxation Spa Massage ($100 for 1h, $140 for 1.5h, $170 for 2h) is a classic Swedish-inspired therapy designed for complete peace of mind:

• Rhythmic Effleurage: Long, flowing strokes that gently glide over muscles to dissolve daily tension.
• Botanical Aromatherapy: Infused with therapeutic essential oils (lavender, bergamot, chamomile) that soothe the nervous system.
• Deep Restful Sleep: Significantly lowers cortisol levels, melts away anxiety, and prepares your body for restorative sleep.
• Pressure: Gentle to medium pressure customized exactly to your relaxation preference.

The perfect treatment after a stressful week or travel day. Book via WhatsApp at +61 433 556 409!`,
      grounded: true,
    };
  }

  // 12. SPECIFIC TREATMENT: SIGNATURE WHOLE BODY
  if (
    q.includes('whole body') ||
    q.includes('full body') ||
    q.includes('signature') ||
    q.includes('head to toe') ||
    q.includes('complete body') ||
    q.includes('all over')
  ) {
    return {
      reply: `Our Signature Whole Body Massage ($100 for 1h, $140 for 1.5h, $170 for 2h) is Shairu’s flagship head-to-toe luxury restoration experience:

• Head-to-Toe Harmony: Integrates scalp, neck, shoulders, back, arms, legs, and feet into one seamless, therapeutic journey.
• Harmonious Blends: Combines relaxing Swedish strokes, targeted pressure points, and heated botanical oils.
• Rejuvenates Energy: Clears physical fatigue while resetting mental clarity and overall vitality.
• Recommended: The 90-minute ($140) or 120-minute ($170) option is strongly recommended to allow ample time for every muscle group.

Treat yourself to the ultimate in-room spa experience. Message WhatsApp +61 433 556 409 to reserve!`,
      grounded: true,
    };
  }

  // 13. PRICING & PAYMENT
  if (
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('rate') ||
    q.includes('fee') ||
    q.includes('how much') ||
    q.includes('dollar') ||
    q.includes('aud') ||
    q.includes('pricing') ||
    q.includes('tariff')
  ) {
    return {
      reply: `Shairu provides transparent, flat-rate pricing across all 6 signature treatments with zero hidden travel surcharges in major metropolitan zones:

• 1 Hour (60 minutes): $100 AUD — Ideal for focused back, head, or targeted pain relief.
• 1.5 Hours (90 minutes): $140 AUD — Our most popular duration for a comprehensive full-body restore.
• 2 Hours (120 minutes): $170 AUD — Ultimate luxury immersion and head-to-toe rejuvenation.

Included with every booking:
✓ Premium portable heated massage table
✓ Freshly laundered Egyptian cotton linens & plush towels
✓ 100% natural organic massage oils & relaxing aromatherapy
✓ Serene ambient soundscape audio

To reserve your session, message our concierge on WhatsApp at +61 433 556 409!`,
      grounded: true,
    };
  }

  if (
    q.includes('payment') ||
    q.includes('pay') ||
    q.includes('credit card') ||
    q.includes('card') ||
    q.includes('cash') ||
    q.includes('payid') ||
    q.includes('transfer') ||
    q.includes('eftpos')
  ) {
    return {
      reply: `We offer flexible and seamless payment options for your convenience:

• Cash on arrival directly to your therapist
• Credit/Debit Card (Visa, Mastercard, American Express)
• Australian PayID / Direct Bank Transfer
• Digital receipts provided instantly for personal or company expense claims

Payment is processed smoothly upon completion of your treatment. Message +61 433 556 409 on WhatsApp to book!`,
      grounded: true,
    };
  }

  // 14. BOOKING PROCESS & HOW TO BOOK
  if (
    q.includes('how to book') ||
    q.includes('book a') ||
    q.includes('booking') ||
    q.includes('reserve') ||
    q.includes('appointment') ||
    q.includes('schedule') ||
    q.includes('can i book') ||
    q.includes('order a massage')
  ) {
    return {
      reply: `Booking your Shairu mobile massage is quick and effortless:

1. Send a Message: WhatsApp or call our dispatch desk at +61 433 556 409.
2. Share Details:
   • Desired treatment & duration (e.g. 90-min Deep Tissue)
   • Preferred date and time (8:00 AM – 10:00 PM daily)
   • Your location (Hotel name & room number, or residential address)
   • Therapist preference (Female or Male therapist available)
3. Instant Confirmation: Our concierge confirms your therapist dispatch immediately.
4. Total Relaxation: Your certified therapist arrives on time with the full luxury spa setup.

Ready to book now? Click the WhatsApp button or text +61 433 556 409!`,
      grounded: true,
    };
  }

  // 15. SAME DAY / DISPATCH TIME / URGENT
  if (
    q.includes('today') ||
    q.includes('now') ||
    q.includes('asap') ||
    q.includes('urgent') ||
    q.includes('how fast') ||
    q.includes('advance') ||
    q.includes('lead time') ||
    q.includes('short notice')
  ) {
    return {
      reply: `Yes, we welcome both same-day on-demand requests and advance bookings!

• Same-Day Dispatch: In major CBD and inner metropolitan areas (Sydney, Melbourne, Brisbane), therapists can typically arrive within 45 to 90 minutes depending on traffic and schedule.
• Advance Bookings: You can book days or weeks ahead to secure your preferred evening or weekend slot.
• Operating Hours: 8:00 AM to 10:00 PM, 7 days a week.

For immediate same-day dispatch, please message or call +61 433 556 409 on WhatsApp right away!`,
      grounded: true,
    };
  }

  // 16. HOTEL VISITS & CONCIERGE / ROOM ACCESS
  if (
    q.includes('hotel') ||
    q.includes('room') ||
    q.includes('resort') ||
    q.includes('suite') ||
    q.includes('airbnb') ||
    q.includes('stay') ||
    q.includes('four seasons') ||
    q.includes('hilton') ||
    q.includes('meriton') ||
    q.includes('crown') ||
    q.includes('sofitel') ||
    q.includes('marriott') ||
    q.includes('hyatt') ||
    q.includes('shangri-la')
  ) {
    return {
      reply: `Yes! 5-star hotel in-room visits are our signature specialty across Australia.

We regularly service guests at Four Seasons, Crown, Hilton, Meriton Suites, Sofitel, Marriott, Hyatt, The Star, Shangri-La, and boutique accommodations:

• In-Room Sanctuary: Your therapist brings a portable heated table, clean cotton sheets, organic oils, and soothing music—transforming your room into a luxury private day spa.
• Discreet & Professional: Therapists dress in pristine professional attire and navigate hotel concierge/elevators smoothly.
• Easy Booking: Simply message WhatsApp (+61 433 556 409) with your hotel name, guest name, and room number.

Available 7 days a week from 8:00 AM to 10:00 PM. Rates: $100 (1h) · $140 (1.5h) · $170 (2h).`,
      grounded: true,
    };
  }

  // 17. AT-HOME VISITS & PREPARATION / SPACE
  if (
    q.includes('home') ||
    q.includes('house') ||
    q.includes('apartment') ||
    q.includes('prepare') ||
    q.includes('preparation') ||
    q.includes('space') ||
    q.includes('what do i need') ||
    q.includes('table') ||
    q.includes('room space')
  ) {
    return {
      reply: `For in-home and apartment visits, preparation is completely effortless for you!

What you need to provide:
• A clear floor area of approximately 2m x 3m (in your living room, bedroom, or spare room)
• A comfortable room temperature

What your therapist brings:
✓ Professional portable heated massage table
✓ Freshly laundered cotton linens and soft plush towels
✓ Organic botanical massage oils (unscented options available)
✓ Ambient tranquil relaxation audio

We handle full setup and pack-down in just a few minutes so you can rest immediately after your treatment.`,
      grounded: true,
    };
  }

  // 18. THERAPISTS: GENDER, EXPERIENCE, CERTIFICATION, SAFETY & ATTIRE
  if (
    q.includes('therapist') ||
    q.includes('male') ||
    q.includes('experience') ||
    q.includes('year') ||
    q.includes('certified') ||
    q.includes('qualification') ||
    q.includes('safe') ||
    q.includes('safety') ||
    q.includes('police check') ||
    q.includes('insurance') ||
    q.includes('professional') ||
    q.includes('female') ||
    q.includes('what to wear') ||
    q.includes('clothes') ||
    q.includes('drape') ||
    q.includes('draping')
  ) {
    return {
      reply: `Your safety, comfort, and therapeutic recovery are in experienced hands:

• Senior Male Therapist (10+ Years Experience): Our senior practitioner brings over 10 years of clinical remedial, deep tissue, and 5-star luxury hotel experience across Australia.
• Certified & Insured: Holds accredited Australian qualifications, active national police clearances, and comprehensive liability insurance.
• Gender Preference: Led by our senior male therapist (10+ years exp). Female practitioners are also available upon advance request.
• Masterful Calibration: Over a decade of hands-on practice means pressure is calibrated intuitively to your exact preference—from firm knot release to deeply soothing relaxation.
• Professional Draping: Strict, respectful spa draping protocols are followed at all times.
• Strictly Professional: Genuine therapeutic, remedial, and relaxation wellness treatments only.

Book your session directly with our senior therapist by messaging WhatsApp at +61 433 556 409!`,
      grounded: true,
    };
  }

  // 19. CITIES & LOCATIONS (Sydney, Melbourne, Brisbane, Perth, Adelaide, etc.)
  if (
    q.includes('sydney') ||
    q.includes('melbourne') ||
    q.includes('brisbane') ||
    q.includes('gold coast') ||
    q.includes('perth') ||
    q.includes('adelaide') ||
    q.includes('canberra') ||
    q.includes('cbd') ||
    q.includes('eastern suburbs') ||
    q.includes('north shore') ||
    q.includes('location') ||
    q.includes('area') ||
    q.includes('where') ||
    q.includes('coverage')
  ) {
    return {
      reply: `Shairu provides mobile massage coverage across Australia’s major metropolitan regions:

• Sydney: CBD, Circular Quay, Darling Harbour, Eastern Suburbs (Bondi, Double Bay, Paddington), North Shore, Inner West, Northern Beaches, and Western Suburbs.
• Melbourne: CBD, Southbank, Docklands, St Kilda, South Yarra, Toorak, Richmond.
• Brisbane & Gold Coast: CBD, South Bank, Fortitude Valley, Surfers Paradise, Broadbeach.
• Perth & Adelaide: Metropolitan hotel corridors and residential centers.

No travel surcharge applies within major metro hotel and residential zones! To check therapist availability at your exact address, text +61 433 556 409 on WhatsApp.`,
      grounded: true,
    };
  }

  // 20. HOURS, SUNDAY, LATE NIGHT, OPERATING TIMES
  if (
    q.includes('time') ||
    q.includes('hour') ||
    q.includes('open') ||
    q.includes('when') ||
    q.includes('sunday') ||
    q.includes('saturday') ||
    q.includes('weekend') ||
    q.includes('night') ||
    q.includes('morning') ||
    q.includes('evening')
  ) {
    return {
      reply: `Shairu operates 7 days a week:

• Monday to Sunday: 8:00 AM – 10:00 PM
• Available on all weekends and Australian public holidays
• Morning, afternoon, and relaxing late-night evening slots available
• Last booking dispatch is typically 9:00 PM for a 1-hour session

Advance bookings and immediate same-day requests are both welcomed. Message WhatsApp at +61 433 556 409 to lock in your preferred time!`,
      grounded: true,
    };
  }

  // 21. OILS, ALLERGIES, HYGIENE & CLEANLINESS
  if (
    q.includes('oil') ||
    q.includes('scent') ||
    q.includes('aroma') ||
    q.includes('allergy') ||
    q.includes('allergies') ||
    q.includes('sensitive') ||
    q.includes('nut') ||
    q.includes('clean') ||
    q.includes('hygiene') ||
    q.includes('linen') ||
    q.includes('towel')
  ) {
    return {
      reply: `We maintain strict 5-star spa hygiene and premium botanical standards:

• 100% Organic Massage Oils: Nourishing, non-greasy plant-based oils (sweet almond, jojoba, fractionated coconut).
• Nut-Free & Unscented Options: If you have sensitive skin or a nut allergy, your therapist can use pure hypoallergenic grapeseed or unscented mineral oil upon request.
• Fresh Linens: Freshly laundered, high-thread-count Egyptian cotton linens and soft plush towels for every single client.
• Sanitized Equipment: Tables and headrests are thoroughly disinfected before and after each session.

Please let us know about any specific allergies when booking via WhatsApp at +61 433 556 409!`,
      grounded: true,
    };
  }

  // 22. CANCELLATION & RESCHEDULING
  if (
    q.includes('cancel') ||
    q.includes('cancellation') ||
    q.includes('reschedule') ||
    q.includes('change time') ||
    q.includes('refund') ||
    q.includes('late')
  ) {
    return {
      reply: `We understand travel plans and meetings can change:

• Rescheduling: You can reschedule your booking free of charge up to 2 hours prior to your scheduled appointment.
• Cancellations: Please give at least 2 hours notice so our therapists can adjust their travel dispatch schedule.
• Contact: To change your time or cancel, simply message or call our WhatsApp desk at +61 433 556 409 immediately.`,
      grounded: true,
    };
  }

  // 23. DYNAMIC INTELLIGENT SYNTHESIZER FOR OPEN-ENDED QUESTIONS
  const words = query
    .replace(/[?!.,;:()'"]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !['what', 'when', 'where', 'which', 'there', 'their', 'about', 'would', 'could', 'should', 'please', 'hello', 'shairu'].includes(w.toLowerCase()));

  const topicSummary = words.slice(0, 3).join(' ');

  return {
    reply: `Regarding your inquiry about "${query}":

Shairu Mobile Massage Australia delivers bespoke 5-star spa therapies right to your hotel room or home across Australia (8:00 AM – 10:00 PM daily).

${
  topicSummary
    ? `For questions involving ${topicSummary}, our certified therapists can tailor treatments specifically to your comfort, schedule, and physical needs.`
    : 'Our certified therapists are fully equipped to customize treatments to your exact preferences.'
}

Key Highlights:
• 6 Signature Treatments: Deep Tissue, Indian Head, Restorative Feet, Back Relief, Swedish Relaxation, and Signature Whole Body.
• Transparent Pricing: $100 for 1h · $140 for 1.5h · $170 for 2h (no hidden travel fees in major metro zones).
• We Bring Everything: Heated portable massage table, fresh luxury linens, organic oils, and calming music.

Would you like to book a session or ask about a specific technique? Message our concierge on WhatsApp at +61 433 556 409 for instant response!`,
    grounded: true,
  };
}
