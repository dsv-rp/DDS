import { createJiti } from "jiti";
const jiti = createJiti(import.meta.url);

export default /** @type {import("./build/eslint")} */ (
  await jiti.import("./build/eslint")
).default;
