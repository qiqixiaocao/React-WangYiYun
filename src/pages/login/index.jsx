import React, { Component } from "react";
import axios from "axios";
import { message, Input, Button } from "antd";
import "antd/dist/antd.css";
import CoverImg from "./wangyi-cover.jpeg";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { phone: "", password: "" };
  }
  //获取文本框的phone
  getuser = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };
  //获取文本框的password
  getpwd = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  //登录
  login = async () => {
    if (this.state.phone && this.state.password) {
      await axios
        .get("http://localhost:3000/login/cellphone", {
          params: {
            phone: this.state.phone,
            password: this.state.password,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            message.success("登录成功！", 3);
            localStorage.setItem("userID", res.data.profile.userId);
            this.props.history.push("/"); //路由跳转
          } else {
            message.error("登录失败，请检查手机号密码是否正确！", 2);
            this.setState({
              phone: "",
              password: "",
            });
          }
        });
    }
  };
  //去注册页面
  goUserinfo = () => {
    this.props.history.push("/userinfo"); //路由跳转
  };
  render() {
    const { phone, password } = this.state;
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          backgroundImage: `url(${CoverImg})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "18%",
            width: "90%",
            marginLeft: "5%",
          }}
        >
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <span
              style={{
                float: "left",
                fontSize: "0.4rem",
                lineHeight: "0.8rem",
                color: "#fff",
              }}
            >
              *手机号：
            </span>
            <Input
              type="text"
              placeholder="请输入手机号"
              value={phone}
              onChange={this.getuser}
              style={{
                width: "73%",
                float: "right",
                height: "0.8rem",
                borderRadius: "0.4rem",
              }}
            />
          </div>
          <div
            style={{
              overflow: "hidden",
              marginTop: "0.4rem",
            }}
          >
            <span
              style={{
                float: "left",
                fontSize: "0.4rem",
                lineHeight: "0.8rem",
                color: "#fff",
              }}
            >
              *密码：
            </span>
            <Input.Password
              placeholder="请输入密码"
              value={password}
              onChange={this.getpwd}
              style={{
                float: "right",
                width: "73%",
                height: "0.8rem",
                borderRadius: "0.4rem",
                fontSize: "0.4rem",
              }}
            />
          </div>
          <Button
            ghost
            disabled={!phone && !password}
            onClick={this.login}
            style={{
              width: "70%",
              height: "0.8rem",
              fontSize: "0.4rem",
              borderRadius: "0.4rem",
              marginTop: "0.5rem",
              marginBottom: "0.4rem",
            }}
          >
            登录
          </Button>
          <br />
          <Button
            ghost
            onClick={this.goUserinfo}
            style={{
              width: "70%",
              height: "0.8rem",
              borderRadius: "0.4rem",
              fontSize: "0.4rem",
            }}
          >
            注册
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
