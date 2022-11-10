import { PollWidget } from "./poll-widget.js";
import { data } from "./data.js";

export default {
  title: "Organisms/PollWidget",
  argTypes: {
    data: { control: "json" },
    title: { control: "text" },
    name: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const pw = new PollWidget({ ...args });
  return pw.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data,
  title: "Favorite Animal:",
  name: "favorite animals",
};
