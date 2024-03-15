<template>
  <div
    class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white mb-5"
  >
    <div class="flex justify-center gap-5 items-center mb-8">
      <img class="rounded-full w-12 h-12" src="/img/emot11.png" alt="" />
      <p class="text-xl text-center">
        {{ postcomment.username }} ha comentado:
      </p>
    </div>

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
