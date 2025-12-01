import React from "react";
import Image from "next/image";

export default function HomeHero() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 py-6">

      {/* ---------- Top Advertisement Banner ---------- */}
      <div className="w-full mb-6">
        <div className="relative w-full">
          <Image
            src="https://picsum.photos/1600/300"
            alt="Top Advertisement"
            width={1600}
            height={300}
            className="w-full h-auto object-contain rounded-lg"
            priority
          />
        </div>
      </div>

      {/* ---------- Main Section Grid ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDE VERTICAL AD (lg+) */}
        <div className="hidden lg:block lg:col-span-2">
          <Image
            src="https://picsum.photos/200/800"
            alt="Left Advertisement"
            width={200}
            height={800}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

        {/* ---------- CENTER HERO IMAGE WITH FLOATING TEXT ---------- */}
        <div className="col-span-1 lg:col-span-8">
          <div className="relative w-full rounded-xl overflow-hidden">

            {/* Hero Image (auto height) */}
            <Image
              src="https://picsum.photos/1200/600"
              alt="Main News Highlight"
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-xl"
            />

            {/* FLOATING ARTICLE TEXT */}
            <div className="absolute left-0 right-0 bottom-4 md:bottom-6 p-4 md:p-6 bg-black/50 backdrop-blur-sm text-white mx-4 rounded-lg">

              <h2 className="text-lg md:text-xl font-semibold leading-snug">
                Argument over seats to hate campaign: The story behind the Mumbai Press Club row
              </h2>

              <p className="text-sm md:text-base mt-2 opacity-90">
                Argument over seats to hate campaign: The story behind the row.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE VERTICAL AD (lg+) */}
        <div className="hidden lg:block lg:col-span-2">
          <Image
            src="https://picsum.photos/200/800?grayscale"
            alt="Right Advertisement"
            width={200}
            height={800}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

      </div>

      {/* ---------- Bottom Article Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">

        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#E6E6E6] rounded-lg p-3 shadow-sm hover:shadow-md transition">
            <div className="relative w-full h-32 mb-3">
              <Image
                src={`https://picsum.photos/seed/${i}/400/300`}
                alt="News Card"
                fill
                className="object-cover rounded-md"
              />
            </div>

            <h4 className="text-sm font-semibold">
              Argument over seats to hate campaign
            </h4>
          </div>
        ))}

      </div>

    </div>
  );
}
