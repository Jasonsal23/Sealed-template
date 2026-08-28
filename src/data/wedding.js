const wedding = {
  partnerA: "Wren",
  partnerB: "August",
  partnerAFull: "Wren Ashworth",
  partnerBFull: "August Marchetti",
  monogram: "W & A",
  hashtag: "#WrenAndAugust",

  // Target date for the countdown — fixed, in the future relative to today.
  // ISO string, local-ish. Saturday, November 13, 2027, 6:30 PM.
  date: "2027-11-13T18:30:00",
  dateDisplay: "Saturday, the Thirteenth of November",
  dateShort: "November 13, 2027",
  yearDisplay: "Two Thousand Twenty-Seven",

  venueName: "Blackwood Manor",
  venueCity: "Hudson Valley, New York",

  story:
    "We met the night the power went out at a jazz bar downtown — candles on every " +
    "table, a trio playing acoustic because the amps had nothing left to give. Six " +
    "years, one very stubborn cat, and a hundred abandoned playlists later, we're " +
    "lighting the candles again and asking everyone we love to come watch.",

  envelopeIntro: "You're invited",
  envelopePrompt: "Pull the ribbon to open",
  letterGreeting: "Together with our families",
  letterLine: "we invite you to save our date",
  formalNote: "A formal invitation will follow by post.",

  // A few playful, tap-to-reveal facts for the "Get to Know Us" section.
  funFacts: [
    {
      prompt: "How we met",
      answer: "A citywide blackout, a jazz trio playing acoustic, and one shared candle at a two-top table.",
    },
    {
      prompt: "He always orders",
      answer: "Whatever's spiciest on the menu, then insists his eyes aren't watering.",
    },
    {
      prompt: "She can't survive without",
      answer: "A playlist for every mood — made, obsessed over, and abandoned within the week.",
    },
    {
      prompt: "First trip together",
      answer: "A wrong turn in Lisbon that turned into the best five days either of us has had.",
    },
    {
      prompt: "The proposal",
      answer: "Hidden inside a book of poems she'd been “meaning to read” for three years.",
    },
    {
      prompt: "Our song",
      answer: "Whatever's playing when one of us starts dancing badly in the kitchen.",
    },
  ],

  // Royalty-free Unsplash photos (free for commercial use, no attribution required).
  // Swap freely. Sized via URL params; keep these as-is to run out of the box.
  heroImage:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1920&q=80",
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
