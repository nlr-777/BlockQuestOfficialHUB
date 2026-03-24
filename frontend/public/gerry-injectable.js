/**
 * Gerry AI Companion — Injectable Script for BlockQuest Games
 * Add to any game: <script src="https://blockquestofficial.com/gerry-injectable.js"></script>
 * 
 * Features:
 * - Floating draggable chat bubble
 * - Rule-based Web3 hints + game-specific tips
 * - Voice-over (Web Speech API)
 * - Auto-detect stuck state (45s idle)
 * - Difficulty auto-scaling (3 fails → easy mode)
 * - localStorage conversation history
 */
(function() {
  'use strict';
  if (window.__gerryLoaded) return;
  window.__gerryLoaded = true;

  // ─── Config ──────────────────────────────────
  const GERRY_KEY = 'blockquest_gerry';
  const SETTINGS_KEY = 'blockquest_gerry_settings';
  const DIFFICULTY_KEY = 'blockquest_difficulty';
  const STUCK_TIMEOUT = 45000;

  // ─── Knowledge ───────────────────────────────
  const WEB3 = {
    blockchain: "A blockchain is like a digital notebook everyone shares! Once you write in it, nobody can erase or change it.",
    bitcoin: "Bitcoin was the first cryptocurrency — invented in 2009 by a mystery person called Satoshi Nakamoto. Digital gold!",
    mining: "Mining is computers racing to solve hard puzzles. The winner adds a new page to the blockchain and earns crypto!",
    wallet: "A crypto wallet is a digital piggy bank on your phone with a public address (mailbox) and private key (secret combination).",
    nft: "An NFT is a one-of-a-kind digital certificate that proves YOU own something unique online — like a signed trading card!",
    token: "Tokens are like arcade coins, but digital! They can represent game points, votes, or ownership of cool stuff.",
    gas: "Gas fees are tiny charges to use the blockchain — like postage stamps. Busy times = more expensive!",
    smart_contract: "A smart contract is a robot promise! Code that automatically does things when conditions are met.",
    defi: "DeFi = banking without banks! People trade directly with each other using code.",
    web3: "Web3 is the next internet where YOU own your stuff. Web1=read, Web2=read+write, Web3=read+write+OWN!",
    consensus: "Consensus is when all computers agree something is true — like the class voting 'Yep!' before it's written down.",
    dao: "A DAO is a club where members vote on everything using tokens — no president, just rules in code!",
    staking: "Staking = locking crypto to help the blockchain run. You earn rewards — like savings account interest!",
    metaverse: "The metaverse is a virtual world where you hang out, play, and truly own your items!",
    airdrop: "An airdrop = free tokens dropped into your wallet. Like surprise candy in your backpack!",
    private_key: "Your private key is a super-secret wallet password. NEVER share it!",
    public_key: "Your public key is your wallet address you CAN share — like a home address for receiving crypto.",
  };

  const GAME_HINTS = {
    miners: ["Try placing blocks in the correct order!", "Each block connects to the previous one — check the hashes!", "Block colors give you clues about the sequence."],
    wallet: ["Check your balance before sending tokens!", "Write down the seed phrase in the correct order.", "Watch out for phishing messages!"],
    retro: ["Each level teaches a Web3 concept. Read the intros!", "Speed AND accuracy both matter for the leaderboard!", "Look for secret paths with bonus tokens!"],
    nft: ["Mix different traits for unique creations!", "Star ratings show rarity levels.", "Name your NFT — every great one has a story!"],
    money: ["Think about what's fair in bartering!", "Each money era solves a problem from the last.", "Collect all history coins for the bonus ending!"],
  };

  const STUCK_TIPS = [
    "Looks like you might be stuck! Want a hint?",
    "Hey explorer! I've got Web3 wisdom to share!",
    "Gerry here! Been on this part a while — want a tip?",
    "This part's tricky! Want me to break it down?",
  ];

  const ENCOURAGEMENT = [
    "You're doing amazing! Every explorer starts somewhere.",
    "Keep going! Great blockchain builders never give up.",
    "You've got this! Gerry believes in you!",
    "Making mistakes is how we learn. Try again!",
    "Baaaa-rilliant effort!",
  ];

  // ─── State ───────────────────────────────────
  let messages = [];
  let settings = { enabled: true, voice: true, failCount: 0 };
  let isOpen = false;
  let stuckTimeout = null;
  let dragState = { dragging: false, offsetX: 0, offsetY: 0 };

  try { messages = JSON.parse(localStorage.getItem(GERRY_KEY)) || []; } catch(e) {}
  try { settings = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || settings; } catch(e) {}

  const save = () => {
    try { localStorage.setItem(GERRY_KEY, JSON.stringify(messages.slice(-50))); } catch(e) {}
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch(e) {}
  };

  // ─── Detect game type from URL ───────────────
  const detectGame = () => {
    const url = window.location.hostname;
    if (url.includes('miner')) return 'miners';
    if (url.includes('wallet')) return 'wallet';
    if (url.includes('retro') || url.includes('arcade')) return 'retro';
    if (url.includes('nft')) return 'nft';
    if (url.includes('money') || url.includes('future')) return 'money';
    return 'general';
  };

  // ─── Response engine ─────────────────────────
  const getResponse = (input) => {
    const q = input.toLowerCase().trim();
    for (const [k, v] of Object.entries(WEB3)) {
      if (q.includes(k.replace('_', ' ')) || q.includes(k)) return v;
    }
    const game = detectGame();
    const hints = GAME_HINTS[game];
    if (hints && (q.includes('hint') || q.includes('help') || q.includes('stuck') || q.includes('tip'))) {
      return hints[Math.floor(Math.random() * hints.length)];
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return "Hey explorer! I'm Gerry the Goat — your Web3 buddy! Ask about blockchain, tokens, NFTs, or say 'hint' for game tips!";
    }
    if (q.includes('story') || q.includes('what if') || q.includes('imagine')) {
      return "What if Gerry the Goat accidentally mined a Bitcoin while looking for snacks? He'd probably try to eat it! But seriously — every block in the chain is like a page in a story only computers can write.";
    }
    return [
      "Great question! Try asking about blockchain, mining, NFTs, or wallets.",
      "Hmm, still learning that one! Try asking about Web3 topics or say 'hint' for game tips!",
      "Baaaa! Ask about crypto, smart contracts, tokens, or say 'help' for a game hint!",
    ][Math.floor(Math.random() * 3)];
  };

  // ─── Voice ───────────────────────────────────
  const speak = (text) => {
    if (!settings.voice || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05; u.pitch = 1.3; u.volume = 0.8;
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) || voices.find(v => v.lang.startsWith('en'));
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  };

  // ─── Stuck detection ─────────────────────────
  const resetStuckTimer = () => {
    clearTimeout(stuckTimeout);
    if (!isOpen || !settings.enabled) return;
    stuckTimeout = setTimeout(() => {
      const tip = STUCK_TIPS[Math.floor(Math.random() * STUCK_TIPS.length)];
      addMessage('gerry', tip);
      speak(tip);
      if (!isOpen) toggleOpen();
    }, STUCK_TIMEOUT);
  };

  // ─── Difficulty auto-scaling ─────────────────
  window.__gerryReportFail = function() {
    settings.failCount = (settings.failCount || 0) + 1;
    if (settings.failCount >= 3) {
      localStorage.setItem(DIFFICULTY_KEY, 'easy');
      addMessage('gerry', "I've told the game to make things easier for you. You've got this! Every expert was once a beginner.");
      settings.failCount = 0;
      if (!isOpen) toggleOpen();
    }
    save();
  };

  // Expose difficulty check for games
  window.__gerryGetDifficulty = function() {
    return localStorage.getItem(DIFFICULTY_KEY) || 'normal';
  };

  // ─── DOM ─────────────────────────────────────
  const CSS = `
    #gerry-root{position:fixed;bottom:24px;right:24px;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
    #gerry-root *{box-sizing:border-box;margin:0;padding:0}
    #gerry-bubble{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#ff6b35,#f59e0b);display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer;border:2px solid rgba(255,107,53,0.5);box-shadow:0 0 20px rgba(255,107,53,0.3);transition:transform .2s,box-shadow .2s;user-select:none}
    #gerry-bubble:hover{transform:scale(1.1);box-shadow:0 0 30px rgba(255,107,53,0.5)}
    #gerry-bubble .notif{position:absolute;top:-2px;right:-2px;width:18px;height:18px;border-radius:50%;background:#22d3ee;border:2px solid #0a0a1a;font-size:9px;font-weight:900;color:#000;display:flex;align-items:center;justify-content:center}
    #gerry-bubble .grip{position:absolute;top:-4px;left:-4px;width:18px;height:18px;border-radius:50%;background:#1f2937;border:1px solid #4b5563;display:flex;align-items:center;justify-content:center;cursor:grab;opacity:0;transition:opacity .2s;font-size:10px;color:#9ca3af}
    #gerry-bubble:hover .grip{opacity:1}
    #gerry-panel{width:340px;margin-bottom:12px;border-radius:16px;overflow:hidden;background:linear-gradient(135deg,#1a1a2e,#16213e);border:1px solid rgba(255,107,53,0.3);box-shadow:0 0 40px rgba(255,107,53,0.2);display:none}
    #gerry-panel.open{display:block}
    #gerry-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:linear-gradient(90deg,rgba(234,88,12,0.9),rgba(217,119,6,0.9))}
    #gerry-header .info{display:flex;align-items:center;gap:8px}
    #gerry-header .name{font-size:13px;font-weight:900;color:#fff;letter-spacing:1px}
    #gerry-header .sub{font-size:9px;color:#fed7aa;font-weight:500}
    #gerry-header button{background:none;border:none;color:#fff;cursor:pointer;padding:4px;border-radius:6px;font-size:16px;opacity:0.8;transition:opacity .2s}
    #gerry-header button:hover{opacity:1;background:rgba(255,255,255,0.1)}
    #gerry-msgs{height:260px;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px}
    #gerry-msgs::-webkit-scrollbar{width:4px}
    #gerry-msgs::-webkit-scrollbar-thumb{background:#374151;border-radius:4px}
    .gerry-msg{display:flex;gap:8px;max-width:85%}
    .gerry-msg.user{align-self:flex-end;flex-direction:row-reverse}
    .gerry-msg .avatar{font-size:16px;flex-shrink:0;margin-top:2px}
    .gerry-msg .bubble{padding:8px 12px;border-radius:14px;font-size:13px;line-height:1.5}
    .gerry-msg.bot .bubble{background:rgba(154,52,18,0.25);color:#fed7aa;border:1px solid rgba(255,107,53,0.2);border-bottom-left-radius:4px}
    .gerry-msg.user .bubble{background:rgba(6,182,212,0.2);color:#a5f3fc;border-bottom-right-radius:4px}
    #gerry-quick{padding:6px 12px;display:flex;flex-wrap:wrap;gap:4px}
    #gerry-quick button{font-size:10px;padding:4px 10px;border-radius:99px;background:#1f2937;border:1px solid #374151;color:#9ca3af;cursor:pointer;transition:all .15s}
    #gerry-quick button:hover{color:#fb923c;border-color:rgba(249,115,22,0.5)}
    #gerry-input-row{display:flex;gap:8px;padding:8px 12px 12px}
    #gerry-input{flex:1;padding:8px 12px;border-radius:12px;background:rgba(31,41,55,0.8);border:1px solid #374151;color:#fff;font-size:13px;outline:none;transition:border-color .2s}
    #gerry-input::placeholder{color:#6b7280}
    #gerry-input:focus{border-color:rgba(249,115,22,0.5)}
    #gerry-send{padding:8px;border-radius:12px;background:linear-gradient(135deg,#f97316,#f59e0b);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:opacity .2s}
    #gerry-send:hover{opacity:0.85}
    #gerry-send svg{width:16px;height:16px;fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    #gerry-easy{text-align:center;font-size:10px;color:#4ade80;padding:0 12px 8px}
  `;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'gerry-root';
  root.innerHTML = `
    <div id="gerry-panel">
      <div id="gerry-header">
        <div class="info"><span style="font-size:22px">🐐</span><div><div class="name">GERRY</div><div class="sub">Web3 Companion</div></div></div>
        <div style="display:flex;gap:4px">
          <button id="gerry-voice-btn" title="Toggle voice">🔊</button>
          <button id="gerry-close-btn">✕</button>
        </div>
      </div>
      <div id="gerry-msgs"></div>
      <div id="gerry-quick"></div>
      <div id="gerry-input-row">
        <input id="gerry-input" placeholder="Ask Gerry anything..." />
        <button id="gerry-send"><svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
      </div>
      <div id="gerry-easy" style="display:none">Easy mode active — Gerry's got your back!</div>
    </div>
    <div id="gerry-bubble" style="position:relative">
      <div class="grip">⠿</div>
      🐐
      <div class="notif" style="display:none">0</div>
    </div>
  `;
  document.body.appendChild(root);

  // Elements
  const panel = root.querySelector('#gerry-panel');
  const bubble = root.querySelector('#gerry-bubble');
  const msgsEl = root.querySelector('#gerry-msgs');
  const inputEl = root.querySelector('#gerry-input');
  const sendBtn = root.querySelector('#gerry-send');
  const closeBtn = root.querySelector('#gerry-close-btn');
  const voiceBtn = root.querySelector('#gerry-voice-btn');
  const quickEl = root.querySelector('#gerry-quick');
  const notifEl = root.querySelector('.notif');
  const easyEl = root.querySelector('#gerry-easy');
  const grip = root.querySelector('.grip');

  // ─── Render ──────────────────────────────────
  const renderMessages = () => {
    msgsEl.innerHTML = messages.map(m =>
      `<div class="gerry-msg ${m.role === 'user' ? 'user' : 'bot'}">
        ${m.role === 'gerry' ? '<span class="avatar">🐐</span>' : ''}
        <div class="bubble">${m.role === 'gerry' ? m.text : m.text}</div>
      </div>`
    ).join('');
    msgsEl.scrollTop = msgsEl.scrollHeight;
    notifEl.textContent = Math.min(messages.length, 9);
    notifEl.style.display = !isOpen && messages.length > 0 ? 'flex' : 'none';
    voiceBtn.textContent = settings.voice ? '🔊' : '🔇';
    easyEl.style.display = (settings.failCount || 0) >= 3 ? 'block' : 'none';
  };

  const addMessage = (role, text) => {
    messages.push({ role, text, ts: Date.now() });
    save();
    renderMessages();
    if (role === 'gerry') speak(text);
    resetStuckTimer();
  };

  // Quick actions
  const quickActions = ['What is blockchain?', 'Hint please!', 'Tell me a story', 'What is an NFT?'];
  quickEl.innerHTML = quickActions.map(q => `<button data-q="${q}">${q}</button>`).join('');
  quickEl.addEventListener('click', e => {
    if (e.target.dataset.q) { inputEl.value = e.target.dataset.q; sendMessage(); }
  });

  const sendMessage = () => {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    addMessage('user', text);
    setTimeout(() => addMessage('gerry', getResponse(text)), 300);
  };

  // ─── Events ──────────────────────────────────
  const toggleOpen = () => {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    if (isOpen && messages.length === 0) {
      addMessage('gerry', "Baaaa! Hey there, I'm Gerry the Goat — your Web3 buddy! Ask me anything about blockchain, crypto, NFTs, or say 'hint' for game tips!");
    }
    renderMessages();
    if (isOpen) { inputEl.focus(); resetStuckTimer(); }
  };

  bubble.addEventListener('click', (e) => {
    if (e.target.closest('.grip')) return;
    toggleOpen();
  });

  bubble.addEventListener('mouseenter', () => {
    if (!isOpen) speak("Need help? Tap me for Web3 tips and game hints!");
  });

  closeBtn.addEventListener('click', () => { isOpen = false; panel.classList.remove('open'); renderMessages(); });
  voiceBtn.addEventListener('click', () => { settings.voice = !settings.voice; save(); renderMessages(); });
  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

  // Drag
  grip.addEventListener('mousedown', startDrag);
  grip.addEventListener('touchstart', startDrag, { passive: false });
  function startDrag(e) {
    e.preventDefault();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const r = root.getBoundingClientRect();
    dragState = { dragging: true, offsetX: cx - r.left, offsetY: cy - r.top };
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
  }
  function onDrag(e) {
    if (!dragState.dragging) return;
    e.preventDefault();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    root.style.left = Math.max(0, Math.min(window.innerWidth - 70, cx - dragState.offsetX)) + 'px';
    root.style.top = Math.max(0, Math.min(window.innerHeight - 70, cy - dragState.offsetY)) + 'px';
    root.style.bottom = 'auto';
    root.style.right = 'auto';
  }
  function endDrag() {
    dragState.dragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', endDrag);
  }

  renderMessages();
})();
