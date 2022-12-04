import { BusinessCard } from "./business-card.js";

import { LinkedInIcon } from "../../../assets/business/linkedin.js";
import { GithubIcon } from "../../../assets/business/github.js";
import { WebsiteIcon } from "../../../assets/business/website.js";
import { EmailIcon } from "../../../assets/business/email.js";

export default {
  title: "Molecules/BusinessCard",
  argTypes: {},
};

const Template = ({ ...args }) => {
  const component = new BusinessCard({ ...args });
  return component.render();
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
      { srcset: "./avatar/avatar.jpg", type: "image/jpeg" },
    ],
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
      { srcset: "./avatar/avatar.jpg", type: "image/jpeg" },
    ],
  },
  name: "Thorsten Kober",
  title: "Lead Software Engineer",
  links: [
    {
      name: "Linked In",
      type: "icon",
      label: LinkedInIcon({}),
      url: "https://www.linkedin.com/in/thorstenkober/",
      target: "_blank",
    },
    {
      name: "Github",
      type: "icon",
      label: GithubIcon({}),
      url: "https://github.com/flashdesignory",
      target: "_blank",
    },
    {
      name: "Website",
      type: "icon",
      label: WebsiteIcon({}),
      url: "https://flashdesignory.github.io/",
      target: "_blank",
    },
    {
      name: "Email",
      type: "icon",
      label: EmailIcon({}),
      url: "mailto:info@flashdesignory.com",
      target: "_blank",
    },
  ],
};
