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
import { TOAST_ANIMATION_DURATION } from "../../utils/notification-common";
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
 * Hierarchy:
 * - `daikin-toast-notification-manager` > `daikin-toast-notification`
 *
 * @fires close - A custom event emitted when a user clicks the close button. The toast manager does not remove toast elements, so you will need to remove the relevant toast element after receiving this event.
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
      width: max-content;
    }
  `;

  /**
   * Specify where on the screen the toast will be displayed.
   */
  @property({ type: String, reflect: true })
  position: ToastPosition = "bottom-right";

  @queryAssignedElements({ selector: "daikin-toast-notification" })
  private readonly _items!: readonly DaikinToastNotification[];

  private _knownItemSet: ReadonlySet<DaikinToastNotification> = new Set();

  private _closedItemSet: WeakSet<DaikinToastNotification> = new WeakSet();

  private _containerRef = createRef<HTMLElement>();

  private get _positionY(): "top" | "bottom" {
    return this.position.startsWith("top") ? "top" : "bottom";
  }

  private get _sign(): 1 | -1 {
    return this._positionY === "top"
      ? TOAST_MOVE_OFFSET_Y_TOP_SIGN
      : TOAST_MOVE_OFFSET_Y_BOTTOM_SIGN;
  }

  private _close(target: DaikinToastNotification) {
    if (this._closedItemSet.has(target)) {
      return;
    }
    this._closedItemSet.add(target);

    const items = this._items;
    const targetIndex = items.findIndex((item) => item === target);

    if (targetIndex === -1) {
      return;
    }

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
      item.style.setProperty(
        "--move-offset-y",
        `calc(${0.5 * this._sign}rem + ${item.clientHeight * this._sign}px)`
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
    }, TOAST_ANIMATION_DURATION);
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

    // First, lower the position of the container by the height of the new toast in order to perform the lifting animation.
    // Since the slot is not yet filled with elements at this point, we delay the process using RAF.
    requestAnimationFrame(() => {
      newItem.style.setProperty("--opacity", "0");
      container.style.setProperty(CONTAINER_TRANSITION_DURATION, "0");
      container.style.setProperty(
        CONTAINER_MOVE_OFFSET_Y,
        `calc(${0.5 * this._sign}rem + ${newItem.clientHeight * this._sign}px)`
      );

      // Next, restore the position to perform the lifting animation.
      // We delay it with RAF because we need to complete the current render to start the transition.
      requestAnimationFrame(() => {
        container.style.removeProperty(CONTAINER_TRANSITION_DURATION);
        container.style.removeProperty(CONTAINER_MOVE_OFFSET_Y);
        newItem.style.removeProperty("--opacity");

        this._scheduleRemoveToast(newItem);
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

  private _scheduleRemoveToast(target: DaikinToastNotification) {
    if (target.duration === null) {
      return;
    }

    setTimeout(() => {
      this._close(target);
    }, target.duration);
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
