<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import { usePostStore } from "../stores/posts";
import PostPreview from "../components/PostPreview.vue";
import Footer from "../components/Footer.vue";
import Spinner from "../components/Spinner.vue";

const posts = ref([]);
const loading = ref(true); // Estado para controlar la visibilidad del spinner
const currentPage = ref(1); // Página actual
const itemsPerPage = 5; // Número de elementos por página

const getPost = async () => {
  await usePostStore().fetchPosts();
  posts.value = usePostStore().postsArr;
  loading.value = false; // Cambiar el estado después de cargar los datos
};

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return posts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(posts.value.length / itemsPerPage);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  getPost();
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
      <div class="md:w-3/4 w-96" v-for="post in paginatedPosts" :key="post.id">
        <PostPreview :post="post" />
      </div>
      <div class="flex justify-center my-4">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white mb-5 disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="{
            'bg-blue-500 text-white': currentPage === page,
            'bg-gray-300': currentPage !== page,
          }"
          class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white mb-5 mx-5"
        >
          {{ page }}
        </button>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white mb-5 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
/* Puedes agregar tus estilos aquí */
</style>
