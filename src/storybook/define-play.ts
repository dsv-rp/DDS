/**
 * Create a wrapped story `play` function so that if `no-autoplay` is present in the URL query parameter, the interaction will not be executed.
 * This is because Storybook's automatic interaction execution interferes with visual tests.
 *
 * @param fn play function
 * @returns wrapped play function
 */
export function definePlay<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generics requires any.
  T extends ((...args: any[]) => void | Promise<void>) | undefined,
>(fn: NonNullable<NoInfer<T>>): NonNullable<T> {
  // @ts-expect-error Ignore variance-related error
  return function play(...args): void | Promise<void> {
    if (new URLSearchParams(location.search).has("no-autoplay")) {
      return Promise.resolve();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- It's safe to pass arguments as-is.
    return fn(...args);
  };
}
