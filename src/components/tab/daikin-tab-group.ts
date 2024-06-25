import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import tailwindStyles from "../../tailwind.css";
import DaikinTab from "./daikin-tab";

export interface DaikinTabGroupProps {
  /**
   * Selected tab name
   */
  value: string;
}

@customElement("daikin-tab-group")
class DaikinTabGroup extends LitElement implements DaikinTabGroupProps {
  static readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
      width: fit-content;
    }
  `;

  @property({ type: String, reflect: true })
  value: string = "";

  private _managingTabs: [DaikinTab, () => void][] = [];

  private _handleBeforeChange(newValue: string): boolean {
    if (this.value === newValue) {
      return false;
    }

    if (
      !this.dispatchEvent(
        new CustomEvent("beforechange", {
          detail: { oldValue: this.value, newValue },
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      )
    ) {
      return false;
    }

    return true;
  }

  private _updateValue(newValue: string): void {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { oldValue: this.value, newValue },
        bubbles: true,
        composed: false,
        cancelable: false,
      })
    );

    this.value = newValue;
  }

  private _handleClick(tab: DaikinTab): void {
    if (this.value === tab.value) {
      return;
    }

    if (!this._handleBeforeChange(tab.value)) {
      return;
    }

    if (this._managingTabs.every(([element]) => element !== tab)) {
      return;
    }

    for (const [element] of this._managingTabs) {
      element.active = element === tab;
    }
    this._updateValue(tab.value);
  }

  private _handleSlotChange(): void {
    const newTabs = Array.from(this.getElementsByTagName("daikin-tab"));

    // Cleanup disappeared tabs
    for (const [tab, cleanup] of this._managingTabs) {
      if (newTabs.includes(tab)) {
        continue;
      }

      // Disappeared tab
      cleanup();
    }

    const newManagingTabs: typeof this._managingTabs = [];
    let tabSelected = false;
    for (const tab of newTabs) {
      let item = this._managingTabs.find(([item]) => item === tab);
      if (!item) {
        // Newly appeared tab
        const onClickHandler = (): void => {
          this._handleClick(tab);
        };
        tab.addEventListener("click", onClickHandler);
        item = [
          tab,
          (): void => {
            tab.removeEventListener("click", onClickHandler);
          },
        ];
      }

      const isActive = !tab.disabled && tab.value === this.value;
      tab.active = isActive;
      tabSelected ||= isActive;

      newManagingTabs.push(item);
    }

    if (!tabSelected) {
      const fallbackTab = newTabs.find((tab) => !tab.disabled);
      if (fallbackTab) {
        fallbackTab.active = true;
        this._updateValue(fallbackTab.value);
      }
    }

    this._managingTabs = newManagingTabs;
  }

  render() {
    return html`
      <div class="inline-block w-full h-full" role="tablist">
        <slot class="inline-flex" @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tab-group": DaikinTabGroup;
  }
}

export default DaikinTabGroup;
