import { spawnSync } from "node:child_process";
import { rm } from "node:fs/promises";
import { env, stderr } from "node:process";
import { getStorybookEnv } from "../storybook-env";

const PORT = 6099;

const { STORYBOOK_ENV, STORYBOOK_FW } = getStorybookEnv(true);

const command = {
  "web-components": {
    development: `npx storybook dev -p ${PORT} --ci`,
    production: `npx http-server -s -c-1 -d false --no-dotfiles -p ${PORT} storybook-static/web-components`,
  },
  react: {
    development: `npx storybook dev -p ${PORT} --ci -c .storybook/react`,
    production: `npx http-server -s -c-1 -d false --no-dotfiles -p ${PORT} storybook-static/react`,
  },
}[STORYBOOK_FW][STORYBOOK_ENV];

if (STORYBOOK_ENV === "development") {
  // Print to stderr so that this can be seen in Playwright logs.
  stderr.write("Removing node_modules/.cache/storybook...\n");
  try {
    await rm("node_modules/.cache/storybook", { force: true, recursive: true });
  } catch {
    // do nothing
  }
}

// Print to stderr so that this can be seen in Playwright logs.
stderr.write(`> ${command}\n\n`);

const { status } = spawnSync(command, {
  shell: true,
  stdio: "inherit",
  env: {
    ...env,
    STORYBOOK_ENV,
    STORYBOOK_FW,
  },
});

process.exit(status);
