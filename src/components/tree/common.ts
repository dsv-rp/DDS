import type { DaikinTreeItem } from "../tree-item";
import type { DaikinTreeSection } from "../tree-section";

export type DirectionType = "down" | "up" | "left" | "right";

export type OptionType = {
  previousParent?: boolean;
};

export type MoveFocusEventType = {
  direction: DirectionType;
  option?: OptionType;
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

export const operationChildrenFocus = (
  target: HTMLElement,
  direction: "down" | "up" | "right",
  children: readonly (DaikinTreeSection | DaikinTreeItem)[],
  option?: OptionType
) => {
  const moveOffset = direction === "up" ? -1 : 1;

  const focusedItemIndex = children.findIndex((item) => item === target);

  if (option?.previousParent) {
    target.focus();
    return;
  }

  // Focus on the first tree section that is enabled.
  for (
    let index = focusedItemIndex + moveOffset, i = 0;
    i < children.length;
    index += moveOffset, i++
  ) {
    index %= children.length;
    const item = children[index];
    const isNegative =
      index === -1 ||
      (!index && new Uint8Array(new Float32Array([index]).buffer)[3] === 128);

    if (isNegative && moveOffset === -1 && target.parentElement) {
      emitMoveFocus(target.parentElement, direction, {
        previousParent: true,
      });
      break;
    }

    if (
      focusedItemIndex === children.length - 1 &&
      moveOffset === 1 &&
      target.parentElement
    ) {
      emitMoveFocus(target.parentElement, direction);
      break;
    }

    if (item.disabled) {
      continue;
    }

    if (item.tagName === "DAIKIN-TREE-SECTION" && moveOffset === -1) {
      item.focusLastItem();
      break;
    }

    item.focus();
    break;
  }
};

export const emitMoveFocus = (
  target: HTMLElement,
  direction: DirectionType,
  option?: OptionType
) => {
  target.dispatchEvent(
    new CustomEvent("tree-move-focus", {
      detail: {
        direction,
        option,
      },
      bubbles: true,
    })
  );
};
