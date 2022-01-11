<template>
  <div class="header-container">
    <h2 class="header-title">Fresh fruits</h2>
    <a href="javascript(null)" class="header-link">See all</a>
  </div>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.header-link {
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;

  color: #4e9e9e;
}
</style>
