import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { message, Modal, Button, Spin } from "antd";
import "antd/dist/antd.css";
import Footer from "../../components/footer/index";
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: "",
      usermsg: [], //用户信息
      playlist: [], //歌单列表
      loading: true,
    };
  }

  //控制询问框的显示效果
  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  //点击了确定---退出登录
  handleOk = () => {
    localStorage.clear(); //清除用于判断是否登录的标志
    axios.get("http://localhost:3000/logout").then(() => {
      message.success({
        //成功时的微提示
        content: "退出登录成功！正在自动跳转......",
        duration: 1,
        onClose: function () {
          //执行的异步函数
          window.location.reload();
          this.props.history.push("/login");
        },
      });
    });
    this.setState({
      isModalVisible: false,
    });
  };

  //点击了取消---隐藏询问框
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  //去歌单详情页面
  gomusiclist = (id) => {
    localStorage.setItem("musiclistID", id);
    this.props.history.push("/musiclist");
  };

  //获取用户详情
  getUserMsg = async () => {
    await axios
      .get(
        `http://localhost:3000/user/detail?uid=${localStorage.getItem(
          "userID"
        )}`
      )
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            usermsg: res.data,
          });
        }
      });
  };

  //获取用户歌单
  getPlayList = async () => {
    await axios
      .get(
        `http://localhost:3000/user/playlist?uid=${localStorage.getItem(
          "userID"
        )}`
      )
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            playlist: res.data.playlist,
          });
        }
      });
  };

  componentDidMount() {
    Promise.all([this.getUserMsg(), this.getPlayList()]).then((res) => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { usermsg, playlist, loading } = this.state;
    return (
      <>
        {usermsg.length === 0 && playlist.length === 0 ? (
          <></>
        ) : (
          <div
            style={{
              width: "100%",
              backgroundColor: "rgb(245, 245, 245)",
              minHeight: "100%",
              padding: "0.4rem 0.4rem 0.9rem 0.4rem",
              boxSizing: "border-box",
              backgroundImage: "url(" + localStorage.getItem("bgUrl") + ")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundAttachment: "fixed",
            }}
          >
            <Spin tip="Loading..." spinning={loading} delay={500}>
              <div
                style={{
                  width: "100%",
                  minHeight: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: "0.6rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  <img
                    src={usermsg.profile.avatarUrl}
                    alt=""
                    style={{
                      width: "1.6rem",
                      height: "1.6rem",
                      borderRadius: "50%",
                      boxSizing: "border-box",
                      display: "block",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "0.4rem",
                      color: "rgb(254,248,228)",
                    }}
                  >
                    {usermsg.profile.nickname}
                  </p>
                  <p
                    style={{
                      width: "1.2rem",
                      fontSize: "0.4rem",
                      lineHeight: "0.6rem",
                      borderRadius: "0.2rem",
                      textAlign: "center",
                      color: "rgb(254,248,228)",
                    }}
                  >
                    Lv.{usermsg.level}
                  </p>
                </div>
                <div
                  style={{
                    borderRadius: "0.15rem",
                    padding: "0.3rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.4rem",
                      color: "rgb(254,188,173)",
                    }}
                  >
                    我的歌单{usermsg.profile.playlistCount}个
                  </p>
                  <ul
                    style={{
                      fontSize: "0.35rem",
                    }}
                  >
                    {playlist.map((item, index) => {
                      return (
                        <li
                          key={item.id}
                          style={{
                            display: "flex",
                            marginBottom: "0.3rem",
                          }}
                          onClick={() => {
                            this.gomusiclist(item.id);
                          }}
                        >
                          <img
                            src={item.coverImgUrl}
                            alt=""
                            style={{
                              width: "1.6rem",
                              height: "1.6rem",
                              borderRadius: "0.2rem",
                            }}
                          />
                          <div
                            style={{
                              marginLeft: "0.3rem",
                              marginTop: "0.1rem",
                            }}
                          >
                            <span
                              style={{
                                color: "rgb(254,248,228)",
                              }}
                            >
                              {item.name}
                            </span>
                            <br />
                            <span
                              style={{
                                color: "rgb(254,188,173)",
                              }}
                            >
                              {item.trackCount}首
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Button
                  type="danger"
                  onClick={this.showModal}
                  size={"large"}
                  style={{
                    display: "block",
                    margin: "0 auto",
                    marginTop: "0.3rem",
                    color: "rgb(254,248,228)",
                  }}
                >
                  退出登录
                </Button>
              </div>
              <Modal
                visible={this.state.isModalVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确认"
                cancelText="取消"
              >
                <p>确定要退出登录吗？</p>
              </Modal>
              <Footer></Footer>
            </Spin>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Mine);
