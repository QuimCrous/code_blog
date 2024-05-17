<script setup>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import { usePostStore } from "../stores/posts";
import PostPreview from "../components/PostPreview.vue";
import Footer from "../components/Footer.vue";
import Spinner from "../components/Spinner.vue";

const posts = ref([]);
const loading = ref(true); // Estado para controlar la visibilidad del spinner

const getPost = async () => {
  await usePostStore().fetchPosts();
  posts.value = usePostStore().postsArr;
};

onMounted(() => {
  getPost();
  setTimeout(() => {
    loading.value = false; // Cambiar el estado después de 5 segundos
  }, 500);
});
</script>

<template>
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center bg-sky-900 bg-opacity-50"
  >
    <Spinner />
  </div>
  <div v-else>
    <Navbar />
    <div
      class="md:h-full bg-sky-900 bg-opacity-50 flex flex-col justify-start flex-wrap content-center pt-5 w-full"
    >
      <div class="md:w-3/4 w-96" v-for="post in posts" :key="post.id">
        <PostPreview :post="post" />
      </div>
    </div>
    <Footer />
  </div>
</template>
