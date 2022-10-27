// import sheet from './list.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./list.css";

import { Item } from './item.js';
import { throttle } from '../../../lib/index.js';

export class VirtualList {
  constructor({
    data = [], visibleItems, itemHeight, itemWidth, amountRowsBuffered,
  }) {
    // keep track of props within the class
    this.data = data;
    this.visibleItems = visibleItems;
    this.itemHeight = itemHeight;
    this.itemWidth = itemWidth;
    // derrived values needed for calculations
    this.visibleWindowHeight = visibleItems * itemHeight;
    this.totalHeight = this.data.length * itemHeight;
    this.amountRowsBuffered = amountRowsBuffered;
    this.numMaxItems = visibleItems + (2 * amountRowsBuffered);
    // initial values
    this.items = [];
    this.scrollTop = 0;
    // set initial elements
    this.container = document.createElement('div');
    this.container.classList.add('list-container');
    this.container.style.height = `${this.visibleWindowHeight}px`;
    this.container.style.width = `${this.itemWidth}px`;

    this.content = document.createElement('div');
    this.content.classList.add('list-content');
    this.content.style.height = `${this.totalHeight}px`;
    this.container.appendChild(this.content);
    // bind functions
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.updateElements = this.updateElements.bind(this);
    // throttle scroll;
    const throttled = throttle(this.handleOnScroll, 50);
    this.container.addEventListener('scroll', throttled);
    // display initial list items
    this.updateElements();
  }

  handleOnScroll(e) {
    this.updateElements(e);
    this.render();
  }

  updateElements(e) {
    this.scrollTop = e ? e.target.scrollTop : this.scrollTop;

    const startIndex = Math.max(
      Math.floor(this.scrollTop / this.itemHeight) - this.amountRowsBuffered,
      0,
    );

    const endIndex = Math.min(
      Math.ceil((this.scrollTop + this.visibleWindowHeight) / this.itemHeight)
        - 1
        + this.amountRowsBuffered,
      this.data.length - 1,
    );

    this.items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const item = this.data[i];
      const props = { ...item, index: i, height: this.itemHeight };
      this.items.push(new Item(props));
    }
  }

  render() {
    // hard refresh - i know!
    this.content.replaceChildren();
    this.items.forEach((item) => {
      this.content.appendChild(item.render());
    });
    return this.container;
  }
}
