'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaRegStar, FaStar, FaBars, FaTimes, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { ARTICLES_DATA } from '../data';
import sharpIcon from "../../assets/sharp.svg";

const ArticleView = ({ article }) => {
  const [isStarred, setIsStarred] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter out the current article from the sidebar list
  const sidebarArticles = ARTICLES_DATA.filter(a => a.id !== article.id);

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header: Back Button */}
        <div className="mb-8">
          <Link href="/rupiesTimeTalk" className="inline-flex items-center text-[#00301F] hover:underline font-medium">
            <FaArrowLeft className="mr-2" /> Back To Articles
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Main Content (60%) */}
          <div className="w-full lg:w-[60%]">
            
            {/* Main Thumbnail */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
              <Image 
                src={article.thumbnail} 
                alt={article.title} 
                fill 
                className="object-cover"
              />
            </div>

            {/* Title & Star */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                {article.title}
              </h1>
              <button 
                onClick={() => setIsStarred(!isStarred)}
                className="p-2 focus:outline-none transition-transform active:scale-95"
              >
                {isStarred ? (
                  <FaStar className="w-6 h-6 text-[#C0934B]" />
                ) : (
                  <FaRegStar className="w-6 h-6 text-[#C0934B]" />
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {article.description}
            </p>

            {/* Meta Info */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-8 border-b border-gray-200 pb-4">
              <div className="flex gap-4">
                <span>Category : <span className="text-black font-medium">{article.category}</span></span>
              </div>
              <div className="flex gap-4">
                <span>Published By <span className="text-black font-bold">{article.publisher}</span></span>
              </div>
            </div>

            {/* Dynamic Sections */}
            <div className="space-y-8">
              {article.sections.map((section, index) => {
                // Common styling for sections
                const sectionStyle = "border-[0.5px] border-gray-300 rounded-[20px] p-6 mb-8";

                if (section.type === 'text_image') {
                  return (
                    <div key={index} className={sectionStyle}>
                      <h3 className="text-xl font-bold mb-4 flex justify-between items-center">
                         {/* Placeholder title if needed, or just the star alignment */}
                         <span></span> 
                         <FaRegStar className="text-[#C0934B]" />
                      </h3>
                      <div className="flex items-start gap-4 mb-4">
                         <Image src={sharpIcon} alt="icon" width={24} height={24} className="flex-shrink-0 mt-1" />
                         <p className="text-gray-700 leading-relaxed">{section.content.text}</p>
                      </div>
                      {section.content.image && (
                         <div className="relative w-full h-[300px] rounded-xl overflow-hidden mt-6">
                           <Image src={section.content.image} alt="Section Image" fill className="object-cover" />
                         </div>
                      )}
                    </div>
                  );
                }

                if (section.type === 'custom_list') {
                  return (
                    <div key={index} className={sectionStyle}>
                      <h3 className="text-xl font-bold mb-4 flex justify-between items-center">
                         <span></span>
                         <FaRegStar className="text-[#C0934B]" />
                      </h3>
                      <ul className="space-y-4">
                        {section.content.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                             <Image src={sharpIcon} alt="bullet" width={20} height={20} className="flex-shrink-0 mt-1" />
                             <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (section.type === 'table') {
                  return (
                    <div key={index} className={sectionStyle}>
                      <h3 className="text-xl font-bold mb-4 flex justify-between items-center">
                        {section.title}
                        <FaRegStar className="text-[#C0934B]" />
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-[#F9F5EB] text-gray-700 font-bold">
                            <tr>
                              {section.content.headers.map((header, i) => (
                                <th key={i} className="px-4 py-3 whitespace-nowrap">{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.content.rows.map((row, i) => (
                              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                {row.map((cell, j) => (
                                  <td key={j} className="px-4 py-3 whitespace-nowrap text-gray-600">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* List below table if needed, based on design */}
                      <ul className="mt-6 space-y-3">
                         <li className="flex items-start gap-3">
                             <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                             <span className="text-gray-600 text-sm">Consequatur.Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed Ut</span>
                         </li>
                         <li className="flex items-start gap-3">
                             <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                             <span className="text-gray-600 text-sm">Consequatur.Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed Ut</span>
                         </li>
                      </ul>
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* Article Footer */}
            <div className="rounded-[15px] overflow-hidden mt-12 font-sans">
               {/* Top Section: Social Icons */}
               <div className="bg-[#C0934B] py-6 flex justify-center gap-8 text-white">
                 <FaFacebookF className="w-6 h-6 cursor-pointer hover:text-black transition-colors" />
                 <FaInstagram className="w-6 h-6 cursor-pointer hover:text-black transition-colors" />
                 <FaYoutube className="w-6 h-6 cursor-pointer hover:text-black transition-colors" />
               </div>
               
               {/* Bottom Section: Content */}
               <div className="bg-[#E6E6E6CF] p-8 text-center text-black">
                 {article.footer && (
                   <>
                     <p className="mb-4 text-sm font-medium">
                       Written By {article.footer.authors.map((author, index) => (
                         <React.Fragment key={index}>
                           <span className="underline cursor-pointer hover:text-[#C0934B]">{author.name}</span>
                           {index < article.footer.authors.length - 2 ? ", " : index === article.footer.authors.length - 2 ? ", And " : ""}
                         </React.Fragment>
                       ))}
                     </p>
                     <p className="mb-8 text-sm font-medium">
                       {article.footer.signup.text} <span className="underline cursor-pointer hover:text-[#C0934B]">{article.footer.signup.linkText}</span>.
                     </p>
                     <div className="border-t border-gray-300 pt-4 text-xs font-bold text-gray-800">
                       {article.footer.copyright}
                     </div>
                   </>
                 )}
               </div>
            </div>

          </div>

          {/* Sidebar (40%) */}
          <div className={`
            fixed inset-0 z-50 lg:z-0 bg-white transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-[40%] lg:block lg:bg-transparent
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}>
             <div className="h-full overflow-y-auto p-6 lg:p-0 lg:pl-8">
                <div className="flex justify-between items-center mb-6 lg:hidden">
                  <h2 className="text-2xl font-bold">All Articles</h2>
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                <h2 className="text-2xl font-bold mb-6 hidden lg:block">All Articles</h2>
                
                <div className="space-y-4">
                  {sidebarArticles.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
                       <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                             <Image src={sharpIcon} alt="icon" width={16} height={16} />
                             <h3 className="font-bold text-sm line-clamp-1">{item.title}</h3>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{item.date}</span>
                       </div>
                       <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                       <div className="flex justify-between items-center mt-2">
                         <span className="bg-[#ffec9f80] text-[#C0934B] text-[10px] px-2 py-1 rounded-md font-bold">
                            {item.category}
                         </span>
                         <Link href={`/rupiesTimeTalk/${item.id}`} className="text-xs font-bold text-[#00301F] flex items-center hover:underline">
                           Read More <FaArrowLeft className="ml-1 rotate-180 w-3 h-3" />
                         </Link>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Mobile Sidebar Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-[#00301F] text-white p-4 rounded-full shadow-lg lg:hidden"
          >
            <FaBars className="w-6 h-6" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default ArticleView;
