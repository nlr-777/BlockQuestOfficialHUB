// Mock data for BlockQuest Landing Page

// Book cover URLs
export const BOOK_COVERS = {
  book1: "https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/xslf9n4k_generated_image_20260124_034300_1.png",
  book2: "https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/icg19nct_generated_image_20260124_043201_1.png",
};

// Characters image
export const CHARACTERS_IMAGE = "https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/42e91riu_generated_image_20260128_051915_1.png";

// Gary's Goat mascot (from Book 1 cover)
export const GARY_MASCOT = BOOK_COVERS.book1;

// The 5 Friends
export const characters = [
  { name: "Zara Chen", age: 15, color: "text-purple-400", trait: "Tech Whiz", quote: "Every blockchain tells a story... you just need to know how to read it!" },
  { name: "Sam Rodriguez", age: 14, color: "text-orange-400", trait: "Skeptic", quote: "If it sounds too good to be true, it probably needs more research." },
  { name: "Miko Tanaka", age: 15, color: "text-cyan-400", trait: "Artist", quote: "NFTs aren't just pictures—they're proof that creativity has value!" },
  { name: "Ollie Okafor", age: 13, color: "text-green-400", trait: "Gamer", quote: "Play-to-earn? More like play-to-LEARN... and earn!" },
  { name: "Lila Nakamura", age: 16, color: "text-yellow-400", trait: "Leader", quote: "The future of finance is decentralized—and we're building it together." },
];

export const games = [
  {
    id: 1,
    title: "BlockQuest Retro Arcade 🎮⬡",
    description: "Learn Web3 While You Play! Master levels like Block, Chain, Ledger, Hash, DAO & more!",
    url: "#", // New game link to be updated
    theme: "rainbow",
    emojis: ["🎮", "⬡", "🏆", "⚡", "💎"],
    comingSoon: false
  },
  {
    id: 2,
    title: "More Chaos Coming Soon! 🚀✨",
    description: "New adventures in the BlockQuest universe – stay tuned for more chaotic fun!",
    url: "#",
    theme: "neon", 
    emojis: ["🚀", "✨", "🌟", "💥", "🔥"],
    comingSoon: true
  }
];

export const books = [
  {
    id: 1,
    title: "Money's Origin Story",
    subtitle: "From Bartering Goats to Digital Chaos",
    description: "Join 5 friends as they discover how Gary's goat started it all! The wild history of money from ancient trades to digital gold.",
    cover: BOOK_COVERS.book1,
    series: "Web3 Chaos Chronicles",
    bookNumber: 1,
    comingSoon: false
  },
  {
    id: 2,
    title: "Why Blockchains Exist",
    subtitle: "(AKA Humans Can't Behave)",
    description: "Our 5 friends learn why we needed an unbreakable chain of trust – because humans just can't behave!",
    cover: BOOK_COVERS.book2,
    series: "Web3 Chaos Chronicles",
    bookNumber: 2,
    comingSoon: false
  },
  {
    id: 3,
    title: "Tokens & Digital Treasure",
    subtitle: "Coming Soon",
    description: "The friends explore tokens, NFTs, and the wild world of digital ownership!",
    cover: null,
    series: "Web3 Chaos Chronicles",
    bookNumber: 3,
    comingSoon: true
  },
  {
    id: 4,
    title: "Web3 Games & Beyond",
    subtitle: "Coming Soon",
    description: "Ollie leads the crew into play-to-earn, virtual worlds, and the future of gaming!",
    cover: null,
    series: "Web3 Chaos Chronicles", 
    bookNumber: 4,
    comingSoon: true
  },
  {
    id: 5,
    title: "The Future of Finance",
    subtitle: "Coming Soon",
    description: "The 5 friends tackle DeFi, DAOs, and how they're changing the financial world forever!",
    cover: null,
    series: "Web3 Chaos Chronicles", 
    bookNumber: 5,
    comingSoon: true
  }
];

export const floatingEmojis = [
  "🐐", "⬡", "₿", "◆", "🎮", "📚", "💎", "🚀", "⛓️", "🏆",
  "💰", "🔥", "⚡", "🌟", "✨", "🎯", "🪙", "🎲", "📖", "🐐"
];

export const socialLinks = [
  { name: "Instagram", url: "https://instagram.com/blockquestofficial", icon: "instagram" }
];
