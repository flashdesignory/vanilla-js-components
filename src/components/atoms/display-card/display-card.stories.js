import { DisplayCard } from "./display-card";

export default {
  title: "Atoms/DisplayCard",
  argTypes: {},
};

const Template = ({ ...args }) => {
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = "420px";

  const dc = new DisplayCard({ ...args });
  container.appendChild(dc.render());
  return container;
};

export const Empty = Template.bind({});
Empty.args = {};

export const Text = Template.bind({});
Text.args = {
  text: "Hello world!",
  metadata: "Posted 01/01/2022",
};

export const Image = Template.bind({});
Image.args = {
  image: {
    src: "./surf/surf-thumb-2.jpg",
    width: 1024,
    height: 768,
    alt: "campervan",
  },
  height: 268,
  metadata: "Posted 01/01/2022",
};
