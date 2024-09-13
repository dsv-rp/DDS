import {
  nothing,
  type ReactiveController,
  type ReactiveControllerHost,
} from "lit";
import { createControllerDirective } from "./helpers/controller-directive";

/**
 * An async directive that listens for outside clicks.
 * This directive takes the target HTMLElement and a callback function as arguments.
 * When the directive is connected to the DOM, an event listener is registered, and when it is disconnected from or removed from the DOM, the event listener will be unregistered.
 * Also, when the directive arguments are updated, the event listener is re-registered.
 */
const clickOutsideDirective = createControllerDirective(
  (element: HTMLElement, callback: (event: MouseEvent) => void) => {
    const listener = (event: MouseEvent): void => {
      if (!event.target || element.contains(event.target as Node)) {
        // Inside the host.
        return;
      }

      callback.call(element, event);
    };

    window.addEventListener("click", listener);

    return (): void => {
      window.removeEventListener("click", listener);
    };
  }
);

/**
 * A reactive controller that provides a directive that listens for clicks outside the host element.
 * This provides a declarative way to listen for outside clicks.
 * Create an instance of `ClickOutsideController` in the constructor or in a class field, and call `instance.directive()` inside a html template.
 *
 * @example
 *
 * ```ts
 * class MyComponent extends LitElement {
 *   private _clickOutsideController = new ClickOutsideController(
 *     this,
 *     this._onClickOutside
 *   );
 *
 *   private _onClickOutside(event: MouseEvent): void {
 *     console.debug("Click Outside", event);
 *     this.open = false;
 *   }
 *
 *   override render() {
 *     return html`<div ?hidden=${!open}>
 *       ${
 *         // Listen to click outside only when `this.open` is `true`.
 *         this._clickOutsideController.directive(this.open)
 *       }
 *     </div>`;
 *   }
 * }
 * ```
 */
export class ClickOutsideController<
  T extends ReactiveControllerHost & HTMLElement,
> {
  constructor(
    private readonly _host: T,
    private readonly _callback: (this: T, event: MouseEvent) => void
  ) {
    _host.addController(this as ReactiveController);
  }

  directive(enabled = true) {
    // Call the directive only when the `enabled` is `true`.
    // This allows us to register when the `enabled` is `true` and cleanup when it becomes `false`.
    // The reason why the argument passed to the `clickOutsideDirective` is received by the constructor and not by this function is to prevent unintended re-registration by making the value immutable.
    return enabled
      ? clickOutsideDirective(this._host, this._callback)
      : nothing;
  }
}
