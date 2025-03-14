import { cva } from "class-variance-authority";
import {
  css,
  html,
  LitElement,
  nothing,
  unsafeCSS,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { createRef, ref } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import {
  cvaIconButton,
  formatDateToProperty,
  formatDateWithMessage,
  getNewDate,
  MAX_YEAR,
  MIN_YEAR,
} from "../../utils/calendar-common";
import "../icon-button/daikin-icon-button";

const cvaContentButton = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "text-sm",
    "outline",
    "outline-2",
    "outline-offset-2",
    "outline-transparent",

    "focus-visible:outline-ddt-color-common-border-focus",
    "enabled:bg-[var(--color-primary)]",

    "disabled:text-ddt-color-common-disabled",
  ],
  {
    variants: {
      date: {
        false: ["w-[calc((100%_-_3rem)/3)]", "h-8", "px-2"],
        true: ["size-8"],
      },
      variant: {
        default: [
          "enabled:text-ddt-color-common-neutral-default",
          "enabled:hover:text-ddt-color-common-neutral-hover",
          "enabled:active:text-ddt-color-common-neutral-press",
          "enabled:hover:var-color-ddt-color-common-surface-neutral-hover/color-primary",
          "enabled:active:var-color-ddt-color-common-surface-neutral-press/color-primary",
        ],
        selected: [
          "enabled:text-ddt-color-common-text-inverse",
          "var-color-ddt-color-common-brand-default/color-primary",
          "hover:var-color-ddt-color-common-brand-hover/color-primary",
          "active:var-color-ddt-color-common-brand-press/color-primary",
        ],
        today: [
          "enabled:text-ddt-color-common-neutral-default",
          "enabled:hover:text-ddt-color-common-neutral-hover",
          "enabled:active:text-ddt-color-common-neutral-press",
          "enabled:border",
          "enabled:border-ddt-color-common-neutral-default",
          "enabled:hover:var-color-ddt-color-common-surface-neutral-hover/color-primary",
          "enabled:active:var-color-ddt-color-common-surface-neutral-press/color-primary",
        ],
      },
    },
  }
);

type ButtonVariant = MergeVariantProps<typeof cvaContentButton>["variant"];

const now = new Date();
const today: Date = getNewDate(
  now.getFullYear(),
  now.getMonth() + 1,
  now.getDate()
);

/**
 * The months.
 */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
/**
 * The omitted months.
 */
const OMITTED_MONTHS = MONTHS.map((month) => month.slice(0, 3));
/**
 * The days of the week.
 */
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
/**
 * Dates for the whole year.
 */
const DATES_BASE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const FIRST_DAY = 1;

const isMatchedMonth: (a: Date, b: Date) => boolean = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

const formatNumber = (number: number) => [...Array(number).keys()];

const MONTH_LENGTH = formatNumber(MONTHS.length);

/**
 * The calendar component uses the standard HTML <a> tag. Unlike the calendar used in the button component, it provides the style of the text as it is.
 *
 * @fires select - Fires when the date is selected.
 *
 * @slot - A slot for the calendar content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/calendar/index.js";
 * ```
 *
 * ```html
 * <daikin-calendar href="https://www.example.com">
 *   Calendar label
 * </daikin-calendar>
 * ```
 */
