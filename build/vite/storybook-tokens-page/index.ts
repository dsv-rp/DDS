import { type Plugin } from "vite";
import { generateTokensHTML } from "./generate";

/**
 * Build or serve `/tokens.html`.
 *
 * @returns A plugin
 */
export function storybookTokensPage(): Plugin {
  return {
    name: "storybook-tokens-page",
    configureServer(devServer) {
      devServer.middlewares.use("/tokens.html", (_req, res) => {
        generateTokensHTML().then(
          (content) => {
            res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
            res.end(content);
          },
          (error: unknown) => {
            res.writeHead(500, { "Content-Type": "text/plain; charset=UTF-8" });
            res.end(`Error: ${String(error)}`);
          }
        );
      });
    },
    async generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "tokens.html",
        source: await generateTokensHTML(),
      });
    },
  };
}
