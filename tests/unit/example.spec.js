// Import the `mount()` method from Vue Test Utils
import { mount } from "@vue/test-utils";
import Product from "@/components/Product.vue";

const data = {
  name: "TESTNAME1",
  price: 69.69,
  weight: "1",
  image: ".../",
  id: 101,
};

test("renders product component", () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(Product, { propsData: { product: data } });

  // Find the product name using class name
  const productName = wrapper.find(".product-name");

  // Expect the product name to be the same as the data
  expect(productName.text()).toBe("TESTNAME1");

  // Find the product price using id
  const productPrice = wrapper.find("#prod-price");

  // Expect the product price to be the same as the data
  expect(productPrice.text()).toBe("$69.69");
});
