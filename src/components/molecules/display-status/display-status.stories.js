import { DisplayStatus } from "./display-status";
import { Button } from "../../atoms/button/button";

export default {
  title: "Molecules/DisplayStatus",
  argTypes: {
    namespace: { control: "text" },
    showTimespamp: { control: "boolean" },
  },
};

const Template = ({ ...args }) => {
  const onClick = () => component.log({ msg: "button clicked!" });
  const container = document.createElement("div");

  const button = new Button({
    variant: "primary",
    onClick: onClick,
    label: "click me to log something!",
    style: { marginBottom: "20px" },
  });
  container.appendChild(button.render());

  const component = new DisplayStatus({ ...args });
  container.appendChild(component.render());

  return container;
};

export const Simple = Template.bind({});
Simple.args = {
  namespace: "sb",
  showTimespamp: true,
};
