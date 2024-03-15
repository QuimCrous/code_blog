<template>
  <div class="bg-sky-900 bg-opacity-50 flex flex-col min-h-screen">
    <header>
      <Navbar />
    </header>
    <div class="md:w-3/4 w-96 pb-5 mx-auto pt-5">
      <Post :post="selectedPost" v-if="boolean" />
    </div>
    <div
      class="md:w-3/4 w-96 pb-5 mx-auto pt-5 border-2 rounded-md border-sky-800 bg-sky-800 text-white flex flex-col mb-5"
    >
      <label for="comment" class="mx-5">Commentar: {{ username }}</label>
      <textarea
        class="mx-5 bg-sky-900"
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        v-model="comment"
      ></textarea>
      <button @click="postComment()">Commentar</button>
    </div>
    <div class="md:w-3/4 w-96 pb-5 mx-auto pt-5">
      <div v-if="boolean2" v-for="comment in commentArr">
        <Comment :postcomment="comment" />
      </div>
      <div v-else>lolololo</div>
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

const getPostById = async () => {
  const postId = route.params.postId;

  const response = await usePostStore().fetchSinglePost(postId);
  selectedPost.value = response[0];
  console.log("papapapapa papa: ", selectedPost.value);
  console.log("2: ", selectedPost.value.title);
  boolean.value = true;
};

const getComments = async () => {
  const postId = route.params.postId;
  const response = await useCommentStore().fetchComments(postId);
  commentArr.value = response;
  console.log("entro aqui?");
  console.log("entro aqui?", commentArr.value);
  for (let index = 0; index < commentArr.value.length; index++) {
    console.log(commentArr.value[index]);
  }
  boolean2.value = true;
  console.log("entro aqui?", boolean2.value);
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
  console.log("pero pero", username.value);
  console.log("yo ya no se que mas", userId.value);

  await useCommentStore().addComment(
    postId,
    comment.value,
    userId.value,
    username.value
  );

  comment.value = "";
};

onMounted(() => {
  getPostById();
  getUser();
  getComments();
});
</script>

<style scoped></style>
