// Import the `mount()` method from Vue Test Utils
import { shallowMount } from "@vue/test-utils";
import product from "@/components/product.vue";

const data = {
  name: "TESTNAME1",
  price: 69.69,
  weight: "1",
  image: "...",
  id: 101,
};

test("Renders product component", async () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = shallowMount(product, { propsData: { product: data } });

  // Find the product name using class name
  const productName = wrapper.find(".card-title");

  // Expect the product name to be the same as in data
  expect(productName.text()).toBe(data.name);

  // Find the product price using id
  const productPrice = wrapper.find("#prod-price");

  // Expect the product price to be the same as in data
  expect(productPrice.text()).toBe("$" + data.price.toString());
});
