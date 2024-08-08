<!-- Fill in the component name below -->

This PR adds Button (`daikin-button`) component.

## Related Ticket(s) and Links

<!-- Uncomment and fill in the issue number below, if any. -->
<!-- Closes #XXX. -->

<!-- Fill in the links below. -->

- JIRA Ticket: [DDS-XXXX](https://daikinsvoil.atlassian.net/browse/DDS-XXXX)
- Figma design: [Figma](https://www.figma.com/design/wHAhw4yC54Hjq6Whb8FL5T/DDS---741%2C-850-%26-892-%26-884%2C-883---Button%2C-Notification-toast-%26-inline%2C-Text-input%2C-Tab?node-id=19936-7610&m=dev)

## API Design

- [JIRA Wiki](https://daikinsvoil.atlassian.net/wiki/spaces/GDS/pages/3019341872/Button+Component+API)

## How Has This Been Tested?

<!-- Describe what automated tests you added to the codebase. -->

### Visual Regression Tests

- \[Primary; Primary Danger; Secondary; Tertiary\] variants and \[Normal; Hover; Pressed; Disabled\] states matrix.

### Interaction Tests

- fires `click` event when the button is clicked
- does not fire `click` event if the button is disabled
- focusable with Tab key
- clickable with Space bar when focused

## Checklist

- [ ] I have added a changeset file that describes the changes.  
       _Hint_: run `npx changeset`.
- [ ] I have performed a self-review of my code.
- [ ] I have added appropriate visual regression tests.
- [ ] I have added appropriate interaction tests.
- [ ] I have confirmed that there are no accessibility warnings that can be addressed.  
       _Hint_: check the Accessibility tab in the Storybook.
- [ ] I have confirmed that the component can be operated using only the keyboard.
- [ ] I have confirmed that the focus state of the component is visually discernible.

<!-- Testing and linting are not in this checklist, as they are performed by GitHub Actions. -->

If you don't feel that the PR is ready for review, please create the PR in draft status.
