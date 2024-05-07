<template>
  <div
    class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white mb-5"
  >
    <div class="flex justify-center gap-5 items-center mb-8">
      <img class="rounded-full w-12 h-12" :src="avatar" alt="" v-if="avatar" />
      <p class="text-xl text-center">
        {{ postcomment.username }} ha comentado:
      </p>
    </div>

    <p
      class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-900 text-white"
    >
      {{ postcomment.comment }}
    </p>
    <button
      v-if="postcomment.user_id === userId"
      @click="deletComment()"
      class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-900 text-white"
    >
      Borrar
    </button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, watchEffect } from "vue";
import { useUserStore } from "../stores/user";

const user = ref(null);
const avatar = ref(null);

const comment = defineProps({
  postcomment: Object,
  userId: Number,
});

const getUser = async () => {
  console.log("holiiiii");
  if (comment.postcomment) {
    user.value = await useUserStore().getUserNameImageSrc(
      comment.postcomment.user_id
    );
  }
  avatar.value = user.value[0].image_src;
};

const emits = defineEmits(["delete-comment"]);

const deletComment = () => {
  emits("delete-comment", comment.postcomment.id);
};

onMounted(() => {
  getUser();
});

watchEffect(() => {
  getUser();
});
</script>

<style scoped></style>
