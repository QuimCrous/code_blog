import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// Esta tienda utiliza el Composition API

export const usePostStore = defineStore("posts", () => {
  const postsArr = ref(null);
  const selectedPost = ref(null);
  const fetchPosts = async () => {
    const { data: posts } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });
    postsArr.value = posts;
    /*
    completeArr.value = tasks.filter((task) => task.is_complete);
    incompleteArr.value = tasks.filter((task) => !task.is_complete);*/
    return postsArr.value;
  };

  const fetchSinglePost = async (postId) => {
    const { data: post } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId);
    selectedPost.value = post;

    return selectedPost.value;
  };

  const addPost = async (title, content, tags) => {
    /*console.log(useUserStore().user.id);*/
    const { data, error } = await supabase.from("posts").insert([
      {
        content: content,
        title: title,
        tags: tags,
      },
    ]);
  };

  const modifyPost = async (id, title, content, tags) => {
    const { data, error } = await supabase
      .from("posts")
      .update({
        title: title,
        content: content,
        tags: tags,
      })
      .match({ id: id });
  };

  const deletePost = async (id) => {
    const { data, error } = await supabase.from("posts").delete().match({
      id: id,
    });
  };
  return {
    fetchPosts,
    addPost,
    deletePost,
    modifyPost,
    postsArr,
    fetchSinglePost,
  };
});
