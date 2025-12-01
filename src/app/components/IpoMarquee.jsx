import React from "react";

export default function IpoMarquee() {
  const ipoData = [
    {
      company: "Lenskart Solutions Ltd.",
      open: "Oct 31, 2025",
      close: "Oct 31, 2025",
      price: "₹382 to ₹402 per share",
    },
    {
      company: "Swiggy India Pvt. Ltd.",
      open: "Nov 5, 2025",
      close: "Nov 7, 2025",
      price: "₹450 to ₹500 per share",
    },
    {
      company: "Ola Electric Mobility",
      open: "Dec 2, 2025",
      close: "Dec 4, 2025",
      price: "₹120 to ₹150 per share",
    },
    {
      company: "Ixigo Travels Ltd.",
      open: "Jan 10, 2026",
      close: "Jan 12, 2026",
      price: "₹90 to ₹110 per share",
    },
  ];

  return (
    <div className="w-full bg-white py-4">
      {/* Title */}
      <div className=" mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold px-6 mb-10">IPO 2025</h2>
      </div>

      {/* Scrolling Marquee Section */}
      <div className="overflow-hidden bg-[#E6E6E6] py-6 px-6 marquee-container">
        <div className="whitespace-nowrap flex animate-marquee marquee-content">
          {[...ipoData, ...ipoData].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-6 px-10 text-sm"
            >
              <span><strong>Company Name :</strong> {item.company}</span>
              <span><strong>Opening Date :</strong> {item.open}</span>
              <span><strong>Closing Date :</strong> {item.close}</span>
              <span><strong>Issue Price :</strong> {item.price}</span>

              {/* Separator */}
              <span className="text-gray-400 font-normal text-lg px-4">
                ||
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 35s linear infinite;
        }

        /* Pause animation on hover */
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
