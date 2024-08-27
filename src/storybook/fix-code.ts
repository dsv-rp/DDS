export type AttributeType = "preserve" | "removeIfEmpty" | "boolean";
export type AttributeTypeMap = Partial<Readonly<Record<string, AttributeType>>>;
export type TagAttributeTypeMap = Partial<
  Readonly<Record<string, AttributeTypeMap>>
>;

interface ArgType {
  control?: { type: string };
  type?: { name: string };
  defaultValue?: unknown;
}

interface StorybookParameters {
  fileName: string;
}

interface Context {
  readonly argTypes: Readonly<Record<string, ArgType>>;
  readonly initialArgs: Partial<Readonly<Record<string, unknown>>>;
  readonly parameters: StorybookParameters;
}

const DEFAULT_ATTRIBUTE_TYPE_MAP: AttributeTypeMap = {
  /* cSpell:disable */
  hidden: "boolean",
  class: "removeIfEmpty",
  id: "removeIfEmpty",
  role: "removeIfEmpty",
  datatestid: "removeIfEmpty",
  /* cSpell:enable */
};

/**
 * Converts attribute or property to unified key.
 * @param str attribute or property
 * @returns unified key
 */
function attributeOrPropertyToKey(str: string): string {
  return str.toLowerCase().replaceAll("-", "");
}

function isVoidElementTag(tagName: string): boolean {
  return [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ].includes(tagName);
}

function indentOf(num: number): string {
  if (num < 0) {
    throw new Error("Invalid indent");
  }
  return "  ".repeat(num);
}

/**
 * Pretty print HTML.
 * @param code HTML source code
 * @param tagAttributeTypeMap The way to handle empty attributes
 * @returns Pretty printed HTML code
 */
