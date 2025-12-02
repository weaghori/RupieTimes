'use client';

import React, { useState } from 'react';
import AdBanner from "../components/AdBanner";
import OuterArticleCard from "../components/OuterArticleCard";
import Pagination from "../components/Pagination";
import sharpIcon from "../assets/sharp.svg";

const DUMMY_ARTICLES = [
  {
    id: 1,
    title: "Rupie Times Talk",
    date: "November 4, 2025",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Technical",
    author: "admin@rupietimes.com",
    sectionCount: "3 section",
    link: "#"
  },
  {
    id: 2,
    title: "Market Analysis 2025",
    date: "November 5, 2025",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    category: "Financial",
    author: "editor@rupietimes.com",
    sectionCount: "5 section",
    link: "#"
  },
  {
    id: 3,
    title: "Crypto Trends",
    date: "November 6, 2025",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    category: "Crypto",
    author: "analyst@rupietimes.com",
    sectionCount: "2 section",
    link: "#"
  },
  {
    id: 4,
    title: "Stock Market Updates",
    date: "November 7, 2025",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "Stocks",
    author: "trader@rupietimes.com",
    sectionCount: "4 section",
    link: "#"
  },
  {
    id: 5,
    title: "Global Economy Outlook",
    date: "November 8, 2025",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    category: "Economy",
    author: "expert@rupietimes.com",
    sectionCount: "6 section",
    link: "#"
  },
  {
    id: 6,
    title: "Tech Innovations",
    date: "November 9, 2025",
    description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    category: "Technology",
    author: "tech@rupietimes.com",
    sectionCount: "3 section",
    link: "#"
  }
];

const ITEMS_PER_PAGE = 3;

const ArticleList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(DUMMY_ARTICLES.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentArticles = DUMMY_ARTICLES.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 py-6">
            <AdBanner imageSrc="https://picsum.photos/1600/300" altText="Top Advertisement" className="mb-8" />

            <div className="flex justify-center items-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Rupie Times Talk</h2>
            </div>

            <div className="flex flex-col gap-6">
                {currentArticles.map((article) => (
                    <OuterArticleCard 
                        key={article.id}
                        iconSrc={sharpIcon} 
                        title={article.title} 
                        date={article.date} 
                        description={article.description} 
                        category={article.category} 
                        author={article.author} 
                        sectionCount={article.sectionCount} 
                        link={article.link} 
                    />
                ))}
            </div>

            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
};

export default ArticleList;
