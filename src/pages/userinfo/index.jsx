import { Component } from "react";
class Userinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userMessage: "",
    };
  }
  getUser = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  getPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  getMessage = (e) => {
    this.setState({
      userMessage: e.target.value,
    });
  };
  //   userInfo = () => {
  //     if (this.state.username && this.state.password && this.state.userMessage) {
  //       axios
  //         .post("http://localhost:8888/useradd", {
  //           userName: this.state.username,
  //           userPassword: this.state.password,
  //           userMessage: this.state.userMessage,
  //         })
  //         .then((res) => {
  //           let that = this;
  //           if (res.data.code === 200) {
  //             message.success({
  //               content: "注册成功！正在为你跳转至登录......",
  //               duration: 1,
  //               onClose: function () {
  //                 that.props.history.push("/mine");
  //               },
  //             });
  //           }
  //           console.log(res);
  //         });
  //     }
  //   };
  gologin = () => {
    this.props.history.push("/mine");
  };
  render() {
    const { username, password, userMessage } = this.state;
    return (
      <div>
        <label htmlFor="">用户名</label>
        <input
          type="text"
          name=""
          id=""
          value={username}
          onChange={this.getUser}
        />
        <br />
        <br />
        <label htmlFor="">密码</label>
        <input
          type="text"
          name=""
          id=""
          value={password}
          onChange={this.getPassword}
        />
        <br />
        <br />
        <label htmlFor="">用户详情</label>
        <input
          type="text"
          name=""
          id=""
          value={userMessage}
          onChange={this.getMessage}
        />
        <br />
        <button onClick={this.userInfo}>注册</button>
        <button onClick={this.gologin}>登录</button>
      </div>
    );
  }
}

export default Userinfo;
