import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Send, Volume2, VolumeX, GripVertical, Eye } from 'lucide-react';

const GERRY_AVATAR = "https://static.prod-images.emergentagent.com/jobs/2429ed2b-a893-4473-8b2e-2593750e3655/images/4b8bf7ab25b9d80057b361f33d446357bff4abda8b91b3c16dff2988dc9e02b7.png";

// ─── Concept illustrations ───────────────────────────────────
const CONCEPT_IMAGES = {
  blockchain: { url: 'https://static.prod-images.emergentagent.com/jobs/2429ed2b-a893-4473-8b2e-2593750e3655/images/7b043d2e9b79144124afdc32e869afa02908f7ea1cf35e3978613afcf0503096.png', label: 'Blockchain' },
  nft: { url: 'https://static.prod-images.emergentagent.com/jobs/2429ed2b-a893-4473-8b2e-2593750e3655/images/b7e8a2eb1f71f6ecf7c099ceed893b33d3c2b164b32a811540d69a2319250e62.png', label: 'NFTs' },
  mining: { url: 'https://static.prod-images.emergentagent.com/jobs/2429ed2b-a893-4473-8b2e-2593750e3655/images/90b8c5a4e7cc6b8f09f8347b18ed94d727cd6d7e387db0930579af03652addc9.png', label: 'Mining' },
  wallet: { url: 'https://static.prod-images.emergentagent.com/jobs/2429ed2b-a893-4473-8b2e-2593750e3655/images/6ec73321fc0060ab936152b54265e8c9667524e5d9096056bcafebee705d4c8e.png', label: 'Wallet' },
  web3: { url: 'https://static.prod-images.emergentagent.com/jobs/2429ed2b-a893-4473-8b2e-2593750e3655/images/7c29409ac078b35ade64c823ba0b0dbab06af2efcd18cdb0e8aed553673899eb.png', label: 'Web3' },
  smart_contract: { url: 'https://static.prod-images.emergentagent.com/jobs/2429ed2b-a893-4473-8b2e-2593750e3655/images/83a59fa247f67751ecf5abd85fcae852fa5c63d99d933158cfb3a92cffa824ef.png', label: 'Smart Contracts' },
  token: { url: 'https://static.prod-images.emergentagent.com/jobs/2429ed2b-a893-4473-8b2e-2593750e3655/images/083d1715f391999e5453dbad2a4aefd7ed3217b6f35b578e1cff431bb8ae3206.png', label: 'Tokens' },
  metaverse: { url: 'https://static.prod-images.emergentagent.com/jobs/2429ed2b-a893-4473-8b2e-2593750e3655/images/7ac12e60667a60a94e30e70c71ac9a4ac36faf0fee3b33f3952283e02aafc283.png', label: 'Metaverse' },
};

// Detect which concept a message is about
const detectConcept = (text) => {
  if (!text) return null;
  const q = text.toLowerCase();
  // Check compound terms first
  if (q.includes('smart contract')) return 'smart_contract';
  if (q.includes('web3') || q.includes('web 3')) return 'web3';
  for (const key of Object.keys(CONCEPT_IMAGES)) {
    if (key === 'smart_contract' || key === 'web3') continue;
    if (q.includes(key)) return key;
  }
  return null;
};

