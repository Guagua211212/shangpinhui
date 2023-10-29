<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑【带有x的结构】-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">x</i>
            </li>
            <!-- 平台售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>
                    综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-direction-down': isAsc,
                        'icon-direction-up': isDesc
                      }"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>
                    价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-direction-down': isAsc,
                        'icon-direction-up': isDesc
                      }"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/Detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>
                      人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >
                      加入购物车
                    </a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">
                      收藏
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器：测试阶段，这里的预设数据将来要替换的 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";

export default {
  name: "Search",
  data() {
    //带给服务器的参数
    return {
      searchParams: {
        //一级分类的id
        category1Id: "",
        //二级分类的id
        category2Id: "",
        //三级分类的id
        category3Id: "",
        //分类名字
        categoryName: "",
        //关键字
        keyword: "",
        //排序：初始的状态应该是综合、降序--1：desc
        order: "1:desc",
        //分页器用的参数，表示当前是第几页
        pageNo: 21,
        //每一页展示的数据个数
        pageSize: 10,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: ""
      }
    };
  },
  components: {
    SearchSelector
  },
  //当组件挂载完毕之前，回执行一次【先于mounted】
  beforeMount() {
    //复杂的写法
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.query.keyword;

    //object.assign：es6新增的语法，合并对象
    //再发请求之前，把接口需要传递的参数，进行整理【在给服务器发请求之前，把参数整理好，服务器就会返回你查询的数组】
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  //组件挂载完毕，执行一次【仅仅一次】
  mounted() {
    //在发请求之前，带给服务器的参数【params参数】发生变化有数值还给服务器
    this.getData();
    // console.log(this.$route.query);
    // console.log(this.$route.params);
    // console.log(this.searchParams);
  },
  computed: {
    ...mapState({
      // goodsList: state => state.Search.searchList.goodsList //这种写法获取数据是可以的，但是比较麻烦，可以在仓库里直接处理好，再获取过来|使用getters
    }),
    //mapGetters里面的写法，传递的是数组，因为getters计算是没有划分模块的【home，Search】
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    //获取search模块展示产品一共多少数据
    ...mapState({
      total: state => state.Search.searchList.total
    })
    //这里是使用mapState行不通，所以用了getter的方法，但是解决了，行不通的原因是Search没有大写
    // ...mapGetters(["total"])
  },
  methods: {
    //向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    //把这次请求封装成一个函数：当你需要再调用的时候调用即可。
    getData() {
      //先测试接口返回的数据格式
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //删除分类的名字
    removeCategoryName() {
      //把带给服务器的参数置空了，还需要向服务器发请求
      //带给服务器的参数说明可有可无的：如果属性为空的字符串还是会把相应的字段带给服务器
      //但是，把相应的字段变为undefined，当前字段不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //地址栏也需要修改，进行路由的跳转【现在的路由跳转只是跳转到自己这里】
      //严谨：本意是删除query参数，如果路径当中出现了params参数不应该删除，但是路由跳转的时候应该带过去。
      if (this.$route.params) {
        this.$router.push({ name: "Search", params: this.$route.params });
      }
    },
    removeKeyword() {
      //给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined;
      //再次发请求
      this.getData();
      //通知兄弟组件Header清楚关键字
      this.$bus.$emit("clear");
      //进行路由的跳转
      this.$router.push({ name: "Search" });
    },
    //自定义事件回调
    trademarkInfo(trademark) {
      //1、整理品牌字段参数，“ID：品牌名”
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求获取search模块列表数据进行展示
      this.getData();
    },
    //删除品牌的信息
    removeTrademark() {
      //将品牌信息置空
      this.searchParams.trademark = undefined;
      //再次发请求
      this.getData();
    },
    //收集平台属性地方回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      // console.log(attr, attrValue);
      //参数格式整理好
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重
      if (this.searchParams.props.indexOf(props) == -1)
        //数组中没有这个属性，返回值是-1
        //if语句中只有一句可以省略大括号，这里就省略了
        this.searchParams.props.push(props);

      //再次发请求
      this.getData();
    },
    //删除售卖属性
    removeAttr(index) {
      // console.log(index);
      //再次整理参数
      this.searchParams.props.splice(index, 1);
      //再次发送请求
      this.getData();
    },
    //排序的操作
    changeOrder(flag) {
      //flag形参：它是一个标记，代表用户点击的是 1综合 还是 2价格
      let originOrder = this.searchParams.order;
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      // console.log(originOrder, originFlag, originSort, flag);
      //准备一个新的order的属性值
      let newOrder = "";
      //这个语句能够确定点击的一定是1综合
      if (flag == originFlag) {
        //点击的是1综合
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        //点击的是2价格
        newOrder = `${flag}:${"desc"}`;
      }
      //将新的order赋予searchParams
      this.searchParams.order = newOrder;
      //再次发请求
      this.getData();
    },
    //自定义事件回调函数----获取当前第几页
    getPageNo(pageNo) {
      //整理带给服务器的参数
      this.searchParams.pageNo = pageNo;
      //再次发请求
      this.getData();
    }
  },
  //数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请
    $route(newvalue, oldvalue) {
      //再次发请求之前，需要整理发给服务器的参数
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      //再次发起ajax请求
      this.getData();
      //每一次请求完毕，应该把相应的1、2、3级分类的id置空，让他接收下一次的相应的1、2、3id
      //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会赋予他新的值
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
