<template>
  <transition name="bounce">
    <div v-show="open" id="mySidenav" class="sidenav">
      <div class="icon-container">
        <a @click="closeCart()" class="icon">
          <Icon icon="akar-icons:cart" />
        </a>
      </div>

      <div class="cart-list-container">
        <cartItem
          v-for="item in items"
          :key="item.id + 100"
          :displayItem="item"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { Icon } from "@iconify/vue";
import cartItem from "./cartItem.vue";

export default {
  name: "Cart",
  components: { Icon, cartItem },

  props: {
    open: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    closeCart() {
      this.$emit("closeCart");
    },
  },
};
</script>

<style scoped>
.sidenav {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;

  /* position the element on the right side of the screen */
  top: 0;
  right: 0;

  background-color: #f3f3f3;
  overflow-x: hidden;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  /* slide from right */
  0% {
    transform: translateX(100%);
  }
}

.icon-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem;
  margin-top: 2rem;
  margin-right: 1rem;
}

.icon {
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  color: #d4311b;
}

.icon svg {
  width: 100%;
  height: 100%;
}

.cart-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 0.8rem;
}
</style>
