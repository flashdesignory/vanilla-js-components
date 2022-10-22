import { Button } from "./button";

export default {
  title: "Components/Button",
  argTypes: {
    label: { control: "text" },
    onClick: { action: "onClick" },
  },
};

const Template = ({ ...args }) => {
  const btn = new Button({ ...args });
  return btn.render();
};

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
  type: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
  type: "secondary",
};
