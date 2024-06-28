import type { LitElement } from "lit";

type Constructor<T> = new (...args: any[]) => T;
type PublicConstructor<T> = new () => T;

type Cleanup<This> = (this: This) => void;
type Registration<This> = (this: This) => Cleanup<This> | void;

export interface LifecycleMixin<This> {
  registerLifecycleCallback(callback: Registration<This>): void;
}

export interface LifecycleMixinStatic<This> {
  _staticLifecycleRegistrationSet: Set<Registration<This>>;
  registerStaticLifecycleCallback(callback: Registration<This>): void;
}

export function mixinLifecycle<T extends Constructor<LitElement>>(
  Base: T
): PublicConstructor<InstanceType<T> & LifecycleMixin<InstanceType<T>>> &
  LifecycleMixinStatic<InstanceType<T>> {
  const C = class extends Base implements LifecycleMixin<InstanceType<T>> {
    private _lifecycleRegistrationSet: Set<Registration<InstanceType<T>>> = new Set();
    private _lifecycleCleanups: Cleanup<InstanceType<T>>[] = [];

    constructor(...args: any[]) {
      super(...args);

      for (const staticRegistration of L._staticLifecycleRegistrationSet) {
        this.registerLifecycleCallback(staticRegistration);
      }
    }

    connectedCallback(): void {
      super.connectedCallback();

      for (const registration of this._lifecycleRegistrationSet) {
        const cleanup = registration.call(this as InstanceType<T>);
        if (cleanup) {
          this._lifecycleCleanups.push(cleanup);
        }
      }
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();

      // destroy and prepare for reconnection
      // note that `this._registrations` must not be cleared by lifecycle methods; they are registered in the constructor and must be persisted.
      for (const cleanup of this._lifecycleCleanups) {
        cleanup.call(this as InstanceType<T>);
      }
      this._lifecycleCleanups = [];
    }

    registerLifecycleCallback(callback: Registration<InstanceType<T>>): void {
      this._lifecycleRegistrationSet.add(callback);
    }
  };

  const L = C as unknown as LifecycleMixinStatic<InstanceType<T>>;
  L._staticLifecycleRegistrationSet = new Set();
  L.registerStaticLifecycleCallback = function (
    registration: Registration<InstanceType<T>>
  ): void {
    L._staticLifecycleRegistrationSet.add(registration);
  };

  // @ts-expect-error
  return C;
}
