import { expect, test } from "vitest";
import { prettyHTML } from "./fix-code";

test("prettyHTML should format HTML", () => {
  expect(prettyHTML("")).toMatchInlineSnapshot(`""`);
  expect(prettyHTML("<div></div>")).toMatchInlineSnapshot(`"<div></div>"`);
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

test("prettyHTML should modify empty HTML attributes", () => {
  expect(
    prettyHTML(
      `<custom-element attr-preserve="" attr-remove="" attr-boolean="" attr-unknown=""></custom-element>`,
      {
        "custom-element": {
          "attr-boolean": "boolean",
          "attr-preserve": "preserve",
          "attr-remove": "removeIfEmpty",
        },
      }
    )
  ).toMatchInlineSnapshot(
    `"<custom-element attr-preserve="" attr-remove="" attr-boolean="" attr-unknown=""></custom-element>"`
  );
});

test("prettyHTML should keep non-empty HTML attributes", () => {
  expect(
    prettyHTML(`<unknown-element attr-empty=""></unknown-element>`)
  ).toMatchInlineSnapshot(`"<unknown-element attr-empty></unknown-element>"`);

  expect(
    prettyHTML(
      `
      <custom-element attr-preserve attr-remove attr-boolean attr-unknown></custom-element>
      <custom-element attr-preserve="a" attr-remove="b" attr-boolean="c" attr-unknown="d"></custom-element>
      `,
      {
        "custom-element": {
          "attr-boolean": "boolean",
          "attr-preserve": "preserve",
          "attr-remove": "removeIfEmpty",
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "<custom-element attr-preserve attr-remove attr-boolean attr-unknown></custom-element>
    <custom-element attr-preserve="a" attr-remove="b" attr-boolean="c" attr-unknown="d"></custom-element>"
  `);
});

test("prettyHTML should treat empty attributes in unknown element as boolean attributes", () => {
  expect(
    prettyHTML(`<unknown-element attr-empty=""></unknown-element>`)
  ).toMatchInlineSnapshot(`"<unknown-element attr-empty></unknown-element>"`);

  expect(
    prettyHTML(
      `<unknown-element attr-boolean attr-empty="" attr-with-value="a"></unknown-element>`,
      {
        "custom-element": {
          "attr-boolean": "boolean",
          "attr-preserve": "preserve",
          "attr-remove": "removeIfEmpty",
        },
      }
    )
  ).toMatchInlineSnapshot(
    `"<unknown-element attr-boolean attr-empty attr-with-value="a"></unknown-element>"`
  );
});
