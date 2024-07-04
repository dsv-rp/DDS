import { spawnSync } from "node:child_process";
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

console.info(`> ${command}\n`);

const { status } = spawnSync(command, {
  shell: true,
  stdio: "inherit",
});

process.exit(status);
