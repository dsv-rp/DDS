/**
 * Create a wrapped story `play` function so that if `disable-autoplay` is present in the URL query parameter, the interaction will not be executed.
 * This is because Storybook's automatic interaction execution interferes with visual tests.
 *
 * @param fn play function
 * @returns wrapped play function
 */
export function definePlay<
  T extends { play?: (...args: any[]) => void | Promise<void> },
>(fn: Exclude<T["play"], undefined>): T["play"] {
  return function play(...args): void | Promise<void> {
    if (new URLSearchParams(location.search).has("disable-autoplay")) {
      return Promise.resolve();
    }

    return fn(...args);
  };
}
