import type { DaikinTreeItem } from "../tree-item";
import type { DaikinTreeSection } from "../tree-section";

export type DispatchDirectionType = "down" | "up" | "left";
export type DirectionType = "down" | "up" | "left" | "right";

export type MoveFocusEventType = {
  direction: DispatchDirectionType;
};

export const getDirection: (
  event: KeyboardEvent
) => DirectionType | undefined = (event: KeyboardEvent) =>
  (
    ({
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowDown: "down",
      ArrowUp: "up",
    }) as const
  )[event.key];

export const moveFocus = (
  event: Event,
  target: HTMLElement,
  direction: "down" | "up" | "left",
  children: readonly (DaikinTreeSection | DaikinTreeItem)[]
) => {
  const enabledChildren = children.filter(({ disabled }) => !disabled);
  const focusedItemIndex = enabledChildren.findIndex((item) => item === target);

  switch (direction) {
    case "down": {
      const nextIndex = (focusedItemIndex + 1) % enabledChildren.length;
      event.stopPropagation();

      if (Math.sign(nextIndex - focusedItemIndex) === 1) {
        enabledChildren[nextIndex].focus();
      } else {
        emitMoveFocus(target.parentElement as HTMLElement, direction);
      }

      break;
    }

    case "up": {
      const previousIndex = (focusedItemIndex - 1) % enabledChildren.length;

      if (Math.sign(previousIndex) === -1) {
        event.stopPropagation();
        target.parentElement?.focus();
      } else if (previousIndex !== focusedItemIndex) {
        event.stopPropagation();
        enabledChildren[previousIndex].focusLastItem();
      }
      break;
    }

    case "left":
      event.stopPropagation();
      target.focus();
      break;
  }
};

export const emitMoveFocus = (
  target: HTMLElement,
  direction: DispatchDirectionType
) => {
  target.dispatchEvent(
    new CustomEvent("tree-move-focus", {
      detail: {
        direction,
      },
      composed: true,
      bubbles: true,
    })
  );
};
