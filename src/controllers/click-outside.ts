import {
  noChange,
  type ReactiveController,
  type ReactiveControllerHost,
} from "lit";
import { createControllerDirective } from "./helpers/controller-directive-factory";

const clickOutsideDirective = createControllerDirective(
  (host: HTMLElement, callback: (event: MouseEvent) => void) => {
    const listener = (event: MouseEvent): void => {
      if (!event.target || host.contains(event.target as Node)) {
        // Inside the host.
        return;
      }

      callback.call(host, event);
    };

    window.addEventListener("click", listener);

    return (): void => {
      window.removeEventListener("click", listener);
    };
  }
);

export class ClickOutsideController<
  T extends ReactiveControllerHost & HTMLElement,
> {
  constructor(
    private readonly _host: T,
    private readonly _callback: (this: T, event: MouseEvent) => void
  ) {
    _host.addController(this as ReactiveController);
  }

  observe(enabled = true) {
    // Call the directive only when `enabled` is `true`.
    // This allows us to register when `enabled` is `true` and cleanup when `enabled` becomes `false`.
    return enabled
      ? clickOutsideDirective(this._host, this._callback)
      : noChange;
  }
}
