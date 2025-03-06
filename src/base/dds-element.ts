import { LitElement } from "lit";
import { VERSION } from "../macros/version" with { type: "macro" };

export class DDSElement extends LitElement {
  static readonly version: string = VERSION;
}
