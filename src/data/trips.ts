export interface Trip {
  id: string;
  name: string;
  destination: string;
  description: string;
  price: number;
  duration: string;
  type: "Adventure" | "Relaxation" | "Backpacking" | "International";
  highlight: string;
  image: string;
  nextDeparture: string;
  itinerary: { day: number; title: string; activities: string; stay: string }[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  faqs: { question: string; answer: string }[];
}

export const trips: Trip[] = [
  {
    id: "goa-beach-vibes",
    name: "Goa Beach Vibes",
    destination: "Goa",
    description: "Sun, sand, and new friendships on Goa's stunning coastline. Party, explore, and create unforgettable memories.",
    price: 8999,
    duration: "4 Days / 3 Nights",
    type: "Relaxation",
    highlight: "Beach bonfire & karaoke night",
    image: "goa",
    nextDeparture: "2026-04-15",
    itinerary: [
      { day: 1, title: "Arrival & Beach Welcome", activities: "Airport pickup, check-in, evening beach party with bonfire", stay: "Beachside Hostel" },
      { day: 2, title: "North Goa Explorer", activities: "Baga Beach, Fort Aguada, Anjuna Flea Market, sunset cruise", stay: "Beachside Hostel" },
      { day: 3, title: "South Goa Serenity", activities: "Palolem Beach, kayaking, Cabo de Rama fort, night market", stay: "Beachside Hostel" },
      { day: 4, title: "Farewell Brunch", activities: "Group brunch, photo exchange, departure", stay: "Checkout" },
    ],
    inclusions: ["Accommodation", "Breakfast", "All transfers", "Activities", "Trip leader"],
    exclusions: ["Flights", "Lunch & dinner", "Personal expenses"],
    highlights: ["Beach bonfire", "Sunset cruise", "Kayaking", "Flea market shopping"],
    faqs: [
      { question: "Is this trip suitable for solo travelers?", answer: "Absolutely! Most of our travelers come solo and leave with lifelong friends." },
      { question: "What should I pack?", answer: "Light clothes, sunscreen, swimwear, and a great attitude!" },
    ],
  },
  {
    id: "manali-mountain-escape",
    name: "Manali Mountain Escape",
    destination: "Manali",
    description: "Breathtaking Himalayan views, thrilling treks, and cozy bonfires under starlit skies.",
    price: 11999,
    duration: "5 Days / 4 Nights",
    type: "Adventure",
    highlight: "Solang Valley paragliding",
    image: "manali",
    nextDeparture: "2026-05-01",
    itinerary: [
      { day: 1, title: "Delhi to Manali", activities: "Overnight Volvo bus journey from Delhi", stay: "In transit" },
      { day: 2, title: "Old Manali Vibes", activities: "Check-in, explore Old Manali cafes, Hadimba Temple, evening bonfire", stay: "Mountain Hostel" },
      { day: 3, title: "Solang Valley Adventure", activities: "Paragliding, zorbing, rope activities, snow play", stay: "Mountain Hostel" },
      { day: 4, title: "Jogini Falls Trek", activities: "Trek to Jogini Falls, riverside picnic, stargazing session", stay: "Mountain Hostel" },
      { day: 5, title: "Departure", activities: "Morning yoga, brunch, departure", stay: "Checkout" },
    ],
    inclusions: ["Accommodation", "All meals", "Volvo bus", "Activities", "Trip leader", "Paragliding"],
    exclusions: ["Personal expenses", "Extra adventure activities"],
    highlights: ["Paragliding", "Trekking", "Stargazing", "Mountain bonfire"],
    faqs: [
      { question: "How difficult is the trek?", answer: "It's a moderate trek, suitable for beginners with decent fitness." },
      { question: "Will it be cold?", answer: "Temperatures range from 5-20°C. Carry warm layers!" },
    ],
  },
  {
    id: "bali-tropical-dream",
    name: "Bali Tropical Dream",
    destination: "Bali",
    description: "Explore ancient temples, rice terraces, and pristine beaches on this magical Indonesian island.",
    price: 34999,
    duration: "6 Days / 5 Nights",
    type: "International",
    highlight: "Sunrise at Mount Batur",
    image: "bali",
    nextDeparture: "2026-06-10",
    itinerary: [
      { day: 1, title: "Arrival in Paradise", activities: "Airport pickup, welcome dinner, Kuta beach sunset", stay: "Ubud Villa" },
      { day: 2, title: "Ubud Culture Day", activities: "Tegallalang Rice Terraces, Monkey Forest, art galleries", stay: "Ubud Villa" },
      { day: 3, title: "Mount Batur Sunrise", activities: "2 AM trek to Mount Batur, volcanic hot springs, coffee plantation", stay: "Ubud Villa" },
      { day: 4, title: "Temple Trail", activities: "Tanah Lot, Uluwatu Temple, Kecak fire dance at sunset", stay: "Seminyak Hotel" },
      { day: 5, title: "Beach & Chill", activities: "Nusa Penida day trip, snorkeling, Kelingking Beach", stay: "Seminyak Hotel" },
      { day: 6, title: "Farewell", activities: "Seminyak brunch, shopping, departure", stay: "Checkout" },
    ],
    inclusions: ["Accommodation", "Breakfast & dinner", "Airport transfers", "All tours", "Trip leader", "Snorkeling gear"],
    exclusions: ["Flights", "Lunch", "Visa fees", "Personal expenses"],
    highlights: ["Mount Batur sunrise", "Rice terraces", "Nusa Penida", "Kecak dance"],
    faqs: [
      { question: "Do I need a visa?", answer: "Indian passport holders get visa-on-arrival for 30 days in Indonesia." },
      { question: "Is the Mount Batur trek difficult?", answer: "Moderate difficulty. You'll start at 2 AM to catch the sunrise!" },
    ],
  },
  {
    id: "rajasthan-royal-trail",
    name: "Rajasthan Royal Trail",
    destination: "Rajasthan",
    description: "Live like royalty through golden deserts, majestic forts, and vibrant bazaars of Rajasthan.",
    price: 14999,
    duration: "6 Days / 5 Nights",
    type: "Adventure",
    highlight: "Desert camping under stars",
    image: "rajasthan",
    nextDeparture: "2026-04-20",
    itinerary: [
      { day: 1, title: "Jaipur Arrival", activities: "City Palace, Hawa Mahal, local street food tour", stay: "Heritage Haveli" },
      { day: 2, title: "Pink City Explorer", activities: "Amber Fort, Nahargarh sunset, bazaar shopping", stay: "Heritage Haveli" },
      { day: 3, title: "Jaipur to Jaisalmer", activities: "Scenic drive, Jodhpur stopover, Mehrangarh Fort", stay: "Desert Camp" },
      { day: 4, title: "Golden City", activities: "Jaisalmer Fort, Patwon Ki Haveli, camel safari at sunset", stay: "Desert Camp" },
      { day: 5, title: "Desert Magic", activities: "Desert camping, folk music, stargazing, dune bashing", stay: "Desert Camp" },
      { day: 6, title: "Farewell", activities: "Sunrise over dunes, departure", stay: "Checkout" },
    ],
    inclusions: ["Accommodation", "All meals", "Transport", "Camel safari", "Desert camping", "Trip leader"],
    exclusions: ["Flights", "Personal shopping", "Tips"],
    highlights: ["Camel safari", "Desert camping", "Fort visits", "Folk music night"],
    faqs: [
      { question: "How hot will it be?", answer: "March-April temps around 30-38°C. Carry light cotton clothes and sunscreen." },
      { question: "Is the camel ride comfortable?", answer: "It's bumpy but short (45 mins). A magical experience at sunset!" },
    ],
  },
  {
    id: "kerala-backwater-bliss",
    name: "Kerala Backwater Bliss",
    destination: "Kerala",
    description: "Cruise emerald backwaters, explore spice gardens, and relax on serene tropical beaches.",
    price: 12999,
    duration: "5 Days / 4 Nights",
    type: "Relaxation",
    highlight: "Houseboat overnight stay",
    image: "kerala",
    nextDeparture: "2026-05-15",
    itinerary: [
      { day: 1, title: "Cochin Welcome", activities: "Fort Kochi walk, Chinese fishing nets, kathakali show", stay: "Heritage Hotel" },
      { day: 2, title: "Munnar Hills", activities: "Tea plantation tour, Eravikulam National Park, sunset point", stay: "Munnar Resort" },
      { day: 3, title: "Spice & Adventure", activities: "Spice garden visit, bamboo rafting, waterfall trek", stay: "Munnar Resort" },
      { day: 4, title: "Alleppey Backwaters", activities: "Houseboat cruise, village walk, cooking demo, sunset on water", stay: "Houseboat" },
      { day: 5, title: "Beach & Bye", activities: "Marari Beach morning, farewell lunch, departure", stay: "Checkout" },
    ],
    inclusions: ["Accommodation", "All meals", "Houseboat", "Activities", "Transport", "Trip leader"],
    exclusions: ["Flights", "Personal expenses", "Ayurveda spa"],
    highlights: ["Houseboat stay", "Tea plantations", "Bamboo rafting", "Kathakali show"],
    faqs: [
      { question: "Is it rainy in Kerala?", answer: "May is pre-monsoon. Expect occasional showers - carry a light raincoat!" },
      { question: "What's a houseboat like?", answer: "A traditional Kerala boat with bedrooms, kitchen, and open deck. Pure magic!" },
    ],
  },
];

export const testimonials = [
  {
    name: "Priya S.",
    trip: "Goa Beach Vibes",
    text: "I went solo and came back with 15 new friends. Parr-Desi literally changed my life! The bonfire night was pure magic.",
    avatar: "PS",
  },
  {
    name: "Arjun M.",
    trip: "Manali Mountain Escape",
    text: "Paragliding over Solang Valley with strangers-turned-best-friends. This is what travel should feel like!",
    avatar: "AM",
  },
  {
    name: "Sneha R.",
    trip: "Bali Tropical Dream",
    text: "The Mount Batur sunrise was a spiritual experience. Parr-Desi handles everything perfectly so you just enjoy.",
    avatar: "SR",
  },
  {
    name: "Vikram K.",
    trip: "Rajasthan Royal Trail",
    text: "Sleeping under the stars in the Thar desert with amazing people. Best ₹14,999 I've ever spent!",
    avatar: "VK",
  },
];

export const stats = [
  { label: "Happy Travelers", value: 500, suffix: "+" },
  { label: "Trips Completed", value: 40, suffix: "+" },
  { label: "Destinations", value: 15, suffix: "+" },
  { label: "New Friendships", value: 2000, suffix: "+" },
];

export const upcomingDepartures = [
  "Goa Beach Vibes — Apr 15",
  "Rajasthan Royal Trail — Apr 20",
  "Manali Mountain Escape — May 1",
  "Kerala Backwater Bliss — May 15",
  "Bali Tropical Dream — Jun 10",
  "Goa Beach Vibes — Jun 20",
  "Manali Mountain Escape — Jul 5",
];
