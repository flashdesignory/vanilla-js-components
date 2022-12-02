import { RichTextEditor } from "./rich-text-editor";

export default {
  title: "Organisms/RichTextEditor",
  argTypes: {
    title: { control: "text" },
    placeholder: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new RichTextEditor({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  title: "Text Editor",
  placeholder: "Edit me by tapping or clicking in this area!",
};
