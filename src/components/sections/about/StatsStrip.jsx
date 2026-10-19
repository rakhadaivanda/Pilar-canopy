import { STATS } from "../../../data/about";

export default function StatsStrip() {
  return (
    <div data-reveal="card" className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-primary text-on-primary rounded-DEFAULT p-8 shadow-lg">
      {STATS.map((stat) => (
        <div key={stat.title}>
          <span data-counter className="font-display-hero text-display-hero tracking-tight block text-secondary-fixed">
            {stat.value}
          </span>
          <span className="font-headline-sm text-headline-sm block mt-1">{stat.title}</span>
          <p className="font-body-sm text-body-sm text-on-primary-container mt-1">{stat.text}</p>
        </div>
      ))}
    </div>
  );
}
