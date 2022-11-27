// import sheet from './pagination.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./pagination.css";

import { Button } from "../button/button.js";
import { throttle } from "../../../lib/index.js";

export class Pagination {
  constructor({
    onClick,
    buttonWidth,
    containerWidth,
    totalItems,
    activeItem,
  }) {
    this.state = {
      buttonWidth: undefined, // number
      containerWidth: undefined, // number
      totalItems: 0, // number
      activeItem: undefined, // number
    };

    this.onClick = onClick;
    this.maxButtons = 0;
    this.buttons = [];

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnObserve = this.handleOnObserve.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("pagination-container");

    const throttled = throttle(this.handleOnObserve, 50);

    var observer = new ResizeObserver(throttled);
    observer.observe(this.container);

    this.update({ buttonWidth, containerWidth, totalItems, activeItem });
    this.rebuild();
  }

  update({ buttonWidth, containerWidth, totalItems, activeItem }) {
    if (buttonWidth !== undefined) this.state.buttonWidth = buttonWidth;
    if (containerWidth !== undefined)
      this.state.containerWidth = containerWidth;
    if (totalItems !== undefined) this.state.totalItems = totalItems;
    if (activeItem !== undefined) this.state.activeItem = activeItem;
  }

  rebuild() {
    // this needs to be an odd number
    this.maxButtons = Math.floor(
      this.state.containerWidth / this.state.buttonWidth
    );
    if (this.maxButtons % 2 === 0) this.maxButtons--;
    this.buttons = [];
  }

  handleOnClick(e) {
    const { id } = e.target;
    let nextId;
    switch (id) {
      case "next":
        if (this.state.activeItem >= this.state.totalItems) return;
        nextId = this.state.activeItem + 1;
        break;
      case "prev":
        if (this.state.activeItem <= 1) return;
        nextId = this.state.activeItem - 1;
        break;
      default:
        nextId = Number(e.target.id);
    }

    if (nextId && this.onClick) this.onClick(nextId);

    this.state.activeItem = nextId;
    this.render();
  }

  handleOnObserve(entries) {
    for (let entry of entries) {
      const cr = entry.contentRect;
      this.update({ containerWidth: cr.width });
      this.rebuild();
      this.render();
    }
  }

  renderPrevButton() {
    return new Button({
      label: "<",
      onClick: this.handleOnClick,
      id: "prev",
      containerClass: "pagination-button",
    });
  }

  renderNextButton() {
    return new Button({
      label: ">",
      onClick: this.handleOnClick,
      id: "next",
      containerClass: "pagination-button",
    });
  }

  renderIdButton(id) {
    return new Button({
      label: id.toString(),
      onClick: this.handleOnClick,
      id: id.toString(),
      containerClass:
        id === this.state.activeItem
          ? "pagination-button-active"
          : "pagination-button",
    });
  }

  renderDotButton() {
    return new Button({
      label: "...",
      id: "...",
      containerClass: "pagination-button",
      disabled: true,
    });
  }

