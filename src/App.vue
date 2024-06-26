<script setup lang="ts">
import Cardslist from "./components/Cardslist.vue";
</script>

<template>
  <div class="parent-container">
    <Cardslist />
  </div>
</template>

<style scoped>
.parent-container {
  width: 100vw;
  height: 100vh;
  background-color: rgba(138, 43, 226, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
