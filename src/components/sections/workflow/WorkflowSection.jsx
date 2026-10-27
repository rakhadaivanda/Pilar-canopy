import SectionEyebrow from "../../ui/SectionEyebrow";
import WipeText from "../../ui/WipeText";
import WorkflowStep from "./WorkflowStep";
import { WORKFLOW_HEADER, WORKFLOW_STEPS } from "../../../data/workflow";

export default function WorkflowSection() {
  return (
    <section data-section className="w-full bg-sand py-24 sm:py-32" id="workflow">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div data-reveal-group className="text-center max-w-2xl mx-auto mb-20">
          <SectionEyebrow centered>{WORKFLOW_HEADER.eyebrow}</SectionEyebrow>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-light">
            <WipeText>{WORKFLOW_HEADER.heading}</WipeText>
          </h2>
          <p data-reveal-item className="font-body-md text-body-md text-on-surface-variant mt-3">
            {WORKFLOW_HEADER.description}
          </p>
        </div>

        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step) => (
            <WorkflowStep key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
