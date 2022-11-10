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
  const rbg = new RadiobuttonGroup({ ...args });
  return rbg.render();
};

export const Group = Template.bind({});
Group.args = {
  name: "animals",
  data: data,
};
