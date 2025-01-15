import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import type { DaikinToastNotification } from "../toast-notification/daikin-toast-notification";

const CONTAINER_TRANSITION_DURATION = "--container-transition-duration";
const CONTAINER_MOVE_OFFSET_Y = "--container-move-offset-y";

const TOAST_MOVE_OFFSET_X = "24px";
const TOAST_MOVE_OFFSET_Y_TOP = "-80px";
const TOAST_MOVE_OFFSET_Y_BOTTOM = "80px";

const CLOSE_EVENT_DURATION = 200;

const cvaContainer = cva(
  ["flex", "flex-col", "gap-2", "w-max", "fixed", "transition-transform"],
  {
    variants: {
      position: {
        top: ["items-center", "m-auto", "top-4", "left-0", "right-0"],
        "top-left": ["items-start", "top-4", "left-4"],
        "top-right": ["items-end", "top-4", "right-4"],
        bottom: ["items-center", "m-auto", "bottom-4", "left-0", "right-0"],
        "bottom-left": ["items-start", "bottom-4", "left-4"],
        "bottom-right": ["items-end", "bottom-4", "right-4"],
      },
    },
  }
);

export type ToastPositionType = MergeVariantProps<
  typeof cvaContainer
>["position"];

const formatName = (str: string) => str.replaceAll(" ", "_");

/**
 * The toast manager component manages the display of toasts. It supports display position, stacking, display/delete animations, etc.
 *
 * @fires close - A custom event emitted when a user clicks the close button. Even if this is fired, the toast inside the slot will not be deleted from the component side, so you will need to delete it yourself.
 *
 * @slot A slot for toasts. Place `daikin-toast-notification` elements here.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/toast-notification-manager/index.js";
 * import "@daikin-oss/design-system-web-components/components/toast-notification/index.js";
 * ```
 *
 * ```html
 * <daikin-toast-notification-manager>
 *   <daikin-toast-notification name="toast1">
 *     <span slot="title">Toast title</span>
 *     <span slot="description">Toast description</span>
 *   </daikin-toast-notification>
 *   <daikin-toast-notification name="toast2">
 *     <span slot="title">Toast title</span>
 *     <span slot="description">Toast description</span>
 *   </daikin-toast-notification>
 *   <daikin-toast-notification name="toast3">
 *     <span slot="title">Toast title</span>
 *     <span slot="description">Toast description</span>
 *   </daikin-toast-notification>
 * </daikin-toast-notification-manager>
 * ```
 */
@customElement("daikin-toast-notification-manager")
export class DaikinToastManager extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
    }
  `;

  /**
   * Specify where on the screen the toast will be displayed.
   */
  @property({ type: String, reflect: true })
  position: ToastPositionType = "bottom-right";

  /**
   * Specify how many seconds after the toast is displayed the close event should be fired (unit = ms).
   * If `null`, there will be no automatic close event firing.
   */
  @property({ type: Number, reflect: true })
  duration: number | null = null;

  @queryAssignedElements({ selector: "daikin-toast-notification" })
  private readonly _items!: readonly DaikinToastNotification[];

  @state()
  private _beforeSortedItems: readonly DaikinToastNotification[] = [];

  private _containerRef = createRef<HTMLElement>();

  get _positionY(): "top" | "bottom" {
    return this.position.startsWith("top") ? "top" : "bottom";
  }

  private _close(target: DaikinToastNotification) {
    const items = this._items;
    const targetIndex = items.findIndex((item) => item === target);
    const formattedName = formatName(target.name);
    const afterItems = items.filter((_, index) =>
      this._positionY === "top" ? index > targetIndex : index < targetIndex
    );

    for (const item of items) {
      item.style.removeProperty(
        `--${formatName(item.name)}-transition-duration`
      );
    }

    target.style.setProperty(
      `--${formattedName}-move-offset-x`,
      TOAST_MOVE_OFFSET_X
    );
    target.style.setProperty(`--${formattedName}-opacity`, "0");
    target.style.setProperty(`--${formattedName}-pointer-events`, "none");

    for (const item of afterItems) {
      item.style.setProperty(
        `--${formatName(item.name)}-move-offset-y`,
        this._positionY === "top"
          ? TOAST_MOVE_OFFSET_Y_TOP
          : TOAST_MOVE_OFFSET_Y_BOTTOM
      );
    }

    setTimeout(() => {
      for (const item of this._items) {
        item.style.setProperty(
          `--${formatName(item.name)}-transition-duration`,
          "0"
        );
      }

      this.dispatchEvent(
        new CustomEvent("close", { detail: { name: target.name } })
      );
      for (const item of this._items) {
        item.style.removeProperty(`--${formatName(item.name)}-move-offset-y`);
      }
    }, CLOSE_EVENT_DURATION);
  }

  private _handleClose(event: Event) {
    event.stopPropagation();

    this._close(event.target as DaikinToastNotification);
  }

  private _handleSlotchange() {
    const items = this._items;
    const container = this._containerRef.value;
    const newItems = items.filter(
      (item) =>
        !this._beforeSortedItems.find((beforeItem) => item === beforeItem)
    );
    if (newItems.length != 1 || !container) {
      return;
    }

    this._beforeSortedItems = items;
    const newItem = newItems[0];

    container.style.setProperty(CONTAINER_TRANSITION_DURATION, "0");
    container.style.setProperty(
      CONTAINER_MOVE_OFFSET_Y,
      this._positionY === "top"
        ? TOAST_MOVE_OFFSET_Y_TOP
        : TOAST_MOVE_OFFSET_Y_BOTTOM
    );
    newItem.style.setProperty(`--${formatName(newItem.name)}-opacity`, "0");

    setTimeout(() => {
      container.style.removeProperty(CONTAINER_TRANSITION_DURATION);
      container.style.removeProperty(CONTAINER_MOVE_OFFSET_Y);
      newItem.style.removeProperty(`--${formatName(newItem.name)}-opacity`);

      this._removeToast(newItem);
    }, 0);
  }

  private _removeToast(target: DaikinToastNotification) {
    if (!this.duration) {
      return;
    }

    setTimeout(() => {
      if (!this._items.find((item) => item.name === target.name)) {
        return;
      }

      this._close(target);
    }, this.duration);
  }

  override render() {
    return html`<div
      ${ref(this._containerRef)}
      class=${cvaContainer({ position: this.position })}
      style=${`transform:translateY(var(${CONTAINER_MOVE_OFFSET_Y},0));transition-duration:var(${CONTAINER_TRANSITION_DURATION},200ms);`}
    >
      <slot
        @close=${this._handleClose}
        @slotchange=${this._handleSlotchange}
      ></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-toast-notification-manager": DaikinToastManager;
  }
}
