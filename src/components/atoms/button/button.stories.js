import { Button } from "./button";
import { ArrowLeft } from "../../../assets/arrow-left";

export default {
  title: "Atoms/Button",
  argTypes: {
    label: { control: "text" },
    type: { control: "text" },
    onClick: { action: "onClick" },
  },
};

const Template = ({ ...args }) => {
  const component = new Button({ ...args });
  return component.render();
};

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
  variant: "secondary",
};

export const Icon = Template.bind({});
Icon.args = {
  label: ArrowLeft({ width: "44", height: "44" }),
  variant: "icon",
};
