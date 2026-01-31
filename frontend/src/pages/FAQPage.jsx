import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronLeft, HelpCircle, Sparkles } from 'lucide-react';

const faqData = [
  {
    question: "What is BlockQuest Official?",
    answer: "BlockQuest Official is an independent creative studio building books, games, and interactive stories inside a shared universe called BlockQuest."
  },
  {
    question: "What is Web3 Chaos Chronicles?",
    answer: "Web3 Chaos Chronicles is a book series set within the BlockQuest universe that explores money, technology, and systems through story-driven adventures."
  },
  {
    question: "Who is this for?",
    answer: "Our content is designed for teens, curious adults, and families exploring big ideas together."
  },
  {
    question: "Do I need Web3 or technical knowledge?",
    answer: "No. No prior knowledge is required. Curiosity is enough."
  },
  {
    question: "Are your books DRM-free?",
    answer: "Yes. All books are DRM-free. You own your copy."
  },
  {
    question: "Where can I read or play?",
    answer: "Books are released via itch.io and linked from our official website. Games are playable through our website and official links."
  },
  {
    question: "Is this financial or investment advice?",
    answer: "No. BlockQuest content is for educational and entertainment purposes only."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-4 sm:p-5 rounded-xl text-left transition-all duration-300 ${
          isOpen 
            ? 'bg-gradient-to-r from-orange-900/40 to-purple-900/40 border-2 border-orange-500/50' 
            : 'bg-gray-900/60 border-2 border-gray-700/50 hover:border-orange-500/30'
        }`}
        data-testid={`faq-item-${question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className={`font-bold text-base sm:text-lg pr-4 ${isOpen ? 'text-orange-400' : 'text-white'}`}>
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-orange-400' : 'text-gray-400'
          }`} 
        />
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 sm:p-5 bg-gray-800/40 rounded-b-xl border-x-2 border-b-2 border-gray-700/30 -mt-2">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-orange-900/20 to-transparent py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mb-8"
            data-testid="back-to-home"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to BlockQuest
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-10 h-10 text-orange-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-orange-400">
              FAQ
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg">Frequently Asked Questions</p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-2">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Disclaimer Section */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30">
          <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            ⚠️ Disclaimer
          </h2>
          <div className="text-gray-300 text-sm leading-relaxed space-y-3">
            <p>
              BlockQuest Official publishes creative works intended for entertainment and general educational exploration only.
            </p>
            <p>
              Nothing on this website, in our books, or in our games constitutes financial, investment, legal, or professional advice.
            </p>
            <p>
              BlockQuest Official is not affiliated with, endorsed by, or representative of any blockchain platform, cryptocurrency project, or financial institution.
            </p>
            <p>
              All content is provided &quot;as is&quot; for creative and educational purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
        <p>© 2026 BlockQuest Official. All rights reserved.</p>
        <p className="text-sm mt-1">BlockQuest Official | ABN: 71 926 421 644 | Capricorn Coast, QLD</p>
      </footer>
    </div>
  );
};

export default FAQPage;
