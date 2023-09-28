<script setup>
import Navbar from "../components/Navbar.vue";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { usePostStore } from "../stores/posts";
import DeltaCompProba from "../components/DeltaCompProba.vue";

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
  console.log("probes varies: ", titulo.value);
  console.log("probes varies: ", post.value);
  console.log("probes varies2: ", typeof post.value);
  console.log("probes varies: ", tags.value);
  await usePostStore().addPost(titulo.value, post.value, tags.value);
  console.log("conseguit?");
  boolean.value = true;
};
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div class="h-screen bg-sky-900 bg-opacity-50">
    <div>
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Titulo del Post</label
      >
      <textarea
        id="message"
        rows="1"
        class="block p-2.5 w-full text-sm bg-sky-900 bg-opacity-0 border text-black placeholder-gray-700"
        placeholder="Title of the post"
        v-model="titulo"
      ></textarea>
    </div>
    <div>
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
    <div>
      <label
        for="tags_multiple"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Etiquetas</label
      >
      <select
        multiple
        id="tags_multiple"
        class="bg-sky-900 bg-opacity-0 border text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
    <div>
      <button @click.prevent="posting()">postear?</button>
      <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      <DeltaCompProba :post="post" v-if="boolean" />
    </div>
  </div>
</template>

<style scoped></style>
