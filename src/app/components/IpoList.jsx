import React from 'react';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';

// Dummy Data
const IPO_DATA = [
  {
    id: 1,
    company: "Lenskart Solutions Ltd.",
    openingDate: "Oct 31, 2025",
    closingDate: "Oct 31, 2025",
    issuePrice: "₹382 to ₹402 per share",
    link: "https://www.lenskart.com",
  },
  {
    id: 2,
    company: "Lenskart Solutions Ltd.",
    openingDate: "Oct 31, 2025",
    closingDate: "Oct 31, 2025",
    issuePrice: "₹382 to ₹402 per share",
    link: "https://www.lenskart.com",
  },
  {
    id: 3,
    company: "Lenskart Solutions Ltd.",
    openingDate: "Oct 31, 2025",
    closingDate: "Oct 31, 2025",
    issuePrice: "₹382 to ₹402 per share",
    link: "https://www.lenskart.com",
  },
  {
    id: 4,
    company: "Lenskart Solutions Ltd.",
    openingDate: "Oct 31, 2025",
    closingDate: "Oct 31, 2025",
    issuePrice: "₹382 to ₹402 per share",
    link: "https://www.lenskart.com",
  },
  {
    id: 5,
    company: "Lenskart Solutions Ltd.",
    openingDate: "Oct 31, 2025",
    closingDate: "Oct 31, 2025",
    issuePrice: "₹382 to ₹402 per share",
    link: "https://www.lenskart.com",
  },
  {
    id: 6,
    company: "Lenskart Solutions Ltd.",
    openingDate: "Oct 31, 2025",
    closingDate: "Oct 31, 2025",
    issuePrice: "₹382 to ₹402 per share",
    link: "https://www.lenskart.com",
  },
  {
    id: 7,
    company: "Lenskart Solutions Ltd.",
    openingDate: "Oct 31, 2025",
    closingDate: "Oct 31, 2025",
    issuePrice: "₹382 to ₹402 per share",
    link: "https://www.lenskart.com",
  },
  {
    id: 8,
    company: "Lenskart Solutions Ltd.",
    openingDate: "Oct 31, 2025",
    closingDate: "Oct 31, 2025",
    issuePrice: "₹382 to ₹402 per share",
    link: "https://www.lenskart.com",
  },
];

const IpoList = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 py-6">
      <h2 className="text-4xl font-bold text-black mb-8">IPO 2025 List</h2>
      
      <div className="overflow-x-auto rounded-lg border border-[#c0934bb3]">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-[#c0934bb3] text-left">
              <th className="p-4 font-bold text-black text-sm uppercase tracking-wider w-[30%]">
                <div className="flex items-center gap-2 cursor-pointer">
                  Company <FaArrowUp className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 font-bold text-black text-sm uppercase tracking-wider w-[20%]">
                Opening Date
              </th>
              <th className="p-4 font-bold text-black text-sm uppercase tracking-wider w-[20%]">
                Closing Date
              </th>
              <th className="p-4 font-bold text-black text-sm uppercase tracking-wider w-[30%]">
                Issue Price (Rs.)
              </th>
            </tr>
          </thead>
          <tbody>
            {IPO_DATA.map((ipo, index) => (
              <tr 
                key={ipo.id} 
                className={`
                  group cursor-pointer transition-colors duration-200
                  ${index % 2 === 0 ? 'bg-white' : 'bg-[#c0934b33]'}
                  hover:bg-[#c0934b33]
                `}
              >
                <td className="p-0">
                  <Link href={ipo.link} className="block p-4 w-full h-full text-gray-700 font-medium group-hover:text-black">
                    {ipo.company}
                  </Link>
                </td>
                <td className="p-0">
                  <Link href={ipo.link} className="block p-4 w-full h-full text-gray-600 group-hover:text-black">
                    {ipo.openingDate}
                  </Link>
                </td>
                <td className="p-0">
                  <Link href={ipo.link} className="block p-4 w-full h-full text-gray-600 group-hover:text-black">
                    {ipo.closingDate}
                  </Link>
                </td>
                <td className="p-0">
                  <Link href={ipo.link} className="block p-4 w-full h-full text-gray-600 group-hover:text-black">
                    {ipo.issuePrice}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default IpoList;
