import { offset } from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { createRef, ref } from "lit/directives/ref.js";
import { FloatingUIAutoUpdateController } from "../../controllers/floating-ui-auto-update";
import tailwindStyles from "../../tailwind.css?inline";
import {
  cvaIconButton,
  formatDate,
  formatDateToProperty,
  formatDateWithMessage,
  MAX_YEAR,
  MIN_YEAR,
} from "../../utils/calendar-common";
import { reDispatch } from "../../utils/re-dispatch";
import "../calendar/daikin-calendar";
import type { DaikinCalendar } from "../calendar/daikin-calendar";
import "../icon-button/daikin-icon-button";
import type { DaikinInputGroup } from "../input-group";

const cvaField = cva(
  [
    "flex",
    "items-center",
    "size-full",
    "bg-ddt-color-common-background-default",
    "px-4",
    "rounded",
    "overflow-hidden",
    "outline",
    "outline-[--color-border]",
    "outline-0",
    "-outline-offset-2",
    "placeholder:text-ddt-color-common-text-secondary",

    // Define `--color-border` as a CSS variable that references `--color-state-focus` and `--color-base` in that order.
    // `--color-base` indicates the color of the border when the element is normal, hovered, or disabled.
    "define-[--color-state-focus,--color-base]/color-border",
    "border",
    "border-[--color-border]",

    // Update `--color-base` depending on the state.
    // The default `--color-base` and `--color-state-focus` values are defined in `variants.error` because they differ depending on whether or not the input has an error state.
    "enabled:text-ddt-color-common-text-primary",
    "enabled:hover:bg-ddt-color-common-surface-hover",
    "enabled:active:bg-ddt-color-common-surface-press",
    "focus-visible:outline-2",

    "disabled:var-color-ddt-color-common-disabled/color-base",
    "disabled:text-ddt-color-common-disabled",
    "disabled:bg-ddt-color-common-background-default",
    "disabled:placeholder:text-ddt-color-common-disabled",
  ],
  {
    variants: {
      error: {
        false: [
          "enabled:var-color-ddt-color-common-neutral-default/color-base",
          "focus-visible:var-color-ddt-color-common-border-focus/color-state-focus",
        ],
        true: ["enabled:var-color-ddt-color-common-danger-default/color-base"],
      },
    },
  }
);

/**
 * It receives `Date` type and converts it to the string type.
 * It is used for the UI.
 */
const formatDateToUI = (date: Date) => date.toLocaleDateString("en-US");

/**
 * The date-picker component uses the standard HTML <a> tag. Unlike the date-picker used in the button component, it provides the style of the text as it is.
 *
 * @fires select - Fires when the date is selected.
 *
 * @slot - A slot for the date-picker content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/date-picker/index.js";
 * ```
 *
 * ```html
 * <daikin-date-picker href="https://www.example.com">
 *   DatePicker label
 * </daikin-date-picker>
 * ```
 */
