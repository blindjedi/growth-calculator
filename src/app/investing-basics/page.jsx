'use client';
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, PieChart } from 'lucide-react';

const AnimatedStockInvestingBasics = () => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3000); // Change active card every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-6 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 sm:p-6 rounded-2xl shadow-lg overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-90 z-0">
        {/* Background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 animate-pulse"></div>
      </div>
      
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-bounce">
          What is Stock Investing?
        </h1>
        
        <div className="space-y-4 sm:space-y-6">
          {[
            { icon: DollarSign, title: "Ownership", color: "text-green-500", content: "Buying stocks means purchasing a small piece of a company. You become a partial owner, sharing in the company's successes and challenges." },
            { icon: TrendingUp, title: "Growth Potential", color: "text-blue-500", content: "As the company grows and becomes more valuable, the price of your stocks may increase. This gives you the opportunity to grow your wealth over time." },
            { icon: PieChart, title: "Dividends", color: "text-purple-500", content: "Some companies share a portion of their profits with stockholders through regular dividend payments, providing a potential source of passive income." }
          ].map((card, index) => (
            <div key={index} className={`flex items-start bg-white p-4 rounded-lg shadow-md transition-all duration-300 ${activeCard === index ? 'scale-105' : 'scale-100'}`}>
              <card.icon className={`w-8 h-8 ${card.color} mr-3 flex-shrink-0 mt-1 ${activeCard === index ? 'animate-spin-slow' : ''}`} />
              <div>
                <h2 className={`text-lg font-bold text-gray-800 ${activeCard === index ? 'animate-pulse' : ''}`}>{card.title}</h2>
                <p className="text-sm text-gray-600">{card.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center animate-bounce">
          <span className="text-2xl mr-2">🐼</span>
          <span className="text-lg font-bold text-gray-800">@thematt6js</span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedStockInvestingBasics;