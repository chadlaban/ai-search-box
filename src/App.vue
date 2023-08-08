<template>
  <TopNavigationBar />
  <router-view />
  <WebsiteFooter />
</template>

<script>
import TopNavigationBar from "./components/TopNavigationBar.vue";
import WebsiteFooter from "./components/WebsiteFooter.vue";

export default {
  // router,
  components: {
    TopNavigationBar,
    WebsiteFooter,
  },
};
</script>
