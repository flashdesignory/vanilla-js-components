// import sheet from './rich-text-editor.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./rich-text-editor.css";

import { Text } from "../../atoms/text/text.js";
import { Button } from "../../atoms/button/button.js";

import { Bold } from "../../../assets/edit/editor-bold.js";
import { Italic } from "../../../assets/edit/editor-italic.js";
import { Underline } from "../../../assets/edit/editor-underline.js";
import { Strikethrough } from "../../../assets/edit/editor-strikethrough.js";
import { ListBulleted } from "../../../assets/edit/editor-list-bulleted.js";
import { ListNumbers } from "../../../assets/edit/editor-list-numbers.js";
import { Undo } from "../../../assets/edit/editor-undo.js";
import { Redo } from "../../../assets/edit/editor-redo.js";

export class RichTextEditor {
  constructor({ title, placeholder }) {
    this.state = {
      title: undefined, // string
      placeholder: undefined, // string
    };

    this.handleOnClick = this.handleOnClick.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("editor-container");

    this.header = new Text({ containerClass: "editor-title" });
    this.container.appendChild(this.header.render());

    this.body = document.createElement("div");
    this.body.classList.add("editor-body");
    this.container.appendChild(this.body);

    this.toolbar = document.createElement("div");
    this.toolbar.classList.add("editor-toolbar");
    this.body.appendChild(this.toolbar);

    this.editable = document.createElement("div");
    this.editable.classList.add("editor-editable");
    this.editable.contentEditable = "true";
    this.editable.spellcheck = "false";
    this.body.appendChild(this.editable);

    this.buttons = [];
    const buttonBold = new Button({
      id: "bold",
      variant: "icon",
      label: Bold({ width: "24", height: "24" }),
      dataset: { key: "command", value: "bold" },
      onClick: this.handleOnClick,
    });
    this.buttons.push(buttonBold);
    this.toolbar.appendChild(buttonBold.render());

    const buttonItalic = new Button({
      id: "italic",
      variant: "icon",
      label: Italic({ width: "24", height: "24" }),
      dataset: { key: "command", value: "italic" },
      onClick: this.handleOnClick,
    });
    this.buttons.push(buttonItalic);
    this.toolbar.appendChild(buttonItalic.render());

    const buttonUnderline = new Button({
      id: "underline",
      variant: "icon",
      label: Underline({ width: "24", height: "24" }),
      dataset: { key: "command", value: "underline" },
      onClick: this.handleOnClick,
    });
    this.buttons.push(buttonUnderline);
    this.toolbar.appendChild(buttonUnderline.render());

    const buttonStrikethrough = new Button({
      id: "strikethrough",
      variant: "icon",
      label: Strikethrough({ width: "24", height: "24" }),
      dataset: { key: "command", value: "strikethrough" },
      onClick: this.handleOnClick,
    });
    this.buttons.push(buttonStrikethrough);
    this.toolbar.appendChild(buttonStrikethrough.render());

    const buttonListBulleted = new Button({
      id: "list-bulleted",
      variant: "icon",
      label: ListBulleted({ width: "24", height: "24" }),
      dataset: { key: "command", value: "insertunorderedlist" },
      onClick: this.handleOnClick,
    });
    this.buttons.push(buttonListBulleted);
    this.toolbar.appendChild(buttonListBulleted.render());

    const buttonListNumbers = new Button({
      id: "list-numbers",
      variant: "icon",
      label: ListNumbers({ width: "24", height: "24" }),
      dataset: { key: "command", value: "insertorderedlist" },
      onClick: this.handleOnClick,
    });
    this.buttons.push(buttonListNumbers);
    this.toolbar.appendChild(buttonListNumbers.render());

    const buttonUndo = new Button({
      id: "undo",
      variant: "icon",
      label: Undo({ width: "24", height: "24" }),
      dataset: { key: "command", value: "undo" },
      onClick: this.handleOnClick,
    });
    this.buttons.push(buttonUndo);
    this.toolbar.appendChild(buttonUndo.render());

    const buttonRedo = new Button({
      id: "redo",
      variant: "icon",
      label: Redo({ width: "24", height: "24" }),
      dataset: { key: "command", value: "redo" },
      onClick: this.handleOnClick,
    });
    this.buttons.push(buttonRedo);
    this.toolbar.appendChild(buttonRedo.render());

    this.update({ title, placeholder });
  }

  update({ title, placeholder }) {
    if (title !== undefined) {
      this.state.title = title;
      this.header.update({ text: this.state.title });
    }

    if (placeholder !== undefined) {
      this.state.placeholder = placeholder;
      this.editable.insertAdjacentHTML(
        "afterbegin",
        `${this.state.placeholder}`
      );
    }
  }

  handleOnClick(e) {
    document.execCommand(e.target.dataset.command, false);
  }

  render() {
    this.header.render();

    return this.container;
  }
}
