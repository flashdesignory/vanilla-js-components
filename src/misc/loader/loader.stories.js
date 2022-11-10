import { Loader } from "./loader";

export default {
  title: "Misc/Loader",
  argTypes: {
    size: { control: "number" },
  },
};

const Template = ({ ...args }) => {
  const loader = new Loader({ ...args });
  return loader.render();
};

export const Large = Template.bind({});
Large.args = {
  size: 120,
};

export const Small = Template.bind({});
Small.args = {
  size: 20,
};
