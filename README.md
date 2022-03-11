# 这是什么？

这是由戚戚小草独立开发的高彷网易云 app，主要使用 React 前端框架开发，其中包含 HTML + CSS + Sass + React + LocalStorage + Cookie + antd-design 等技术手段，主要使用 VScode 编译代码，GitHub 托管代码。
其中包含七大模块：登录模块、注册模块、发现模块、歌手/歌单模块、我的模块、推荐模块、播放器模块。登录模块有对表单的正则校验，通过按钮的 disabled 属性来告知用户表单是否已填写完毕。注册模块可以实现简单的注册功能。发现模块为项目的主页，有简单的轮播图，一些个性化的推荐，搜索框功能齐全，可以获取任何搜索结果，并且能够点击搜索结果跳转至搜索结果。歌手页面可以根据点击的不同获取不同类型的歌手，点击歌手可跳转到歌手详情页，能够查看歌手单曲并且跳转至播放页面播放，歌单页可以显示对应歌单的内容，创建者，及创建者头像，单曲均可点击播放。我的模块能够获取登录用户的头像，昵称，等级，歌单等信息并展示出来。推荐模块可以显示热搜榜单，云音乐推荐榜单，歌手榜单，并且均实现了按需加载。播放器模块能实现对应歌曲的播放，对应 MV 的播放。

## 如何运行？

1、首先安装cnpm，win+R cmd 输入 npm install -g cnpm --registry=https://registry.npm.taobao.org
2、安装nodemon win+R cmd 输入 npm i nodemon -g
3、克隆本项目，打开集成终端 cnpm i 安装所需项目依赖
4、克隆网易云接口项目 地址：https://github.com/Binaryify/NeteaseCloudMusicApi.git
，打开集成终端 cnpm i 安装所需项目依赖
5、运行网易云接口，打开集成终端 nodemon app
6、运行本项目 cnpm start 若提示端口占用 输入 y
7、若没安装 react 脚手架 win+R cmd 输入 npm i -g create-react-app 全局安装 react 脚手架


### 写在最后

本项目仅供学习使用，不做任何商业用途，编辑于 2021/01/16 15:58
