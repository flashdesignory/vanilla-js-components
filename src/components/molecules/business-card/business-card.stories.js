import { BusinessCard } from "./business-card.js";

import { LinkedInIcon } from '../../../assets/linkedin.js';
import { GithubIcon } from '../../../assets/github.js';
import { WebsiteIcon } from '../../../assets/website.js';

export default {
  title: "Molecules/BusinessCard",
  argTypes: {},
};

const Template = ({ ...args }) => {
  const bc = new BusinessCard({ ...args });
  return bc.render();
};

export const Simple = Template.bind({});
Simple.args = {
  image: {
    src: "./avatar/avatar.jpg",
    width: "140",
    height: "140",
    alt: "Thorsten Kober",
    sources: [
      { srcset: "./avatar/avatar.webp", type: "image/webp" },
      { srcset: "./avatar/avatar.jpg", type: "image/jpeg" }
    ]
  },
  name: "Thorsten Kober",
  title: "Lead Software Engineer",
};

export const Links = Template.bind({});
Links.args = {
  image: {
    src: "./avatar/avatar.jpg",
    width: "140",
    height: "140",
    alt: "Thorsten Kober",
    sources: [
      { srcset: "./avatar/avatar.webp", type: "image/webp" },
      { srcset: "./avatar/avatar.jpg", type: "image/jpeg" }
    ]
  },
  name: "Thorsten Kober",
  title: "Lead Software Engineer",
  links: [
    {
      name: "Linked In",
      type: "icon",
      label: LinkedInIcon,
      url: "https://www.linkedin.com/in/thorstenkober/",
      target: "_blank"
    },
    {
      name: "Github",
      type: "icon",
      label: GithubIcon,
      url: "https://github.com/flashdesignory",
      target: "_blank"
    },
    {
      name: "Website",
      type: "icon",
      label: WebsiteIcon,
      url: "https://flashdesignory.github.io/",
      target: "_blank"
    }
  ]
};
