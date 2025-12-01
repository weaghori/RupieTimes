"use client";
import React, { useState, useEffect } from "react";
import { FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProductSlider() {
  const products = [
    { id: 1, title: "Ut Enim Ad Minim Veniam", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste laudantium.", img: "https://www.dummyimage.com/400x300/000000/fff.png" },
    { id: 2, title: "Ut Enim Ad Minim Veniam", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste laudantium.", img: "https://www.dummyimage.com/400x300/000000/fff.png" },
    { id: 3, title: "Ut Enim Ad Minim Veniam", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste laudantium.", img: "https://www.dummyimage.com/400x300/000000/fff.png" },
    { id: 4, title: "Ut Enim Ad Minim Veniam", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste laudantium.", img: "https://www.dummyimage.com/400x300/000000/fff.png" },
    { id: 5, title: "Ut Enim Ad Minim Veniam", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste laudantium.", img: "https://www.dummyimage.com/400x300/000000/fff.png" },
    { id: 6, title: "Ut Enim Ad Minim Veniam", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste laudantium.", img: "https://www.dummyimage.com/400x300/000000/fff.png" },
    { id: 7, title: "Ut Enim Ad Minim Veniam", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste laudantium.", img: "https://www.dummyimage.com/400x300/000000/fff.png" },
  ];

  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // responsive cards
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else if (window.innerWidth < 1280) setCardsPerView(3);
      else setCardsPerView(4);
    };

    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const totalSlides = Math.ceil(products.length / cardsPerView);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 py-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Products</h2>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-[#D9D9D9] px-4 py-2 rounded-full text-sm">
            <FiFilter size={16} />
            Filter
          </button>

          <button className="bg-[#D9D9D9] px-4 py-2 rounded-full text-sm">
            View all →
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${current * (100 / totalSlides)}%)`,
            width: `${totalSlides * 100}%`,
          }}
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="p-4"
              style={{ width: `${100 / cardsPerView}%` }}
            >
              <div className="bg-[#EEEEEE] rounded-xl pb-4 shadow">

                {/*PRODUCT IMAGE ADDED HERE */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-t-xl mb-4"
                />

                <h3 className="font-semibold text-lg mb-2 px-4">{item.title}</h3>
                <p className="text-sm text-gray-700 mb-4 px-4">{item.desc}</p>
                <span className="font-medium cursor-pointer px-4">View →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGINATION + ARROWS */}
      <div className="flex justify-between items-center mt-6 px-4">
        {/* Pagination */}
        <div className="flex gap-3 mx-auto">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all ${
                i === current ? "bg-gray-600 w-10" : "bg-gray-300 w-6"
              }`}
            ></button>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="bg-[#D9D9D9] w-10 h-10 rounded-full flex items-center justify-center"
          >
            <FiChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="bg-[#D9D9D9] w-10 h-10 rounded-full flex items-center justify-center"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
