export const reDispatch = (
  target: EventTarget,
  originalEvent: Event,
  clonedEvent: Event
): boolean => {
  const result = target.dispatchEvent(clonedEvent);

  if (!result) {
    originalEvent.preventDefault();
  }

  return result;
};