// ─── Knowledge base ──────────────────────────────────────────
const WEB3_KNOWLEDGE = {
  blockchain: "A blockchain is like a digital notebook that everyone shares! Once you write something in it, nobody can erase or change it. Every page (block) is chained to the last one.",
  bitcoin: "Bitcoin was the very first cryptocurrency! It was invented in 2009 by a mystery person called Satoshi Nakamoto. Think of it as digital gold.",
  mining: "Mining is when computers race to solve a super hard puzzle. The winner gets to add a new page to the blockchain notebook and earns crypto as a reward!",
  wallet: "A crypto wallet is like a digital piggy bank on your phone. It has a public address (like a mailbox) and a private key (the secret combination to open it).",
  nft: "An NFT is a one-of-a-kind digital certificate that proves YOU own something unique online — like a signed trading card that can't be faked!",
  token: "Tokens are like arcade coins, but digital! They can represent game points, a vote in a club, or even ownership of something cool.",
  gas: "Gas fees are tiny charges you pay to use the blockchain — like postage stamps. When lots of people are using it, stamps get more expensive!",
  smart_contract: "A smart contract is like a robot promise! It's code that automatically does things when conditions are met — like a vending machine for deals.",
  defi: "DeFi means banking without banks! People lend, borrow, and trade directly with each other using code — no bank manager needed.",
  web3: "Web3 is the next version of the internet where YOU own your stuff. Web1 = read, Web2 = read + write, Web3 = read + write + OWN!",
  consensus: "Consensus is when all computers in the network agree something is true — like the whole class voting 'Yep, that's correct!' before it's written down.",
  dao: "A DAO is a club where members vote on everything using tokens. No president or teacher — just rules in code that everyone follows!",
  staking: "Staking means locking up your crypto to help keep the blockchain running. In return, you earn rewards — like interest on a savings account!",
  metaverse: "The metaverse is a virtual world where you can hang out, play games, and own items. Like Roblox or Minecraft, but your stuff is truly yours!",
  airdrop: "An airdrop is when free tokens or NFTs are dropped into your wallet — like surprise candy showing up in your backpack!",
  private_key: "Your private key is a super-secret password for your wallet. NEVER share it — if someone gets it, they can take everything!",
  public_key: "Your public key is your wallet's address you CAN share — like your home address so friends can send you things.",
};

const GAME_HINTS = {
  miners: [
    "Try placing blocks in the correct order — think about what a real blockchain looks like!",
    "Remember: each block needs to connect to the previous one. Check the hash values!",
    "Stuck on the puzzle? Look at the block colors — they give you clues about the right sequence.",
  ],
  wallet: [
    "Make sure to check your balance before sending tokens! Can't send what you don't have.",
    "The seed phrase is super important — try writing it down in the correct order.",
    "Watch out for phishing! Not every message is from a real friend in the game.",
  ],
  retro_arcade: [
    "Each level teaches a different Web3 concept. Pay attention to the intro screens!",
    "The leaderboard rewards speed AND accuracy — balance both for the best score!",
    "Found a hidden path? Some levels have secret areas with bonus knowledge tokens.",
  ],
  nft_studio: [
    "Your NFT is unique! Try different combinations of traits to create something special.",
    "The rarity of your NFT depends on which traits you pick — look for the star ratings!",
    "Don't forget to name your creation — every great NFT has a great story behind it.",
  ],
  mini_money: [
    "Gary the Goat needs help understanding why bartering is tricky — think about what's fair!",
    "Each era of money solves a problem from the last one. What problem does digital money solve?",
    "Collect all the history coins to unlock the bonus ending!",
  ],
};

