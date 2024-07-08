import { AxeBuilder } from "@axe-core/playwright";
import { getStoryContext, type TestRunnerConfig } from "@storybook/test-runner";
import { stdout } from "node:process";
import pc from "picocolors";

export interface A11yConfig {
  disable?: boolean;
  configure?: (axeBuilder: AxeBuilder) => void | Promise<void>;
}

type StoryContextForEnhancers = Awaited<ReturnType<typeof getStoryContext>>;
type AxeResults = Awaited<ReturnType<AxeBuilder["analyze"]>>;

/**
 * Outputs accessibility test results.
 *
 * @param storyContext Story context
 * @param result Result of {@link AxeBuilder.analyze} or `false` if skipped
 */
function outputA11yResults(
  storyContext: StoryContextForEnhancers,
  result: AxeResults | false
): void {
  const HEADER = pc.bgBlack(pc.white(" A11y "));
  const NAME = pc.bold(storyContext.id);

  // Collect logs and write them all at once so that we know which component has the violations.
  const logLines: string[] = [];
  if (!result) {
    logLines.push(`${HEADER} ${NAME} ${pc.bgBlue("SKIPPED")}`);
  } else {
    const { passes, violations } = result;

    // Summary line
    const summaries: string[] = [];
    if (passes.length) {
      summaries.push(pc.green(`${passes.length} PASSED`));
    }
    if (violations.length) {
      summaries.push(pc.red(`${violations.length} FAILED`));
    }
    if (!summaries.length) {
      summaries.push(pc.yellow("NO RESULTS"));
    }
    logLines.push(`${HEADER} ${NAME} ${summaries.join(", ")}`);

    // Violations
    for (const violation of violations) {
      const impact = violation.impact ?? "undefined";
      const colorizedImpact = {
        critical: pc.red,
        serious: pc.red,
        moderate: pc.yellow,
        minor: pc.blue,
        undefined: pc.dim,
      }[impact](impact);

      logLines.push(
        `       * ${colorizedImpact} ${violation.description} ${pc.dim(`(${violation.id})`)}`
      );
    }
  }

  // Not using `console.log()` as it's mocked by jest.
  stdout.write(logLines.map((line) => `${line}\n`).join(""));
}

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);
    const a11yConfig = storyContext.parameters.a11y as A11yConfig | undefined;

    // Skip a11y test if disabled
    if (a11yConfig?.disable) {
      outputA11yResults(storyContext, false);
      return;
    }

    const axeBuilder = new AxeBuilder({ page });
    axeBuilder.include("#storybook-root");
    await a11yConfig?.configure?.(axeBuilder);

    const results = await axeBuilder.analyze();
    outputA11yResults(storyContext, results);

    // TODO: As a11y support is not yet sufficient, we'll not fail the test even if violations found.
  },
};

export default config;
