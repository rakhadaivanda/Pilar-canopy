import Icon from "../../ui/Icon";

export default function WorkflowStep({ number, icon, title, text, tag }) {
  return (
    <div
      data-tilt
      className="step-card relative bg-surface-container-lowest p-6 rounded-DEFAULT border border-outline-variant/30 shadow-sm flex flex-col justify-between group hover:border-secondary"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-spec-code text-3xl font-light text-secondary">{number}</span>
          <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-500">
            <Icon name={icon} className="text-[18px]" />
          </span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-primary mb-2">{title}</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{text}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-outline-variant/20">
          <span className="font-label-caps text-label-caps text-secondary-ink uppercase font-semibold">
          {tag}
        </span>
      </div>
    </div>
  );
}
