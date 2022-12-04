import { DisplayImage } from "./display-image";

export default {
  title: "Molecules/DisplayImage",
  argTypes: {
    width: { control: "number" },
    height: { control: "number" },
    index: { control: "number" },
    id: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.maxWidth = "420px";
  container.style.maxHeight = "420px";

  const component = new DisplayImage({ ...args });
  container.appendChild(component.render());
  return container;
};

export const Blank = Template.bind({});
Blank.args = {
  width: 300,
  height: 200,
  index: 0,
  id: "01",
};

export const Image = Template.bind({});
Image.args = {
  width: 300,
  height: 200,
  index: 0,
  id: "01",
  data: {
    src: "./surf/landscape/surf-01.jpg",
    width: "1024",
    height: "802",
    alt: "surfers on the beach",
  },
};
