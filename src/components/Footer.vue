<template>
  <div>
    <footer class="bg-white shadow dark:bg-gray-900">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <RouterLink to="/" class="flex items-center">
            <img
              src="../../public/img/Logosensefondo.png"
              class="h-12 mr-3"
              alt="FrikyBlog Logo"
            />
            <span
              class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
              >Friky Blog</span
            >
          </RouterLink>
          <button
            class="text-white text-2xl hover:underline"
            @click="scrollToTop"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo(0, 0);
};
</script>

<style scoped></style>
