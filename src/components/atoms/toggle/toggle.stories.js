import { Toggle } from "./toggle";

export default {
  title: "Atoms/Toggle",
  argTypes: {
    id: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "onInput" },
  },
};

const Template = ({ ...args }) => {
  const component = new Toggle({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  id: "toggle",
  checked: false,
};
