import {
  autoUpdate,
  computePosition,
  type ComputePositionConfig,
} from "@floating-ui/dom";
import {
  nothing,
  type ReactiveController,
  type ReactiveControllerHost,
} from "lit";
import { ref } from "lit/directives/ref.js";
import { createControllerDirective } from "./helpers/controller-directive";

const floatingUIAutoUpdateDirective = createControllerDirective<
  [
    Element,
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
    referenceElement: Element,
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

/**
 * A reactive controller that provides a directive that calls `autoUpdate` and `computePosition` of Floating UI library.
 * This provides a declarative way to update floating position automatically.
 *
 * 1. Create an instance of `FloatingUIAutoUpdateController` in the constructor or in a class field.
 * 2. Attach `instance.refFloating()` and `instance.refReference()` to appropriate elements.
 * 3. Call `instance.directive()` inside a html template.
 */
export class FloatingUIAutoUpdateController<
  T extends ReactiveControllerHost & HTMLElement,
> {
  private _floatingElement: HTMLElement | undefined;
  private _referenceElement: Element | undefined;

  constructor(
    private readonly _host: T,
    private readonly _isOptionsUpdated?: (
      current: Partial<ComputePositionConfig>,
      previous: Partial<ComputePositionConfig>
    ) => boolean
  ) {
    _host.addController(this as ReactiveController);
  }

  private readonly _refCallbackFloating = (
    element: Element | undefined
  ): void => {
    this._floatingElement = element as HTMLElement | undefined;
    // Request re-render to trigger `directive()` call.
    // As the `update` is performed immediately after the `update`, a warning log is displayed in the development mode lit, but there is no other way.
    this._host.requestUpdate();
  };

  private readonly _refCallbackReference = (
    element: Element | undefined
  ): void => {
    this._referenceElement = element;
    // Request re-render to trigger `directive()` call.
    // As the `update` is performed immediately after the `update`, a warning log is displayed in the development mode lit, but there is no other way.
    this._host.requestUpdate();
  };

  refFloating() {
    return ref(this._refCallbackFloating);
  }

  refReference() {
    return ref(this._refCallbackReference);
  }

  directive(options: Partial<ComputePositionConfig>, enabled = true) {
    if (!enabled || !this._referenceElement || !this._floatingElement) {
      return nothing;
    }

    return floatingUIAutoUpdateDirective(
      this._referenceElement,
      this._floatingElement,
      options,
      this._isOptionsUpdated
    );
  }
}
