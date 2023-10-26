1）交易页面完成（商品清单）
动态展示服务器数据完成

2）提交订单
2.1先把支付静态组件先搞定
2.2点击提交订单按钮的时候，还需要向服务器发起一次请求【把支付的一些信息传递给服务器】
/api/order/auth/submitOrder?tradeNo={tradeNo}  post
2.3从今天开始，老师就不再用vuex

3）获取支付信息（不再使用vuex）
别在生命周期函数中用async

4）elementUI使用+按需引入
已经学习过的组件库：
react （vue）：antd【pc】 antd-mobile【移动端】
vue：elementUI【pc】 vant【移动端】
4.1elementUI按需引入，配置文件发生变化，项目是需要重启的

5）二维码生成 qrcode

6）支付业务

7）个人中心