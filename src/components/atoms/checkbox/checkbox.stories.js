import { Checkbox } from "./checkbox";

export default {
  title: "Atoms/Checkbox",
  argTypes: {
    id: "checkbox",
    name: { control: "text" },
    label: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "onChange" },
  },
};

const Template = ({ ...args }) => {
  const component = new Checkbox({ ...args });
  return component.render();
};

export const Single = Template.bind({});
Single.args = {
  label: "Check me!",
};
