import markInputRule from "../../lib/markInputRule";
import Mark from "../Mark";
import markRule from "../../rules/mark";
import applyHighlight from "../../commands/applyHighlight";

export default class OrangeHighlight extends Mark {
  get name() {
    return "highlight_orange";
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: "#FCE7D2",
        },
      },
      excludes: "highlight",
      group: "highlight",
      parseDOM: [
        {
          tag: "mark",
          getAttrs: (node) => node.getAttribute("class") === "orange",
        },
        {
          style: "background-color",
          getAttrs: (value) => !!value && value === "orange",
        },
      ],
      toDOM: () => ["mark", { class: "orange" }],
    };
  }

  inputRules({ type }) {
    return [markInputRule(/(?:@@)([^=]+)(?:@@)$/, type)];
  }

  keys({ type }) {
    return {
      "Alt-Shift-2": applyHighlight(type),
    };
  }

  commands({ type }) {
    return () => applyHighlight(type);
  }

  get rulePlugins() {
    return [markRule({ delim: "@@", mark: "highlight_orange" })];
  }

  get toMarkdown() {
    return {
      open: "@@",
      close: "@@",
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }

  parseMarkdown() {
    return { mark: "highlight_orange" };
  }
}
