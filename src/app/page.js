"use client";

import React from 'react';
import StockdioWidget from './components/StockdioWidget';

export default function Home() {
  return (
    <div className="font-sans bg-white">
      <StockdioWidget />

      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold">Welcome to RupiaTimes - The Best Stock Market News Platform </h1>
              <p className="text-lg text-gray-600">
                RupiaTimes is a platform for stock market education and research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}