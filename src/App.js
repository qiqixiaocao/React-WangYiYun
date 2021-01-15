import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import "antd-mobile/dist/antd-mobile.css";
import "./app.css";
//引入所需组件
import Home from "./pages/home";
import Mine from "./pages/mine";
import Userinfo from "./pages/userinfo";
import Musiclist from "./pages/musiclist";
import Musicplayer from "./pages/musicplayer";
import Login from "./pages/login";
import MVPlayer from "./pages/mvplayer";
import Singer from "./pages/singer";
import Recommend from "./pages/recommend";
import SingerDetail from "./pages/singerdetail";
function ProtectedRoute(props) {
  const isLogin = localStorage.getItem("userID") ? true : false; //判断是否登录
  const { children, ...rest } = props; //children是原有的路由地址
  return (
    <Route
      {...rest}
      render={() => (isLogin ? children : <Redirect to="/login" />)} //如果没有登录就强制跳到登录页，如果有的话还是children,因为children是默认路由，就好比'/home',放行
    />
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* 需要登录拦截这样写 */}
          <ProtectedRoute path="/singer">
            <Singer />
          </ProtectedRoute>
          <ProtectedRoute path="/recommend">
            <Recommend />
          </ProtectedRoute>
          <ProtectedRoute path="/mine">
            <Mine />
          </ProtectedRoute>
          {/* 不需要登录拦截这样写 */}
          {/* 跟路由写最下面 */}
          <Route path="/musiclist" component={Musiclist} />
          <Route path="/musicplayer" component={Musicplayer} />
          <Route path="/userinfo" component={Userinfo} />
          <Route path="/login" component={Login} />
          <Route path="/mvplayer" component={MVPlayer} />
          <Route path="/singerdetail" component={SingerDetail} />
          <ProtectedRoute path="/">
            <Home />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
