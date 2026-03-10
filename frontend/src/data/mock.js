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

// Web3 Chaos Chronicles promo image (floating hero image linking to books)
export const CHAOS_CHRONICLES_PROMO = "https://customer-assets.emergentagent.com/job_3828a6dc-0502-44a7-ab45-71a567e1d959/artifacts/nqif8u1e_generated_image_20260124_035327_1.png";

// Game preview screenshot
export const GAME_PREVIEW_IMAGE = "https://customer-assets.emergentagent.com/job_3828a6dc-0502-44a7-ab45-71a567e1d959/artifacts/wblbvhal_Screenshot_20260129-171852.Chrome.png";

// Gary's Goat mascot (from Book 1 cover)
export const GARY_MASCOT = BOOK_COVERS.book1;

// The 5 Friends
export const characters = [
  { name: "Zara Chen", age: 15, color: "text-purple-400", trait: "Tech Whiz", quote: "Every blockchain tells a story... you just need to know how to read it!", image: "https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/b537425e0c1f544cff5534a3da97e77eefc43623d32af9c8c23d20448d130072.png" },
  { name: "Sam Rodriguez", age: 14, color: "text-orange-400", trait: "Skeptic", quote: "If it sounds too good to be true, it probably needs more research.", image: "https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/0040d00c35e50c3d66db0100a6d8dd608dd3efde4d252a69791c59e2fa608c6b.png" },
  { name: "Miko Tanaka", age: 15, color: "text-cyan-400", trait: "Artist", quote: "NFTs aren't just pictures—they're proof that creativity has value!", image: "https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/b460503e58b9a3dcc3c579ba8d0ba6f2ee5b17bab28ea17c13633b4c8109051b.png" },
  { name: "Ollie Okafor", age: 13, color: "text-green-400", trait: "Gamer", quote: "Play-to-earn? More like play-to-LEARN... and earn!", image: "https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/f73b9f9dbf5be8de2b7d00b96c5f36a762d38522b0295ab61dac7976bdf406bd.png" },
  { name: "Lila Nakamura", age: 16, color: "text-yellow-400", trait: "Leader", quote: "The future of finance is decentralized—and we're building it together.", image: "https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/641198b91feeae555974749d558ad4d63dc19fb2c16c4539babb50123dbb367b.png" },
];

export const games = [
  {
    id: 1,
    title: "BlockQuest Miner's ⛏️",
    description: "Dig deep, mine blocks, and discover how blockchain mining really works — one block at a time!",
    url: "https://block-quest-miners-game-dq2b.vercel.app/",
    theme: "rainbow",
    emojis: ["⛏️", "💎", "🪨", "⚡", "🔗"],
    comingSoon: false,
    preview: "https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/abc5f9a5cbaa4c3728a6a34a8a5a907c6a7a9f245b01438925d2383e4a78a7e3.png"
  },
  {
    id: 2,
    title: "Web3 Wallet Adventure 💼",
    description: "Learn how digital wallets work — store, send, and protect your crypto in a fun adventure with Gerry!",
    url: "https://web3-wallet-adventure.vercel.app/",
    theme: "rainbow",
    emojis: ["💼", "🔐", "💰", "🌐", "⚡"],
    comingSoon: false,
    preview: "https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/971ae42240e3f49c35cc44b9eb3bed87e16298cccd627eb9236d348b84ce7c60.png"
  },
  {
    id: 3,
    title: "BlockQuest Retro Arcade 🎮",
    description: "Join Zara, Sam, Miko, Ollie & Lila as they turn Web3 chaos into playable levels! Master the Tech and level UP — one game at a time.",
    url: "https://block-quest-retro-arcade-v1-2026.vercel.app/",
    theme: "rainbow",
    emojis: ["🎮", "⬡", "🏆", "⚡", "💎"],
    comingSoon: false,
    preview: "https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/70db92801a276532cbc0eb47df2b8fd51a390fac307da6ec0553550ceba2235a.png"
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
    description: "The gang stops learning and starts BUILDING! They create their own \"QUEST COINS\" for the neighborhood—but will they master smart contracts before everything crashes?",
    teaser: "🪙 What if you could program your own money?",
    hook: "Tokens aren't fake internet coins—they're programmable permissions that can be tickets, keys, voting rights, or proof you're awesome!",
    cover: BOOK_COVERS.book3,
    series: "Web3 Chaos Chronicles",
    bookNumber: 3,
    comingSoon: false
  },
  {
    id: 4,
    title: "NFTs Without the Scams",
    subtitle: "Screenshots, or Headaches",
    description: "QUEST COINS is thriving, but who REALLY started it? The crew discovers NFTs aren't just pictures—they're uncopyable proof of \"I was there first!\"",
    teaser: "🎨 Can you truly OWN something digital?",
    hook: "Forget the hype! NFTs are blockchain receipts with superpowers. Screenshots? Totally missing the point.",
    cover: BOOK_COVERS.book4,
    series: "Web3 Chaos Chronicles", 
    bookNumber: 4,
    comingSoon: false
  },
  {
    id: 5,
    title: "Web3 Games",
    subtitle: "Digital Ownership & The Future Internet",
    description: "Time to turn QUEST COINS into a GAME! But play-to-earn can become pay-to-lose... Can they build something that survives without them?",
    teaser: "🎮 What if players actually OWNED their games?",
    hook: "The metaverse isn't one place—it's everything connected. And DAOs let communities run themselves. Mind = blown.",
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
