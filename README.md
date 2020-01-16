# management-html (vue + elementUI)
管理端页面<br>
[预览地址](https://www.kamingpan.com/management-html/ "management-html")

## 项目介绍
该项目是vue + webpack + elementUI的前端页面，在[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin "vue-element-admin")（在此特别感谢作者[@PanJiaChen](https://github.com/PanJiaChen "@PanJiaChen")的开源！！！）的基础上做修改和调整，以适配后端框架，因此需要和后台管理端接口搭配使用，接口详见传送门：[管理端接口源码](https://github.com/kamingpan/infrastructure/tree/master/infrastructure-management "infrastructure-management")

## 项目下载
```
git clone https://github.com/kamingpan/management-html.git

cd management-html
```

## 项目安装
```
npm install
```

### 修改配置文件
.env.development（开发环境配置）<br>
.env.production（生产环境配置）<br>
vue.config.js（本地代理配置）

### 编译和运行（开发环境）
```
npm run serve
```

### 编译和打包（生产环境）
```
npm run build
```

### 访问本地页面
浏览器输入地址：http://127.0.0.1:8081/ 访问

### 注意事项
因为font-awesome使用的版本是4.7.0，所以font-awesome-picker要使用1.1.6版本以兼容，详见：[font-awesome-picker](https://github.com/laistomazz/font-awesome-picker "font-awesome-picker")

#### 技术交流
如果您有任何疑问或者建议，可以通过邮箱联系本人：`kamingpan@qq.com`。
