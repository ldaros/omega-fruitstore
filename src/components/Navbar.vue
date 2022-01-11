<template>
  <div id="nav-container">
    <div id="icon1" class="icon"><Icon icon="bi:text-left" /></div>

    <div id="icon2" class="icon" @click="openCart()">
      <Icon icon="akar-icons:cart" />
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "Nav",
  components: { Icon },

  methods: {
    openCart() {
      this.$emit("openCart");
    },
  },
};
</script>

<style scoped>
#nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  margin-top: 1rem;
}

.icon {
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  color: #4fc6a6;
}

.icon svg {
  width: 100%;
  height: 100%;
}
</style>
