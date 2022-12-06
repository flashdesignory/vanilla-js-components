import { DragAndDrop } from "./drag-and-drop";

export default {
  title: "Organisms/DragAndDrop",
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new DragAndDrop({ ...args });
  return component.render();
};

export const Example = Template.bind({});
Example.args = {
  title: "Drag And Drop",
  description: `Drag and drop boxes between toolbar and body.`,
};