  render() {
    this.container.replaceChildren();
    // one or less items, don't render any buttons
    if (this.state.totalItems <= 1) return this.container;

    // Check if all buttons can fit - together with prev and next, without using dots.
    // Subtract prev and next from maxButtons
    if (this.state.totalItems <= this.maxButtons - 2) {
      // render prev button
      const prevButton = this.renderPrevButton();
      this.container.appendChild(prevButton.render());
      this.buttons.push(prevButton);

      // render items
      for (let i = 0; i < this.state.totalItems; i++) {
        const buttonElement = this.renderIdButton(i + 1);
        this.container.appendChild(buttonElement.render());
        this.buttons.push(buttonElement);
      }

      // render next button
      const nextButton = this.renderNextButton();
      this.container.appendChild(nextButton.render());
      this.buttons.push(nextButton);
      return this.container;
    }

    // we look at the activeItem to determine next steps

    // we might only need one dots button
    // subtract prev, next, (last or first), (one set of dots)
    let numButtons = this.maxButtons - 4;

    // put dots on the right side
    if (this.state.activeItem <= Math.ceil(numButtons / 2)) {
      // render prev button
      const prevButton = this.renderPrevButton();
      this.container.appendChild(prevButton.render());
      this.buttons.push(prevButton);

      // render items
      for (let i = 0; i < numButtons; i++) {
        const buttonElement = this.renderIdButton(i + 1);
        this.container.appendChild(buttonElement.render());
        this.buttons.push(buttonElement);
      }

      // render dots
      const dotButton = this.renderDotButton();
      this.container.appendChild(dotButton.render());

      // render last button after dots
      const lastButton = this.renderIdButton(this.state.totalItems);
      this.container.appendChild(lastButton.render());
      this.buttons.push(lastButton);

      // render next button
      const nextButton = this.renderNextButton();
      this.container.appendChild(nextButton.render());
      this.buttons.push(nextButton);

      return this.container;
    }

    // put dots on the left side
    if (
      this.state.activeItem >
      this.state.totalItems - Math.ceil(numButtons / 2)
    ) {
      // render prev button
      const prevButton = this.renderPrevButton();
      this.container.appendChild(prevButton.render());
      this.buttons.push(prevButton);

      // render first button
      const firstButton = this.renderIdButton(1);
      this.container.appendChild(firstButton.render());
      this.buttons.push(firstButton);

      // render dots
      const dotButton = this.renderDotButton();
      this.container.appendChild(dotButton.render());

      // render items
      for (
        let i = this.state.totalItems - numButtons;
        i < this.state.totalItems;
        i++
      ) {
        const buttonElement = this.renderIdButton(i + 1);
        this.container.appendChild(buttonElement.render());
        this.buttons.push(buttonElement);
      }

      // render next button
      const nextButton = this.renderNextButton();
      this.container.appendChild(nextButton.render());
      this.buttons.push(nextButton);

      return this.container;
    }

    // put dots on both sides
    // subtract prev, next, last, first, dots, dots
    numButtons = this.maxButtons - 6;
    // console.log('activeItem', this.activeItem, 'numButtons', numButtons, 'dots left and right');
    let startIndex = this.state.activeItem - Math.floor(numButtons / 2);
    let endIndex = this.state.activeItem + Math.floor(numButtons / 2);

    if (
      this.state.activeItem > Math.floor(numButtons / 2) &&
      this.state.activeItem < numButtons
    ) {
      startIndex = Math.floor(numButtons / 2) + 1;
      endIndex = startIndex + numButtons - 1;
    }

    if (
      this.state.activeItem <=
        this.state.totalItems - Math.floor(numButtons / 2) &&
      this.state.activeItem > this.state.totalItems - numButtons
    ) {
      endIndex = this.state.totalItems - Math.floor(numButtons / 2);
      startIndex = endIndex - numButtons + 1;
    }

    // render prev button
    const prevButton = this.renderPrevButton();
    this.container.appendChild(prevButton.render());
    this.buttons.push(prevButton);

    // render first button
    const firstButton = this.renderIdButton(1);
    this.container.appendChild(firstButton.render());
    this.buttons.push(firstButton);

    // render left dots
    const leftDotsButton = this.renderDotButton();
    this.container.appendChild(leftDotsButton.render());

    // render items
    for (let i = startIndex - 1; i < endIndex; i++) {
      const buttonElement = this.renderIdButton(i + 1);
      this.container.appendChild(buttonElement.render());
      this.buttons.push(buttonElement);
    }

    // render right dots
    const rightDotsButton = this.renderDotButton();
    this.container.appendChild(rightDotsButton.render());

    // render last button after dots
    const lastButton = this.renderIdButton(this.state.totalItems);
    this.container.appendChild(lastButton.render());
    this.buttons.push(lastButton);

    // render next button
    const nextButton = this.renderNextButton();
    this.container.appendChild(nextButton.render());
    this.buttons.push(nextButton);

    return this.container;
  }
}