@customElement("daikin-date-picker")
export class DaikinDatePicker extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
      height: 3rem;
    }

    daikin-calendar[popover] {
      display: none;
    }

    daikin-calendar[popover]:popover-open {
      display: flex;
    }
  `;

  /**
   * The current value of the input, submitted as a name/value pair with form data.
   */
  @property({ type: String, attribute: false })
  value: string | null = null;

  /**
   * The name of the input, submitted as a name/value pair with form data.
   */
  @property({ type: String, reflect: true })
  name: string | null = null;

  /**
   * The placeholder text.
   */
  @property({ type: String, reflect: true })
  placeholder: string | null = null;

  /**
   * The minimum date.
   * example: `1900-01-01`
   */
  @property({ type: String, reflect: true })
  min: string = "1900-01-01";

  /**
   * The maximum date.
   * example: `2099-12-31`
   */
  @property({ type: String, reflect: true })
  max: string = "2099-12-31";

  /**
   * Whether the text field is readonly.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the text field is disabled.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the text field is required.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether or not to display error states.
   * Ignored if the `disabled` is `true`.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Whether the date picker is open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * The month that is initially displayed when the date picker is opened.
   * If there is a `value` attribute, this is ignored.
   */
  @property({ type: String, reflect: true, attribute: "default-value" })
  defaultValue: string | null = null;

  @queryAssignedElements({ selector: "daikin-calendar" })
  private readonly _calenders!: readonly DaikinCalendar[];

  /**
   * The label text used as the value of aria-label.
   * Set automatically by `reflectInputGroup` method.
   */
  @state()
  private _label: string | null = null;

  @state()
  private _buttonFocusIndex: { index: number; origin: "start" | "end" } | null =
    null;

  private _autoUpdateController = new FloatingUIAutoUpdateController(this);
  private _dateInputElement = createRef<HTMLInputElement>();
  private _dateButtonsContainerElement = createRef<HTMLDivElement>();

  private get _value(): Date | null {
    return formatDateWithMessage(this.value, "value");
  }

  private get _min(): Date {
    return formatDateWithMessage(this.min, "min", `${MIN_YEAR}-01-01`) as Date;
  }

  private get _max(): Date {
    return formatDateWithMessage(this.max, "max", `${MAX_YEAR}-12-31`) as Date;
  }

  private get _defaultValue(): Date | null {
    return formatDateWithMessage(this.defaultValue, "defaultValue");
  }

  private _disabledDate(date: Date): boolean {
    return this._min > date || this._max < date;
  }

  private _updateOpen() {
    if (!this.open) {
      this.open = true;
    }
  }

  private _updateClose() {
    this.open = false;
  }

  private _updateOpenAndClose() {
    this._autoUpdateController.floatingElement?.togglePopover(
      !this.disabled && this.open
    );
  }

  private _emitSelect() {
    this.dispatchEvent(new Event("select"));
  }

  private _handleFocusIn(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    this._updateInputValue(target);
  }

  private _handleFocusOut(event: FocusEvent) {
    const target = event.target as HTMLInputElement;

    if (target.value === "MM/DD/YYYY") {
      target.value = "";
    }
  }

  private _handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const newDate = formatDate(target.value);

    if (!newDate || this._disabledDate(newDate)) {
      target.value = this._value ? formatDateToUI(this._value) : "";
      return;
    }

    this.value = formatDateToProperty(newDate).replaceAll("/", "-");
    target.value = formatDateToUI(newDate);
    this._emitSelect();
    this._updateClose();
  }

  private _handleClick(event: PointerEvent) {
    const target = event.target as HTMLInputElement;
    this._updateInputValue(target);
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const selection = window.getSelection();

    const moveOffset = (
      {
        ArrowLeft: "left",
        ArrowRight: "right",
      } as const
    )[event.key];

    if (!moveOffset || !selection) {
      return;
    }

    event.preventDefault();
    const values = target.value.split("/");

    if (
      (moveOffset === "left" && selection.toString() === values[0]) ||
      (moveOffset === "right" && selection.toString() === values[2])
    ) {
      return;
    }

    selection.modify("move", moveOffset, "word");
    selection.modify("extend", moveOffset, "word");

    if (selection.toString() === "/") {
      selection.modify("move", moveOffset, "character");
      selection.modify("extend", moveOffset, "word");
    }
  }

  private _handleSelect(event: Event) {
    const calendar = event.target as DaikinCalendar;

    if (!calendar.value) {
      return;
    }

    const target = this._dateInputElement.value as HTMLInputElement;
    const value = new Date(calendar.value);

    this.value = formatDateToProperty(value).replaceAll("/", "-");
    target.value = formatDateToUI(value);
    this._emitSelect();
    this.open = false;
  }

  private _handleToggle(event: ToggleEvent) {
    if (reDispatch(this, event, new ToggleEvent("toggle", event))) {
      this.open = event.newState === "open";

      for (const calendar of this._calenders) {
        calendar.view = "date";
      }
    }
  }

  private _updateCurrentMonthDates() {
    if (this._buttonFocusIndex === null) {
      return;
    }

    const { index, origin } = this._buttonFocusIndex;

    const newButtons = [
      ...(this._dateButtonsContainerElement.value?.querySelectorAll("button") ??
        []),
    ].filter((button) => !button.hasAttribute("disabled"));

    if (origin === "start" && newButtons[index]) {
      newButtons[index].focus();
    } else if (origin === "end" && newButtons.at(index)) {
      newButtons.at(index)?.focus();
    } else {
      newButtons[newButtons.length - 1].focus();
    }

    this._buttonFocusIndex = null;
  }

  private _updateInputValue(target: HTMLInputElement) {
    const selection = window.getSelection();

    if (!selection) {
      return;
    }

    if (target.value === "") {
      target.value = "MM/DD/YYYY";
      selection.modify("move", "left", "line");
    }

    selection.modify("move", "left", "word");
    selection.modify("extend", "right", "word");

    if (selection.toString() === "/") {
      selection.collapseToEnd();
    }
  }

  override render() {
    const min = this._min;
    const max = this._max;

    return html`<div
        class="size-full relative font-daikinSerif"
        ${this._autoUpdateController.refReference()}
      >
        <input
          ${ref(this._dateInputElement)}
          class=${cvaField({ error: this.error })}
          type="text"
          placeholder=${ifDefined(this.placeholder ?? undefined)}
          name=${ifDefined(this.name ?? undefined)}
          aria-label=${ifDefined(this._label ?? undefined)}
          .value=${this._value ? formatDateToUI(this._value) : ""}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          @change=${this._handleChange}
          @click=${this._handleClick}
          @focusin=${this._handleFocusIn}
          @focusout=${this._handleFocusOut}
          @keydown=${this._handleKeyDown}
        />
        <daikin-icon-button
          class="absolute top-0 bottom-0 right-2 m-auto"
          type="button"
          color="neutral"
          variant="ghost"
          button-aria-label="Open the date picker"
          ?disabled=${this.disabled}
          @click=${this._updateOpen}
        >
          <span class=${cvaIconButton({ intent: "calender" })}></span>
        </daikin-icon-button>
      </div>
      <daikin-calendar
        id="calendar"
        .value=${this._value ? formatDateToProperty(this._value) : null}
        min=${formatDateToProperty(min)}
        max=${formatDateToProperty(max)}
        default-value=${ifDefined(
          this._defaultValue
            ? formatDateToProperty(this._defaultValue)
            : undefined
        )}
        popover
        class="absolute left-[--floating-x,0] top-[--floating-y,0]"
        @toggle=${this._handleToggle}
        @select=${this._handleSelect}
        ${this._autoUpdateController.refFloating()}
      >
      </daikin-calendar>
      ${
        // Activate auto update only when the calendar is open.
        // TODO: refactor here with CSS Anchor Positioning instead of using floating-ui
        this._autoUpdateController.directive(
          {
            placement: "bottom-start",
            middleware: [offset({ mainAxis: 0 })],
          },
          this.open && !this.disabled
        )
      }`;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("open")) {
      // this._resetPicker();
      this._updateOpenAndClose();
    }

    if (changedProperties.has("open") || changedProperties.has("disabled")) {
      // this._resetPicker();
      this._updateOpenAndClose();
    }

    if (changedProperties.has("value")) {
      this._updateCurrentMonthDates();
    }
  }

  reflectInputGroup(inputGroup: DaikinInputGroup): void {
    const isError = !inputGroup.disabled && !!inputGroup.error;
    this.disabled = !!inputGroup.disabled;
    this.required = !!inputGroup.required;
    this.error = isError;
    this._label = inputGroup.label;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-date-picker": DaikinDatePicker;
  }
}
