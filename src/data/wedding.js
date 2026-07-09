const wedding = {
  partnerA: "Isabelle",
  partnerB: "Marcus",
  partnerAFull: "Isabelle Fontaine",
  partnerBFull: "Marcus Webb",
  hashtag: "#FontaineWebb",

  date: "2027-06-05T16:00:00",
  dateDisplay: "Saturday, June 5th, 2027",
  rsvpDeadline: "May 1, 2027",

  venue: {
    name: "Villa San Juliette",
    address: "8382 Vineyard Drive",
    city: "San Miguel, California",
  },

  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",

  photos: [
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1563808599481-34a342e44508?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1550784718-990c6de52adf?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=900&q=80",
  ],

  timeline: [
    {
      year: "Summer 2021",
      title: "The Dinner Party",
      body: "They met at a mutual friend's dinner party in San Francisco. She was explaining why a certain novelist was overrated. He politely disagreed. They talked until midnight and neither noticed the other guests leave.",
    },
    {
      year: "Fall 2021",
      title: "First Trip Together",
      body: "A long weekend in Carmel that neither wanted to end. They sat on the beach for hours saying nothing and felt completely at home.",
    },
    {
      year: "2022",
      title: "They Moved In",
      body: "A small apartment in the Mission with too many books and not enough shelf space. They decided it was perfect.",
    },
    {
      year: "Spring 2024",
      title: "The Proposal",
      body: "On a Sunday drive through wine country — at the very vineyard where they'll marry — he pulled over, got out of the car, and asked. She said yes before he finished the sentence.",
    },
    {
      year: "June 2027",
      title: "Forever Begins",
      body: "And now here we are. We are so grateful you're part of our story.",
    },
  ],

  events: [
    {
      id: "welcome-dinner",
      name: "Welcome Dinner",
      day: "Friday, June 4th",
      time: "7:00 PM",
      location: "The Paso Robles Inn",
      address: "1103 Spring Street, Paso Robles, CA",
      dress: "Garden Party",
      note: "Join us to kick off the weekend. Casual cocktail attire, good wine, and old friends.",
      emoji: "🍷",
    },
    {
      id: "ceremony",
      name: "Wedding Ceremony",
      day: "Saturday, June 5th",
      time: "4:00 PM",
      location: "Villa San Juliette",
      address: "8382 Vineyard Drive, San Miguel, CA",
      dress: "Black Tie Optional",
      note: "Please be seated by 3:45 PM. The ceremony takes place on the vineyard terrace.",
      emoji: "💍",
    },
    {
      id: "cocktails",
      name: "Cocktail Hour",
      day: "Saturday, June 5th",
      time: "5:30 PM",
      location: "Estate Terrace, Villa San Juliette",
      address: "8382 Vineyard Drive, San Miguel, CA",
      dress: "Black Tie Optional",
      note: "Estate wines, light bites, and the golden hour over the vineyard.",
      emoji: "🥂",
    },
    {
      id: "reception",
      name: "Reception",
      day: "Saturday, June 5th",
      time: "6:30 PM",
      location: "Grand Barrel Room",
      address: "8382 Vineyard Drive, San Miguel, CA",
      dress: "Black Tie Optional",
      note: "Dinner, dancing, and an open bar. We'll celebrate until midnight.",
      emoji: "✨",
    },
    {
      id: "brunch",
      name: "Farewell Brunch",
      day: "Sunday, June 6th",
      time: "10:00 AM",
      location: "Hotel Cheval Courtyard",
      address: "1021 Pine Street, Paso Robles, CA",
      dress: "Casual",
      note: "Come as you are. Eggs, mimosas, and a gentle goodbye.",
      emoji: "☀️",
    },
  ],

  hotels: [
    {
      name: "The Kimpton Waymaker",
      stars: 4,
      rate: "$259 / night",
      blockCode: "FONTAINEWEBB",
      deadline: "May 1, 2027",
      distance: "12 min to venue",
      url: "#",
      note: "Our room block is here. Use code FONTAINEWEBB at checkout for our negotiated rate.",
      recommended: true,
    },
    {
      name: "Hotel Cheval",
      stars: 4,
      rate: "$189 / night",
      blockCode: null,
      deadline: null,
      distance: "15 min to venue",
      url: "#",
      note: "Boutique hotel in downtown Paso Robles. The farewell brunch will be held here Sunday morning.",
      recommended: false,
    },
    {
      name: "Paso Robles Inn",
      stars: 3,
      rate: "$149 / night",
      blockCode: null,
      deadline: null,
      distance: "15 min to venue",
      url: "#",
      note: "A charming historic inn steps from the city park. Welcome dinner venue on Friday evening.",
      recommended: false,
    },
  ],

  airports: [
    {
      code: "SLO",
      name: "San Luis Obispo Regional",
      drive: "30 min",
      note: "Closest airport. Nonstop from LAX, SFO, PHX, SEA, and DEN.",
    },
    {
      code: "LAX",
      name: "Los Angeles International",
      drive: "3 hr",
      note: "Most route options. Car rental or rideshare recommended.",
    },
    {
      code: "SFO",
      name: "San Francisco International",
      drive: "3 hr",
      note: "Scenic Highway 1 coastal drive is worth the extra time.",
    },
  ],

  shuttle: "A complimentary shuttle runs between the Kimpton Waymaker, Hotel Cheval, and Villa San Juliette on Saturday, June 5th from 3:00 PM – 1:00 AM. Please indicate shuttle use on your RSVP.",

  partyA: [
    { name: "Sophie Fontaine", role: "Maid of Honor", relation: "Sister of the Bride" },
    { name: "Clara Park", role: "Bridesmaid", relation: "College Roommate" },
    { name: "Nadia Torres", role: "Bridesmaid", relation: "Childhood Friend" },
    { name: "Amelia Chen", role: "Bridesmaid", relation: "Best Friend" },
  ],

  partyB: [
    { name: "James Webb", role: "Best Man", relation: "Brother of the Groom" },
    { name: "Ryan Blake", role: "Groomsman", relation: "Best Friend" },
    { name: "Christopher Osei", role: "Groomsman", relation: "College Buddy" },
    { name: "Tyler Morrison", role: "Groomsman", relation: "Work Friend" },
  ],

  activities: [
    {
      name: "Wine Tasting",
      tag: "Wine",
      body: "Paso Robles has 200+ wineries within 30 miles. Justin Vineyards, DAOU Mountain, and Tablas Creek are must-visits.",
    },
    {
      name: "Downtown Paso Robles",
      tag: "Explore",
      body: "The city park, boutique shops, and farm-to-table restaurants. Perfect for a slow afternoon before the weekend.",
    },
    {
      name: "Pismo Beach",
      tag: "Beach",
      body: "45 minutes west: a classic California beach town with fresh seafood, clam chowder, and beautiful Pacific sunsets.",
    },
    {
      name: "Hearst Castle",
      tag: "Culture",
      body: "An hour south, the legendary Hearst Castle is an unforgettable half-day trip. Book tours in advance.",
    },
    {
      name: "Templeton Farmers Market",
      tag: "Food",
      body: "Saturday morning market in nearby Templeton — fresh produce, local honey, and live music. Perfect start to wedding day.",
    },
    {
      name: "Lake Nacimiento",
      tag: "Nature",
      body: "A stunning reservoir 20 minutes from town, ideal for a morning kayak, a boat tour, or a quiet lakeside picnic.",
    },
  ],

  registries: [
    {
      name: "Zola",
      tagline: "Honeymoon Fund & Experiences",
      description: "Our primary registry — includes our honeymoon fund, cooking classes, and home essentials we'll use for years.",
      url: "#",
      primary: true,
    },
    {
      name: "Williams Sonoma",
      tagline: "Kitchen & Entertaining",
      description: "We love to cook and host. Everything here is for the many dinner parties we plan to throw.",
      url: "#",
      primary: false,
    },
    {
      name: "Crate & Barrel",
      tagline: "Home & Living",
      description: "Furnishings and décor for our new home together. A few bigger pieces we'd love help with.",
      url: "#",
      primary: false,
    },
  ],

  giftNote: "Your presence at our wedding is the greatest gift of all. If you wish to give, we are grateful for anything from our registries, or a contribution to our honeymoon fund.",

  faqs: [
    {
      q: "What is the dress code?",
      a: "Black Tie Optional for the ceremony and reception — please dress up, it's a real celebration. Garden Party attire (cocktail dress / blazer) is perfect for the Friday welcome dinner. Casual for Sunday brunch.",
    },
    {
      q: "Is the event indoors or outdoors?",
      a: "The ceremony and cocktail hour are outdoors on the vineyard terrace. The reception is indoors in the Grand Barrel Room. June evenings in wine country cool down after sunset — a light wrap or jacket is recommended.",
    },
    {
      q: "Are children invited?",
      a: "We adore your little ones, but we've chosen to celebrate adults-only (16+). We hope this gives everyone the chance to relax fully and dance without restraint.",
    },
    {
      q: "Can I bring a plus one?",
      a: "Plus ones are noted on your invitation envelope. If you have questions about your guest count, please reach out to us directly — we're happy to help.",
    },
    {
      q: "What time should I arrive for the ceremony?",
      a: "Please be seated by 3:45 PM. The ceremony begins promptly at 4:00 PM on the vineyard terrace. Late arrivals will not be seated until a break in the ceremony.",
    },
    {
      q: "Is there parking at the venue?",
      a: "Yes, complimentary parking is available at Villa San Juliette. We also offer a free shuttle from the Kimpton Waymaker and Hotel Cheval — see the Travel section for full details.",
    },
    {
      q: "What about dietary restrictions?",
      a: "Please note any allergies or restrictions in your RSVP. Our catering team can accommodate gluten-free, dairy-free, and nut-allergy needs with advance notice. Vegan and vegetarian plates are available.",
    },
    {
      q: "What will the weather be like in Paso Robles in June?",
      a: "Typically gorgeous — warm and sunny during the day (mid-70s°F) with cool evenings after sunset (low-to-mid 50s°F). We recommend bringing a layer for the outdoor ceremony and cocktail hour.",
    },
    {
      q: "When is the RSVP deadline?",
      a: "Please RSVP by May 1st, 2027. We need final headcounts for catering and seating — your timely response means the world to us.",
    },
  ],

  mealChoices: ["Filet Mignon", "Seared Salmon", "Mushroom Risotto (V)", "Vegan Plate"],
};

export default wedding;
