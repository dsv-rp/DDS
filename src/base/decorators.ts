import type { DDSElement } from "./DDSElement";
import { defineDDSElement } from "./define";

export const ddsElement =
  (tagName: string) =>
  (
    classOrTarget: typeof DDSElement,
    context?: ClassDecoratorContext<typeof DDSElement>
  ) => {
    if (context) {
      context.addInitializer(() => {
        defineDDSElement(classOrTarget, tagName);
      });
    } else {
      defineDDSElement(classOrTarget, tagName);
    }
  };
