import "#package/components/button/daikin-button";
import "#package/components/toast-notification-manager/daikin-toast-notification-manager";
import type {
  DaikinToastNotificationManager,
  ToastPosition,
} from "#package/components/toast-notification-manager/daikin-toast-notification-manager";
import "#package/components/toast-notification/daikin-toast-notification";
import type { DaikinToastNotification } from "#package/components/toast-notification/daikin-toast-notification";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";

export type ToastCloseEvent = CustomEvent<{ target: DaikinToastNotification }>;

@customElement("sb-toast-notification-container")
export class SBToastNotificationContainer extends LitElement {
  @property({ type: String, reflect: true })
  position: ToastPosition = "bottom-right";

  @property({ type: Number, reflect: true })
  duration: number | null = null;

  @property({ type: Boolean, attribute: "is-vrt" })
  isVrt: boolean = false;

  @state()
  private _items: string[] = [];

  @state()
  private _index = 0;

  get _positionY(): "top" | "bottom" {
    return this.position.startsWith("top") ? "top" : "bottom";
  }

  private _handleClick() {
    const newIndex = this._index + 1;

    this._items =
      this._positionY === "top"
        ? [`toast ${newIndex}`, ...this._items]
        : [...this._items, `toast ${newIndex}`];
    this._index = newIndex;
  }

  private _handleClose(event: ToastCloseEvent) {
    const name = event.detail.target.name;

    this._items = this._items.filter((item) => item != name);
    this.dispatchEvent(new Event("close"));
  }

  override render() {
    return html`<div
      style=${ifDefined(
        this.isVrt ? "display: block; width: 800px; height: 688px;" : undefined
      )}
    >
      <daikin-button @click=${this._handleClick}>View new toast</daikin-button>
      <daikin-toast-notification-manager
        position=${this.position}
        duration=${ifDefined(this.duration ?? undefined)}
        @close=${this._handleClose}
      >
        ${repeat(
          this._items,
          (item) => item,
          (item) =>
            html`<daikin-toast-notification
              name=${item}
              status="positive"
              closable
              style="width:max-content;"
            >
              <span slot="title">${`New ${item}`}</span>
            </daikin-toast-notification>`
        )}
      </daikin-toast-notification-manager>
    </div>`;
  }

  protected override firstUpdated(): void {
    if (this.isVrt) {
      const newItems = ["toast 1", "toast 2", "toast 3"];

      this._items = this._positionY === "top" ? newItems.reverse() : newItems;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sb-toast-notification-container": SBToastNotificationContainer;
  }
}

export interface DaikinToastNotificationManagerStoryArgs
  extends Required<ElementProps<DaikinToastNotificationManager>> {
  isVrt: boolean;
  onClose: () => void;
}

export const DAIKIN_TOAST_NOTIFICATION_MANAGER_ARG_TYPES = {
  position: {
    control: "radio",
    options: [
      "top",
      "top-left",
      "top-right",
      "bottom",
      "bottom-left",
      "bottom-right",
    ],
  },
  duration: {
    type: "number",
  },
  isVrt: {
    name: "",
    type: "boolean",
  },
  onClose: {
    name: "",
  },
} satisfies Meta<DaikinToastNotificationManagerStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinToastNotificationManagerStoryArgs>;
