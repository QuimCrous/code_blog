import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// Esta tienda utiliza el Composition API

export const useCommentStore = defineStore("comments", () => {
  const commentsArr = ref(null);
  const selectedComment = ref(null);
  const fetchComments = async (postId) => {
    const { data: comments } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("id", { ascending: false });
    commentsArr.value = comments;

    return commentsArr.value;
  };

  const fetchSingleComment = async (commentId) => {
    const { data: comment } = await supabase
      .from("comments")
      .select("*")
      .eq("id", commentId);
    selectedComment.value = comment;

    return selectedComment.value;
  };

  const addComment = async (postId, comment, userId, username) => {
    /*console.log(useUserStore().user.id);*/
    const { data, error } = await supabase.from("comments").insert([
      {
        post_id: postId,
        comment: comment,
        user_id: userId,
        username: username,
      },
    ]);
  };

  const modifyComment = async (id, comment) => {
    const { data, error } = await supabase
      .from("comments")
      .update({
        comment: comment,
      })
      .match({ id: id });
  };

  const deleteComment = async (id) => {
    const { data, error } = await supabase.from("comments").delete().match({
      id: id,
    });
  };
  return {
    fetchComments,
    addComment,
    deleteComment,
    modifyComment,
    commentsArr,
    fetchSingleComment,
  };
});
