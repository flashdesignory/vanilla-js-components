import { Text } from "./text";

export default {
  title: "Atoms/Text",
  argTypes: {
    content: { control: "text" },
    truncate: { control: "boolean" },
  },
};

const Template = ({ ...args }) => {
  const text = new Text({ ...args });
  return text.render();
};

export const Simple = Template.bind({});
Simple.args = {
  content: "Hello world!",
};
