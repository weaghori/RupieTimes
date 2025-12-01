'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

// Dummy Data grouped by Category
const ARTICLES_DATA = {
  Business: {
    listItems: [
      {
        id: 1,
        tag: "Advertisement",
        description: "Create A Money Times Account To Start Your Smart Investment Journey Create A Money Times Account To Start Your Smart Investment Journey Create A Money Times Account To Start Your Smart",
        link: "/article/business-1",
      },
      {
        id: 2,
        tag: "Advertisement",
        description: "Create A Money Times Account To Start Your Smart Investment Create A Money Times Account To Start Your Smart Investment Journey Create A Money Times Account To Start Your Smart",
        link: "/article/business-2",
      },
      {
        id: 3,
        tag: "Advertisement",
        description: "Create A Money Times Account To Start Your Smart Investment Create A Money Times Account To Start Your Smart Investment Journey Create A Money Times Account To Start Your Smart",
        link: "/article/business-3",
      },
      {
        id: 4,
        tag: "Advertisement",
        description: "Create A Money Times Account To Start Your Smart Investment Create A Money Times Account To Start Your Smart Investment Journey Create A Money Times Account To Start Your Smart",
        link: "/article/business-4",
      },
    ],
    featuredItem: {
      id: 5,
      title: "Duis Aute Irure Dolor in Duis Aute Irure Dolor in",
      description: "Create A Money Times Account To Start Your Smart Investment Journey Create A Money Times Account To Start Your Smart Investment Journey",
      image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Business+Featured",
      link: "/article/business-featured",
    },
  },
  Technology: {
    listItems: [
      {
        id: 6,
        tag: "Tech News",
        description: "The latest advancements in AI are transforming industries across the globe. Learn how these changes impact your daily life and future career prospects.",
        link: "/article/tech-1",
      },
      {
        id: 7,
        tag: "Tech News",
        description: "New smartphone release dates announced for the upcoming quarter. Get ready for groundbreaking features and stunning designs.",
        link: "/article/tech-2",
      },
      {
        id: 8,
        tag: "Tech News",
        description: "Cybersecurity threats are on the rise. Protect your digital assets with these essential tips from industry experts.",
        link: "/article/tech-3",
      },
      {
        id: 9,
        tag: "Tech News",
        description: "The future of electric vehicles looks bright with new battery technologies. Discover the companies leading the charge.",
        link: "/article/tech-4",
      },
    ],
    featuredItem: {
      id: 10,
      title: "The Rise of Quantum Computing",
      description: "Quantum computing promises to solve problems beyond the reach of classical computers. Explore the potential of this revolutionary technology.",
      image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Tech+Featured",
      link: "/article/tech-featured",
    },
  },
  Crypto: {
    listItems: [
      {
        id: 11,
        tag: "Crypto Update",
        description: "Bitcoin surges past new resistance levels as institutional adoption grows. What does this mean for the broader market?",
        link: "/article/crypto-1",
      },
      {
        id: 12,
        tag: "Crypto Update",
        description: "Ethereum's latest upgrade promises lower fees and faster transactions. Developers are excited about the new possibilities.",
        link: "/article/crypto-2",
      },
      {
        id: 13,
        tag: "Crypto Update",
        description: "Regulatory clarity is becoming a key focus for governments worldwide. How will new laws affect your crypto portfolio?",
        link: "/article/crypto-3",
      },
      {
        id: 14,
        tag: "Crypto Update",
        description: "DeFi platforms are innovating at a rapid pace. Explore the latest trends in decentralized finance and yield farming.",
        link: "/article/crypto-4",
      },
    ],
    featuredItem: {
      id: 15,
      title: "Understanding Blockchain Technology",
      description: "Blockchain is more than just crypto. Learn how this distributed ledger technology is revolutionizing supply chains and data security.",
      image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Crypto+Featured",
      link: "/article/crypto-featured",
    },
  },
  Stocks: {
    listItems: [
      {
        id: 16,
        tag: "Market Watch",
        description: "Global markets react to central bank interest rate decisions. Investors are closely monitoring economic indicators.",
        link: "/article/stocks-1",
      },
      {
        id: 17,
        tag: "Market Watch",
        description: "Tech stocks rally as earnings reports exceed expectations. Analysts upgrade price targets for major players.",
        link: "/article/stocks-2",
      },
      {
        id: 18,
        tag: "Market Watch",
        description: "Energy sector sees volatility amidst geopolitical tensions. Oil prices fluctuate as supply concerns persist.",
        link: "/article/stocks-3",
      },
      {
        id: 19,
        tag: "Market Watch",
        description: "Dividend stocks remain a popular choice for income-focused investors. Here are top picks for long-term stability.",
        link: "/article/stocks-4",
      },
    ],
    featuredItem: {
      id: 20,
      title: "Investing in Emerging Markets",
      description: "Emerging markets offer high growth potential but come with risks. A comprehensive guide to diversifying your portfolio globally.",
      image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Stocks+Featured",
      link: "/article/stocks-featured",
    },
  },
};

const CATEGORIES = Object.keys(ARTICLES_DATA);

const YouMayLike = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const currentData = ARTICLES_DATA[activeCategory];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 py-12 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-black">You May Like</h2>
        <Link href="/articles" className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer group">
          View more <FaArrowRight className="ml-2 w-3 h-3 group-hover:text-black transition-colors" />
        </Link>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-8 py-2 rounded-full border transition-all duration-300 text-sm font-medium cursor-pointer
              ${activeCategory === category 
                ? 'bg-[#00301F] text-white border-[#00301F]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[#00301F] hover:text-[#00301F]'}
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: List */}
        <div className="flex flex-col gap-8">
          {currentData.listItems.map((item, index) => (
            <Link 
              key={item.id} 
              href={item.link}
              style={{ cursor: 'pointer' }}
              className={`flex flex-col group cursor-pointer ${index !== currentData.listItems.length - 1 ? 'border-b border-dotted border-gray-300 pb-8' : ''}`}
            >
              <span className="text-black font-bold text-base mb-2 group-hover:text-[#00301F] transition-colors">
                {item.tag}
              </span>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Right Column: Featured */}
        <div className="h-full">
           <Link href={currentData.featuredItem.link} style={{ cursor: 'pointer' }} className="flex flex-col h-full border border-gray-200 rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300">
             <div className="relative w-full h-[300px] lg:h-[60%] bg-gray-200 overflow-hidden">
               <Image 
                 src={currentData.featuredItem.image}
                 alt={currentData.featuredItem.title}
                 fill
                 className="object-cover group-hover:scale-105 transition-transform duration-500"
               />
             </div>
             <div className="p-8 flex flex-col justify-center flex-grow bg-white">
               <h3 className="text-2xl font-bold text-black mb-4 leading-tight group-hover:text-[#00301F] transition-colors">
                 {currentData.featuredItem.title}
               </h3>
               <p className="text-gray-600 text-base leading-relaxed">
                 {currentData.featuredItem.description}
               </p>
             </div>
           </Link>
        </div>

      </div>
    </section>
  );
};

export default YouMayLike;
