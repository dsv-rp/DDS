import { noChange } from "lit";
import { AsyncDirective, directive } from "lit/async-directive.js";

function argsChanged(
  current: readonly unknown[],
  previous: readonly unknown[]
): boolean {
  return (
    current.length !== previous.length ||
    current.some((value, index) => !Object.is(value, previous[index]))
  );
}

/**
 * Creates a factory function for an asynchronous directive that calls the user-specified startup and cleanup functions in accordance with the lifecycle.
 * See click-outside.ts for an example of actual use.
 * @param start A startup function that is called when the directive is rendered. It must return a cleanup function.
 * @returns A factory function for an async directive.
 */
export function createControllerDirective<T extends unknown[]>(
  start: (...args: T) => () => void,
  shouldRenew: (newArgs: T, oldArgs: T) => boolean = argsChanged
) {
  class ControllerDirective extends AsyncDirective {
    /** The arguments passed to render. */
    private _args: T | undefined;

    /** Cleanup function. (exists iff activated) */
    private _cleanup: (() => void) | undefined;

    private _activate(): void {
      if (!this.isConnected || !this._args) {
        return;
      }

      this._cleanup = start(...this._args);
    }

    private _deactivate(): void {
      if (!this._cleanup) {
        return;
      }

      this._cleanup();
      this._cleanup = undefined;
    }

    override render(...args: T) {
      if (this._args) {
        if (!shouldRenew(args, this._args)) {
          return;
        }

        this._deactivate();
      }

      this._args = args;
      this._activate();

      return noChange;
    }

    protected override disconnected(): void {
      this._deactivate();
    }

    protected override reconnected(): void {
      this._activate();
    }
  }

  return directive(ControllerDirective);
}
