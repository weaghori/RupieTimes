// app/about/page.jsx
import { AboutHero } from '@/app/components/AboutHero';
import { MissionVision } from '@/app/components/MissionVision';
import { CoreValues } from '@/app/components/CoreValues';
import { AboutCTA } from '@/app/components/AboutCTA';

export const metadata = {
  title: "About | Rupie Times",
  description: "Learn about Rupie Times and our mission to democratize market intelligence.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <MissionVision />
      <CoreValues />
      <AboutCTA />
    </div>
  );
}