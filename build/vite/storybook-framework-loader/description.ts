import { linkify } from "./linkify";

export function createComponentDescription(
  wcaMarkdown: string,
  linkMap: ReadonlyMap<string, string>,
  linkExcludes: readonly string[]
): string {
  const tagName = /^\s*#+ (\S+)\n/.exec(wcaMarkdown)?.[1] ?? "";

  const eventsSectionPreamble = `
There are three types of events, but in all cases \`event.target\` always points to the \`${tagName}\` element.

- A custom event. This is a component-specific event that does not belong to the HTML standard.
- A cloned event. This is a cloned event of a non-composed standard HTML event.
- A [retargeted](https://lit.dev/docs/components/events/#shadowdom-retargeting) event. This is a [composed](https://developer.mozilla.org/en-US/docs/Web/API/Event/composed) event of the HTML standard that is dispatched by an element inside the component.
`.trim();

  return linkify(
    wcaMarkdown
      // Remove component title. (e.g. `## daikin-checkbox`)
      .replace(/^\s*#+ \S+\n/, "")
      // Replace " \" to "  " in the end of lines.
      .replace(/ \\$/gm, "  ")
      // Fix "\|", "\<" and "\>" in inline codes.
      .replace(/[^`]`[^`]+`/g, (all) => all.replace(/\\([|<>])/g, "$1"))
      // Add a note to the Events section.
      .replace(/^#+ Events$/m, (all) => `${all}\n${eventsSectionPreamble}\n`)
      .trim(),
    linkMap,
    linkExcludes
  );
}
