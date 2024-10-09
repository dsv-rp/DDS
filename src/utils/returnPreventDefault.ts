export const returnPreventDefault = (
  target: EventTarget,
  componentEvent: Event,
  dispatchEvent: Event
) => {
  if (!target.dispatchEvent(dispatchEvent)) {
    componentEvent.preventDefault();
  }
};
