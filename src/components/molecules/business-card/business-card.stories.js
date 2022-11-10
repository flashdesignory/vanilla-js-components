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
Simple.args = {};
