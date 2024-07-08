import { argv, env, exit } from "node:process";

export type StorybookEnvName = "development" | "production";
export type StorybookFrameworkName = "web-components" | "react";

export interface StorybookEnv {
  readonly STORYBOOK_ENV: StorybookEnvName;
  readonly STORYBOOK_FW: StorybookFrameworkName;
}

export function getStorybookEnv(useArgv = false): StorybookEnv {
  const args = useArgv ? argv.slice(2) : [];

  const sbFramework = env.STORYBOOK_FW || args[0] || "web-components";
  if (sbFramework !== "web-components" && sbFramework !== "react") {
    console.error("Invalid storybook framework specified", sbFramework);
    exit(1);
  }

  const sbEnv = env.STORYBOOK_ENV || args[1] || "development";
  if (sbEnv !== "development" && sbEnv !== "production") {
    console.error("Invalid storybook environment specified", sbEnv);
    exit(1);
  }

  return {
    STORYBOOK_ENV: sbEnv,
    STORYBOOK_FW: sbFramework,
  };
}
