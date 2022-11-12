import { AutoComplete } from "./autocomplete.js";
import { DynamicItem } from "./dynamic-item.js";

export default {
  title: "Organisms/AutoComplete",
  argTypes: {
    title: { control: "text" },
    errorText: { control: "text" },
    url: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const ac = new AutoComplete({ ...args });
  return ac.render();
};

export const Dynamic = Template.bind({});
Dynamic.args = {
  title: "Google Search",
  errorText: "No results - try another search!",
  url: "https://www.googleapis.com/customsearch/v1?key=AIzaSyBZWQpTfpiPAM11PHRG6z35zUjp_0oc1BE &cx=836cb9c197a4047d0&q=",
  responseParser: (data) =>
    data?.items?.map((item) => ({ title: item.title, link: item.link })),
  ItemClass: DynamicItem,
};
