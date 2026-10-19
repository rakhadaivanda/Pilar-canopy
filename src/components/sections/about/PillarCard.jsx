import Icon from "../../ui/Icon";

export default function PillarCard({ icon, title, text, tag }) {
  return (
    <div
      data-tilt
      className="service-card bg-surface-container-lowest p-6 rounded-DEFAULT border border-outline-variant/30 shadow-sm flex flex-col justify-between"
    >
      <div>
        <div className="sc-icon w-10 h-10 rounded-DEFAULT bg-surface-container flex items-center justify-center text-primary mb-4">
          <Icon name={icon} className="text-[22px]" />
        </div>
        <h3 className="sc-title font-headline-sm text-headline-sm text-primary mb-2">{title}</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{text}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="font-spec-code text-spec-code text-secondary-ink tracking-wider uppercase">
          {tag}
        </span>
        <Icon name="north_east" className="sc-arrow text-[16px] text-secondary opacity-40" />
      </div>
    </div>
  );
}
