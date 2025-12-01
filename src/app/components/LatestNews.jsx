import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

// Mock Data
const NEWS_DATA = [
    {
        id: 1,
        headline: "Duis Aute Irure Dolor in Reprehenderit",
        description: "Duis Aute Irure Dolor in ReprehenderitDuis Aute Irure Dolor in Reprehenderith",
        thumbnail: "https://placehold.co/600x400/e2e8f0/1e293b?text=News+1", // Light gray bg
        priority: 0,
        link: "/news/duis-aute-irure-dolor-1",
    },
    {
        id: 2,
        headline: "Duis Aute Irure Dolor in Reprehenderit",
        description: "Duis Aute Irure Dolor in ReprehenderitDuis Aute Irure Dolor in Reprehenderith",
        thumbnail: "https://placehold.co/600x400/e2e8f0/1e293b?text=News+2",
        priority: 0,
        link: "/news/duis-aute-irure-dolor-2",
    },
    {
        id: 3,
        headline: "Duis Aute Irure Dolor in Reprehenderit Dolor at a",
        description: "Duis Aute Irure Dolor in ReprehenderitDuis Aute Irure Dolor in Reprehenderith Duis Aute Irure Dolor in ReprehenderitDuis Aute Irure Dolor in Reprehenderith",
        thumbnail: "https://placehold.co/800x600/e2e8f0/1e293b?text=Main+News",
        priority: 1, // Center item
        link: "/news/main-news-story",
    },
    {
        id: 4,
        headline: "Duis Aute Irure Dolor in Reprehenderit",
        description: "Duis Aute Irure Dolor in ReprehenderitDuis Aute Irure Dolor in Reprehenderith",
        thumbnail: "https://placehold.co/600x400/e2e8f0/1e293b?text=News+4",
        priority: 0,
        link: "/news/duis-aute-irure-dolor-4",
    },
    {
        id: 5,
        headline: "Duis Aute Irure Dolor in Reprehenderit",
        description: "Duis Aute Irure Dolor in ReprehenderitDuis Aute Irure Dolor in Reprehenderith",
        thumbnail: "https://placehold.co/600x400/e2e8f0/1e293b?text=News+5",
        priority: 0,
        link: "/news/duis-aute-irure-dolor-5",
    },
];

const LatestNews = () => {
    // Filter data
    const centerNews = NEWS_DATA.find(item => item.priority === 1) || NEWS_DATA[0];
    const sideNews = NEWS_DATA.filter(item => item.id !== centerNews.id);

    // Distribute side news (assuming 4 items left)
    const leftColumnNews = sideNews.slice(0, 2);
    const rightColumnNews = sideNews.slice(2, 4);

    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="flex justify-between items-end mb-8 border-b-2 border-transparent">
                <h2 className="text-4xl font-bold text-black">Latest</h2>
                <Link href="/news" className="flex items-center text-sm font-medium text-[#00301F] hover:text-black transition-colors mb-1 cursor-pointer">
                    View more <FaArrowRight className="ml-2 w-3 h-3 group-hover:text-black transition-colors text-[#00301F]" />
                </Link>
            </div>

            {/* Grid Layout */}
            <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[600px]">

                {/* Column 1 (Left) - 20% */}
                <div className="w-full lg:w-[20%] flex flex-col justify-between h-full">
                    {/* Card 1: Text Only + Underline */}
                    <Link href={leftColumnNews[0]?.link || '#'} style={{ cursor: 'pointer' }} className="flex flex-col h-[45%] justify-start border-b border-gray-200 pb-4 mb-4 lg:mb-0 group cursor-pointer">
                        <h3 className="text-xl font-bold text-black mb-3 leading-tight group-hover:text-[#00301F] transition-colors">
                            {leftColumnNews[0]?.headline}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3">
                            {leftColumnNews[0]?.description}
                        </p>
                    </Link>

                    {/* Card 2: Thumbnail + Headline */}
                    <Link href={leftColumnNews[1]?.link || '#'} style={{ cursor: 'pointer' }} className="flex flex-col h-[45%] justify-start group cursor-pointer">
                        <div className="relative w-full h-32 mb-4 bg-gray-200 overflow-hidden">
                            <img
                                src={leftColumnNews[1]?.thumbnail}
                                alt={leftColumnNews[1]?.headline}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-black leading-tight group-hover:text-[#00301F] transition-colors">
                            {leftColumnNews[1]?.headline}
                        </h3>
                    </Link>
                </div>

                {/* Column 2 (Center) - 60% */}
                <div className="w-full lg:w-[60%] h-full px-0 lg:px-6 border-x-0 lg:border-x border-gray-100">
                    <Link href={centerNews?.link || '#'} style={{ cursor: 'pointer' }} className="flex flex-col h-full group cursor-pointer">
                        <div className="relative w-full h-[65%] bg-gray-200 mb-6 overflow-hidden">
                            <img
                                src={centerNews?.thumbnail}
                                alt={centerNews?.headline}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4 pl-0">
                            <h3 className="text-3xl font-bold text-black mb-4 leading-tight group-hover:text-[#00301F] transition-colors">
                                {centerNews?.headline}
                            </h3>
                            <p className="text-gray-500 text-base line-clamp-3 max-w-2xl">
                                {centerNews?.description}
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Column 3 (Right) - 20% */}
                <div className="w-full lg:w-[20%] flex flex-col justify-between h-full">
                    {/* Card 4: Thumbnail + Headline + Underline */}
                    <Link href={rightColumnNews[0]?.link || '#'} style={{ cursor: 'pointer' }} className="flex flex-col h-[45%] justify-start border-b border-gray-200 pb-4 mb-4 lg:mb-0 group cursor-pointer">
                        <div className="relative w-full h-32 mb-4 bg-gray-200 overflow-hidden">
                            <img
                                src={rightColumnNews[0]?.thumbnail}
                                alt={rightColumnNews[0]?.headline}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-black leading-tight group-hover:text-[#00301F] transition-colors">
                            {rightColumnNews[0]?.headline}
                        </h3>
                    </Link>

                    {/* Card 5: Headline + Description */}
                    <Link href={rightColumnNews[1]?.link || '#'} style={{ cursor: 'pointer' }} className="flex flex-col h-[45%] justify-start pt-4 group cursor-pointer">
                        <h3 className="text-xl font-bold text-black mb-3 leading-tight group-hover:text-[#00301F] transition-colors">
                            {rightColumnNews[1]?.headline}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3">
                            {rightColumnNews[1]?.description}
                        </p>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default LatestNews;
