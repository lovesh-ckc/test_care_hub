import type { ReactNode } from "react";
import { LayoutSection } from "@care-hub/lib/types";
import { sectionRegistry } from "@care-hub/components/registry";

type LayoutRendererProps = {
  layout: LayoutSection[];
};

export function LayoutRenderer({ layout }: LayoutRendererProps) {
  return (
    <div className="flex flex-col gap-6">
      {layout.map((section) => {
        const SectionComponent = sectionRegistry[section.type];

        if (!SectionComponent) {
          return null;
        }

        return (
          <SectionComponent
            key={section.id}
            section={section as never}
          />
        ) as ReactNode;
      })}
    </div>
  );
}
