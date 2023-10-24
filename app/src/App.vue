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
  },
  mounted() {
    // console.log("我是根组件");

    //派发一个action，获取商品分类的三级列表的数据
    //通知Vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch("categoryList");
    //虽然main.js文件也只执行一次，但是这个语句不能放在main.js文件中， 因为只有组件才有$store属性。在main.js中，this是undefined。

    //获取用户信息，在首页展示
    this.$store.dispatch("getUserInfo");
  }
};
</script>

<style></style>
