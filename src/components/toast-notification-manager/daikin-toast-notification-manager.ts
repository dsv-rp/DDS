import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import { TOAST_DURATION } from "../../utils/notification-common";
import type { DaikinToastNotification } from "../toast-notification/daikin-toast-notification";

const CONTAINER_TRANSITION_DURATION = "--container-transition-duration";
const CONTAINER_MOVE_OFFSET_Y = "--container-move-offset-y";

const TOAST_MOVE_OFFSET_X = "24px";
const TOAST_MOVE_OFFSET_Y_TOP_SIGN = -1;
const TOAST_MOVE_OFFSET_Y_BOTTOM_SIGN = 1;

const cvaContainer = cva(
  [
    "flex",
    "flex-col",
    "gap-2",
    "w-max",
    "fixed",
    "transition-transform",
    "translate-y-[var(--container-move-offset-y,0)]",
    "duration-[var(--container-transition-duration,200ms)]",
  ],
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

export type ToastPosition = MergeVariantProps<typeof cvaContainer>["position"];

/**
 * The toast manager component manages the position and display state of notification toasts.
 * Just place a notification toast in the slot and it will automatically be placed, stacked and animated.
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
export class DaikinToastNotificationManager extends LitElement {
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
  position: ToastPosition = "bottom-right";

  /**
   * Specify how many seconds after the toast is displayed the close event should be fired (unit = ms).
   * If `null`, there will be no automatic close event firing.
   */
  @property({ type: Number, reflect: true })
  duration: number | null = null;

  @queryAssignedElements({ selector: "daikin-toast-notification" })
  private readonly _items!: readonly DaikinToastNotification[];

  private _knownItemSet: ReadonlySet<DaikinToastNotification> = new Set();

  private _containerRef = createRef<HTMLElement>();

  get _positionY(): "top" | "bottom" {
    return this.position.startsWith("top") ? "top" : "bottom";
  }

  private _close(target: DaikinToastNotification) {
    const items = this._items;
    const targetIndex = items.findIndex((item) => item === target);
    const afterItems = items.filter((_, index) =>
      this._positionY === "top" ? index > targetIndex : index < targetIndex
    );

    for (const item of items) {
      item.style.removeProperty("--transition-duration");
    }

    target.hidden = true;

    target.style.setProperty("--move-offset-x", TOAST_MOVE_OFFSET_X);
    target.style.setProperty("--opacity", "0");
    target.style.setProperty("--pointer-events", "none");

    for (const item of afterItems) {
      const height = item.clientHeight;
      item.style.setProperty(
        "--move-offset-y",
        `calc(0.5rem + ${
          height *
          (this._positionY === "top"
            ? TOAST_MOVE_OFFSET_Y_TOP_SIGN
            : TOAST_MOVE_OFFSET_Y_BOTTOM_SIGN)
        }px)`
      );
    }

    setTimeout(() => {
      for (const item of this._items) {
        item.style.setProperty("--transition-duration", "0");
      }

      this.dispatchEvent(new CustomEvent("close", { detail: { target } }));
      for (const item of this._items) {
        item.style.removeProperty("--move-offset-y");
      }
    }, TOAST_DURATION);
  }

  private _handleClose(event: Event) {
    event.stopPropagation();

    this._close(event.target as DaikinToastNotification);
  }

  private _handleNewItem(newItem: DaikinToastNotification): void {
    const container = this._containerRef.value;

    if (!container) {
      return;
    }

    requestAnimationFrame(() => {
      newItem.style.setProperty("--opacity", "0");
      container.style.setProperty(CONTAINER_TRANSITION_DURATION, "0");
      container.style.setProperty(
        CONTAINER_MOVE_OFFSET_Y,
        `calc(0.5rem + ${
          newItem.clientHeight *
          (this._positionY === "top"
            ? TOAST_MOVE_OFFSET_Y_TOP_SIGN
            : TOAST_MOVE_OFFSET_Y_BOTTOM_SIGN)
        }px)`
      );

      requestAnimationFrame(() => {
        container.style.removeProperty(CONTAINER_TRANSITION_DURATION);
        container.style.removeProperty(CONTAINER_MOVE_OFFSET_Y);
        newItem.style.removeProperty("--opacity");

        this._removeToast(newItem);
      });
    });
  }

  private _handleSlotchange() {
    const items = this._items;

    const newItems = items.filter((item) => !this._knownItemSet.has(item));
    this._knownItemSet = new Set(items);
    for (const newItem of newItems) {
      this._handleNewItem(newItem);
    }
  }

  private _removeToast(target: DaikinToastNotification) {
    if (this.duration === null) {
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
    "daikin-toast-notification-manager": DaikinToastNotificationManager;
  }
}
