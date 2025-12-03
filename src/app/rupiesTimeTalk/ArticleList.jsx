'use client';

import React, { useState } from 'react';
import AdBanner from "../components/AdBanner";
import OuterArticleCard from "../components/OuterArticleCard";
import Pagination from "../components/Pagination";
import sharpIcon from "../assets/sharp.svg";

import { ARTICLES_DATA } from "./data";

const ITEMS_PER_PAGE = 3;

const ArticleList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(ARTICLES_DATA.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentArticles = ARTICLES_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
