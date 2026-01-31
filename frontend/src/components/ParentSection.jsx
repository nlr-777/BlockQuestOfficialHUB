import React, { useState } from 'react';
import { ChevronDown, Users, Shield, Heart, BookOpen, Gamepad2 } from 'lucide-react';

const parentFAQData = [
  {
    question: "Is BlockQuest safe for children?",
    answer: "Yes. Our games and stories are designed to be age-appropriate, curiosity-driven, and free from harmful content."
  },
  {
    question: "What age range is this suitable for?",
    answer: "Games are generally suitable for ages 8+. Books are best for teens and older readers, with younger readers welcome alongside an adult."
  },
  {
    question: "Is this teaching cryptocurrency or investing?",
    answer: "No. BlockQuest explores ideas like money and technology through storytelling. It does not teach investing, trading, or financial speculation."
  },
  {
    question: "Do children need accounts, wallets, or payments?",
    answer: "No. Our content can be enjoyed without accounts, wallets, or technical setup."
  },
  {
    question: "Can this be used for homeschooling?",
    answer: "Yes. Many families use BlockQuest as a creative learning companion and conversation starter."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <div className="mb-3">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-300 ${
          isOpen 
            ? 'bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-2 border-green-500/50' 
            : 'bg-gray-900/60 border-2 border-gray-700/50 hover:border-green-500/30'
        }`}
        data-testid={`parent-faq-item-${index}`}
      >
        <span className={`font-bold text-sm sm:text-base pr-4 ${isOpen ? 'text-green-400' : 'text-white'}`}>
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-green-400' : 'text-gray-400'
          }`} 
        />
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 bg-gray-800/40 rounded-b-xl border-x-2 border-b-2 border-gray-700/30 -mt-2">
          <p className="text-gray-300 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const ParentSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="parent-section py-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-10 h-10 text-green-400" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-green-400">
              Parent Hub
            </h2>
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg">Everything parents need to know about BlockQuest</p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="flex flex-col items-center p-4 rounded-xl bg-gray-900/60 border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <Shield className="w-8 h-8 text-green-400 mb-2" />
            <span className="text-sm font-bold text-green-400">Safe Content</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-gray-900/60 border border-gray-700/50 hover:border-cyan-500/30 transition-colors">
            <span className="text-2xl mb-2">🚫</span>
            <span className="text-sm font-bold text-cyan-400">Ad-Free</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-gray-900/60 border border-gray-700/50 hover:border-yellow-500/30 transition-colors">
            <span className="text-2xl mb-2">💰</span>
            <span className="text-sm font-bold text-yellow-400">No Real Crypto</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-gray-900/60 border border-gray-700/50 hover:border-purple-500/30 transition-colors">
            <span className="text-2xl mb-2">👨‍👩‍👧‍👦</span>
            <span className="text-sm font-bold text-purple-400">Family Friendly</span>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <span className="text-cyan-400">📚</span> What BlockQuest Offers
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-gradient-to-br from-purple-900/30 to-transparent border border-purple-500/30 hover:border-purple-400/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-6 h-6 text-purple-400" />
                <h4 className="font-bold text-lg text-purple-400">Web3 Chaos Chronicles</h4>
              </div>
              <p className="text-gray-300 text-sm">
                A 5-book series exploring money, blockchain, tokens, NFTs, and Web3 through story-driven adventures. Perfect for curious minds who learn best through narrative.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-orange-900/30 to-transparent border border-orange-500/30 hover:border-orange-400/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Gamepad2 className="w-6 h-6 text-orange-400" />
                <h4 className="font-bold text-lg text-orange-400">BlockQuest Retro Arcade</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Educational games that reinforce concepts from the books. Kids can play and learn about blockchain concepts in a fun, gamified environment.
              </p>
            </div>
          </div>
        </div>

        {/* Parent FAQ */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <span className="text-green-400">❓</span> Common Questions from Parents
          </h3>
          <div className="space-y-1">
            {parentFAQData.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>

        {/* Creator Note */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-pink-900/20 to-purple-900/20 border border-pink-500/30 mb-8">
          <h3 className="text-lg font-bold text-pink-400 mb-3 flex items-center gap-2">
            💜 A Note from the Creator
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            BlockQuest was created by an Aussie homeschool mum who wanted to explain complex concepts to curious kids in a way that&apos;s fun, safe, and actually makes sense. 
            Every story and game is designed with families in mind — no scary stuff, no real money involved, just learning through adventure.
          </p>
          <p className="text-gray-400 text-sm mt-3 italic">
            — Made with love from the Capricorn Coast, QLD 🇦🇺
          </p>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/50">
          <p className="text-gray-500 text-xs leading-relaxed text-center">
            <span className="text-gray-400 font-semibold">⚠️ Disclaimer:</span> BlockQuest content is for educational and entertainment purposes only. It does not constitute financial, investment, or professional advice. 
            BlockQuest Official is not affiliated with any blockchain platform or cryptocurrency project.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ParentSection;
