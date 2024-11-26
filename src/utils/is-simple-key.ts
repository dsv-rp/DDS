/**
 * Returns whether the keyboard event has a simple key (no modifiers and no composing).
 *
 * @param event
 * @returns `true` id the event has simple key (no modifiers and no composing). `false` if not.
 */
export function isSimpleKeyEvent(event: KeyboardEvent): boolean {
  return (
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey &&
    !event.isComposing
  );
}
