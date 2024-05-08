<template>
  <Navbar />
  <div class="bg-sky-900 bg-opacity-50 flex flex-col min-h-screen">
    <div class="md:w-3/4 w-96 pb-5 mx-auto pt-5">
      <Post :post="selectedPost" v-if="boolean" />
    </div>
    <div
      class="md:w-3/4 w-96 pb-5 mx-auto pt-5 border-2 rounded-md border-sky-800 bg-sky-800 text-white flex flex-col mb-5"
    >
      <label for="comment" class="mx-5">Comentar: {{ username }}</label>
      <textarea
        class="mx-5 bg-sky-900"
        name="comment"
        id="comment"
        cols="30"
        rows="5"
        v-model="comment"
      ></textarea>
      <div class="flex justify-center mt-5">
        <button
          class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-900 text-white"
          @click="postComment()"
        >
          Comentar
        </button>
      </div>
    </div>
    <div class="md:w-3/4 w-96 pb-5 mx-auto pt-5">
      <div
        v-if="boolean2"
        v-for="comment in paginatedComments"
        :key="comment.id"
      >
        <Comment
          :postcomment="comment"
          :userId="userId"
          @delete-comment="deleteComment"
        />
      </div>
      <div v-else>lolololo</div>
      <div>
        <button
          class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white mb-5"
          @click="previousPage"
          :disabled="currentPage === 1"
        >
          Anterior
        </button>
        <span
          class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white mb-5 mx-5"
          >{{ currentPage }} / {{ totalPages }}</span
        >
        <button
          class="border-2 rounded-md py-5 px-5 border-sky-800 bg-sky-800 text-white mb-5"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { usePostStore } from "../stores/posts";
import Navbar from "../components/Navbar.vue";
import Post from "../components/Post.vue";
import { useUserStore } from "../stores/user";
import { useCommentStore } from "../stores/comments";
import Comment from "../components/Comment.vue";

const route = useRoute();
const selectedPost = ref(null);
const boolean = ref(false);
const boolean2 = ref(false);
const username = ref("");
const userStore = useUserStore();
const comment = ref("");
const userId = ref(null);
const userProfile = ref(null);
const commentArr = ref(null);
const currentPage = ref(1);
const pageSize = ref(10);

const getPostById = async () => {
  const postId = route.params.postId;

  const response = await usePostStore().fetchSinglePost(postId);
  selectedPost.value = response[0];
  boolean.value = true;
};

const getComments = async () => {
  const postId = route.params.postId;
  const response = await useCommentStore().fetchComments(postId);
  commentArr.value = response;
  boolean2.value = true;
};

async function getUser() {
  await userStore.fetchUser();
  try {
    username.value = userStore.user.data.user.email;
    userId.value = userStore.profile.id;
    userProfile.value = userStore.profile.image_src;
  } catch (error) {
    username.value = "";
  }
}

const postComment = async () => {
  const postId = route.params.postId;
  await useCommentStore().addComment(
    postId,
    comment.value,
    userId.value,
    username.value
  );

  comment.value = "";
  getComments();
};

const deleteComment = async (evt) => {
  await useCommentStore().deleteComment(evt);
  getComments();
};

const paginatedComments = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return commentArr.value ? commentArr.value.slice(startIndex, endIndex) : [];
});

const totalPages = computed(() => {
  return Math.ceil(
    (commentArr.value ? commentArr.value.length : 0) / pageSize.value
  );
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(() => {
  getPostById();
  getUser();
  getComments();
});
</script>

<style scoped></style>
