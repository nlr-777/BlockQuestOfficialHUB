import React, { useState } from 'react';
import { Button } from './ui/button';
import { BookOpen, Sparkles, Lock, ChevronLeft, ChevronRight, Gamepad2, Gem } from 'lucide-react';
import { books } from '../data/mock';

// AI Images for decoration
const MASCOT_IMAGE = 'https://images.unsplash.com/photo-1636899333723-2194ed81d1ce?w=150&h=150&fit=crop';
const ARCADE_IMAGE = 'https://images.unsplash.com/photo-1572289758057-3e0f4327833b?w=150&h=150&fit=crop';

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
            className="absolute text-yellow-400/30 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Decorative AI Images */}
      <div className="absolute left-4 top-20 hidden lg:block">
        <img 
          src={MASCOT_IMAGE} 
          alt="Mascot" 
          className="w-24 h-24 rounded-full object-cover bounce-rotate opacity-60 hover:opacity-100 transition-opacity"
          style={{ filter: 'drop-shadow(0 0 15px rgba(255, 102, 0, 0.5))' }}
        />
      </div>
      <div className="absolute right-4 bottom-20 hidden lg:block">
        <img 
          src={ARCADE_IMAGE} 
          alt="Arcade" 
          className="w-20 h-20 rounded-lg object-cover wobble opacity-50 hover:opacity-100 transition-opacity"
          style={{ filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.5))' }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute left-10 bottom-1/3 hidden md:block">
        <Gamepad2 className="w-12 h-12 text-pink-400/40 spin-slow" />
      </div>
      <div className="absolute right-10 top-1/3 hidden md:block">
        <Gem className="w-10 h-10 text-cyan-400/40 bounce-rotate" />
      </div>

      {/* Section Title */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="section-title glitch-hover text-4xl sm:text-6xl md:text-7xl font-black mb-4">
          BOOK POWER-UP!
        </h2>
        <p className="text-2xl sm:text-3xl font-bold text-yellow-400 flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8" />
          THE BLOCKQUEST STORIES
          <span className="text-3xl">📚🔓</span>
        </p>
      </div>

      {/* Book Carousel */}
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4">
          {/* Prev Button */}
          <Button
            onClick={prevBook}
            className="carousel-nav-btn h-14 w-14 rounded-full"
            aria-label="Previous book"
          >
            <ChevronLeft className="w-8 h-8" />
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
                  {/* Book Cover Placeholder */}
                  <div className="book-cover relative w-48 sm:w-56 h-64 sm:h-80 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 flex flex-col items-center justify-center p-4">
                      <BookOpen className="w-16 h-16 text-white mb-4" />
                      <p className="text-white text-center text-sm font-bold">
                        {book.coverPlaceholder}
                      </p>
                    </div>
                    
                    {/* Coming Soon Badge */}
                    {book.comingSoon && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        SOON
                      </div>
                    )}

                    {/* Glow effect on active */}
                    {isActive && <div className="book-glow" />}
                  </div>

                  {/* Book Info */}
                  <div className={`mt-4 text-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <h3 className="text-xl font-black text-cyan-400 mb-2">{book.title}</h3>
                    <p className="text-gray-400 text-sm">{book.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Button */}
          <Button
            onClick={nextBook}
            className="carousel-nav-btn h-14 w-14 rounded-full"
            aria-label="Next book"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {books.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`carousel-dot ${index === currentIndex ? 'carousel-dot-active' : ''}`}
              aria-label={`Go to book ${index + 1}`}
            />
          ))}
        </div>

        {/* Coming Soon Text */}
        <p className="text-center text-lg sm:text-xl text-gray-300 mt-8 font-medium">
          Read to unlock secret powers and game levels! 
          <span className="text-yellow-400 font-bold"> Coming soon</span> – pure adventure!
        </p>
      </div>
    </section>
  );
};

export default BookSection;
