import "./daikin-button";

declare global {
  namespace JSX {
    type WebComponentProps<T> = React.DetailedHTMLProps<
      React.HTMLAttributes<T>,
      T
    > &
      Partial<Omit<T, keyof HTMLElement>>;

    type WebComponentElements<T> = {
      [K in keyof T]: WebComponentProps<T[K]>;
    };

    interface IntrinsicElements
      extends WebComponentElements<HTMLElementTagNameMap> {}
  }
}
