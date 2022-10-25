import { Toggle } from "./toggle";

export default {
  title: "Atoms/Toggle",
  argTypes: {
    id: { control: "text" },
    checked: { control: "boolean" },
  },
};

const Template = ({ ...args }) => {
  const toggle = new Toggle({ ...args });
  return toggle.render();
};

export const Simple = Template.bind({});
Simple.args = {
  id: "toggle",
  checked: false,
};
