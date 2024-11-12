import { LitElement } from "lit";
import type { DDSPropertyDeclaration } from "./ddsProperty";

export class DDSElement extends LitElement {
  private static _propertyNameKeyMap?: Map<PropertyKey, string | symbol>;

  static override getPropertyDescriptor(
    name: PropertyKey,
    key: string | symbol,
    {
      fallbackValue,
      isAllowedValue,
      ...options
    }: DDSPropertyDeclaration & {
      fallbackValue?: unknown;
      isAllowedValue?: (value: unknown) => void;
    }
  ): PropertyDescriptor | undefined {
    const defaultDescriptor = super.getPropertyDescriptor(
      name,
      key,
      options
    ) as Required<PropertyDescriptor> | undefined;
    if (!defaultDescriptor) {
      return;
    }

    this._propertyNameKeyMap ??= new Map();
    this._propertyNameKeyMap.set(name, key);

    return {
      get(): unknown {
        const orgValue = defaultDescriptor.get.call(this) as unknown;
        return orgValue === undefined && fallbackValue !== undefined
          ? fallbackValue
          : orgValue;
      },
      set(value: unknown): void {
        defaultDescriptor.set.call(
          this,
          fallbackValue !== undefined && isAllowedValue?.(value) === false
            ? fallbackValue
            : value
        );
      },
      configurable: true,
      enumerable: true,
    };
  }

  protected getBackingProperty<T extends keyof this>(
    name: T
  ): this[T] | undefined {
    const key = (
      this.constructor as typeof DDSElement
    )._propertyNameKeyMap?.get(name);
    if (!key) {
      return;
    }

    return this[key as T];
  }
}
