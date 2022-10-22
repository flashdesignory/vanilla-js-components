import { RadiobuttonGroup } from "./radio-button-group";
import { data } from "./data";

export default {
  title: "Components/Radiobutton Group",
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

export const Simple = Template.bind({});
Simple.args = {
  name: "animals",
  data: data,
};
