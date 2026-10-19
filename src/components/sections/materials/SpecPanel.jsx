import ColorSwatches from "./ColorSwatches";
import ParallaxMedia from "../../../motion/ParallaxMedia";

const FIELD_LABEL =
  "font-label-caps text-label-caps tracking-widest uppercase block text-xs text-primary/75";

const FIELD_VALUE_CLASS = {
  primary: "font-medium text-lg text-white",
  mono: "font-spec-code text-spec-code text-primary font-bold text-sm",
  default: "font-medium",
};

function InfoColumn({ panel }) {
  const { badge, title, fields, swatches, swatchLabel, footnote, imageFirst } = panel;

  return (
    <div
      className={`lg:col-span-5 ${
        imageFirst ? "order-1 lg:order-2" : ""
      } bg-secondary text-on-secondary p-8 sm:p-10 flex flex-col justify-between`}
    >
      <div>
        <div className="inline-block px-3 py-1 bg-primary text-on-primary font-spec-code text-spec-code rounded mb-4">
          {badge}
        </div>
        <h3 className="font-headline-lg text-headline-lg tracking-tight font-bold uppercase mb-6">
          {title}
        </h3>
        <div className="space-y-5 font-body-md text-body-md">
          {fields.map((field) => (
            <div key={field.label}>
              <span className={FIELD_LABEL}>{field.label}</span>
              <p className={FIELD_VALUE_CLASS[field.variant ?? "default"]}>{field.value}</p>
            </div>
          ))}
          {swatches && <ColorSwatches label={swatchLabel} swatches={swatches} />}
        </div>
      </div>
      <div className="pt-8 border-t border-white/20 mt-6">
        <span className="font-spec-code text-spec-code text-white/80">{footnote}</span>
      </div>
    </div>
  );
}

function ImageColumn({ panel }) {
  const { image, imageFirst } = panel;

  return (
    <div
      className={`lg:col-span-7 ${
        imageFirst ? "order-2 lg:order-1" : ""
      } relative min-h-[360px] sm:min-h-[460px] bg-surface-container overflow-hidden group`}
    >
      <ParallaxMedia>
        <img
          alt={image.alt}
          className={`w-full h-full object-cover ${image.position} transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105`}
          decoding="async"
          loading="lazy"
          src={image.src}
        />
      </ParallaxMedia>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur-md p-4 rounded-DEFAULT text-on-primary flex items-center justify-between">
        <div>
          <p className="font-label-caps text-label-caps uppercase text-secondary-fixed">
            {image.caption}
          </p>
          <p className="font-spec-code text-spec-code text-white">{image.detail}</p>
        </div>
        <span className="px-2.5 py-1 bg-surface-container-lowest/20 rounded font-spec-code text-[11px]">
          {image.badge}
        </span>
      </div>
    </div>
  );
}

export default function SpecPanel({ panel }) {
  const info = <InfoColumn key="info" panel={panel} />;
  const image = <ImageColumn key="image" panel={panel} />;

  return (
    <div data-spec-panel>
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-DEFAULT overflow-hidden border border-outline-variant/40 shadow-lg bg-surface-container-lowest">
        {panel.imageFirst ? [image, info] : [info, image]}
      </div>
    </div>
  );
}