@customElement("daikin-calendar")
export class DaikinCalendar extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: fit-content;
      height: fit-content;
    }
  `;

  /**
   * The current value of the input, submitted as a name/value pair with form data.
   */
  @property({ type: String, attribute: false })
  value: string | null = null;

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
   * The month that is initially displayed when the date picker is opened.
   * If there is a `value` attribute, this is ignored.
   */
  @property({ type: String, reflect: true, attribute: "default-value" })
  defaultValue: string | null = null;

  /**
   *
   */
  @property({ type: String, reflect: true })
  view: "year" | "month" | "date" = "date";

  @state()
  private _buttonFocusIndex: { index: number; origin: "start" | "end" } | null =
    null;

  private _dateButtonsContainerElement = createRef<HTMLDivElement>();
  private _monthButtonsContainerElement = createRef<HTMLDivElement>();

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

  private get _yearLength(): number {
    return this._max.getFullYear() - this._min.getFullYear() + 1;
  }

  /**
   * _Internal use._
   * The month currently displayed.
   *
   * @private
   */
  @state()
  viewDate = today;

  /**
   * Information on the current year calendar, month calendar, and date calendar.
   *
   * - The date, month and year in the current calendar.
   * - In the year calendar, month calendar, and date calendar, information about whether the selection is valid or not, whether the day is included or not, and the focusable items in each calendar.
   */
  private get _calendarOption(): Record<
    "year" | "month" | "date",
    {
      selected: number | null;
      today: number | null;
      focusable: number | null;
    }
  > {
    const viewDate = this.viewDate;
    const year = viewDate.getFullYear();
    const minDate = this._min;

    const selectedValue = {
      year: this._value ? this._value.getFullYear() : null,
      month:
        this._value?.getFullYear() === viewDate.getFullYear()
          ? this._value.getMonth() + 1
          : null,
      date:
        this._value && isMatchedMonth(this._value, viewDate)
          ? this._value.getDate()
          : null,
    };

    const todayValue = {
      year: today.getFullYear(),
      month: year === today.getFullYear() ? today.getMonth() + 1 : null,
      date: isMatchedMonth(today, viewDate) ? today.getDate() : null,
    };

    const minValue = {
      month: isMatchedMonth(minDate, viewDate) ? minDate.getMonth() + 1 : null,
      date: isMatchedMonth(minDate, viewDate) ? minDate.getDate() : null,
    };

    return {
      year: {
        selected: selectedValue.year,
        today: todayValue.year,
        focusable: selectedValue.year ?? todayValue.year,
      },
      month: {
        selected: selectedValue.month,
        today: todayValue.month,
        focusable:
          selectedValue.month ?? todayValue.month ?? minValue.month ?? 1,
      },
      date: {
        selected: selectedValue.date,
        today: todayValue.date,
        focusable: selectedValue.date ?? todayValue.date ?? minValue.date ?? 1,
      },
    };
  }

  private get _dates(): number[] {
    const year = this.viewDate.getFullYear();

    if (!(year % 4) && !!(!(year % 100) && !(year % 400))) {
      return [DATES_BASE[0], 29, ...DATES_BASE.slice(2)];
    } else {
      return DATES_BASE;
    }
  }

  /**
   * Calculates the date of the month displayed in the date picker.
   * This includes months that are not the current month.
   */
  private get viewDateMonthDates(): {
    date: number;
    count: number;
    disabled: boolean;
  }[] {
    const viewDate = this.viewDate;

    const month = viewDate.getMonth() + 1;
    const dayOf1st = viewDate.getDay();
    const dates = this._dates;

    const prevMonthDates = dayOf1st % 7;
    const prevMonthIndex = month === 1 ? 11 : month - 2;
    const lastWeekRemainder = (dates[month - 1] + dayOf1st) % 7;
    const nextMonthDates = !lastWeekRemainder ? 0 : 7 - lastWeekRemainder;

    return [
      formatNumber(prevMonthDates)
        .map((index) => ({
          date: (formatNumber(dates[prevMonthIndex]).at(-index - 1) ?? 0) + 1,
          count: -1,
          disabled: this._disabledDate(
            this._getNewDateWithCounter(
              -1,
              viewDate,
              formatNumber(dates[prevMonthIndex]).at(-index - 1) ?? 0
            )
          ),
        }))
        .reverse(),
      formatNumber(dates[month - 1]).map((index) => ({
        date: index + 1,
        count: 0,
        disabled: this._disabledDate(
          this._getNewDateWithCounter(0, viewDate, index + 1)
        ),
      })),
      formatNumber(nextMonthDates).map((index) => ({
        date: index + 1,
        count: 1,
        disabled: this._disabledDate(
          this._getNewDateWithCounter(1, viewDate, index + 1)
        ),
      })),
    ].flat();
  }

  /**
   * The new Date type date is obtained after checking the value of `count`. This count value can be overridden.
   * Although the actual values of the year, month, and day are not required, the day can be included as an option.
   */
  private _getNewDateWithCounter(
    count: number,
    base: Date,
    date?: number
  ): Date {
    const year = base.getFullYear();
    const sum = base.getMonth() + 1 + count;

    const calculatedYear = (() => {
      if (sum <= 12 && sum >= 1) {
        return year;
      } else {
        const remainder = sum % 12;
        const result = Math.floor(sum / 12);

        return year + (!remainder ? -1 + result : result);
      }
    })();
    const calculatedMonth = (() => {
      if (!sum || !(sum % 12)) {
        return 12;
      } else if (sum > 12) {
        return sum % 12;
      } else if (sum < 0) {
        return 12 - Math.abs(sum % 12);
      } else {
        return sum;
      }
    })();

    return getNewDate(calculatedYear, calculatedMonth, date ?? FIRST_DAY);
  }

  private _disabledDate(date: Date): boolean {
    return this._min > date || this._max < date;
  }

  private _disabledMonth(date: Date): boolean {
    return (
      this._disabledDate(date) &&
      !isMatchedMonth(this._min, date) &&
      !isMatchedMonth(this._max, date)
    );
  }

  private _updateCurrent(option: { count?: number; date?: Date }) {
    const { count, date } = option;

    if (count != undefined) {
      this.viewDate = this._getNewDateWithCounter(count, this.viewDate);
    }

    if (date != undefined) {
      this.viewDate = getNewDate(date.getFullYear(), date.getMonth() + 1);
    }
  }

  private _emitSelect() {
    this.dispatchEvent(new Event("select"));
  }

  private _handleCalendarClick(date: Date) {
    this.value = formatDateToProperty(date).replaceAll("/", "-");
    this._emitSelect();
  }

  private _handleMonthClick() {
    this.view = this.view != "year" ? "year" : "month";
  }

  private _handleYearAndMonthPickerClick(date: Date) {
    this._updateCurrent({ date });
    this.view = this.view === "year" ? "month" : "date";
  }

  private _handleCalendarKeyDown(event: KeyboardEvent) {
    const moveOffset = (
      {
        ArrowUp: -7,
        ArrowRight: 1,
        ArrowDown: 7,
        ArrowLeft: -1,
      } as const
    )[event.key];

    if (!moveOffset) {
      return;
    }

    const buttons = [
      ...(this._dateButtonsContainerElement.value?.querySelectorAll("button") ??
        []),
    ].filter((button) => !button.hasAttribute("disabled"));
    const activeIndex = buttons.findIndex((button) => button === event.target);

    if (activeIndex === -1) {
      return;
    }

    const viewDate = this.viewDate;
    const newIndex = activeIndex + moveOffset;
    const buttonLength = buttons.length;

    if (newIndex < 0) {
      if (isMatchedMonth(this._min, viewDate)) {
        buttons[0].focus();
        return;
      }

      this._buttonFocusIndex = {
        index: activeIndex + moveOffset - 7,
        origin: "end",
      };

      this._updateCurrent({ count: -1 });
    } else if (newIndex >= buttonLength) {
      if (isMatchedMonth(this._max, viewDate)) {
        buttons[buttonLength - 1].focus();
        return;
      }

      this._buttonFocusIndex = {
        index: Math.abs(buttonLength - activeIndex - moveOffset) + 7,
        origin: "start",
      };
      this._updateCurrent({ count: 1 });
    } else {
      buttons[newIndex].focus();
    }
  }

  private _handleYearAndMonthPickerKeyDown(event: KeyboardEvent) {
    const moveOffset = (
      {
        ArrowUp: -3,
        ArrowRight: 1,
        ArrowDown: 3,
        ArrowLeft: -1,
      } as const
    )[event.key];

    if (!moveOffset) {
      return;
    }

    const buttons = [
      ...(this._monthButtonsContainerElement.value?.querySelectorAll(
        "button"
      ) ?? []),
    ];
    const activeIndex = buttons.findIndex((button) => button === event.target);

    if (activeIndex === -1) {
      return;
    }

    const newIndex = activeIndex + moveOffset;

    if (newIndex < 0) {
      buttons.at(newIndex)?.focus();
    } else if (newIndex >= buttons.length) {
      buttons[newIndex - buttons.length].focus();
    } else {
      buttons[newIndex].focus();
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

  override render() {
    const viewDate = this.viewDate;
    const view = this.view;
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth() + 1;
    const {
      year: yearOption,
      month: monthOption,
      date: dateOption,
    } = this._calendarOption;
    const min = this._min;
    const max = this._max;
    const pulldownLabel = {
      year: "Switch to month view",
      month: "Switch to year view",
      date: "Switch to year view",
    }[view];

    const createDatePicker = html`<div class="flex flex-col gap-2 w-full h-72">
      <div class="flex gap-1 flex-wrap w-full px-4">
        ${repeat(
          DAYS,
          (item) => item,
          (item) =>
            html`<div
              class="flex justify-center items-center size-8 text-ddt-color-common-text-secondary text-xs font-bold leading-[1.3]"
            >
              ${item}
            </div>`
        )}
      </div>
      <div
        ${ref(this._dateButtonsContainerElement)}
        class="flex gap-[0.5rem_0.25rem] flex-wrap w-full px-4 pb-4"
      >
        ${repeat(
          this.viewDateMonthDates,
          ({ date }, index) => `${date}${index}`,
          ({ date, count, disabled }) => {
            const { selected, today, focusable } = dateOption;
            const isCurrentMonth = !count;
            const variant = isCurrentMonth
              ? selected === date
                ? "selected"
                : today === date
                  ? "today"
                  : "default"
              : "default";

            return html`<button
              class=${cvaContentButton({
                variant,
                date: true,
              })}
              ?disabled=${disabled}
              tabindex=${ifDefined(
                !isCurrentMonth || focusable != date ? -1 : undefined
              )}
              data-count=${count}
              @click=${() =>
                this._handleCalendarClick(
                  this._getNewDateWithCounter(count, this.viewDate, date)
                )}
              @keydown=${this._handleCalendarKeyDown}
            >
              ${date}
            </button>`;
          }
        )}
      </div>
    </div>`;

    const createYearAndMonthPickerButton = (
      variant: ButtonVariant,
      disabled: boolean,
      focusable: boolean,
      newDate: Date,
      item: string
    ) =>
      html`<button
        class=${cvaContentButton({ variant, date: false })}
        ?disabled=${disabled}
        role="radio"
        aria-checked=${variant === "selected"}
        tabindex=${ifDefined(!focusable ? -1 : undefined)}
        @click=${() => this._handleYearAndMonthPickerClick(newDate)}
        @keydown=${this._handleYearAndMonthPickerKeyDown}
      >
        ${item}
      </button>`;

    const createYearAndMonthPicker = (children: TemplateResult<1>) =>
      html`<div class="w-full h-72">
        <div
          ${ref(this._monthButtonsContainerElement)}
          role="radiogroup"
          class="flex justify-start items-start flex-wrap gap-[1rem_1.5rem] w-full max-h-full pt-4 px-4 pb-4 overflow-auto"
        >
          ${children}
        </div>
      </div>`;

    const createPicker = (() => {
      switch (view) {
        case "year":
          return createYearAndMonthPicker(
            html`${repeat(
              formatNumber(this._yearLength),
              (item) => item,
              (item) => {
                const newDate = getNewDate(
                  min.getFullYear() + item,
                  viewDate.getMonth() + 1
                );
                const year = min.getFullYear() + item;

                return createYearAndMonthPickerButton(
                  yearOption.selected === year
                    ? "selected"
                    : yearOption.today === year
                      ? "today"
                      : "default",
                  false,
                  yearOption.focusable === year,
                  min > newDate ? min : max < newDate ? max : newDate,
                  String(year)
                );
              }
            )}`
          );

        case "month":
          return createYearAndMonthPicker(
            html`${repeat(
              MONTH_LENGTH,
              (item) => item,
              (item, index) => {
                const newDate = this._getNewDateWithCounter(
                  index - viewDate.getMonth(),
                  this.viewDate
                );

                return createYearAndMonthPickerButton(
                  monthOption.selected === index + 1
                    ? "selected"
                    : monthOption.today === index + 1
                      ? "today"
                      : "default",
                  this._disabledMonth(newDate),
                  monthOption.focusable === item + 1,
                  newDate,
                  OMITTED_MONTHS[index]
                );
              }
            )}`
          );

        case "date":
          return createDatePicker;
      }
    })();

    return html`<div
      class="flex items-stretch flex-col gap-2 w-[17.5rem] h-max pt-3 bg-ddt-color-common-background-default outline outline-1 -outline-offset-1 outline-ddt-color-divider rounded font-daikinSerif"
    >
      <div class="flex justify-between items-center pl-4 pr-3">
        <div class="flex items-center gap-2">
          <span class="text-ddt-color-common-text-primary font-bold">
            ${`${MONTHS[month - 1]} ${year}`}
          </span>
          <daikin-icon-button
            type="button"
            variant="ghost"
            color="neutral"
            button-aria-label=${pulldownLabel}
            @click=${this._handleMonthClick}
          >
            <span
              class=${cvaIconButton({
                intent: "pulldown",
                rotate: view === "year" ? "inverse" : "default",
              })}
            ></span>
          </daikin-icon-button>
        </div>
        ${view === "date"
          ? html`<div class="flex gap-2">
              <daikin-icon-button
                type="button"
                variant="ghost"
                color="neutral"
                button-aria-label="Previous month"
                ?disabled=${this._disabledMonth(
                  this._getNewDateWithCounter(-1, viewDate)
                )}
                @click=${() => this._updateCurrent({ count: -1 })}
              >
                <span class=${cvaIconButton({ intent: "previous" })}></span>
              </daikin-icon-button>
              <daikin-icon-button
                type="button"
                variant="ghost"
                color="neutral"
                button-aria-label="Next month"
                ?disabled=${this._disabledMonth(
                  this._getNewDateWithCounter(1, viewDate)
                )}
                @click=${() => this._updateCurrent({ count: 1 })}
              >
                <span class=${cvaIconButton({ intent: "next" })}></span>
              </daikin-icon-button>
            </div>`
          : nothing}
      </div>
      ${createPicker}
    </div>`;
  }
  protected override updated(changedProperties: PropertyValues): void {
    if (
      changedProperties.has("value") ||
      changedProperties.has("defaultValue")
    ) {
      // The month and year when the date picker first opens.
      // Priority: value > defaultValue > When none of the above apply (This month).
      const base = this._value ?? this._defaultValue ?? today;

      const min = this._min;

      this.viewDate = this._getNewDateWithCounter(
        0,
        this._disabledDate(base)
          ? getNewDate(min.getFullYear(), min.getMonth() + 1)
          : base
      );
      this._updateCurrentMonthDates();
    }

    if (changedProperties.has("viewDate")) {
      this._updateCurrentMonthDates();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-calendar": DaikinCalendar;
  }
}
