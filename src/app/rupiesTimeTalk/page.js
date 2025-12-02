import ArticleList from "./ArticleList";

export const metadata = {
    title: "Rupie Times Talk",
    description: "Latest market news and updates from Rupie Times Talk.",
};

export default function RupiesTimeTalk() {
    return (
        <div className="min-h-[60vh] bg-white">
            <ArticleList />
        </div>
    );
}
