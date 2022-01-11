// Import the `mount()` method from Vue Test Utils
import { mount, shallowMount } from "@vue/test-utils";
import Cart from "@/components/Cart.vue";

const shopping_cart = [
  { name: "TESTNAME1", price: 69.69, weight: "1", image: "...", id: 101 },
];

test("Shopping cart opens", async () => {
  // mounting component
  const cart = shallowMount(Cart, { propsData: { open: false } });

  // Expect cart to not be open, .sidenav must not be visible
  let sidenav = cart.find(".sidenav");
  expect(sidenav.isVisible()).toBe(false);

  // Open cart
  await cart.setProps({ open: true });

  // Expect cart to be open, .sidenav must be visible
  sidenav = cart.find(".sidenav");
  expect(sidenav.isVisible()).toBe(true);
});

test("Shopping cart displays a product component", async () => {
  // mounting component
  const cart = mount(Cart, {
    propsData: { items: shopping_cart, open: true },
  });

  // Find the product name using class name
  let product_name = cart.find(".card-title");

  // Expect the product name to be the same as in data
  expect(product_name.text()).toBe(shopping_cart[0].name);
});

test("Shopping cart displays the total price", async () => {
  // mount cart component
  const cart = shallowMount(Cart, {
    propsData: { open: true },
  });

  // Find the total price
  let total_price = cart.find("h2");

  // Expect the total price to be 0
  expect(total_price.text()).toBe("Total: $0.00");

  // Increment total price
  await cart.setProps({ total: 420.0 });

  // Expect the total price to change
  total_price = cart.find("h2");
  expect(total_price.text()).toBe("Total: $420.00");
});
