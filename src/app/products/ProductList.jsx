"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaSlidersH } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { PRODUCTS_DATA } from "./data";

const ITEMS_PER_PAGE = 8;

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination
  const totalPages = Math.ceil(PRODUCTS_DATA.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = PRODUCTS_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-black text-center md:text-left w-full md:w-auto">
          Technicals Products
        </h1>
        
        <button className="flex items-center gap-2 bg-[#C0934B] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#a37c3f] transition-colors">
          <FaSlidersH className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-[20px] border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            {/* Image Placeholder */}
            <div className="relative h-48 bg-gray-200 w-full">
               {/* Using placeholder image from data, but in real app would be next/image */}
               <Image
                 src={product.image}
                 alt={product.title}
                 fill
                 className="object-cover"
               />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-black mb-3 leading-tight">
                {product.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                {product.description}
              </p>

              <Link 
                href={`/products/${product.id}`} 
                className="inline-flex items-center text-[#1E4032] font-semibold text-sm hover:underline mt-auto"
              >
                View <FaArrowRight className="ml-2 w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
