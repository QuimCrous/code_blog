<script setup>
import Navbar from "../components/Navbar.vue";
import { onMounted, reactive, ref } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { usePostStore } from "../stores/posts";

const role = ref("null");
const post = ref("");

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
  console.log("probes varies: ", post.value);
  console.log("probes varies2: ", typeof post.value);
  await usePostStore().addPost(post.value);
  console.log("conseguit?");
};
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div class="h-screen bg-sky-900 bg-opacity-50">
    <div>
      <QuillEditor theme="snow" v-model:content="post" content-type="html" />
      <button @click.prevent="posting()">postear?</button>
    </div>
  </div>
</template>
