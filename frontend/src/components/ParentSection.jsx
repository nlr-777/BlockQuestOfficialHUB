import React, { useState } from 'react';
import { ChevronDown, Shield, Heart, BookOpen, Gamepad2 } from 'lucide-react';

const CompactParentFooter = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="parent-section py-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Trust Badges - Compact Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900/60 border border-gray-700/50">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-xs font-bold text-green-400">Safe</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900/60 border border-gray-700/50">
            <span className="text-sm">🚫</span>
            <span className="text-xs font-bold text-cyan-400">Ad-Free</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900/60 border border-gray-700/50">
            <span className="text-sm">💰</span>
            <span className="text-xs font-bold text-yellow-400">No Real Crypto</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900/60 border border-gray-700/50">
            <span className="text-sm">👨‍👩‍👧‍👦</span>
            <span className="text-xs font-bold text-purple-400">Family Friendly</span>
          </div>
        </div>

        {/* Collapsible: Parent Hub */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection('parent')}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-300 ${
              openSection === 'parent'
                ? 'bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-2 border-green-500/50'
                : 'bg-gray-900/60 border-2 border-gray-700/50 hover:border-green-500/30'
            }`}
            data-testid="parent-hub-toggle"
          >
            <span className={`font-bold text-sm flex items-center gap-2 ${openSection === 'parent' ? 'text-green-400' : 'text-white'}`}>
              <Heart className="w-4 h-4 text-pink-400" />
              Parent Hub
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSection === 'parent' ? 'rotate-180 text-green-400' : 'text-gray-400'}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openSection === 'parent' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 bg-gray-800/40 rounded-b-xl border-x-2 border-b-2 border-gray-700/30 -mt-1 space-y-3">
              <p className="text-gray-400 text-sm">Everything parents need to know about BlockQuest</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-sm text-purple-400">Web3 Chaos Chronicles</span>
                  </div>
                  <p className="text-gray-400 text-xs">A 5-book series exploring money, blockchain, tokens, NFTs, and Web3 through story-driven adventures.</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-900/20 border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Gamepad2 className="w-4 h-4 text-orange-400" />
                    <span className="font-bold text-sm text-orange-400">BlockQuest Retro Arcade</span>
                  </div>
                  <p className="text-gray-400 text-xs">Educational games that reinforce concepts from the books in a fun, gamified environment.</p>
                </div>
              </div>
              {/* Quick FAQ */}
              <div className="space-y-1 text-xs text-gray-400">
                <p><span className="text-green-400 font-bold">Safe?</span> Yes — age-appropriate, curiosity-driven, free from harmful content.</p>
                <p><span className="text-green-400 font-bold">Ages?</span> Games 8+, Books for teens & older readers.</p>
                <p><span className="text-green-400 font-bold">Crypto/Investing?</span> No — explores ideas through storytelling only.</p>
                <p><span className="text-green-400 font-bold">Accounts needed?</span> No — no accounts, wallets, or payments required.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible: Creator Note */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection('creator')}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-300 ${
              openSection === 'creator'
                ? 'bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50'
                : 'bg-gray-900/60 border-2 border-gray-700/50 hover:border-pink-500/30'
            }`}
            data-testid="creator-note-toggle"
          >
            <span className={`font-bold text-sm flex items-center gap-2 ${openSection === 'creator' ? 'text-pink-400' : 'text-white'}`}>
              💜 A Note from the Creator
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openSection === 'creator' ? 'rotate-180 text-pink-400' : 'text-gray-400'}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openSection === 'creator' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 bg-gray-800/40 rounded-b-xl border-x-2 border-b-2 border-gray-700/30 -mt-1">
              <p className="text-gray-300 text-xs leading-relaxed">
                BlockQuest was created by an Aussie homeschool mum who wanted to explain complex concepts to curious kids in a way that&apos;s fun, safe, and actually makes sense. 
                Every story and game is designed with families in mind — no scary stuff, no real money involved, just learning through adventure.
              </p>
              <p className="text-gray-400 text-xs mt-2 italic">
                — Made with love from the Capricorn Coast, QLD 🇦🇺
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer - Always visible, compact */}
        <div className="p-3 rounded-xl bg-gray-800/40 border border-gray-700/50">
          <p className="text-gray-500 text-xs leading-relaxed text-center">
            <span className="text-gray-400 font-semibold">⚠️ Disclaimer:</span> BlockQuest content is for educational and entertainment purposes only. It does not constitute financial, investment, or professional advice. 
            BlockQuest Official is not affiliated with any blockchain platform or cryptocurrency project.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompactParentFooter;
