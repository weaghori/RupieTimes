export const metadata = {
  title: "About | Rupie Times",
  description: "Learn about Rupie Times and our mission.",
};

export default function AboutPage() {
  return (
    <div className="min-h-[60vh] bg-white">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">About Rupie Times</h1>
        <p className="mt-3 text-slate-600">
          We aim to make market research and education accessible to everyone. This page is a
          demo layout and can be expanded with team info, values, and history.
        </p>
      </div>
    </div>
  );
}


