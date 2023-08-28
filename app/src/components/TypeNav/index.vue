<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派|事件代理 -->
      <div @mouseleave="leaveIndex" @mouseenter="Entershow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 一级分类 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >
                    {{ c1.categoryName }}--{{ index }}
                  </a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none'
                  }"
                >
                  <!-- 二级分类 -->
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <!-- 三级分类 -->
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//这种引入方式，是把lodash的全部功能引入
// import _ from "lodash";
//最好还是按需引入功能
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true
    };
  },
  //组件挂载完毕：可以向服务器发请求
  mounted() {
    // //通知Vuex发请求，获取数据，存储于仓库中
    // this.$store.dispatch("categoryList");
    //当组件挂载完毕，让show属性变成false
    //如果不是home路由组件，将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候会立即执行一次。
      //注入一个参数state，其实际为大仓库中的数据
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    //鼠标进入，修改响应式数据currentIndex属性
    // changeIndex(index) {
    //   // alert(index); //index就是鼠标移上某一个一级分类的索引值
    //   //正常情况，用户慢慢操作：鼠标进入每一个一级分类h3，都会触发鼠标进入事件。
    //   //非正常情况，用户操作很快：本身全部的一级分类都应该触发鼠标进入事件，但是实际上只有部分h3触发了。
    //   //就是由于用户行为过快，导致浏览器反应不过来。当前回电函数中有一些大量业务，有可能出现卡顿现象。
    //   this.currentIndex = index;
    //   // console.log("鼠标进入", index);
    // },
    // changeIndex: _.throttle(function (index) {
    //   //这里是全部引入的写法

    changeIndex: throttle(function (index) {
      //这里是按需引入的写法，只引入throttle
      //throttle函数的回调不要用箭头函数，会有上下文的this问题
      this.currentIndex = index;
      // console.log("鼠标进入", index);
    }, 50),
    //鼠标移出
    leaveIndex() {
      //鼠标移除，currentIndex变回-1
      this.currentIndex = -1;
      if (this.$route.path != "/Home") {
        this.show = false;
      }
    },
    //进行路由跳转得回调函数
    goSearch(event) {
      //最好的解决办法是：编程导航 + 事件的委派
      //利用事件的委派存在的一些问题：1：点击的一定是a标签  2：如何获取参数【1、2、3级分类的产品的名称和id】
      //存在的问题：事件委派，是把全部子节点【h3，dt，dl，em】的事件委派给父亲节点
      //点击a标签的时候，才进行路由跳转【怎么确定当前点击的一定是a标签】
      //存在另一个问题：点击的a标签如何区分一级、二级、三级分类

      //第一个问题：把子节点当中的a标签，我加上自定义属性data-categoryName，其余子节点不加。
      let element = event.target;
      //获取到当前触发事件的节点【h3，dt，dl，em】，需要带有data-categoryName属性，这样节点一定是a标签
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性的值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //如果标签身上有categoryName一定是a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "Search" };
        let query = { categoryName: categoryname };
        //一二三级分类的a标签
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2id = category2id;
        } else {
          query.category3id = category3id;
        }
        //整理完参数
        location.query = query;
        //路由跳转
        this.$router.push(location);
      }
    },
    //鼠标移入，让商品分类列表进行展示
    Entershow() {
      this.show = true;
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入的状态）
    .sort-enter {
      height: 0;
    }
    //过渡动画的结束状态
    .sort-enter-to {
      height: 461px;
    }
    //过渡动画的时间、速率
    .sort-enter-active {
      transition: all 0.05s linear;
    }
  }
}
</style>
