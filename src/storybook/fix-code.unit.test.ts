import { expect, test } from "vitest";
import { prettyHTML } from "./fix-code";

const TAG_ATTR_TYPE_MAP = {
  "custom-element": {
    // Keys must be normalized to lowercase without hyphens.
    /* cSpell:disable */
    attrboolean: "boolean",
    attrpreserve: "preserve",
    attrremove: "removeIfEmpty",
    /* cSpell:enable */
  },
} as const;

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

test("prettyHTML should modify empty HTML attributes", () => {
  // Custom HTML attributes
  expect(
    prettyHTML(
      `
      <custom-element attr-preserve="" attr-remove="" attr-boolean="" attr-unknown=""></custom-element>
      <custom-element attr-preserve='' attr-remove='' attr-boolean='' attr-unknown=''></custom-element>
      `,
      TAG_ATTR_TYPE_MAP
    )
  ).toMatchInlineSnapshot(`
    "<custom-element attr-preserve="" attr-boolean attr-unknown=""></custom-element>
    <custom-element attr-preserve='' attr-boolean attr-unknown=''></custom-element>"
  `);

  // Standard HTML attributes
  expect(
    prettyHTML(
      `
      <custom-element preserve="" id="" class="" role="" hidden="" data-test-id=""></custom-element>
      <unknown-element boolean="" id="" class="" role="" hidden="" data-test-id=""></unknown-element>
      `,
      TAG_ATTR_TYPE_MAP
    )
  ).toMatchInlineSnapshot(`
    "<custom-element preserve="" hidden></custom-element>
    <unknown-element boolean hidden></unknown-element>"
  `);
});

test("prettyHTML should keep non-empty HTML attributes", () => {
  expect(
    prettyHTML(
      `
      <custom-element attr-preserve attr-remove attr-boolean attr-unknown></custom-element>
      <custom-element attr-preserve="a" attr-remove="b" attr-boolean="c" attr-unknown="d"></custom-element>
      <custom-element attr-preserve='a' attr-remove='b' attr-boolean='c' attr-unknown='d'></custom-element>
      `,
      TAG_ATTR_TYPE_MAP
    )
  ).toMatchInlineSnapshot(`
    "<custom-element attr-preserve attr-remove attr-boolean attr-unknown></custom-element>
    <custom-element attr-preserve="a" attr-remove="b" attr-boolean="c" attr-unknown="d"></custom-element>
    <custom-element attr-preserve='a' attr-remove='b' attr-boolean='c' attr-unknown='d'></custom-element>"
  `);
});

test("prettyHTML should treat empty attributes in unknown elements as boolean attributes", () => {
  expect(
    prettyHTML(
      `<unknown-element attr-empty-1="" attr-empty-2=''></unknown-element>`
    )
  ).toMatchInlineSnapshot(
    `"<unknown-element attr-empty-1 attr-empty-2></unknown-element>"`
  );

  expect(
    prettyHTML(
      `<unknown-element attr-boolean attr-empty-1="" attr-empty-2='' attr-with-value-1="a" attr-with-value-2='b'></unknown-element>`,
      TAG_ATTR_TYPE_MAP
    )
  ).toMatchInlineSnapshot(
    `"<unknown-element attr-boolean attr-empty-1 attr-empty-2 attr-with-value-1="a" attr-with-value-2='b'></unknown-element>"`
  );
});
