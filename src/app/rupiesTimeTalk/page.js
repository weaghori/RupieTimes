import AdBanner from "../components/AdBanner";
import OuterArticleCard from "../components/OuterArticleCard";
import sharpIcon from "../assets/sharp.svg";

export const metadata = {
    title: "Rupie Times Talk",
    description: "Latest market news and updates from Rupie Times Talk.",
};

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
    }
];

export default function RupiesTimeTalk() {
    return (
        <div className="min-h-[60vh] bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 py-6">
                <AdBanner imageSrc="https://picsum.photos/1600/300" altText="Top Advertisement" className="mb-8" />

                <div className="flex justify-center items-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Rupie Times Talk</h2>
                </div>

                <div className="flex flex-col gap-6">
                    {DUMMY_ARTICLES.map((article) => (
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
            </div>
        </div>
    );
}
