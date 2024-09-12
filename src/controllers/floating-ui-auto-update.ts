import {
  autoUpdate,
  computePosition,
  type ComputePositionConfig,
} from "@floating-ui/dom";
import {
  noChange,
  type ReactiveController,
  type ReactiveControllerHost,
} from "lit";
import type { Ref } from "lit/directives/ref.js";
import { createControllerDirective } from "./helpers/controller-directive-factory";

const floatingUIAutoUpdateDirective = createControllerDirective<
  [
    HTMLElement,
    HTMLElement,
    Partial<ComputePositionConfig>,
    (
      | ((
          current: Partial<ComputePositionConfig>,
          previous: Partial<ComputePositionConfig>
        ) => boolean)
      | undefined
    ),
  ]
>(
  (
    referenceElement: HTMLElement,
    floatingElement: HTMLElement,
    options: Partial<ComputePositionConfig>
  ) => {
    return autoUpdate(referenceElement, floatingElement, () => {
      computePosition(referenceElement, floatingElement, options)
        .then(({ x, y }) => {
          floatingElement.style.setProperty("--floating-x", `${x}px`);
          floatingElement.style.setProperty("--floating-y", `${y}px`);
        })
        .catch((error: unknown) => {
          if (import.meta.env.DEV) {
            console.error(
              "Failed to compute floating position for",
              referenceElement,
              error
            );
          }
        });
    });
  },
  (current, previous) =>
    // Check if the reference element is changed
    current[0] !== previous[0] ||
    // Check if the floating element is changed
    current[1] !== previous[1] ||
    // Check if the options is changed.
    // If option comparison function (current[3]) is provided, use it to compare options. Otherwise, use `!==` to compare options.
    (current[3]?.(current[2], previous[2]) ?? current[2] !== previous[2])
);

export class FloatingUIAutoUpdateController<
  T extends ReactiveControllerHost & HTMLElement,
> {
  constructor(
    host: T,
    private readonly referenceRef: Ref<HTMLElement>,
    private readonly floatingRef: Ref<HTMLElement>,
    private readonly _isOptionsUpdated?: (
      current: Partial<ComputePositionConfig>,
      previous: Partial<ComputePositionConfig>
    ) => boolean
  ) {
    host.addController(this as ReactiveController);
  }

  observe(options: Partial<ComputePositionConfig>, enabled = true) {
    if (!enabled || !this.referenceRef.value || !this.floatingRef.value) {
      return noChange;
    }

    return floatingUIAutoUpdateDirective(
      this.referenceRef.value,
      this.floatingRef.value,
      options,
      this._isOptionsUpdated
    );
  }
}
