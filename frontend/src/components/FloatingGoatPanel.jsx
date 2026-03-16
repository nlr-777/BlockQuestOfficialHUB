import React, { useState } from 'react';
import { X, FileText, BookOpen, Play, Award, Download, ExternalLink, HelpCircle } from 'lucide-react';

/* Slide deck PDF data - update paths as needed */
const DECKS = [
  { id: 1, title: "Book 1 – From Goats to Bitcoin", subtitle: "From Bartering Goats to Digital Chaos", url: "https://customer-assets.emergentagent.com/job_d8dff59b-4fda-48a1-a05d-f027b59837f6/artifacts/krqsj69u_From_Goats_to_Bitcoin.pdf" },
  { id: 2, title: "Book 2 – The Unbreakable Record", subtitle: "(AKA Humans Can't Behave)", url: "https://customer-assets.emergentagent.com/job_ecdea318-1bef-4472-bf06-96d374e1353d/artifacts/u733qm8o_The_Unbreakable_Record.pdf" },
];

const YOUTUBE_CHANNEL = "https://youtube.com/@blockquestofficial26?si=JYR5yWsSgGz0Zonp";
const YOUTUBE_PLAYLIST = "https://youtube.com/playlist?list=PLgR8StchduZblHIXk0eJ5YO4Op1auHu7f&si=Z1m60AZIXy4EYjru";

const GLOSSARY = [
  { term: 'Blockchain', emoji: '🔗', def: "Imagine a notebook that everyone in class can read, but nobody can erase or change what's already written. That's a blockchain — a shared record that's super hard to cheat!" },
  { term: 'Cryptocurrency', emoji: '💰', def: "Digital money that lives on the internet! Like game coins, but people can actually use them to buy stuff. Bitcoin and Ethereum are famous ones." },
  { term: 'Wallet', emoji: '👛', def: "A special app that holds your digital money — like a piggy bank, but on your phone or computer. Only you have the secret key to open it!" },
  { term: 'Mining', emoji: '⛏️', def: "Computers solving really hard puzzles to add new pages to the blockchain notebook. The computer that solves it first gets rewarded with crypto — like winning a math race!" },
  { term: 'Token', emoji: '🪙', def: "Like arcade tokens, but digital! They can represent anything — game points, a vote in a club, or even ownership of something cool." },
  { term: 'NFT', emoji: '🖼️', def: "A digital certificate that proves YOU own something unique online — like a one-of-a-kind trading card that can't be copied. It stands for 'Non-Fungible Token' (fancy words for 'one of a kind')." },
  { term: 'Smart Contract', emoji: '🤖', def: "A robot promise! It's code that automatically does something when conditions are met — like a vending machine: put money in → get snack out. No humans needed!" },
  { term: 'Decentralized', emoji: '🌐', def: "Instead of one boss controlling everything (like a principal), everyone shares the power equally. It's like a group project where no single person is in charge!" },
  { term: 'Gas Fees', emoji: '⛽', def: "A tiny fee you pay to use the blockchain — like postage stamps for sending digital stuff. Busier times = more expensive stamps!" },
  { term: 'DeFi', emoji: '🏦', def: "Short for 'Decentralized Finance.' Banking without actual banks! People lend, borrow, and trade directly with each other using code instead of bankers." },
  { term: 'Web3', emoji: '🕸️', def: "The next version of the internet where YOU own your stuff instead of big companies. Think of Web1 as read-only, Web2 as read-write (social media), and Web3 as read-write-OWN!" },
  { term: 'Consensus', emoji: '🤝', def: "When all the computers in the blockchain network agree that something is true — like the whole class voting and saying 'Yep, that's correct!' before it gets written down." },
];

const TABS = [
  { id: 'decks', label: 'Decks', icon: FileText },
  { id: 'glossary', label: 'Glossary', icon: HelpCircle },
  { id: 'stories', label: 'Stories', icon: BookOpen },
  { id: 'videos', label: 'Videos', icon: Play },
  { id: 'extras', label: 'Extras', icon: Award },
];

