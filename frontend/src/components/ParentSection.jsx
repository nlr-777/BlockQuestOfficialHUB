import React from 'react';
import { Shield, Heart, Ban, Sparkles, Users } from 'lucide-react';

const ParentSection = () => {
  const features = [
    { icon: Shield, text: 'Safe', color: 'text-green-400' },
    { icon: Ban, text: 'Ad-free', color: 'text-cyan-400' },
    { icon: Sparkles, text: 'No real crypto', color: 'text-yellow-400' },
    { icon: Users, text: 'Fun for all ages', color: 'text-pink-400' },
  ];

  return (
    <section className="parent-section py-16 px-4 relative">
      {/* Softer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="parent-card rounded-2xl p-8 sm:p-12">
          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-200">
            Quick Parent Calm Zone
          </h3>
          
          {/* Subtitle */}
          <p className="text-center text-gray-400 mb-8 text-lg">
            Suitable for ages 5 and up – fun for the whole family!
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="parent-feature-pill flex items-center gap-2 px-6 py-3 rounded-full"
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="font-bold text-gray-200">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Creator Note */}
          <p className="text-center text-gray-300 text-lg sm:text-xl font-medium flex items-center justify-center flex-wrap gap-2">
            Created by an Aussie homeschool mum with love
            <Heart className="w-6 h-6 text-pink-400 animate-pulse inline" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default ParentSection;
