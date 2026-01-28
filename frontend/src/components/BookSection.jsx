import React, { useState } from 'react';
import { Button } from './ui/button';
import { BookOpen, Sparkles, Lock, ChevronLeft, ChevronRight, ShoppingCart, Users } from 'lucide-react';
import { books, characters, CHARACTERS_IMAGE } from '../data/mock';

const BookSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBook = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  };

  const prevBook = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  return (
    <section className="book-section py-20 px-4 relative overflow-hidden">
      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-orange-400/30 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating goats */}
      <div className="absolute left-10 bottom-1/3 hidden md:block text-4xl animate-bounce" style={{ animationDuration: '4s' }}>
        🐐
      </div>
      <div className="absolute right-10 top-1/3 hidden md:block text-3xl bounce-rotate">
        📚
      </div>

      {/* Section Title */}
      <div className="text-center mb-8 relative z-10">
        <p className="text-sm sm:text-base font-bold text-purple-400 mb-2 tracking-wider">
          WEB3 CHAOS CHRONICLES
        </p>
        <h2 className="section-title glitch-hover text-4xl sm:text-6xl md:text-7xl font-black mb-4" style={{ filter: 'drop-shadow(0 0 20px rgba(155, 93, 229, 0.5))' }}>
          BOOK POWER-UP!
        </h2>
        <p className="text-xl sm:text-2xl font-bold text-orange-400 flex items-center justify-center gap-3">
          <BookOpen className="w-7 h-7" />
          Learn Web3 Through Epic Stories!
          <span className="text-2xl">🐐📚</span>
        </p>
      </div>

      {/* Meet the Characters Section */}
      <div className="max-w-4xl mx-auto mb-12 relative z-10">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-purple-900/30 border border-purple-500/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Characters Image */}
            <div className="flex-shrink-0">
              <img 
                src={CHARACTERS_IMAGE} 
                alt="The 5 Friends" 
                className="w-48 h-48 md:w-56 md:h-56 rounded-xl object-cover border-4 border-purple-500/30 shadow-lg shadow-purple-500/20"
              />
            </div>
            
            {/* Characters Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Users className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Meet the 5 Friends!</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Follow their adventure from Gary's goat trade to the future of Web3!
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {characters.map((char, i) => (
                  <span 
                    key={i}
                    className={`px-3 py-1 rounded-full bg-gray-800/60 border border-gray-600/40 text-xs font-semibold ${char.color}`}
                  >
                    {char.name} ({char.age})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Carousel */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4">
          {/* Prev Button */}
          <Button
            onClick={prevBook}
            className="carousel-nav-btn h-14 w-14 rounded-full bg-purple-800/50 border-purple-500/50 hover:bg-purple-700/50"
            aria-label="Previous book"
          >
            <ChevronLeft className="w-8 h-8 text-purple-300" />
          </Button>

          {/* Books Display */}
          <div className="flex gap-4 sm:gap-6 overflow-hidden py-8">
            {books.map((book, index) => {
              const isActive = index === currentIndex;
              const offset = index - currentIndex;
              
              return (
                <div
                  key={book.id}
                  className={`book-card transition-all duration-500 ${isActive ? 'book-card-active' : 'book-card-inactive'}`}
                  style={{
                    transform: `translateX(${offset * 20}px) scale(${isActive ? 1 : 0.85})`,
                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.6,
                    zIndex: isActive ? 10 : 5 - Math.abs(offset)
                  }}
                >
                  {/* Book Cover */}
                  <div className="book-cover relative w-48 sm:w-56 h-64 sm:h-80 rounded-lg overflow-hidden shadow-2xl">
                    {book.cover ? (
                      // Real book cover
                      <img 
                        src={book.cover} 
                        alt={book.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      // Coming Soon placeholder
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 flex flex-col items-center justify-center p-4">
                        <BookOpen className="w-16 h-16 text-white/50 mb-4" />
                        <p className="text-white/70 text-center text-lg font-bold">
                          Book {book.bookNumber}
                        </p>
                        <p className="text-purple-300 text-center text-sm mt-2">
                          Coming Soon
                        </p>
                      </div>
                    )}
                    
                    {/* Coming Soon Badge */}
                    {book.comingSoon && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-lg">
                        <Lock className="w-3 h-3" />
                        SOON
                      </div>
                    )}

                    {/* Book Number Badge */}
                    {!book.comingSoon && (
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Book {book.bookNumber}
                      </div>
                    )}

                    {/* Glow effect on active */}
                    {isActive && <div className="book-glow" style={{ background: 'linear-gradient(45deg, #ff6b35, #9b5de5, #00d4ff)' }} />}
                  </div>

                  {/* Book Info */}
                  <div className={`mt-4 text-center transition-opacity duration-300 max-w-56 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-xs text-purple-400 font-semibold mb-1">{book.series}</p>
                    <h3 className="text-lg font-black text-orange-400 mb-1">{book.title}</h3>
                    {book.subtitle && (
                      <p className="text-sm text-cyan-400 font-medium mb-2">{book.subtitle}</p>
                    )}
                    <p className="text-gray-400 text-xs">{book.description}</p>
                    
                    {/* Buy Button for available books */}
                    {!book.comingSoon && (
                      <Button 
                        className="mt-3 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 text-white text-sm px-4 py-2 rounded-full font-bold flex items-center gap-2 mx-auto"
                        onClick={(e) => e.preventDefault()}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Button */}
          <Button
            onClick={nextBook}
            className="carousel-nav-btn h-14 w-14 rounded-full bg-purple-800/50 border-purple-500/50 hover:bg-purple-700/50"
            aria-label="Next book"
          >
            <ChevronRight className="w-8 h-8 text-purple-300" />
          </Button>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {books.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-orange-500 shadow-lg shadow-orange-500/50 scale-125' 
                  : 'bg-purple-700 hover:bg-purple-600'
              }`}
              aria-label={`Go to book ${index + 1}`}
            />
          ))}
        </div>

        {/* Series Teaser */}
        <div className="text-center mt-10 p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-purple-900/40 border border-purple-500/20 max-w-2xl mx-auto">
          <p className="text-lg sm:text-xl text-gray-300 font-medium">
            🐐 It all started when Gary traded his goat... Now 5 friends explore the chaos of Web3!
          </p>
          <p className="text-orange-400 font-bold mt-2">
            5-Book Series • Perfect for curious kids (10+) and confused adults!
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
