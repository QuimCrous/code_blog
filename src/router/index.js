import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignIn from "../components/SignIn.vue";
import Auth from "../views/Auth.vue";
import SignUp from "../components/SignUp.vue";
import Posting from "../views/Posting.vue";
import PostView from "../views/PostView.vue";
import ProfileView from "../views/ProfileView.vue";
import ProfileEdit from "../views/ProfileEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/posting",
      name: "posting",
      component: Posting,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/profile-edit",
      name: "profile-edit",
      component: ProfileEdit,
    },
    {
      path: "/post/:postId",
      name: "post",
      component: PostView,
    },
    {
      path: "/auth",
      component: Auth,
      children: [
        { path: "login", component: SignIn },
        { path: "signup", component: SignUp },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
