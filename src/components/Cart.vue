<template>
  <transition name="bounce">
    <div v-show="open" class="container sidenav">
      <div class="d-flex justify-content-end my-3 px-1">
        <button
          type="button"
          class="btn btn-danger justify-end"
          @click="closeCart"
        >
          X
        </button>
      </div>

      <h2>Total: ${{ total.toFixed(2) }}</h2>

      <cartItem
        v-for="item in items"
        :key="item.id + 100"
        :displayItem="item"
        @onRemove="$emit('onRemove', item)"
      />
    </div>
  </transition>
</template>

<script>
import cartItem from "./cartItem.vue";

export default {
  name: "Cart",
  components: { cartItem },

  props: {
    open: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
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

  background-color: #ffffff;
  overflow-x: hidden;
}

@media screen and (min-height: 450px) {
  .sidenav {
    max-width: 500px;

    border-left: 1px solid #e5e5e5;
  }
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
</style>
