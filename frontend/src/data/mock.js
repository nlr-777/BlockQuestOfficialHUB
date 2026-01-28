// Mock data for BlockQuest Landing Page

// Book cover URLs
export const BOOK_COVERS = {
  book1: "https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/xslf9n4k_generated_image_20260124_034300_1.png",
  book2: "https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/icg19nct_generated_image_20260124_043201_1.png",
  book3: "https://customer-assets.emergentagent.com/job_3828a6dc-0502-44a7-ab45-71a567e1d959/artifacts/g39e487y_generated_image_20260126_083415_1.png",
  book4: "https://customer-assets.emergentagent.com/job_3828a6dc-0502-44a7-ab45-71a567e1d959/artifacts/z8ysokvd_generated_image_20260126_083437_1.png",
  book5: "https://customer-assets.emergentagent.com/job_3828a6dc-0502-44a7-ab45-71a567e1d959/artifacts/vboydr4o_generated_image_20260126_083553_1.png",
};

// Characters image
export const CHARACTERS_IMAGE = "https://customer-assets.emergentagent.com/job_3828a6dc-0502-44a7-ab45-71a567e1d959/artifacts/z0w00ymu_generated_image_20260128_052414_1.png";

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
    description: "A retro-style educational game where you learn Web3 concepts through fun arcade gameplay. Explore levels covering Blocks, Chains, Ledgers, Hashes, DAOs & more!",
    url: "https://readtext-fix.preview.emergentagent.com/",
    theme: "rainbow",
    emojis: ["🎮", "⬡", "🏆", "⚡", "💎"],
    comingSoon: false
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
    title: "Tokens",
    subtitle: "Not Casino Chips, Not Monopoly Money",
    description: "The friends explore tokens and discover why they're not just digital coins—they're the building blocks of Web3!",
    cover: BOOK_COVERS.book3,
    series: "Web3 Chaos Chronicles",
    bookNumber: 3,
    comingSoon: false
  },
  {
    id: 4,
    title: "NFTs Without the Scams",
    subtitle: "Screenshots, or Headaches",
    description: "Dive into the world of NFTs—what they really are, how to spot scams, and why owning digital art actually matters!",
    cover: BOOK_COVERS.book4,
    series: "Web3 Chaos Chronicles", 
    bookNumber: 4,
    comingSoon: false
  },
  {
    id: 5,
    title: "Web3 Games",
    subtitle: "Digital Ownership & The Future Internet",
    description: "The crew explores play-to-earn gaming, digital ownership, and what the future of the internet looks like!",
    cover: BOOK_COVERS.book5,
    series: "Web3 Chaos Chronicles", 
    bookNumber: 5,
    comingSoon: false
  }
];

export const floatingEmojis = [
  "🐐", "⬡", "₿", "◆", "🎮", "📚", "💎", "🚀", "⛓️", "🏆",
  "💰", "🔥", "⚡", "🌟", "✨", "🎯", "🪙", "🎲", "📖", "🐐"
];

export const socialLinks = [
  { name: "Instagram", url: "https://instagram.com/blockquestofficial", icon: "instagram" }
];
