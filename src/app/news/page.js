export const metadata = {
  title: "Market News | Rupie Times",
  description: "Latest market news and updates from Rupie Times.",
};

export default function NewsPage() {
  return (
    <div className="min-h-[60vh] bg-white">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">Market News</h1>
        <p className="mt-3 text-slate-600">Curated headlines and market-moving updates. Demo content for now.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="rounded-lg border border-slate-200 p-5">
            <h2 className="text-xl font-semibold">Sample Headline One</h2>
            <p className="mt-2 text-slate-600">Short summary for a news item. Replace with live data later.</p>
          </article>
          <article className="rounded-lg border border-slate-200 p-5">
            <h2 className="text-xl font-semibold">Sample Headline Two</h2>
            <p className="mt-2 text-slate-600">Another placeholder card for layout and styling.</p>
          </article>
        </div>
      </div>
    </div>
  );
}


