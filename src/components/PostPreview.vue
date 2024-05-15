<template>
  <div
    class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white mb-5"
  >
    <h2 class="text-5xl mb-16 text-center">{{ post.title }}</h2>
    <div class="flex justify-center mb-16">
      <img
        :src="post.images[0]"
        class="h-auto rounded-lg"
        alt=""
        v-if="post.images"
      />
    </div>

    <ul class="flex flex-wrap items-center justify-center">
      <li
        class="mr-4 hover:underline md:mr-6 capitalize"
        v-for="tag in post.tags"
      >
        {{ tag }}
      </li>
    </ul>

    <RouterLink :to="`/post/${post.id}`" @click.native="scrollToTop"
      >Link al post</RouterLink
    >
  </div>
</template>

<script setup>
import DeltaComp from "./DeltaComp.vue";
import { RouterLink, RouterView } from "vue-router";
const postObj = defineProps({
  post: Object,
});

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
</script>

<style scoped></style>
