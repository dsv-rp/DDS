import { AxeBuilder } from "@axe-core/playwright";
import { getStoryContext, type TestRunnerConfig } from "@storybook/test-runner";
import { stdout } from "node:process";
import pc from "picocolors";

export type A11yConfig = {
  disable?: boolean;
  configure?: (axeBuilder: AxeBuilder) => void | Promise<void>;
};

type StoryContextForEnhancers = Awaited<ReturnType<typeof getStoryContext>>;
type AxeResults = Awaited<ReturnType<AxeBuilder["analyze"]>>;

function outputLogs(
  storyContext: StoryContextForEnhancers,
  result: AxeResults | false
): void {
  const HEADER = pc.bgBlack(pc.white(" A11y "));
  const NAME = pc.bold(storyContext.id);

  const allLogs: string[] = [];
  if (!result) {
    allLogs.push(`${HEADER} ${NAME} ${pc.bgBlue("SKIPPED")}`);
  } else {
    const { passes, violations } = result;

    const logs: string[] = [];
    if (passes.length) {
      logs.push(pc.green(`${passes.length} PASSED`));
    }
    if (violations.length) {
      logs.push(pc.red(`${violations.length} FAILED`));
    }
    if (!logs.length) {
      logs.push(pc.yellow("NO RESULTS"));
    }
    allLogs.push(`${HEADER} ${NAME} ${logs.join(", ")}`);

    for (const violation of violations) {
      const impact = violation.impact ?? "undefined";
      const colorize = {
        critical: pc.red,
        serious: pc.red,
        moderate: pc.yellow,
        minor: pc.blue,
        undefined: String,
      }[impact];
      allLogs.push(
        `       * ${colorize(impact)} ${violation.description} ${pc.dim(`(${violation.id})`)}`
      );
    }
  }

  stdout.write(Buffer.from(allLogs.map((line) => `${line}\n`).join("")));
}

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);
    const a11yConfig = storyContext.parameters?.a11y as A11yConfig | undefined;
    if (a11yConfig?.disable) {
      outputLogs(storyContext, false);
      return;
    }

    const axeBuilder = new AxeBuilder({ page });
    axeBuilder.include("#storybook-root");
    await a11yConfig?.configure?.(axeBuilder);

    const results = await axeBuilder.analyze();
    outputLogs(storyContext, results);

    // TODO: As a11y support is not yet sufficient, we'll not fail the test even if violations found.
  },
};

export default config;
