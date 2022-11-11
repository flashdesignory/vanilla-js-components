import { BusinessCard } from "./business-card.js";

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
    src: "./misc/image-1.jpg",
    width: "140",
    height: "140",
    alt: "Thorsten Kober",
  },
  name: "Thorsten Kober",
  title: "Lead Software Engineer",
};

export const Links = Template.bind({});
Links.args = {
  image: {
    src: "./misc/image-1.jpg",
    width: "140",
    height: "140",
    alt: "Thorsten Kober",
  },
  name: "Thorsten Kober",
  title: "Lead Software Engineer",
  links: [
    {
      name: "Hulu",
      icon: "work",
      url: "https://www.hulu.com/",
    },
    {
      name: "Los Angeles, CA",
      icon: "location",
      url: "https://www.google.com/maps/place/Los+Angeles,+CA",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/thorstenkober/",
    },
  ],
};
