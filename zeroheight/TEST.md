# Test Markdown

Updated 3.

## daikin-button

The button component is a versatile UI element that triggers actions or submits forms when clicked.
It functions similarly to the HTML `<button>` tag, allowing users to initiate various operations such as submitting data, opening dialogs, or navigating to different sections of an application.

### Example

```html
<daikin-button> Button label </daikin-button>
```

### Properties

| Property     | Attribute     | Type                                                                                                                                                                                                                               | Default   | Description                                                |
| ------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------- |
| `buttonRole` | `button-role` | `"alert" \| "alertdialog" \| "button" \| "checkbox" \| "dialog" \| "gridcell" \| "link" \| "log" \| "marquee" \| "menuitem" \| "menuitemcheckbox" \| "menuitemradio" \| "option" \| "progressbar" \| ... 94 more ... \| "doc-toc"` | "button"  | Specify the button role.                                   |
| `color`      | `color`       | `"default" \| "danger"`                                                                                                                                                                                                            | "default" | Type of color.                                             |
| `disabled`   | `disabled`    | `boolean`                                                                                                                                                                                                                          | false     | `true` if the button should be disabled.                   |
| `href`       | `href`        | `string`                                                                                                                                                                                                                           | ""        | Link `href`. If present, this button is rendered as `<a>`. |
| `isLoading`  | `isLoading`   | `boolean`                                                                                                                                                                                                                          | false     | Specify whether the button is loading.                     |
| `leftIcon`   | `leftIcon`    | `"alarm" \| "close" \| "information" \| "negative" \| "positive" \| "warning" \| null`                                                                                                                                             | null      | Set a icon in the left of button label.                    |
| `rightIcon`  | `rightIcon`   | `"alarm" \| "close" \| "information" \| "negative" \| "positive" \| "warning" \| null`                                                                                                                                             | null      | Set a icon in the right of button label.                   |
| `size`       | `size`        | `"small" \| "medium"`                                                                                                                                                                                                              | "medium"  | Specify the button size.                                   |
| `type`       | `type`        | `"button" \| "submit" \| "reset"`                                                                                                                                                                                                  | "button"  | Specify the button type.                                   |
| `variant`    | `variant`     | `"fill" \| "outline" \| "ghost"`                                                                                                                                                                                                   | "fill"    | Type of variant.                                           |

### Methods

| Method  | Type                                          | Description                                                        |
| ------- | --------------------------------------------- | ------------------------------------------------------------------ |
| `focus` | `(options?: FocusOptions \| undefined): void` | Focuses on the inner button.<br /><br />**options**: focus options |

### Events

| Event   | Description                                                                                                                                                                              |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `click` | A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) emitted from the inner `<button>` element. Suppressed if `disabled` is true, |

### Slots

| Name | Description                    |
| ---- | ------------------------------ |
|      | A slot for the button content. |
