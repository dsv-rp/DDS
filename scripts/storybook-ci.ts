import { spawnSync } from "node:child_process";
import { argv, env } from "node:process";

const PORT = 6099;

const framework =
  (argv[2] || env.STORYBOOK_FW) === "react" ? "react" : "web-components";
const usePrebuilt = (argv[3] || env.STORYBOOK_ENV) === "production";

const command = {
  "web-components": {
    dev: `npx storybook dev -p ${PORT} --ci`,
    prod: `npx serve -p ${PORT} storybook-static/web-components`,
  },
  react: {
    dev: `npx storybook dev -p ${PORT} --ci -c .storybook/react`,
    prod: `npx serve -p ${PORT} storybook-static/react`,
  },
}[framework][usePrebuilt ? "prod" : "dev"];

console.info(`> ${command}\n`);

const { status } = spawnSync(command, {
  shell: true,
  stdio: "inherit",
});

process.exit(status);
