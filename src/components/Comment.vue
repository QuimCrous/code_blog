<template>
  <div
    class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white mb-5"
  >
    <p class="text-xl mb-8 text-center">
      {{ postcomment.username }} ha comentado:
    </p>
    <p
      class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-900 text-white"
    >
      {{ postcomment.comment }}
    </p>
  </div>
</template>

<script setup>
const comment = defineProps({
  postcomment: Object,
});
</script>

<style scoped></style>
