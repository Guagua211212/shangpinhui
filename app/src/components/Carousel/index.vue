<template>
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
      <!-- <div class="swiper-slide">
        <img src="./images/floor-1-b02.png" />
      </div>
      <div class="swiper-slide">
        <img src="./images/floor-1-b03.png" />
      </div> -->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入Swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      //为什么watch监听不到list的变化？因为这是父组件home给的数据，传到子组件floor后没有变化，这个数据是一个对象，对象里面的数据该有的都已经有了。
      immediate: true, //不管你数据变化与否，上来立即监听一次
      handler() {
        // console.log("list");
        //之呢个监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定，因此还是需要用nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          });
        });
      }
    }
  }
};
</script>

<style lang="" scoped></style>
