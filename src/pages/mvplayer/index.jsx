import React, { Component } from "react";
import axios from "axios";
class MVPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MVUrl: "",
      MVDetail: [],
      timer: "",
    };
  }

  //获取MV详情
  getMVDetail = async () => {
    await axios
      .get(
        "http://localhost:3000/mv/detail?mvid=" + localStorage.getItem("mvID")
      )
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            MVDetail: res.data.data,
          });
        }
      });
  };

  //获取MV播放地址
  getMVUrl = async () => {
    await axios
      .get("http://localhost:3000/mv/url?id=" + localStorage.getItem("mvID"))
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            MVUrl: res.data.data.url,
          });
        }
      });
  };

  //专辑图片旋转
  rotateImg = () => {
    const musicPic = document.getElementById("musicPic");
    var r = 0;
    this.setState({
      timer: setInterval(() => {
        musicPic.style.transform = "rotate(" + (r += 10) + "deg)";
        musicPic.style.transition = "all 1s linear";
      }, 1000),
    });
  };

  goback = () => {
    this.props.history.go(-1);
  };

  componentDidMount() {
    this.getMVUrl();
    this.getMVDetail();
    this.rotateImg();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    const { MVUrl, MVDetail } = this.state;
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100%",
          boxSizing: "border-box",
          backgroundImage: "url(" + localStorage.getItem("bgUrl") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundAttachment: "fixed",
          color: "#fff",
          paddingTop: "0.4rem",
        }}
      >
        <div
          style={{
            color: "rgb(254,248,228)",
            marginLeft: "0.4rem",
            marginRight: "0.4rem",
            overflow: "hidden",
          }}
        >
          <i
            className="iconfont icon-jiantou2"
            onClick={this.goback}
            style={{
              float: "left",
              fontSize: "0.6rem",
            }}
          ></i>
          <p
            style={{
              float: "left",
              width: "4.3rem",
              overflow: "hidden",
              textAlign: "center",
              marginLeft: "0.5rem",
            }}
          >
            <span
              style={{
                margin: "0 auto",
                fontSize: "0.4rem",
              }}
            >
              {MVDetail.name}
            </span>
            <br></br>
            <span
              style={{
                fontSize: "0.3rem",
              }}
            >
              {MVDetail.artistName}
            </span>
          </p>
          <img
            id={"musicPic"}
            src={MVDetail.cover}
            alt=""
            style={{
              width: "1.2rem",
              height: "1.2rem",
              borderRadius: "50%",
            }}
          />
        </div>
        <video
          src={MVUrl}
          autoPlay
          controls="controls"
          style={{
            width: "100%",
            height: "6rem",
          }}
        ></video>
        <p
          style={{
            color: "rgb(254,248,228)",
            fontSize: "0.4rem",
            textAlign: "center",
          }}
        >
          MV详情
        </p>
        <p
          style={{
            width: "90%",
            marginLeft: "5%",
            color: "rgb(254,248,228)",
            fontSize: "0.4rem",
            marginBottom: "0",
            paddingBottom: "5%",
          }}
        >
          {MVDetail.desc}
        </p>
      </div>
    );
  }
}

export default MVPlayer;
