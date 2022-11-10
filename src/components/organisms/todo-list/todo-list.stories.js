import { TodoList } from "./todo-list.js";
import { data } from "./data.js";

export default {
  title: "Organisms/TodoList",
  argTypes: {
    data: { control: "json" },
    title: { control: "text" },
    name: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const list = new TodoList({ ...args });
  return list.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data,
  title: "Todo List:",
  name: "todo",
  prompt: "Enter a todo",
  submitText: "add",
};
