'use client';
import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingDown, PieChart, DollarSign } from 'lucide-react';

export default function MarketDownturnInfographic() {
  const [highlightedOption, setHighlightedOption] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedOption((prev) => (prev + 1) % 3);
    }, 2000); // Change highlight every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const options = ['Rock Solid', 'Bit Shaky', 'Need Help!'];

  return (
    <div className="bg-red-50 p-4 sm:p-6 rounded-lg shadow-lg max-w-sm mx-auto m-8">
      <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-3 sm:mb-4 flex items-center justify-center text-center">
        <AlertTriangle className="mr-2 flex-shrink-0" />
        <span>Market Downturn Alert!</span>
      </h1>
      
      <div className="bg-white p-3 sm:p-4 rounded-md mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-red-500 mb-2 flex items-center">
          <TrendingDown className="mr-2 flex-shrink-0" />
          <span>Tech Stocks Plummet</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mb-2">
          Nasdaq sinks <span className="font-bold text-red-500">2.7%</span> — worst day since 2022!
        </p>
        <p className="text-xs sm:text-sm text-gray-600">
          Major tech companies see significant declines amid global tensions.
        </p>
      </div>
      
      <div className="bg-yellow-100 p-3 sm:p-4 rounded-md mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-yellow-700 mb-2 flex items-center">
          <DollarSign className="mr-2 flex-shrink-0" />
          <span>Why It Matters</span>
        </h3>
        <p className="text-xs sm:text-sm text-gray-700">
          Market volatility can impact your investments. Stay informed and prepared for potential shifts.
        </p>
      </div>
      
      <div className="bg-blue-100 p-3 sm:p-4 rounded-md mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-blue-700 mb-2 flex items-center">
          <PieChart className="mr-2 flex-shrink-0" />
          <span>Quick Poll</span>
        </h3>
        <p className="text-sm sm:text-base text-gray-700 mb-2">How&apos your investment strategy holding up?</p>
        <div className="space-y-2">
          {options.map((option, index) => (
            <div
              key={index}
              className={`w-full p-2 rounded-md text-left relative overflow-hidden transition-all duration-300 ${
                highlightedOption === index
                  ? 'bg-blue-500 text-white transform scale-102'
                  : 'bg-white text-gray-700'
              }`}
            >
              <span className="relative z-10 text-sm sm:text-base">
                {['🟢', '🟡', '🔴'][index]} {option}
              </span>
              {highlightedOption === index && (
                <div className="absolute inset-0 bg-blue-300 opacity-30 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center text-gray-600">
        <p className="text-sm sm:text-base">Share your thoughts and strategies in the comments! 👇</p>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base">
          Follow <span className="text-blue-500">@thematt6js</span> for more market insights and tips
        </p>
      </div>
    </div>
  );
}