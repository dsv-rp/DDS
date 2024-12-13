import designTokens from "@daikin-oss/dds-tokens/json/daikin/Light/tokens.json" with { type: "json" };
import type { AST, Rule } from "eslint";

export const banMissingDesignTokensRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Forbids usage of tokens that do not exist.",
    },
    schema: [],
    messages: {
      invalidTokenMessageId:
        "The token {{ token }} does not exist in the @daikin-oss/dds-tokens package.",
    },
  },
  create(context) {
    const allowedTokenSet = new Set(Object.keys(designTokens));

    const checkAndReport = (
      node: Rule.Node,
      content: string,
      baseLoc?: AST.SourceLocation | null
    ): void => {
      let lastIndex = 0;
      const lastBegin = baseLoc?.start;
      const countLoc = (index: number): typeof lastBegin => {
        if (!lastBegin) {
          return;
        }

        for (let i = lastIndex; i < index; i++) {
          if (content[i] === "\n") {
            lastBegin.line++;
            lastBegin.column = 0;
          } else {
            lastBegin.column++;
          }
        }

        lastIndex = index;
        return lastBegin;
      };

      for (const match of content.matchAll(
        /(?:--dds-|\bddt-)([A-Za-z\d-]+)/g
      )) {
        const item = match[1];
        if (allowedTokenSet.has(item)) {
          continue;
        }

        const start = countLoc(match.index);
        context.report({
          ...(start
            ? {
                loc: {
                  start,
                  end: { ...start, column: start.column + match[0].length },
                },
              }
            : { node }),
          messageId: "invalidTokenMessageId",
          data: {
            token: item,
          },
        });
      }
    };

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          checkAndReport(node, node.raw ?? node.value, node.loc);
        }
      },
      TemplateLiteral(node) {
        for (const quasi of node.quasis) {
          checkAndReport(node, quasi.value.raw, quasi.loc);
        }
      },
    };
  },
};
