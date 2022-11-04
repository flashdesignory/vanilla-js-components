import { Text } from "./text";

export default {
  title: "Atoms/Text",
  argTypes: {
    text: { control: "text" },
    truncate: { control: "boolean" },
  },
};

const Template = ({ ...args }) => {
  const text = new Text({ ...args });
  return text.render();
};

export const Simple = Template.bind({});
Simple.args = {
  text: "Hello world!",
};
