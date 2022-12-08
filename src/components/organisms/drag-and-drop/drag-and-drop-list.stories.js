import { DragAndDropList } from "./drag-and-drop-list";

const data = ["one", "two", "three", "four"];

export default {
  title: "Organisms/DragAndDropList",
  argTypes: {
    title: { control: "text" },
    insertionMethod: { control: "text" },
    onClick: { action: "onClick" },
    emptyListText: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new DragAndDropList({ ...args });
  return component.render();
};

export const Example = Template.bind({});
Example.args = {
  data: data,
  title: "random stuff",
  containerClass: "drag-and-drop-list-container",
};