const HERO_STORIES = {
  gerry: {
    name: "Gerry",
    stories: [
      "What if Gerry the Goat accidentally discovered Bitcoin while looking for snacks? He'd probably try to eat the blockchain!",
      "Imagine Gerry starting his own cryptocurrency called GoatCoin. Every time someone bleats, they earn a token!",
      "Gerry once tried to explain mining to a sheep. The sheep just said 'baaaah' and walked away. Some things never change!",
    ],
  },
  zara: {
    name: "Zara",
    stories: [
      "What if Zara built an AI that could predict the next big crypto trend? She'd probably use it to fund a tech lab for kids!",
      "Zara once debugged a smart contract in her sleep. When she woke up, it had already processed 1,000 transactions!",
      "Imagine Zara creating a Web3 school where homework is submitted as NFTs. No more 'my dog ate it' excuses!",
    ],
  },
  sam: {
    name: "Sam",
    stories: [
      "What if Sam became a blockchain detective? He'd investigate every suspicious token with his magnifying glass emoji!",
      "Sam once refused to buy an NFT because he wanted to 'do more research.' Three months later, he wrote a 50-page report!",
      "Imagine Sam starting a Web3 fact-checking service. His catchphrase: 'Trust, but verify... on the blockchain!'",
    ],
  },
  miko: {
    name: "Miko",
    stories: [
      "What if Miko's digital art was the first NFT to be displayed in every metaverse gallery? The whole virtual world would be her canvas!",
      "Miko once drew a picture so beautiful that someone tried to right-click save it. The NFT guard dog barked them away!",
      "Imagine Miko creating an NFT collection where each piece changes based on the weather in the real world!",
    ],
  },
  ollie: {
    name: "Ollie",
    stories: [
      "What if Ollie created a play-to-earn game where you earn tokens by doing real homework? His grades would skyrocket!",
      "Ollie once speed-ran the entire BlockQuest Arcade in 12 minutes. Legend says his high score is still unbeaten!",
      "Imagine Ollie discovering a secret level in the blockchain that gives unlimited gaming tokens. He'd share them with everyone!",
    ],
  },
  lila: {
    name: "Lila",
    stories: [
      "What if Lila became the youngest DAO president? She'd make sure every kid gets a vote on what game to play next!",
      "Lila once organized a virtual bake sale using smart contracts. Every cookie was an NFT with a real recipe attached!",
      "Imagine Lila leading a Web3 summit where world leaders learn blockchain from teenagers. The future is NOW!",
    ],
  },
};

const ENCOURAGEMENT = [
  "You're doing amazing! Every explorer starts somewhere.",
  "Keep going! The best blockchain builders never give up.",
  "Fun fact: even Satoshi Nakamoto had to learn step by step!",
  "You've got this! Gerry believes in you!",
  "Remember: making mistakes is how we learn. Try again!",
  "Baaaa-rilliant effort! You're getting smarter every minute!",
];

const STUCK_TIPS = [
  "Looks like you might be stuck! Want me to explain the concept behind this level?",
  "Hey explorer! Need a hint? I've got plenty of Web3 wisdom to share!",
  "Gerry here! I noticed you've been on this part for a while. Want a quick tip?",
  "Don't worry — this part is tricky! Want me to break it down in simple terms?",
];

const GERRY_KEY = 'blockquest_gerry';
const GERRY_SETTINGS_KEY = 'blockquest_gerry_settings';
const DEVICE_KEY = 'blockquest_device_id';
const API_URL = process.env.REACT_APP_BACKEND_URL;

const loadHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(GERRY_KEY)) || [];
  } catch { return []; }
};

const saveHistory = (h) => {
  try {
    const trimmed = h.slice(-50);
    localStorage.setItem(GERRY_KEY, JSON.stringify(trimmed));
  } catch { /* */ }
};

const loadSettings = () => {
  try {
    return JSON.parse(localStorage.getItem(GERRY_SETTINGS_KEY)) || { enabled: true, voice: true, failCount: 0 };
  } catch { return { enabled: true, voice: true, failCount: 0 }; }
};

const saveSettings = (s) => {
  try { localStorage.setItem(GERRY_SETTINGS_KEY, JSON.stringify(s)); } catch { /* */ }
};

