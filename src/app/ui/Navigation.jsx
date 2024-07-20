'use client'

import React, { useState } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-xl font-bold">
              InvestingHub
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/calculator" className="text-white hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium">Calculator</Link>
              <Link href="/investing-basics" className="text-white hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium">Basics</Link>
              <Link href="/market-news" className="text-white hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium">News</Link>
              <Link href="/stock-analysis" className="text-white hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium">Analysis</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/calculator" onClick={closeMenu} className="text-white hover:bg-purple-600 block px-3 py-2 rounded-md text-base font-medium border-b border-purple-600">Calculator</Link>
          <Link href="/investing-basics" onClick={closeMenu} className="text-white hover:bg-purple-600 block px-3 py-2 rounded-md text-base font-medium border-b border-purple-600">Basics</Link>
          <Link href="/market-news" onClick={closeMenu} className="text-white hover:bg-purple-600 block px-3 py-2 rounded-md text-base font-medium border-b border-purple-600">News</Link>
          <Link href="/stock-analysis" onClick={closeMenu} className="text-white hover:bg-purple-600 block px-3 py-2 rounded-md text-base font-medium">Analysis</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;