<script setup>
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { usePostStore } from "../stores/posts";
import DeltaComp from "../components/DeltaComp.vue";
import Post from "../components/Post.vue";

const posts = ref([]);

const getPost = async () => {
  await usePostStore().fetchPosts();
  posts.value = usePostStore().postsArr;
};

getPost();
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div
    class="h-screen bg-sky-900 bg-opacity-50 flex flex-col justify-start flex-wrap content-center pt-5"
  >
    <div class="w-3/4" v-for="post in posts" :key="post.id">
      <Post :post="post" />
      <p>--------------</p>
    </div>
  </div>
</template>
