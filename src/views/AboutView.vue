<script setup>
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="bg-sky-900 bg-opacity-50 flex flex-col min-h-screen">
    <div
      class="md:w-3/4 w-96 pb-5 mx-auto pt-5 flex flex-col justify-center items-center rounded-md border-sky-800 bg-sky-800 mt-5 text-white text-2xl"
    >
      <div class="my-8 w-96">
        <img src="../../public/img/emot12.jpg" alt="" />
      </div>
      <div class="w-3/4">
        <p class="my-8 bg-sky-900 p-4">
          Blog administrado y creado por Joaquim Crous Mayné
        </p>
        <p class="my-8 bg-sky-900 p-4">
          Correo electrónico: joaquimcrous@gmail.com
        </p>

        <p class="my-8 bg-sky-900 p-4">
          Sobre mi: Desarrollador web de frontend y de backend. Me apasiona la
          informática sobretodo la parte de escritura de código y de lógica.
          Decidí enlazar mi pasión por todo lo relacionado con mis aficiones
          frikis con el desarrollo de un blog, poniendo a prueba mis habilidades
          para crear la web y poder dar alas a mi creatividad a la hora de crear
          posts. Espero que si has llegado hasta aquí disfrutes de este blog y
          comentes tu opinión ya que me interesa la interacción con los usuarios
          para poder desarrollar mejor mis proyectos.
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
