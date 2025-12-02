'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaRegStar, FaStar, FaArrowRight } from 'react-icons/fa';
import sharpIcon from "../assets/sharp.svg";
import Image from 'next/image';
const OuterArticleCard = ({
  title,
  date,
  description,
  category,
  author,
  sectionCount,
  link = "#",
  iconSrc = "http://image.com" // Default fallback
}) => {
  const [isStarred, setIsStarred] = useState(false);

  return (
    <div className="w-full border border-gray-300 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 font-sans">
      
      {/* Row 1: Title & Date */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <div className="flex items-center gap-3">
          {/* Dynamic Icon Image */}
          <div className="relative w-5 h-5 flex-shrink-0">
            <Image 
              src={iconSrc} 
              alt="" 
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-black leading-tight">
            {title}
          </h3>
        </div>
        <span className="text-gray-500 text-sm font-medium whitespace-nowrap">
          {date}
        </span>
      </div>

      {/* Row 2: Description & Category */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
          {description}
        </p>
        <span 
          className="inline-flex items-center justify-center px-4 text-xs font-bold rounded-[10px] whitespace-nowrap"
          style={{ 
            backgroundColor: '#ffec9f80', 
            color: '#C0934B',
            height: '22px'
          }}
        >
          {category}
        </span>
      </div>

      {/* Row 3: Meta & Action */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2 border-t border-transparent md:border-none">
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Star Icon */}
          <button 
            onClick={() => setIsStarred(!isStarred)}
            className="focus:outline-none transition-transform active:scale-95"
            aria-label={isStarred ? "Unstar article" : "Star article"}
          >
            {isStarred ? (
              <FaStar className="w-5 h-5 text-[#C0934B]" />
            ) : (
              <FaRegStar className="w-5 h-5 text-[#C0934B]" />
            )}
          </button>
          
          {/* Author & Section Info */}
          <div className="flex items-center text-gray-500 text-xs gap-3">
            <span>By {author}</span>
            <span className="h-3 w-px bg-gray-400"></span>
            <span>{sectionCount} section</span>
          </div>
        </div>

        {/* Read Full Article Link */}
        <Link 
          href={link} 
          className="flex items-center text-sm font-bold hover:underline transition-all self-end md:self-auto"
          style={{ color: '#00301F' }}
        >
          Read Full Article <FaArrowRight className="ml-2 w-3 h-3" />
        </Link>
      </div>

    </div>
  );
};

export default OuterArticleCard;
