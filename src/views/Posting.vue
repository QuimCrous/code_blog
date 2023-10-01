<script setup>
import Navbar from "../components/Navbar.vue";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { usePostStore } from "../stores/posts";
import { useRouter } from "vue-router";

const redirect = useRouter();
const role = ref("null");
const post = ref(null);
const titulo = ref("");
const tags = ref([]);
const boolean = ref(false);

onMounted(() => {
  getUser();
});

async function getUser() {
  await useUserStore().fetchUser();
  try {
    role.value = useUserStore().profile.role;
  } catch (error) {}

  console.log("papapapo3", role.value);
}

const posting = async () => {
  await usePostStore().addPost(titulo.value, post.value, tags.value);

  boolean.value = true;
  redirect.push({ path: "/" });
};
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div
    v-if="role === 'admin'"
    class="h-screen bg-sky-900 bg-opacity-50 flex flex-col justify-start flex-wrap content-center pt-5 w-full text-white"
  >
    <div
      class="md:w-3/4 w-96 my-5 border rounded-md border-sky-800 bg-sky-600 p-5"
    >
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Titulo del Post</label
      >
      <textarea
        id="message"
        rows="1"
        class="block p-2.5 w-full text-sm bg-sky-900 bg-opacity-0 border placeholder-gray-700"
        placeholder="Title of the post"
        v-model="titulo"
      ></textarea>
    </div>
    <div
      class="md:w-3/4 w-96 my-5 border h-96 overflow-y-hidden rounded-md border-sky-800 bg-sky-600 p-5"
    >
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Contenido del Post</label
      >
      <QuillEditor
        theme="snow"
        v-model:content="post"
        content-type="delta"
        placeholder="Content of the post"
      />
    </div>
    <div
      class="md:w-3/4 w-96 my-5 border rounded-md border-sky-800 bg-sky-600 p-5"
    >
      <label
        for="tags_multiple"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Etiquetas</label
      >
      <select
        multiple
        id="tags_multiple"
        class="bg-sky-900 bg-opacity-0 border text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        v-model="tags"
      >
        <option selected>Elige las etiquetas</option>
        <option value="videojuegos">Videojuegos</option>
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
        <option value="musica">Música</option>
        <option value="review">Review</option>
        <option value="personal">Personal</option>
        <option value="programacion">Programación</option>
      </select>
    </div>
    <div class="md:w-3/4 w-96 py-5">
      <button
        class="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-sky-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click.prevent="posting()"
      >
        postear?
      </button>
    </div>
  </div>
  <div>NO ESTAS PERMITIDO ESTAR AQUI!</div>
</template>

<style scoped></style>
