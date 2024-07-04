/**
 * Create a wrapped story `play` function so that if `disable-autoplay` is present in the URL query parameter, the interaction will not be executed.
 * This is because Storybook's automatic interaction execution interferes with visual tests.
 *
 * @param fn play function
 * @returns wrapped play function
 */
export function definePlay<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ((...args: any[]) => void | Promise<void>) | undefined,
>(fn: NonNullable<NoInfer<T>>): NonNullable<T> {
  // @ts-expect-error ignore variance-related error
  return function play(...args): void | Promise<void> {
    if (new URLSearchParams(location.search).has("disable-autoplay")) {
      return Promise.resolve();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return fn(...args);
  };
}
