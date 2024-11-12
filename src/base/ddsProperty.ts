import type { PropertyDeclaration } from "lit";
import { property } from "lit/decorators.js";

export type DDSPropertyDeclaration<
  Type = unknown,
  TypeHint = unknown,
> = PropertyDeclaration<Type, TypeHint> &
  (
    | {
        fallbackValue?: undefined;
        isAllowedValue?: undefined;
      }
    | {
        reflect: true;
        fallbackValue: Type;
        isAllowedValue?: undefined;
      }
    | {
        reflect: true;
        fallbackValue: Type;
        isAllowedValue: (value: Type) => boolean;
      }
  );

export function ddsProperty(
  options?: DDSPropertyDeclaration
): PropertyDecorator {
  return property(options);
}
