import type { LifecycleMixin, LifecycleMixinStatic } from "./mixinLifecycle";

export function on<K extends keyof HTMLElementEventMap>(
  event: K,
  options?: boolean | AddEventListenerOptions
) {
  return (
    target: HTMLElement & LifecycleMixin<HTMLElement>,
    _name: string,
    descriptor: PropertyDescriptor
  ) => {
    if (!(target instanceof HTMLElement)) {
      throw new Error("target must be a subclass of HTMLElement");
    }
    if (!("registerLifecycleCallback" in target)) {
      throw new Error("target must have LifecycleMixin");
    }

    const callback = descriptor.value.bind(target);
    (
      target.constructor as unknown as LifecycleMixinStatic<HTMLElement>
    ).registerStaticLifecycleCallback(function () {
      this.addEventListener(event, callback, options);
      return () => {
        this.removeEventListener(event, callback);
      };
    });
  };
}