const FloatingGoatPanel = ({ hasProgress = false, currentXp = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('decks');

  return (
    <>
      {/* Floating Goat Button - Fixed bottom-right */}
      <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <span className="text-xs font-bold text-orange-400 animate-bounce bg-gray-900/80 px-2 py-0.5 rounded-full border border-orange-500/30">
          Tap Here! 👇
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-300 hover:scale-110 hover:rotate-12"
          style={{
            background: 'linear-gradient(135deg, #ff6b35, #9b5de5, #00d4ff)',
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.5), 0 0 40px rgba(155, 93, 229, 0.3), 0 0 60px rgba(0, 212, 255, 0.2)',
            border: '3px solid rgba(255, 255, 255, 0.2)',
          }}
          aria-label="Open resources panel"
          data-testid="floating-goat-btn"
        >
          🐐
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm goat-panel-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-96 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        data-testid="goat-panel"
      >
        <div className="h-full bg-gray-900/95 backdrop-blur-lg border-l-2 border-purple-500/50 flex flex-col overflow-hidden">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐐</span>
              <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                RESOURCE HUB
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Close panel"
              data-testid="goat-panel-close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700/50">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-xs font-bold transition-colors ${
                    activeTab === tab.id
                      ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-900/20'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                  data-testid={`goat-tab-${tab.id}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Decks Tab */}
            {activeTab === 'decks' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-400 mb-4">
                  Companion slide decks for each book — perfect for classrooms & homeschool! 📖
                </p>
                {DECKS.map((deck) => (
                  <a
                    key={deck.id}
                    href={deck.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 rounded-xl bg-gray-800/60 border border-gray-700/50 hover:border-purple-500/50 transition-all"
                    data-testid={`deck-item-${deck.id}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                        {deck.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{deck.subtitle}</p>
                    </div>
                    <Download className="w-4 h-4 text-gray-500 group-hover:text-purple-400 flex-shrink-0" />
                  </a>
                ))}
              </div>
            )}


            {/* Glossary Tab */}
            {activeTab === 'glossary' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-400 mb-3">
                  Tap any word to learn what it means — Gerry-approved! 🐐✨
                </p>
                {GLOSSARY.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-xl bg-gray-800/60 border border-gray-700/50 hover:border-cyan-500/40 transition-all overflow-hidden"
                  >
                    <summary className="flex items-center gap-2 p-3 cursor-pointer list-none select-none">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="text-sm font-bold text-cyan-400 flex-1">{item.term}</span>
                      <span className="text-gray-600 group-open:rotate-90 transition-transform text-xs">▶</span>
                    </summary>
                    <div className="px-3 pb-3 pt-1">
                      <p className="text-xs text-gray-300 leading-relaxed">{item.def}</p>
                    </div>
                  </details>
                ))}
              </div>
            )}

            {/* Stories Tab */}
            {activeTab === 'stories' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-400 mb-4">
                  Download the Web3 Chaos Chronicles books — free for all explorers! 📚
                </p>
                <a
                  href="https://customer-assets.emergentagent.com/job_ecdea318-1bef-4472-bf06-96d374e1353d/artifacts/lsrd3kh6_Moneys%20origin%20story%20Book%201%20%281%29.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-green-900/30 to-gray-900 border border-green-500/30 hover:border-green-400/60 transition-all"
                  data-testid="story-book-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">
                      Book 1 — Money's Origin Story
                    </p>
                    <p className="text-xs text-gray-500">From Bartering Goats to Digital Chaos</p>
                  </div>
                  <Download className="w-4 h-4 text-gray-500 group-hover:text-green-400 flex-shrink-0" />
                </a>
                <div className="mt-4 p-3 rounded-xl bg-gray-800/40 border border-gray-700/30">
                  <p className="text-xs text-gray-500 text-center">
                    More books coming soon — stay tuned!
                  </p>
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400 mb-4">
                  Watch tutorials, read-alongs, and behind-the-scenes content! 🎬
                </p>
                <a
                  href={YOUTUBE_PLAYLIST}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-red-900/30 to-gray-900 border border-red-500/30 hover:border-red-400/60 transition-all"
                  data-testid="youtube-playlist-link"
                >
                  <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                      Watch the Playlist
                    </p>
                    <p className="text-xs text-gray-500">BlockQuest video series</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-red-400" />
                </a>
                <a
                  href={YOUTUBE_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-xl bg-gray-800/60 border border-gray-700/50 hover:border-red-500/50 transition-all"
                  data-testid="youtube-channel-link"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0 text-2xl">
                    📺
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                      YouTube Channel
                    </p>
                    <p className="text-xs text-gray-500">@blockquestofficial26</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-red-400" />
                </a>
              </div>
            )}

            {/* Extras Tab */}
            {activeTab === 'extras' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400 mb-4">
                  Bonus goodies for champions! 🏆
                </p>
                <a
                  href="/extras/champion-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-yellow-900/30 to-gray-900 border border-yellow-500/30 hover:border-yellow-400/60 transition-all"
                  data-testid="certificate-link"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">
                      Champion Certificate
                    </p>
                    <p className="text-xs text-gray-500">Download & print your badge of honor!</p>
                  </div>
                  <Download className="w-4 h-4 text-gray-500 group-hover:text-yellow-400" />
                </a>

                {hasProgress ? (
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-purple-400 mb-2">🎉 Progress Bonuses!</p>
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 p-2 rounded-lg ${currentXp >= 0 ? 'bg-green-900/20 border border-green-500/20' : 'bg-gray-800/40 border border-gray-700/30 opacity-50'}`}>
                        <span>{currentXp >= 0 ? '✅' : '🔒'}</span>
                        <span className="text-xs text-gray-300">Resource Hub Access</span>
                      </div>
                      <div className={`flex items-center gap-2 p-2 rounded-lg ${currentXp >= 200 ? 'bg-green-900/20 border border-green-500/20' : 'bg-gray-800/40 border border-gray-700/30 opacity-50'}`}>
                        <span>{currentXp >= 200 ? '✅' : '🔒'}</span>
                        <span className="text-xs text-gray-300">Book 1 Deck Unlocked! (200 XP)</span>
                      </div>
                      <div className={`flex items-center gap-2 p-2 rounded-lg ${currentXp >= 350 ? 'bg-green-900/20 border border-green-500/20' : 'bg-gray-800/40 border border-gray-700/30 opacity-50'}`}>
                        <span>{currentXp >= 350 ? '✅' : '🔒'}</span>
                        <span className="text-xs text-gray-300">Arcade Tips Unlocked! (350 XP)</span>
                      </div>
                      <div className={`flex items-center gap-2 p-2 rounded-lg ${currentXp >= 500 ? 'bg-green-900/20 border border-green-500/20' : 'bg-gray-800/40 border border-gray-700/30 opacity-50'}`}>
                        <span>{currentXp >= 500 ? '✅' : '🔒'}</span>
                        <span className="text-xs text-gray-300">Secret Gary Story! (500 XP)</span>
                      </div>
                      <div className={`flex items-center gap-2 p-2 rounded-lg ${currentXp >= 750 ? 'bg-green-900/20 border border-green-500/20' : 'bg-gray-800/40 border border-gray-700/30 opacity-50'}`}>
                        <span>{currentXp >= 750 ? '✅' : '🔒'}</span>
                        <span className="text-xs text-gray-300">Champion Certificate! (750 XP)</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-600 text-center mt-2">Your XP: {currentXp}</p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-gray-800/40 border border-gray-700/30">
                    <p className="text-xs text-gray-500 text-center">
                      🔒 Play games & earn XP to unlock bonus content here!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Panel Footer */}
          <div className="p-3 border-t border-gray-700/50 text-center">
            <p className="text-xs text-gray-600">
              🐐 BlockQuest Official Resources
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingGoatPanel;
