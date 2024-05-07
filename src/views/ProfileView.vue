<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { useUserStore } from "../stores/user";

const user = ref(null);
const profile = ref(null);

const getUserProfile = async () => {
  await useUserStore().fetchUser();
  user.value = useUserStore().user.data.user;
  profile.value = useUserStore().profile;

  console.log("Hola 1", user.value);
  console.log("Hola 2", profile.value);
};

onMounted(() => {
  getUserProfile();
});
</script>

<template>
  <div class="bg-sky-900 bg-opacity-50 flex flex-col min-h-screen">
    <div
      class="md:w-3/4 w-96 pb-5 mx-auto pt-5 flex flex-col justify-center items-center rounded-md border-sky-800 bg-sky-800 mt-5 text-white text-2xl"
      v-if="profile"
    >
      <div class="my-8">
        <img :src="profile.image_src" alt="" />
      </div>
      <div>
        <p class="my-8 bg-sky-900 p-4">User Name: {{ profile.username }}</p>
        <p class="my-8 bg-sky-900 p-4">E-mail: {{ user.email }}</p>
      </div>

      <RouterLink
        to="/profile-edit"
        class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >Editar</RouterLink
      >
    </div>
  </div>
</template>

<style></style>
