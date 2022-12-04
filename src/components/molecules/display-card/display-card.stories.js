import { DisplayCard } from "./display-card";

export default {
  title: "Molecules/DisplayCard",
  argTypes: {},
};

const Template = ({ ...args }) => {
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.maxWidth = "420px";

  const component = new DisplayCard({ ...args });
  container.appendChild(component.render());
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
    src: "./misc/image-2.jpg",
    width: 1024,
    height: 673,
    alt: "campervan",
  },
  height: 268,
  metadata: "Posted 01/01/2022",
};
