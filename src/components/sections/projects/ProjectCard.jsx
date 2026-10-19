import ParallaxMedia from "../../../motion/ParallaxMedia";

export default function ProjectCard({ project }) {
  const { image, alt, badge, place, client, title, description, chips, year } = project;

  return (
    <div
      data-slide
      data-project-card
      data-tilt
      className="relative flex-none w-[90vw] sm:w-[540px] lg:w-[620px] snap-center bg-surface-container-lowest rounded-DEFAULT p-4 border border-outline-variant/40 shadow-md group hover:shadow-xl transition-shadow duration-700 flex flex-col justify-between"
    >
      <div>
        <div
          data-cursor="VIEW"
          data-tilt-glow
          className="relative w-full h-[280px] sm:h-[360px] overflow-hidden rounded-DEFAULT bg-surface-container mb-5"
        >
          <ParallaxMedia wide data-card-media>
            <img
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              decoding="async"
              loading="lazy"
              src={image}
            />
          </ParallaxMedia>
          <div className="media-veil absolute inset-0 pointer-events-none"></div>
          <div className="absolute top-4 left-4 bg-primary/85 backdrop-blur-md px-3 py-1.5 rounded-DEFAULT">
            <span className="font-spec-code text-spec-code text-on-primary uppercase tracking-wider">
              {badge}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-DEFAULT shadow-sm">
            <span className="font-spec-code text-spec-code text-secondary-ink font-semibold uppercase">
              {place}
            </span>
          </div>
        </div>
        <div className="px-2">
          <span className="font-spec-code text-spec-code text-secondary-ink block mb-1">{client}</span>
          <h3 className="font-headline-md text-headline-md text-primary mb-2 font-semibold">
            {title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-outline-variant/30 px-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="px-2.5 py-1 bg-surface-container font-spec-code text-spec-code text-primary rounded"
            >
              {chip}
            </span>
          ))}
        </div>
        <span className="font-spec-code text-spec-code text-secondary-ink font-medium">{year}</span>
      </div>
    </div>
  );
}
