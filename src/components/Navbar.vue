<template>
  <div>
    <nav class="border-gray-200 bg-sky-900">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <RouterLink to="/" class="flex items-center">
          <img
            src="../../public/img/emot11.png"
            class="h-8 mr-3"
            alt="FrikyBlog Logo"
          />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Friky Blog</span
          >
        </RouterLink>
        <button
          @click="showMenu()"
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div :class="navClass" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0"
          >
            <li>
              <p
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Hola {{ username === "" ? "Invitado" : username }}!
              </p>
            </li>
            <li>
              <RouterLink
                to="/"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
                >Home</RouterLink
              >
            </li>
            <li v-if="role === 'admin'">
              <RouterLink
                to="/posting"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >Postear</RouterLink
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >Perfil</a
              >
            </li>
            <li v-if="username === ''">
              <RouterLink
                to="/auth/login"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >Iniciar sesión</RouterLink
              >
            </li>
            <li v-if="username === ''">
              <RouterLink
                to="/auth/signup"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >Registrarse</RouterLink
              >
            </li>
            <li v-else>
              <button
                @click="signOut()"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Finalizar sesión
              </button>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >Sobre FrikyBlog</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { supabase } from "../supabase";
import { onMounted, onUpdated, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const loadedValue = ref(false);
const username = ref("null");
const website = ref(null);
const avatar_url = ref(null);
const name = ref(null);
const nick_name = ref(null);
const redirect = useRouter();
const role = ref("null");
const navClass = ref("hidden w-full md:block md:w-auto");

onMounted(() => {
  getUser();
});

onUpdated(() => {
  getUser();
});

async function getUser() {
  await userStore.fetchUser();
  try {
    username.value = userStore.user.data.user.email;
    role.value = userStore.profile.role;
  } catch (error) {
    username.value = "";
  }
  console.log("papapapo", username.value);
  console.log("papapapo2", role.value);
}

const signOut = async () => {
  try {
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
    await userStore.signOut();

    redirect.push({ path: "/auth/login" });
  } catch (error) {
    console.log(error);
  }
};

const showMenu = () => {
  if (loadedValue.value === false) {
    navClass.value = "w-full md:block md:w-auto p-2";
    loadedValue.value = !loadedValue.value;
  } else {
    navClass.value = "hidden w-full md:block md:w-auto p-2";
    loadedValue.value = !loadedValue.value;
  }
};
</script>

<style scoped></style>