// ─── Response engine ─────────────────────────────────────────
const getResponse = (input, hero) => {
  const q = input.toLowerCase().trim();

  // Web3 keyword match
  for (const [key, answer] of Object.entries(WEB3_KNOWLEDGE)) {
    if (q.includes(key.replace('_', ' ')) || q.includes(key)) {
      return answer;
    }
  }

  // Game hints
  for (const [game, hints] of Object.entries(GAME_HINTS)) {
    if (q.includes(game) || q.includes(game.replace('_', ' '))) {
      return hints[Math.floor(Math.random() * hints.length)];
    }
  }

  // Story request
  if (q.includes('story') || q.includes('what if') || q.includes('imagine')) {
    const heroData = HERO_STORIES[hero] || HERO_STORIES.gerry;
    return heroData.stories[Math.floor(Math.random() * heroData.stories.length)];
  }

  // Help / hint
  if (q.includes('help') || q.includes('hint') || q.includes('stuck') || q.includes('tip')) {
    return STUCK_TIPS[Math.floor(Math.random() * STUCK_TIPS.length)];
  }

  // Greeting
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('sup')) {
    return `Hey there, explorer! I'm Gerry the Goat — your Web3 buddy! Ask me about blockchain, tokens, NFTs, or say "tell me a story" for a fun tale about ${(HERO_STORIES[hero] || HERO_STORIES.gerry).name}!`;
  }

  // XP / progress
  if (q.includes('xp') || q.includes('progress') || q.includes('score') || q.includes('level')) {
    return "Check your Quest Log above to see your XP, badges, and hero unlocks! Keep playing games and claiming rewards to level up!";
  }

  // Fallback
  const fallbacks = [
    `Great question! Try asking me about specific Web3 topics like "blockchain", "mining", "NFTs", or "wallets". Or say "tell me a story" for a ${(HERO_STORIES[hero] || HERO_STORIES.gerry).name} adventure!`,
    `Hmm, I'm still learning about that one! But I know TONS about Web3 — try asking about crypto, smart contracts, or tokens!`,
    `Baaaa! That's a thinker. Ask me about blockchain basics, game hints, or say "what if" for a fun hero story!`,
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

// ─── Component ───────────────────────────────────────────────
const GerryCompanion = ({ selectedHero = 'gerry', enabled: parentEnabled }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadHistory);
  const [input, setInput] = useState('');
  const [settings, setSettings] = useState(loadSettings);
  const [stuckTimer, setStuckTimer] = useState(null);
  const [showStuckTip, setShowStuckTip] = useState(false);
  const [position, setPosition] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);
  const [expandedImages, setExpandedImages] = useState(new Set());
  const dragOffset = useRef({ x: 0, y: 0 });
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const isEnabled = parentEnabled !== undefined ? parentEnabled : settings.enabled;

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Stuck detection (45s idle resets on message send)
  useEffect(() => {
    if (!isEnabled || !open) return;
    const timer = setTimeout(() => setShowStuckTip(true), 45000);
    setStuckTimer(timer);
    return () => clearTimeout(timer);
  }, [messages, open, isEnabled]);

  // Auto-dismiss stuck tip
  useEffect(() => {
    if (showStuckTip) {
      const tip = STUCK_TIPS[Math.floor(Math.random() * STUCK_TIPS.length)];
      setMessages(prev => {
        const next = [...prev, { role: 'gerry', text: tip, ts: Date.now() }];
        saveHistory(next);
        return next;
      });
      setShowStuckTip(false);
      if (!open) setOpen(true);
    }
  }, [showStuckTip, open]);

  // Save settings
  useEffect(() => { saveSettings(settings); }, [settings]);

  // Voice synth — young, playful kid-friend voice
  const speak = useCallback((text) => {
    if (!settings.voice || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.pitch = 1.5;
    u.volume = 0.9;
    const voices = window.speechSynthesis.getVoices();
    // Pick the most kid-friendly / young-sounding voice available
    const preferred = [
      'Samantha', 'Karen', 'Fiona', 'Tessa',
      'Google UK English Female', 'Microsoft Zira',
      'Google US English',
    ];
    let picked = null;
    for (const name of preferred) {
      picked = voices.find(v => v.name.includes(name) && v.lang.startsWith('en'));
      if (picked) break;
    }
    if (!picked) picked = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'));
    if (!picked) picked = voices.find(v => v.lang.startsWith('en'));
    if (picked) u.voice = picked;
    window.speechSynthesis.speak(u);
  }, [settings.voice]);

  const sessionId = useRef('gerry_' + (localStorage.getItem('blockquest_device_id') || 'anon'));
  const syncTimeout = useRef(null);

  // Sync conversation to cloud (debounced)
  const syncToCloud = useCallback(async (msgs) => {
    const deviceId = localStorage.getItem(DEVICE_KEY);
    if (!API_URL || !deviceId) return;
    try {
      await fetch(`${API_URL}/api/gerry/history/${deviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs.slice(-50), game: 'hub' })
      });
    } catch (e) {
      console.warn('Gerry history sync failed', e);
    }
  }, []);

  const debouncedCloudSync = useCallback((msgs) => {
    clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(() => syncToCloud(msgs), 2000);
  }, [syncToCloud]);

  // Fetch and merge cloud history on mount
  useEffect(() => {
    const fetchCloudHistory = async () => {
      const deviceId = localStorage.getItem(DEVICE_KEY);
      if (!API_URL || !deviceId) return;
      try {
        const resp = await fetch(`${API_URL}/api/gerry/history/${deviceId}`);
        const data = await resp.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(prev => {
            const localTs = new Set(prev.map(m => m.ts));
            const newFromCloud = data.messages.filter(m => !localTs.has(m.ts));
            if (newFromCloud.length === 0) return prev;
            const merged = [...prev, ...newFromCloud].sort((a, b) => a.ts - b.ts).slice(-50);
            saveHistory(merged);
            return merged;
          });
        }
      } catch (e) {
        console.warn('Could not fetch Gerry cloud history', e);
      }
    };
    fetchCloudHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Send message
  const send = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    const userMsg = { role: 'user', text, ts: Date.now() };
    setMessages(prev => {
      const next = [...prev, userMsg];
      saveHistory(next);
      return next;
    });

    // Try LLM backend first, fall back to rules
    let reply;
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const deviceId = localStorage.getItem(DEVICE_KEY);
    try {
      const resp = await fetch(`${apiUrl}/api/gerry/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, hero: selectedHero, session_id: sessionId.current, device_id: deviceId })
      });
      const data = await resp.json();
      reply = data.reply;
    } catch {
      reply = getResponse(text, selectedHero);
    }

    const gerryMsg = { role: 'gerry', text: reply, ts: Date.now() + 1 };
    setMessages(prev => {
      const next = [...prev, gerryMsg];
      saveHistory(next);
      debouncedCloudSync(next);
      return next;
    });
    speak(reply);
  }, [input, selectedHero, speak, debouncedCloudSync]);

  // Difficulty auto-scaling: track fail mentions
  const reportFail = useCallback(() => {
    setSettings(prev => {
      const next = { ...prev, failCount: (prev.failCount || 0) + 1 };
      if (next.failCount >= 3) {
        localStorage.setItem('blockquest_difficulty', 'easy');
        setMessages(p => {
          const msg = { role: 'gerry', text: "Hey, I noticed you're having a tough time! I've told the game to make things a bit easier for you. You've got this! Remember: every expert was once a beginner.", ts: Date.now() };
          const n = [...p, msg];
          saveHistory(n);
          return n;
        });
        if (!open) setOpen(true);
      }
      return next;
    });
  }, [open]);

  // Expose reportFail globally for games
  useEffect(() => {
    window.__gerryReportFail = reportFail;
    return () => { delete window.__gerryReportFail; };
  }, [reportFail]);

  // Dragging
  const onDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const bubble = e.currentTarget.closest('[data-gerry-root]');
    const rect = bubble.getBoundingClientRect();
    dragOffset.current = { x: clientX - rect.left, y: clientY - rect.top };
    setDragging(true);
  };
  const onDragMove = useCallback((e) => {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: Math.max(0, Math.min(window.innerWidth - 70, clientX - dragOffset.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - 70, clientY - dragOffset.current.y)),
    });
  }, [dragging]);
  const onDragEnd = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onDragMove);
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchmove', onDragMove, { passive: false });
      window.addEventListener('touchend', onDragEnd);
      return () => {
        window.removeEventListener('mousemove', onDragMove);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('touchmove', onDragMove);
        window.removeEventListener('touchend', onDragEnd);
      };
    }
  }, [dragging, onDragMove, onDragEnd]);

  // Welcome message on first open — personalized for returning players
  const greetingFetched = useRef(false);
  const onToggle = async () => {
    if (!open && messages.length === 0 && !greetingFetched.current) {
      greetingFetched.current = true;
      const deviceId = localStorage.getItem(DEVICE_KEY);
      let welcomeText;

      // Try personalized greeting from backend
      if (API_URL && deviceId) {
        try {
          const resp = await fetch(`${API_URL}/api/gerry/greeting/${deviceId}`);
          const data = await resp.json();
          welcomeText = data.greeting;
        } catch { /* fall through */ }
      }

      // Fallback
      if (!welcomeText) {
        const heroData = HERO_STORIES[selectedHero] || HERO_STORIES.gerry;
        welcomeText = `Baaaa! Hey there, I'm Gerry the Goat! Your personal Web3 buddy. Ask me anything about blockchain, crypto, or NFTs — or say "tell me a story" for a ${heroData.name} adventure! I'm here to help whenever you're stuck.`;
      }

      const welcome = { role: 'gerry', text: welcomeText, ts: Date.now() };
      setMessages([welcome]);
      saveHistory([welcome]);
      speak(welcome.text);
    }
    setOpen(!open);
  };

  if (!isEnabled) return null;

  const bubbleStyle = position.x !== null
    ? { position: 'fixed', left: position.x, top: position.y, zIndex: 9999 }
    : { position: 'fixed', bottom: 24, left: 24, zIndex: 9999 };

  return (
    <div data-gerry-root style={bubbleStyle} data-testid="gerry-companion">
      {/* Chat panel */}
      {open && (
        <div
          className="mb-3 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl border border-orange-500/30"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            boxShadow: '0 0 40px rgba(255,107,53,0.2), 0 0 80px rgba(155,93,229,0.1)',
            position: position.x !== null ? 'absolute' : 'relative',
            bottom: position.x !== null ? 70 : undefined,
            left: position.x !== null ? 0 : undefined,
          }}
          data-testid="gerry-chat-panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-600/90 to-amber-600/90">
            <div className="flex items-center gap-2">
              <img src={GERRY_AVATAR} alt="Gerry" className="w-7 h-7 rounded-full object-cover" />
              <div>
                <p className="text-sm font-black text-white tracking-wide">GERRY <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 ml-1 align-middle" title="Synced across games" /></p>
                <p className="text-[10px] text-orange-200 font-medium">Web3 Companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSettings(p => ({ ...p, voice: !p.voice }))}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                data-testid="gerry-voice-toggle"
                title={settings.voice ? 'Mute Gerry' : 'Unmute Gerry'}
              >
                {settings.voice ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-white/50" />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                data-testid="gerry-close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin" data-testid="gerry-messages">
            {messages.map((m, i) => {
              const concept = m.role === 'gerry' ? detectConcept(m.text) : null;
              const isExpanded = expandedImages.has(i);

              return (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'gerry' && <img src={GERRY_AVATAR} alt="G" className="w-5 h-5 rounded-full object-cover flex-shrink-0 mt-0.5" />}
                  <div className="max-w-[85%]">
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-cyan-600/30 text-cyan-100 rounded-br-md'
                          : 'bg-orange-900/30 text-orange-100 border border-orange-500/20 rounded-bl-md'
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.game && m.game !== 'hub' && (
                      <p className="text-[9px] text-gray-500 mt-0.5 px-1">from {m.game}</p>
                    )}
                    {/* "Show me!" button for concept explanations */}
                    {concept && CONCEPT_IMAGES[concept] && (
                      <button
                        onClick={() => setExpandedImages(prev => {
                          const next = new Set(prev);
                          next.has(i) ? next.delete(i) : next.add(i);
                          return next;
                        })}
                        className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-all"
                        data-testid={`show-concept-${concept}`}
                      >
                        <Eye className="w-3 h-3" />
                        {isExpanded ? 'Hide image' : `Show me: ${CONCEPT_IMAGES[concept].label}`}
                      </button>
                    )}
                    {/* Inline concept image */}
                    {concept && isExpanded && CONCEPT_IMAGES[concept] && (
                      <div className="mt-2 rounded-xl overflow-hidden border border-purple-500/30 shadow-lg shadow-purple-500/10">
                        <img
                          src={CONCEPT_IMAGES[concept].url}
                          alt={CONCEPT_IMAGES[concept].label}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                        <p className="text-[10px] text-center py-1.5 text-purple-300 bg-gray-900/80 font-bold">
                          {CONCEPT_IMAGES[concept].label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Quick actions */}
          <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
            {['What is blockchain?', 'Tell me a story', 'Game hint', 'What is an NFT?'].map(q => (
              <button
                key={q}
                onClick={() => { setInput(q); setTimeout(() => { setInput(q); }, 0); }}
                className="text-[10px] px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400 hover:text-orange-400 hover:border-orange-500/50 transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 pb-3">
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask Gerry anything..."
                className="flex-1 px-3 py-2 rounded-xl bg-gray-800/80 border border-gray-700 text-sm text-white placeholder-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                data-testid="gerry-input"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 transition-all"
                data-testid="gerry-send"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>
          </div>

          {/* Difficulty indicator */}
          {(settings.failCount || 0) >= 3 && (
            <div className="px-3 pb-2">
              <p className="text-[10px] text-green-400 text-center">Easy mode active — Gerry's got your back!</p>
            </div>
          )}
        </div>
      )}

      {/* Floating bubble */}
      <div
        className={`group relative cursor-pointer select-none ${dragging ? 'cursor-grabbing' : ''}`}
        onClick={() => !dragging && onToggle()}
        onMouseEnter={() => !open && speak("Need help? Tap me for Web3 tips and game hints!")}
        data-testid="gerry-bubble"
      >
        {/* Glow ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all animate-pulse" />

        {/* Sparkle particles */}
        <div className="absolute -inset-3 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-sparkle-1" />
          <div className="absolute top-1/2 right-0 w-1 h-1 bg-cyan-300 rounded-full animate-sparkle-2" />
          <div className="absolute bottom-0 left-1/4 w-1.5 h-1.5 bg-orange-300 rounded-full animate-sparkle-3" />
          <div className="absolute top-1/4 left-0 w-1 h-1 bg-purple-300 rounded-full animate-sparkle-4" />
        </div>

        {/* Drag handle */}
        <div
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
          className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center cursor-grab opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <GripVertical className="w-3 h-3 text-gray-400" />
        </div>

        {/* Avatar with bounce */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg shadow-orange-500/30 border-2 border-orange-400/50 group-hover:scale-110 transition-transform bg-gradient-to-br from-orange-500/20 to-purple-600/20 animate-gerry-bounce">
          <img src={GERRY_AVATAR} alt="Gerry the Goat" className="w-full h-full object-cover" />
        </div>

        {/* Notification dot */}
        {!open && messages.length > 0 && (
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-cyan-400 border-2 border-gray-950 flex items-center justify-center">
            <span className="text-[8px] font-black text-black">{Math.min(messages.length, 9)}</span>
          </div>
        )}

        {/* Hover tooltip */}
        {!open && (
          <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <p className="text-xs text-orange-300 font-bold">Ask Gerry!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GerryCompanion;
