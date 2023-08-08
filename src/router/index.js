import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ToolDetails from "../components/ToolDetails.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/featured",
    name: "featured",
    // route level code-splitting
    // this generates a separate chunk (featured.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "featured" */ "../views/FeaturedView.vue"),
  },
  {
    path: "/my-favorites",
    name: "my-favorites",
    component: () =>
      import(
        /* webpackChunkName: "favorites" */ "../views/MyFavoritesView.vue"
      ),
  },
  {
    path: "/community",
    name: "community",
    component: () =>
      import(/* webpackChunkName: "community" */ "../views/CommunityView.vue"),
  },
  {
    path: "/submit-tool",
    name: "submit-tool",
    component: () =>
      import(/* webpackChunkName: "submit" */ "../views/SubmitToolView.vue"),
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/SignInView.vue"),
  },
  {
    path: "/tool/:tool_id",
    name: "ToolDetails",
    component: ToolDetails,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
