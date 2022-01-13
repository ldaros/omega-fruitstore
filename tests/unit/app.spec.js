// Import the `mount()` method from Vue Test Utils
import { mount, shallowMount } from "@vue/test-utils";
import app from "@/App.vue";

const data = {
  name: "TESTNAME1",
  price: 69.69,
  weight: "1",
  image: "🍊",
  id: 101,
};

test("Pressing plus button adds item to cart", async () => {
  // mount app component
  const wrapper = mount(app);

  // set data
  await wrapper.setData({
    rightNav: false,

    cartItems: [],

    products: [data],
  });

  // Find the plus button
  const plusButton = wrapper.find("#add-to-cart");

  // Click the plus button
  plusButton.trigger("click");

  // expect the cart to have one item
  expect(wrapper.vm.cartItems.length).toBe(1);
});

test("calcTotal function returns correct total", async () => {
  const wrapper = shallowMount(app);

  // set data
  wrapper.setData({
    cartItems: [data, data],
  });

  // get the total
  const total = wrapper.vm.cartCalcTotal();

  // expect the total to be correct
  expect(total).toBe((data.price * 2).toFixed(2));
});
