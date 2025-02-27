// storybook/kitchen-sink.ts
import { html, type TemplateResult } from "lit";
import { html as shtml, unsafeStatic } from "lit/static-html.js";

export type KitchenSinkLevel = readonly [
  key: string,
  values: readonly string[],
];

export type KitchenSinkProps<T extends KitchenSinkLevel> = {
  [K in T[0]]: (T & [K, string[]])[1][number];
};

export function renderKitchenSink<T extends KitchenSinkLevel>(
  levels: readonly T[],
  render: (props: KitchenSinkProps<T>) => TemplateResult
): TemplateResult {
  const renderInner = (
    index: number,
    levels: readonly T[],
    props: Partial<KitchenSinkProps<T>>
  ): TemplateResult => {
    if (!levels.length) {
      return render(props as KitchenSinkProps<T>);
    }

    const tag = `h${index + 1}`;
    const [currentLevel, ...remainingLevels] = levels;
    const [key, values] = currentLevel;
    return html`<div class="size-grid" data-level=${String(index + 1)}>
      ${values.map(
        (value) =>
          shtml`<${unsafeStatic(tag)} class="box-title">${value}</${unsafeStatic(tag)}>${renderInner(index + 1, remainingLevels, { ...props, [key]: value })}`
      )}
    </div>`;
  };

  return html`<section class="kitchen-sink">
    ${renderInner(0, levels, {})}
  </section>`;
}