export function prettyHTML(
  code: string,
  tagAttributeTypeMap: TagAttributeTypeMap = {}
): string {
  /** Remaining code string */
  let remaining = code.trim();

  /**
   * Matches the `remaining` with the given regular expression and returns an array of capture results.
   * Then, the matched part is removed from the beginning of the `remaining`.
   * If the regular expression does not match, an exception is thrown.
   */
  const consume = (re: RegExp): string[] => {
    const result = re.exec(remaining);
    if (!result) {
      throw new Error("Cannot consume.");
    }
    if (!result[0]) {
      throw new Error("Nothing consumed. This could lead to an infinite loop.");
    }

    remaining = remaining.slice(result[0].length);
    return result.slice(1);
  };

  try {
    /** Pretty print code */
    let result = "";
    /** Current indent depth */
    let indent = 0;
    /** Summary of the most recent content written in `result` */
    let lastWriteOperation:
      | `START:${string}`
      | `END:${string}`
      | "COMMENT"
      | "TEXT"
      | null = null;

    while (remaining.length > 0) {
      // Retrieve the types of content: start tag, end tag, comment, or text.
      const prefix = (/^\s*(<[/!]?)?/.exec(remaining)?.[1] ?? "") as
        | "<"
        | "</"
        | "<!"
        | "";
      if (prefix === "<") {
        // Start tag

        /** @example '<div hidden class="foo" custom-prop="">' */
        const chunk = consume(/^\s*(<[^>]+>)/)[0];
        /** @example "div" */
        const tag = /<([\w-]+)/.exec(chunk)?.[1]?.toLowerCase() ?? "";
        const attributeTypeMap = tagAttributeTypeMap[tag];
        /** @example [[" hidden", "hidden", null], [' class="foo"', "class", '="foo"'], [' custom-prop=""', "custom-prop", '=""']] */
        const attributeMatches = chunk
          .slice(tag.length + 1)
          .matchAll(/\s+([\w:?@.-]+)(="[^"]*"|='[^']*')?/g);
        // Modify attribute part of the `chunk`.
        // - Delete the empty attribute (`foo=""`) or replace it with a boolean attribute (`foo`).
        // - Escape line breaks in attribute values.
        const modifiedAttributes = Array.from(attributeMatches)
          .map(([, attribute, value = ""]) => {
            // Escape line breaks in attribute values.
            value = value.replaceAll("\n", "&#10;");

            // Keep original string if attribute value is not empty
            if (value !== '=""' && value !== "=''") {
              return `${attribute}${value}`;
            }

            const key = attributeOrPropertyToKey(attribute);
            // Obtain the way to handle the empty attribute.
            // If `attributeTypeMap` is not set, it means an empty attribute in another component. In this case, if an empty attribute is specified, it is almost certainly a boolean attribute.
            // If `attributeTypeMap` exists but the type could not be obtained, the automatic inference has failed. In this case, leave the attribute as-is just to be sure.
            const fallbackType: AttributeType = attributeTypeMap
              ? "preserve"
              : "boolean";
            const attributeType =
              attributeTypeMap?.[key] ??
              DEFAULT_ATTRIBUTE_TYPE_MAP[key] ??
              fallbackType;
            const content = {
              preserve: `${attribute}${value}`, // e.g. `label=""`
              removeIfEmpty: "",
              boolean: attribute, // e.g. `hidden`
            }[attributeType];
            return content;
          })
          .filter((value) => !!value)
          .map((value) => ` ${value}`)
          .join("");
        // Replace the attribute part of the `chunk` with a new one.
        const modifiedChunk = chunk.replace(
          /^\s*(<[\w-]+)\s+[^>]+/,
          (_all, prefix: string) => `${prefix}${modifiedAttributes}`
        );

        result += `${indentOf(indent)}${modifiedChunk}\n`;
        if (!isVoidElementTag(tag)) {
          indent++;
        }

        lastWriteOperation = `START:${tag}`;
      } else if (prefix === "</") {
        // End tag

        /** @example "</div>" */
        const chunk = consume(/^\s*(<\/[^>]+>)/)[0];
        /** @example "div" */
        const tag = /<\/([\w-]+)/.exec(chunk)?.[1]?.toLowerCase() ?? "";

        if (!isVoidElementTag(tag)) {
          indent--;
        }
        if (lastWriteOperation === `START:${tag}`) {
          // If the last thing written was a start tag, write tags inline.
          // e.g. `<div hidden></div>`
          result = `${result.trimEnd()}${chunk}\n`;
        } else {
          // If not, write multiline.
          // e.g. `<div hidden>\n  content\n</div>`
          result += `${indentOf(indent)}${chunk}\n`;
        }

        lastWriteOperation = `END:${tag}`;
      } else if (prefix === "<!") {
        // Comment

        /** @example "Comment Line 1\n  Comment Line 2" */
        const content = consume(/^\s*<!--([\s\S]*?)-->/)[0].trim();
        if (content.includes("\n")) {
          // Multiline comment
          const prettyContent = content
            .split("\n")
            .map((line) => `${indentOf(indent + 1)}${line.trim()}`)
            .join("\n");
          result += `${indentOf(indent)}<!--\n${prettyContent}\n${indentOf(indent)}-->\n`;
        } else {
          // Single-line comment
          result += `${indentOf(indent)}<!-- ${content} -->\n`;
        }
        lastWriteOperation = "COMMENT";
      } else {
        // Text

        /** @example "Line 1\n  Line 2" */
        const content = consume(/^([^<]+)/)[0].trim();
        const prettyContent = content
          .split("\n")
          .map((line) => `${indentOf(indent)}${line.trim()}`)
          .join("\n");
        result += `${prettyContent}\n`;
        lastWriteOperation = "TEXT";
      }
    }

    return result.trim();
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn("Failed to pretty print HTML", e);
    }
    return code;
  }
}

function createAttributeTypeMap(context: Context): AttributeTypeMap {
  return Object.fromEntries(
    Object.entries(context.argTypes).map(([key, value]) => [
      attributeOrPropertyToKey(key),
      // If the control or type is boolean, treat the attribute as a boolean attribute.
      value.control?.type === "boolean" || value.type?.name === "boolean"
        ? "boolean"
        : // For attributes that do not have an initial value set, an empty string can be given to omit the attribute.
          !value.defaultValue && !context.initialArgs[key]
          ? "removeIfEmpty"
          : // Otherwise, output attribute as-is.
            "preserve",
    ])
  );
}

export function transformCodeWebComponents(
  code: string,
  context: Context
): string {
  const firstComponentTag = /<(daikin-[\w-]+)/.exec(code)?.[1].toLowerCase();
  const tagNameFromFilename = /\/(daikin-[\w-]+)\.stories\.ts/.exec(
    context.parameters.fileName
  )?.[1];
  const componentTagName = tagNameFromFilename ?? firstComponentTag ?? "";
  return prettyHTML(code, {
    [componentTagName]: createAttributeTypeMap(context),
  });
}

export function transformCodeReact(code: string): string {
  // no-op
  return code;
}

export function getCodeTransformerForFramework(
  framework: "react" | "web-component"
): typeof transformCodeWebComponents {
  switch (framework) {
    case "react":
      return transformCodeReact;

    case "web-component":
    default:
      return transformCodeWebComponents;
  }
}
