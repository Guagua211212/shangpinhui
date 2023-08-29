<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- 下面按钮的功能只进行路由跳转，可以用声明式导航 -->
            <!-- <a href="###">登录</a> -->
            <!-- <a href="###" class="register">免费注册</a> -->
            <!-- 声明式导航：无比要有 to 属性 -->
            <router-link to="/Login">登录</router-link>
            <router-link to="/Register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/Home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderVue",
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    //搜索按钮的回调函数：需要向Search路由进行跳转
    goSearch() {
      //路由传参
      //第一种：字符串形式
      // this.$router.push(
      //   "/Search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );
      //第二种：模板字符串
      // this.$router.push(
      //   `/Search/${this.keyword}?k=${this.keyword.toUpperCase()}`
      // );
      //第三种：对象
      //用对象的写法时，params参数不能用path，只能用name
      // this.$router.push({
      //   name: "Search",
      //   params: { keyword: this.keyword },
      //   query: { k: this.keyword.toUpperCase() }
      // });
      /*************************************************************************************************************************************************** */
      /*************************************************************************************************************************************************** */
      /******************************************************************************************************************************** ******************* */
      //面试题1 ：路由传递参数（对象写法）path 是否可以结合 params 参数一起使用？
      // this.$router.push({
      //   path: "/Search",
      //   params: { keyword: this.keyword },
      //   query: { k: this.keyword.toUpperCase() }
      // });
      //点击搜索按钮后不能跳转
      //答：路由跳转传递参数时，对象写法可以是path、name形式，但是需要注意的是，path这种写法不能与params参数一起使用。
      /*************************************************************************************************************************************************** */
      //面试题2：如何指定 params 参数可传不可传？
      // this.$router.push({
      //   name: "Search",
      //   query: { k: this.keyword.toUpperCase() }
      // });
      //答：在配置路由的时候，在占位的后面加上一个问号，则这个params参数可以传，也可以不传。如果在路由路径上占位了且不加问号且不传params参数，那么路由跳转后的路径会有问题。
      /*************************************************************************************************************************************************** */
      //面试题3：params 参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      // this.$router.push({
      //   name: "Search",
      //   params: { keyword: "" || undefined },
      //   query: { k: this.keyword.toUpperCase() }
      // });
      //答：使用undefined解决：params参数可以传也可以不传（空的字符串）
      /*************************************************************************************************************************************************** */
      //面试题4：路由组件能不能传递 props 数据？
      //props一般用于父子组件通信
      //可以的：三种写法
      //详解在router文件夹index.vue文件中
      if (this.$route.query) {
        this.$router.push({
          name: "Search",
          params: { keyword: this.keyword || undefined },
          query: { k: this.keyword.toUpperCase() }
        });
      }
    }
  }
};
</script>

<style lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
