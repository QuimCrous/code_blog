<template>
  <div
    class="bg-sky-900 h-screen max-w-screen flex flex-col justify-center items-center"
  >
    <div class="border-4 p-5 border-sky-800 bg-sky-400 rounded-lg shadow-2xl">
      <div class="flex justify-center">
        <img src="../../public/img/Logosensefondo.png" class="w-64" alt="" />
      </div>

      <div>
        <h3 class="text-2xl text-center m-5">Bienvenido a Friky Blog</h3>
        <p class="text-center m-3">Videojuegos y Anime. 🎮&📺</p>
      </div>

      <form @submit.prevent="signUp">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900"
            >E-mail</label
          >
          <input
            type="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="email"
            placeholder="example@example.com"
            required
            v-model="email"
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Contraseña</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="**********"
            v-model="password"
            required
            v-if="!showPassword"
          />
          <input
            type="text"
            id="passwordShowed"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="**********"
            v-model="password"
            required
            v-else
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Confirmar Contraseña</label
          >
          <input
            type="password"
            id="confirmPassword"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="**********"
            v-model="confirmPassword"
            required
            v-if="!showPassword"
          />
          <input
            type="text"
            id="confirmPassword"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="**********"
            v-model="confirmPassword"
            required
            v-else
          />
        </div>
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
        <div class="flex items-center justify-center mb-6">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Crear Cuenta
          </button>
          <p class="text-center m-8 ml-12 mr-12 text-xl">
            ¿O ya tienes cuenta? ➡️
          </p>
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          />
        </div>
      </form>

      <p class="text-center m-8 mt-16">
        <PersonalRouter
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          route="/"
          buttonText="Volver al Inicio"
        />
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Inicia sesión";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView

      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style></style>
