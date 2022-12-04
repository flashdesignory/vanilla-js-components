import { ProductList } from "./product-list";
import { data } from "./data.js";

export default {
  title: "Organisms/ProductList",
  argTypes: {
    data: { control: "json" },
    title: { control: "text" },
    errorText: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new ProductList({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data,
  title: "Product List",
  errorText: "No products!",
};
