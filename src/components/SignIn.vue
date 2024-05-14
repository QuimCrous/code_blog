<!-- COMPONENTE BOILERPLATE -->

<template>
  <div
    class="bg-sky-900 h-screen max-w-screen flex flex-col justify-center items-center"
  >
    <div class="border-4 p-5 border-sky-800 bg-sky-400 rounded-lg shadow-2xl">
      <div>
        <h3 class="text-2xl text-center m-5">Bienvenido a Friky Blog</h3>
        <p class="text-center m-3">Videojuegos y Anime. 🎮&📺</p>
      </div>

      <form @submit.prevent="signIn">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >E-mail</label
          >
          <input
            type="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="email"
            placeholder="example@example.com"
            required
            v-model="email"
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Contraseña</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="**********"
            v-model="password"
            required
            v-if="!showPassword"
          />
          <input
            type="text"
            id="passwordShowed"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="**********"
            v-model="password"
            required
            v-else
          />
          <div class="flex items-center my-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              v-model="showPassword"
            />
            <label
              for="default-checkbox"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Mostrar Contraseña</label
            >
          </div>
        </div>
        <div class="flex items-start mb-6"></div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Inicia Sesión
        </button>
      </form>
      <p class="text-center m-8">
        ¿No tienes cuenta?
        <PersonalRouter
          :route="route"
          :buttonText="buttonText"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </p>
      <p class="text-center m-8">
        <PersonalRouter route="/" buttonText="volver al inicio" />
      </p>
    </div>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/signup";
const buttonText = "Crear cuenta";

// Input Fields
const email = ref("");
const password = ref("");

// Router to push user once SignedIn to Home
const redirect = useRouter();

// Error Message
const errorMsg = ref("");

const showPassword = ref(false);

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    const user = await useUserStore().signIn(email.value, password.value);

    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
    console.log(errorMsg.value);
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  errorMsg.value = "error";
};

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style></style>
