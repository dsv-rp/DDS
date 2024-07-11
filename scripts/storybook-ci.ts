import { spawnSync } from "node:child_process";
import { rm } from "node:fs/promises";
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
  console.info("Removing node_modules/.cache/storybook...");
  try {
    await rm("node_modules/.cache/storybook", { force: true, recursive: true });
  } catch {
    // do nothing
  }
}

console.info(`> ${command}\n`);

const { status } = spawnSync(command, {
  shell: true,
  stdio: "inherit",
});

process.exit(status);
