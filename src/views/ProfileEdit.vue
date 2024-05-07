<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { useUserStore } from "../stores/user";

const user = ref(null);
const profile = ref(null);
const selectedImage = ref("");
const selectedUserName = ref("");
const imageUrls = ref([
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/AVsachiel.png?t=2024-04-29T10%3A55%3A43.425Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Av%20Pikachu.png?t=2024-04-29T10%3A55%3A59.774Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Avkorok.png?t=2024-04-29T10%3A56%3A11.809Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Avlilith.png?t=2024-04-29T10%3A56%3A46.300Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Avlink.png?t=2024-04-29T10%3A57%3A00.080Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Avnaruto.png?t=2024-04-29T10%3A57%3A14.811Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Avnavi.png?t=2024-04-29T10%3A59%3A23.911Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Avprimo.png?t=2024-04-29T10%3A59%3A39.536Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Avsandriel.png?t=2024-04-29T11%3A00%3A53.579Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Avshamshel.png?t=2024-04-29T11%3A01%3A11.729Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Avyiga.png?t=2024-04-29T11%3A01%3A26.592Z",
  "https://eididoxcdtwwxnfqlthx.supabase.co/storage/v1/object/public/images/profileAvatars/Avtarta.png?t=2024-04-29T11%3A14%3A34.882Z",
]);

const getUserProfile = async () => {
  await useUserStore().fetchUser();
  user.value = useUserStore().user.data.user;
  profile.value = useUserStore().profile;
  selectedImage.value = useUserStore().profile.image_src;
  selectedUserName.value = useUserStore().profile.username;

  console.log("Hola 1", user.value);
  console.log("Hola 2", profile.value);
};

const selectImage = (imageURl) => {
  selectedImage.value = imageURl;
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
      <div>
        <h2 class="text-lg font-bold">Selecciona una imagen:</h2>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <div v-for="(image, index) in imageUrls" :key="index">
            <img
              :src="image"
              class="cursor-pointer w-32 h-32 object-cover"
              @click="selectImage(image)"
              :class="{ 'border-4 border-blue-500': selectedImage === image }"
            />
          </div>
        </div>
        <div v-if="selectedImage" class="mt-4">
          <h3 class="text-lg font-bold">Imagen Seleccionada:</h3>
          <img
            :src="selectedImage"
            class="mt-2 w-48 h-48 object-cover"
            alt="Imagen Seleccionada"
          />
        </div>
        <div class="mt-8">
          <label for="username" class="block text-lg font-bold"
            >Nombre de Usuario:</label
          >
          <input
            v-model="selectedUserName"
            type="text"
            id="username"
            name="username"
            class="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-700"
            placeholder="Introduce tu nombre de usuario"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
