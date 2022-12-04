import { RadiobuttonGroup } from "./radio-button-group";
import { data } from "./data";

export default {
  title: "Atoms/Radiobutton",
  argTypes: {
    name: { control: "text" },
    onChange: { action: "onChange" },
    data: { control: "array" },
  },
};

const Template = ({ ...args }) => {
  const component = new RadiobuttonGroup({ ...args });
  return component.render();
};

export const Group = Template.bind({});
Group.args = {
  name: "animals",
  data: data,
};
