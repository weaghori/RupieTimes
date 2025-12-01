"use client";

import React from 'react';
import StockdioWidget from './components/StockdioWidget';
import HomeHero from './components/HomeHero';
import IpoMarquee from './components/IpoMarquee';
import ProductSlider from './components/ProductSlider';
export default function Home() {
  return (
    <div className="font-sans bg-white">
      <StockdioWidget />
      <HomeHero />
      <IpoMarquee />
      <ProductSlider />

    </div>
  );
}