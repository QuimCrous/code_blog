<template>
  <div
    class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white"
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

    <DeltaComp class="mb-16" :post="post.content" />
    <ul class="flex flex-wrap items-center justify-center">
      <li
        class="mr-4 hover:underline md:mr-6 capitalize"
        v-for="tag in post.tags"
      >
        {{ tag }}
      </li>
    </ul>
    <div class="flex justify-evenly my-16 flex-wrap">
      <img
        v-for="image in post.images"
        :src="image"
        alt=""
        class="h-auto w-96 rounded-lg mb-5"
        v-if="post.images"
      />
    </div>
    <RouterLink :to="`/post/${post.id}`">{{ post.id }} Link al post</RouterLink>
  </div>
</template>

<script setup>
import DeltaComp from "./DeltaComp.vue";
import { RouterLink, RouterView } from "vue-router";
const postObj = defineProps({
  post: Object,
});
</script>

<style scoped></style>
