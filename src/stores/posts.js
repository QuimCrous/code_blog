import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// Esta tienda utiliza el Composition API

export const usePostStore = defineStore("posts", () => {
  const postsArr = ref(null);
  const completeArr = ref(null);
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

  const modifyContent = async (id, title, description, priority) => {
    if (title !== "" && description !== "") {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: title,
          description: description,
          priority: priority,
        })
        .match({ id: id });
    }
    if (title === "" && description !== "") {
      console.log("test2");
      const { data, error } = await supabase
        .from("tasks")
        .update({
          description: description,
          priority: priority,
        })
        .match({ id: id });
    }
    if (title !== "" && description === "") {
      console.log("test3");
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: title,
          priority: priority,
        })
        .match({ id: id });
    }
    if (title === "" && description === "") {
      console.log("test3");
      const { data, error } = await supabase
        .from("tasks")
        .update({
          priority: priority,
        })
        .match({ id: id });
    }
  };

  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };
  return {
    fetchPosts,
    addPost,
    deleteTask,
    modifyContent,
    postsArr,
    fetchSinglePost,
  };
});
