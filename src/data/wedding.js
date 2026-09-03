const wedding = {
  partnerA: "Marlowe",
  partnerB: "Idris",
  partnerAFull: "Marlowe Reyes",
  partnerBFull: "Idris Whitaker",
  monogram: "M & I",
  hashtag: "#MarloweAndIdris",

  // Target date for the countdown — fixed, in the future relative to today.
  // ISO string, local-ish. Saturday, April 24, 2027, 5:00 PM.
  date: "2027-04-24T17:00:00",
  dateDisplay: "Saturday, the Twenty-Fourth of April",
  dateShort: "April 24, 2027",
  yearDisplay: "Two Thousand Twenty-Seven",

  venueName: "The Ardmore Rooftop",
  venueCity: "Austin, Texas",

  story:
    "We met over a shared spreadsheet — two strangers assigned the same conference " +
    "table with zero patience for small talk. Four years, one very loud rescue dog, " +
    "and countless rooftop sunsets later, we're ready to trade the spreadsheet for a " +
    "guest list and ask you to help us celebrate.",

  envelopeIntro: "You're invited",
  envelopePrompt: "Pull the ribbon to open",
  letterGreeting: "Together with our families",
  letterLine: "we invite you to save our date",
  formalNote: "A formal invitation will follow by post.",

  // A few playful, tap-to-reveal facts for the "Get to Know Us" section.
  funFacts: [
    {
      prompt: "How we met",
      answer: "Assigned the same conference table at a work event neither of us wanted to attend.",
    },
    {
      prompt: "He always orders",
      answer: "Whatever the bartender recommends, then acts like it was his idea.",
    },
    {
      prompt: "She can't leave home without",
      answer: "A tote bag with at least three books she's “currently reading.”",
    },
    {
      prompt: "First trip together",
      answer: "A last-minute flight to Mexico City that turned into an annual tradition.",
    },
    {
      prompt: "The proposal",
      answer: "On the same rooftop where we're getting married, six months to the day after our first date there.",
    },
    {
      prompt: "Our go-to",
      answer: "Late-night tacos and arguing about which one of us tells the story better.",
    },
  ],

  // Hero background video (in /public/video), with a still poster frame
  // shown while it loads and for prefers-reduced-motion visitors.
  heroVideo: "/video/hero.mp4",
  heroVideoPoster: "/video/hero-poster.jpg",

  // Royalty-free Unsplash photos (free for commercial use, no attribution required).
  // Swap freely. Sized via URL params; keep these as-is to run out of the box.
  gallery: [
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
  ],
};

export default wedding;
