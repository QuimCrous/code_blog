import { defineStore } from "pinia";
import { supabase } from "../supabase";

// Esta tienda utiliza el Options API
// CUANDO HAYA HECHO PROFILE DESCOMENTAR COSAS!!!
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
    avatarPath: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.getUser();

      if (user) {
        this.user = user;
        if (this.user.data.user !== null) {
          const userId = this.user.data.user.id;
          const { data: profile } = await supabase
            .from("profiles")
            .select()
            .match({ user_id: userId });

          if (profile) {
            this.profile = profile[0];
            /*const { data, error } = await supabase.storage
            .from("avatars")
            .download(this.profile.image_src);
          if (data) this.avatarPath = URL.createObjectURL(data);*/
          }

          console.log("user in store: ", this.user);
          console.log("profile in store: ", this.profile);
        }
      }
    },

    async signUp(email, password) {
      const response = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      console.log("user: ", response.data.user.id);

      const { data: profile } = await supabase.from("profiles").insert([
        {
          user_id: response.data.user.id,
          username: email,
          role: "user",
        },
      ]);

      console.log("PERFIL: ", profile);
    },

    async signIn(email, password) {
      const { user, error } = await supabase.auth.signInWithPassword(
        {
          email: email,
          password: password,
        },
        {
          shouldCreateUser: false,
        }
      );

      if (error) throw error;
      if (user) {
        this.user = user;

        const { data: profile } = await supabase
          .from("profiles")
          .select()
          .match({ user_id: this.user.id });

        if (profile) this.profile = profile[0];
        console.log("profile in store: ", profile);
      }
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
    },

    async modifyProfile(newName, newWebsite, newNickName, newAvatarUrl) {
      if (newName === null) {
        newName = this.profile.name;
      }
      if (newWebsite === null) {
        newWebsite = this.profile.website;
      }
      if (newAvatarUrl === null) {
        newAvatarUrl = this.profile.image_src;
      }
      if (newNickName === null) {
        newNickName = this.profile.nick_name;
      }
      const { data, error } = await supabase
        .from("profiles")
        .update({
          name: newName,
          website: newWebsite,
          image_src: newAvatarUrl,
          nick_name: newNickName,
        })
        .match({ id: this.profile.id });
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
