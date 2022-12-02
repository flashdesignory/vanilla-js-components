// import sheet from './button.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./button.css";

/**
 * Button Component
 * @param {function} udpate - Update function for props.
 * @param {function} fireEvent - Dispatches a click event on the button element.
 * @param {function} handleOnClick - "Internal" function for the onClick.
 * @param {function} render - Render function, which returns the container element.
 */
export class Button {
  /**
   * Button constructor
   * @param {object} props - Props passed to the constructor function.
   * @param {string} props.variant - "primary" | "secondary" | "icon"
   * @param {string} props.type - "button" | "submit" | "reset"
   * @param {string} props.label - Text to display in the button.
   * @param {function} props.onClick - Callback handler for onClick.
   * @param {string} props.containerClass - Css class for the button container.
   * @param {boolean} props.disabled - Disabled state of the button.
   * @param {string} props.id - Id of button element.
   * @param {string} props.dataset - dataset of button element.
   */
  constructor({
    variant = "primary",
    type,
    label,
    onClick,
    containerClass,
    disabled,
    id,
    dataset,
  }) {
    this.state = {
      label: undefined, // string
      disabled: undefined, // boolean
      id: undefined, // string
      type: undefined, // string
      dataset: undefined, // { id: string, value: string }
    };

    this.onClick = onClick;
    this.variant = variant; // "primary" | "secondary" | "icon"
    this.containerClass = containerClass;

    this.handleOnClick = this.handleOnClick.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("button-container");

    if (this.containerClass) {
      this.container.classList.add(this.containerClass);
    }

    this.button = document.createElement("button");
    this.button.classList.add("button", `button-${this.variant}`);

    this.button.addEventListener("click", this.handleOnClick);
    this.container.appendChild(this.button);

    this.update({ label, disabled, id, type, dataset });
  }

  /**
   * Button update
   * @param {object} props - Props passed to the update function.
   * @param {string} props.label - Text to display in the button.
   * @param {boolean} props.disabled - Disabled state of the button.
   * @param {string} props.id - Id of button element.
   * @param {string} props.type - "button" | "submit" | "reset"
   * @param {string} props.dataset - dataset of button element.
   */
  update({ label, disabled, id, type, dataset }) {
    if (label !== undefined) this.state.label = label;

    if (disabled !== undefined) {
      this.state.disabled = disabled;
      this.button.disabled = this.state.disabled;
    }
    if (id !== undefined) {
      this.state.id = id;
      this.button.id = this.state.id;
    }

    if (type !== undefined) {
      this.state.type = type;
      this.button.type = this.state.type;
    }

    if (dataset !== undefined) {
      this.state.dataset = dataset;
      this.button.dataset[this.state.dataset.key] = this.state.dataset.value;
    }
  }

  /**
   * Button fireEvent
   */
  fireEvent() {
    this.button.dispatchEvent(new Event("click"));
  }

  /**
   * Button handleOnClick
   * @param {HTMLMouseEvent} e Forwards the native click event to the onClick handler.
   */
  handleOnClick(e) {
    if (this.onClick) this.onClick(e);
  }

  /**
   * Button render
   * @returns {HTMLDivElement} Container element.
   */
  render() {
    this.button.replaceChildren();
    if (this.variant !== "icon") this.button.textContent = this.state.label;
    else this.button.insertAdjacentHTML("afterbegin", this.state.label);

    return this.container;
  }
}
