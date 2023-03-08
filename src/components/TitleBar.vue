<template>
  <div class="title-bar">
    <h3>{{ title }}</h3>
    <slot name="right" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style lang="scss" scoped>
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
