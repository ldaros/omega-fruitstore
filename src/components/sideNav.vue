<template>
  <div v-show="open" :class="getClass()">
    <nav class="navbar d-flex">
      <button
        :class="{ btn: true, 'btn-danger': true, 'order-2': flip }"
        @click="$emit('closeSelf')"
      >
        X
      </button>

      <h3 class="fs-4">{{ title }}</h3>
    </nav>

    <!-- Line -->
    <hr data-v-0f355728="" />

    <!-- children go here -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "sideNav",

  props: {
    open: {
      type: Boolean,
      default: false,
    },

    flip: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: "Title",
    },
  },

  methods: {
    getClass() {
      return {
        "container-md": true,
        "w-md-30": true,
        "position-fixed": true,
        "top-0": true,
        "h-100": true,
        "bg-light": true,
        shadow: true,
        "p-3": true,
        "overflow-auto": true,
        "right-0": this.flip,
      };
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .w-md-30 {
    width: 30% !important;
  }

  .right-0 {
    right: 0 !important;
  }
}
</style>
