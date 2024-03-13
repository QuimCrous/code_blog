<template>
  <div>
    <p>Aixo es una proba</p>
    <p>{{ postcomment.username }}</p>
    <p>{{ postcomment.comment }}</p>
  </div>
</template>

<script setup>
const comment = defineProps({
  postcomment: Object,
});
</script>

<style scoped></style>
