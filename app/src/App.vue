<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在Login、Register隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header/indexVue.vue";
import Footer from "./components/Footer/indexVue.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style></style>
