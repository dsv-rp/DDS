import { expect, test } from "vitest";
import { prettyHTML } from "./fix-code";

test("prettyHTML should format HTML", () => {
  expect(prettyHTML("")).toMatchInlineSnapshot(`""`);
  expect(prettyHTML("<div></div>")).toMatchInlineSnapshot(`"<div></div>"`);
  expect(prettyHTML("<div>\t \r\n\n</div>")).toMatchInlineSnapshot(
    `"<div></div>"`
  );
  expect(prettyHTML("<div>singleline text</div>")).toMatchInlineSnapshot(`
    "<div>
      singleline text
    </div>"
  `);
  expect(prettyHTML("<div>multiline\ntext</div>")).toMatchInlineSnapshot(`
    "<div>
      multiline
      text
    </div>"
  `);
  expect(prettyHTML("<div><!-- singleline comment --></div>"))
    .toMatchInlineSnapshot(`
    "<div>
      <!-- singleline comment -->
    </div>"
  `);
  expect(prettyHTML("<div><!-- multiline\ncomment --></div>"))
    .toMatchInlineSnapshot(`
    "<div>
      <!--
        multiline
        comment
      -->
    </div>"
  `);
  expect(prettyHTML("<div><br><img></div>")).toMatchInlineSnapshot(`
    "<div>
      <br>
      <img>
    </div>"
  `);
  expect(
    prettyHTML(`
Text Line 1
      Text Line 2
  <span>Single Line 1</span>
  <p>
    Single Line 2
  </p>
  <span>Multi
Line 1</span>
  <p>
Multi
Line
2
  </p>
  <!-- Single Line Comment 1 -->
  <!--
    Single Line Comment 2
  -->
  <!--Multi Line
  Comment 1-->
  <!--
Multi
Line
Comment 2
  -->
  <custom-element custom-attr custom-attr-2="" custom-attr-3="test">
    <nested-element-1></nested-element-1>
    <nested-element-2>
      Example
    </nested-element-2>
  </custom-element>
`)
  ).toMatchInlineSnapshot(`
    "Text Line 1
    Text Line 2
    <span>
      Single Line 1
    </span>
    <p>
      Single Line 2
    </p>
    <span>
      Multi
      Line 1
    </span>
    <p>
      Multi
      Line
      2
    </p>
    <!-- Single Line Comment 1 -->
    <!-- Single Line Comment 2 -->
    <!--
      Multi Line
      Comment 1
    -->
    <!--
      Multi
      Line
      Comment 2
    -->
    <custom-element custom-attr custom-attr-2 custom-attr-3="test">
      <nested-element-1></nested-element-1>
      <nested-element-2>
        Example
      </nested-element-2>
    </custom-element>"
  `);
});

test("prettyHTML should output as-is for broken or unsupported HTMLs", () => {
  expect(prettyHTML("<!DOCTYPE html>\n\n")).toBe("<!DOCTYPE html>\n\n");
  expect(prettyHTML("<!broken\n\n")).toBe("<!broken\n\n");
});

test("prettyHTML should modify HTML attributes", () => {
  // Custom HTML attributes
  // `not-exist` will be treated as `unknown` attribute for `<custom-element>`, but treated as `boolean` attribute for `<unknown-element>`.
  // This is because `<custom-element>` exists in the `tagAttributeTypeMap` argument but `<unknown-element>` is not.
  // For unregistered elements, we treat an unknown attribute as a boolean attribute if its value is empty, since that case occurs frequently in the code snippets in Storybook.
  expect(
    prettyHTML(
      `
      <!-- Custom HTML Attributes (empty) -->
      <custom-element attr-default-foo="" attr-default-empty="" attr-boolean="" attr-unknown="" attr-unspecified=""></custom-element>
      <custom-element attr-default-foo='' attr-default-empty='' attr-boolean='' attr-unknown='' attr-unspecified=''></custom-element>

      <!-- Custom HTML Attributes (with value) -->
      <custom-element attr-default-foo="foo" attr-default-empty="foo" attr-boolean="foo" attr-unknown="foo" attr-unspecified="foo"></custom-element>
      <custom-element attr-default-foo='foo' attr-default-empty='foo' attr-boolean='foo' attr-unknown='foo' attr-unspecified='foo'></custom-element>

      <!-- Standard HTML Attributes -->
      <custom-element not-exist="" id="" class="" role="" hidden="" data-testid=""></custom-element>
      <unknown-element not-exist="" id="" class="" role="" hidden="" data-testid=""></unknown-element>
      `,
      {
        "custom-element": {
          "attr-boolean": "boolean",
          "attr-unknown": "unknown",
          "attr-default-empty": { default: "" },
          "attr-default-foo": { default: "foo" },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "<!-- Custom HTML Attributes (empty) -->
    <custom-element attr-default-foo="" attr-boolean attr-unknown="" attr-unspecified=""></custom-element>
    <custom-element attr-default-foo='' attr-boolean attr-unknown='' attr-unspecified=''></custom-element>
    <!-- Custom HTML Attributes (with value) -->
    <custom-element attr-default-empty="foo" attr-boolean="foo" attr-unknown="foo" attr-unspecified="foo"></custom-element>
    <custom-element attr-default-empty='foo' attr-boolean='foo' attr-unknown='foo' attr-unspecified='foo'></custom-element>
    <!-- Standard HTML Attributes -->
    <custom-element not-exist="" hidden></custom-element>
    <unknown-element not-exist hidden></unknown-element>"
  `);
});
