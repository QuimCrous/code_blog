<template>
  <div>
    <header>
      <Navbar />
    </header>
    <h2>Hola :)</h2>
    <p v-if="boolean">{{ selectedPost.title }}</p>
    <Post :post="selectedPost" v-if="boolean" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { usePostStore } from "../stores/posts";
import Navbar from "../components/Navbar.vue";
import Post from "../components/Post.vue";

const route = useRoute();
const selectedPost = ref(null);
const boolean = ref(false);

const getPostById = async () => {
  const postId = route.params.postId;

  const response = await usePostStore().fetchSinglePost(postId);
  selectedPost.value = response[0];
  console.log("papapapapa papa: ", selectedPost.value);
  console.log("2: ", selectedPost.value.title);
  boolean.value = true;
};

onMounted(() => {
  getPostById();
});
</script>

<style scoped></style>