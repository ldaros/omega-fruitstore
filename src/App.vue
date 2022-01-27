<template>
  <!-- Navigation -->
  <nav class="container navbar navbar-light">
    <button
      type="button"
      class="btn btn-outline-success fs-3"
      @click="toggleLeftNav"
      id="nav-left-open"
    >
      📖
    </button>

    <h1 class="navbar-brand fs-3">🍆 Fruit 🍆</h1>

    <button
      type="button"
      class="btn btn-outline-success fs-3"
      @click="toggleRightNav"
      id="nav-right-open"
    >
      🛒
    </button>
  </nav>

  <!-- Product List -->
  <div class="container">
    <h1 class="fs-1 my-3 mb-4">Buy fresh fruits and vegetables</h1>
    <hr data-v-0f355728="" />

    <div class="row">
      <product
        v-for="product in products"
        :key="product.id"
        :product="product"
        @onAdd="cartAddItem"
      />
    </div>
  </div>

  <!-- Left side nav -->
  <sideNav title="Info 📖" :open="leftNav" @closeSelf="toggleLeftNav">
    <h4 class="fs-3 text-center">🍆 Fruit 🍆</h4>

    <p class="fs-5 text-center">
      omega-3-rich, high-quality fruits, fresh from the farm, with a delicious
      taste.
    </p>

    <p class="fs-light text-center">
      <strong>Fruit</strong> is a project by
      <a href="https://github.com/ldaros" target="_blank"> @ldaros </a>
    </p>
  </sideNav>

  <!-- Right side nav -->
  <sideNav
    title="🛒 Shopping Cart"
    :flip="true"
    :open="rightNav"
    @closeSelf="toggleRightNav"
  >
    <cartItem
      v-for="item in cartItems"
      :key="item.id + 100"
      :displayItem="item"
      @onRemove="cartRemItem(item)"
    />

    <p class="fs-3 mt-3">💵 Total: ${{ cartCalcTotal() }}</p>
    <button
      type="button"
      class="btn btn-success btn-block mt-3"
      @click="buyCart"
      v-bind:class="{ disabled: cartItems.length === 0 }"
      id="buy-cart"
    >
      Checkout 💰

      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        v-if="cartLoading"
      >
      </span>
    </button>
  </sideNav>

  <div
    class="toast fixed-center fade"
    role="alert"
    v-bind:class="{
      show: toast,
    }"
  >
    <div class="toast-header bg-success text-light">
      <strong class="me-auto">Transaction complete! 🛍️</strong>
      <button
        type="button"
        class="btn-close btn-close-white"
        @click="toast = false"
      ></button>
    </div>
    <div class="toast-body">
      <p class="fs-6">Items successfully bought</p>
      <p class="fs-5">Thank you for shopping with us!</p>
    </div>
  </div>
</template>

<script>
import product from "./components/Product.vue";
import sideNav from "./components/sideNav.vue";
import cartItem from "./components/cartItem.vue";

const api =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3100"
    : "https://ofruit-api.herokuapp.com";

const productsDir = api + "/products";
const buyDir = api + "/buy";

export default {
  name: "App",
  components: { product, sideNav, cartItem },
  data() {
    return {
      // products are loaded from the server
      products: null,

      // Shopping Cart
      cartItems: [],
      cartLoading: false,
      toast: false,

      // Controls opening and closing of side navs
      leftNav: false,
      rightNav: false,
    };
  },
  created: function () {
    this.getProducts();
  },

  methods: {
    toggleRightNav() {
      this.rightNav = !this.rightNav;
    },
    toggleLeftNav() {
      this.leftNav = !this.leftNav;
    },
    cartAddItem(item) {
      this.cartItems.push(item);
    },
    cartRemItem(item) {
      this.cartItems.splice(this.cartItems.indexOf(item), 1);
    },
    //** Calculate total cart price */
    cartCalcTotal() {
      let total = 0;
      this.cartItems.forEach((item) => {
        total += item.price;
      });
      return total.toFixed(2);
    },
    //** Get product catalog from server */
    getProducts() {
      // fix for unit tests
      if (process.env.NODE_ENV == "test") return;

      fetch(productsDir)
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        });
    },
    //** Creates an array containing ids from products in cart */
    listCart(cartItems) {
      let cart = [];
      cartItems.forEach((item) => {
        cart.push(item.id);
      });
      return cart;
    },
    //** Sends the cart to the server */
    buyCart() {
      if (this.cartItems.length == 0) return;

      this.cartLoading = true;
      document.getElementById("buy-cart").classList.add("disabled");

      fetch(buyDir, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bProducts: this.listCart(this.cartItems),
        }),
      }).then((response) => {
        this.cartLoading = false;
        document.getElementById("buy-cart").classList.remove("disabled");

        if (response.status != 200) return alert("Error: " + response.status);

        this.toast = true;
        this.cartItems = [];
        this.getProducts(); // refresh products
      });
    },
  },
};
</script>

<style>
.fixed-center {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
