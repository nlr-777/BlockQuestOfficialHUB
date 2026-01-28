// Mock data for BlockQuest Landing Page

// Book cover URLs
export const BOOK_COVERS = {
  book1: "https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/xslf9n4k_generated_image_20260124_034300_1.png",
  book2: "https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/icg19nct_generated_image_20260124_043201_1.png",
};

// Gary the Goat mascot (from Book 1 cover)
export const GARY_MASCOT = BOOK_COVERS.book1;

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
    description: "The wild history of money featuring Gary the Goat! Learn how we went from trading goats to digital gold.",
    cover: BOOK_COVERS.book1,
    series: "Web3 Chaos Chronicles",
    bookNumber: 1,
    comingSoon: false
  },
  {
    id: 2,
    title: "Why Blockchains Exist",
    subtitle: "(AKA Humans Can't Behave)",
    description: "Ninja kids vs Traditional Ledgers! Discover why we needed an unbreakable chain of trust.",
    cover: BOOK_COVERS.book2,
    series: "Web3 Chaos Chronicles",
    bookNumber: 2,
    comingSoon: false
  },
  {
    id: 3,
    title: "Tokens & Digital Treasure",
    subtitle: "Coming Soon",
    description: "The adventure continues with tokens, NFTs, and digital ownership!",
    cover: null,
    series: "Web3 Chaos Chronicles",
    bookNumber: 3,
    comingSoon: true
  },
  {
    id: 4,
    title: "Web3 Games & Beyond",
    subtitle: "Coming Soon",
    description: "Play-to-earn, virtual worlds, and the future of gaming!",
    cover: null,
    series: "Web3 Chaos Chronicles", 
    bookNumber: 4,
    comingSoon: true
  },
  {
    id: 5,
    title: "The Future of Finance",
    subtitle: "Coming Soon",
    description: "DeFi, DAOs, and how the financial world is changing forever!",
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
