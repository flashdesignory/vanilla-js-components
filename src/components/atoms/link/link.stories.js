import { Link } from "./link";
import { WebsiteIcon } from "../../../assets/business/website.js";

export default {
  title: "Atoms/Link",
  argTypes: {
    name: { control: "text" },
    type: { control: "text" },
    label: { control: "text" },
    url: { control: "text" },
    target: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new Link({ ...args });
  return component.render();
};

export const TextLink = Template.bind({});
TextLink.args = {
  name: "flashdesignory",
  type: "text",
  label: "FlashDesignory",
  url: "https://flashdesignory.github.io/",
  target: "_blank",
};

export const IconLink = Template.bind({});
IconLink.args = {
  name: "flashdesignory",
  type: "icon",
  label: WebsiteIcon({}),
  url: "https://flashdesignory.github.io/",
  target: "_blank",
};
