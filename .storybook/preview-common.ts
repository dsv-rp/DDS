import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import "./preview-common.css";

// @ts-expect-error shadow-dom-testing-library (wrongly) uses `process` so we have to provide a mock.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
globalThis.process ??= { env: {} };
