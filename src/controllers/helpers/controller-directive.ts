import { nothing, type Part } from "lit";
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
 * Creates an asynchronous directive that calls the user-specified startup and cleanup functions in accordance with the lifecycle and render argument changes.
 * Typically, there is no need to expose this directive directly to users. Instead, please provide a method that wraps the directive in a [Reactive Controller](https://lit.dev/docs/composition/controllers/).
 * See [click-outside.ts](../click-outside.ts) for an example of actual use.
 * @param start A startup function that is called when the directive is rendered. It must return a cleanup function.
 * @param shouldRenew A function that determines whether it is necessary to restart.
 *                    The arguments of the current directive call and the directive call when it was last started are passed.
 *                    If omitted, a function that compares each element of the array using `Object.is` is used.
 * @returns An async directive.
 */
export function createControllerDirective<T extends unknown[]>(
  start: (...args: T) => () => void,
  shouldRenew: (
    newArgs: NoInfer<T>,
    oldArgs: NoInfer<T>
  ) => boolean = argsChanged
) {
  class ControllerDirective extends AsyncDirective {
    /** The arguments passed to render. */
    private _args: T | undefined;

    /** Cleanup function. (exists iff activated) */
    private _cleanup: (() => void) | undefined;

    private _activate(): void {
      if (!this.isConnected || !this._args || this._cleanup) {
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

    protected override disconnected(): void {
      this._deactivate();
    }

    protected override reconnected(): void {
      this._activate();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Required for type inference.
    override render(..._args: T) {
      return nothing;
    }

    override update(_part: Part, args: T) {
      if (!this.isConnected) {
        // Not connected.
        return nothing;
      }

      if (this._args) {
        // Already activated. If there is no need to re-register, do nothing.
        if (!shouldRenew(args, this._args)) {
          // No need to re-register.
          return nothing;
        }

        this._deactivate();
      }

      this._args = args;
      this._activate();

      return nothing;
    }
  }

  return directive(ControllerDirective);
}
