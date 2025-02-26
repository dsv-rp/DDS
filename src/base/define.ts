import { DDSElement } from "./DDSElement";

const currentVersion = DDSElement.version;

export function defineDDSElement(
  ctor: CustomElementConstructor,
  name: string
): void {
  const existing = customElements.get(name) as typeof DDSElement | undefined;
  if (existing) {
    const existingVersion =
      (existing.version as string | undefined) ?? "unknown version";
    if (existingVersion !== currentVersion) {
      console.warn(
        `<${name}> is already registered but the version does not match. (${existingVersion} vs ${currentVersion})`
      );
    }
    return;
  }

  customElements.define(name, ctor);
}
