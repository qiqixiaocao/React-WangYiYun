import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Progress } from "antd";
class Musicplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rateList: [1.0, 1.25, 1.5, 2.0],
      playRate: 1.0,
      isPlay: false,
      isMuted: false,
      volume: 100,
      allTime: 0,
      currentTime: 0,
      musicDetail: "",
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    await axios
      .get(
        `http://localhost:3000/song/detail?ids=${localStorage.getItem(
          "musicID"
        )}`
      )
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            musicDetail: res.data.songs[0],
            isLoading: true,
          });
          this.rotateImg();
        }
      });
    await axios
      .get(
        `http://localhost:3000/song/url?id=${localStorage.getItem("musicID")}`
      )
      .then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem("musicUrl", res.data.data[0].url);
        }
      });
  };

  formatSecond = (time) => {
    const second = Math.floor(time % 60);
    let minite = Math.floor(time / 60);
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  };

  // 该视频已准备好开始播放
  onCanPlay = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.setState({
      allTime: audio.duration,
    });
  };

  //播放
  playAudio = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    audio.play();
    this.setState({
      isPlay: false,
    });
  };

  //暂停
  pauseAudio = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    audio.pause();
    this.setState({
      isPlay: true,
    });
  };

  onMuteAudio = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.setState({
      isMuted: !audio.muted,
    });
    audio.muted = !audio.muted;
  };

  changeTime = (e) => {
    const { value } = e.target;
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.setState({
      currentTime: value,
    });
    audio.currentTime = value;
    if (value === audio.duration) {
      this.setState({
        isPlay: false,
      });
    }
  };

  // 当前播放位置改变时执行
  onTimeUpdate = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.setState({
      currentTime: audio.currentTime,
    });
    if (audio.currentTime === audio.duration) {
      this.setState({
        isPlay: true,
      });
    }
  };

  //专辑图片旋转
  rotateImg = () => {
    const musicPic = document.getElementById("musicPic");
    var r = 0;
    setInterval(() => {
      musicPic.style.transform = "rotate(" + (r += 10) + "deg)";
      musicPic.style.transition = "all 1s linear";
    }, 1000);
  };

  //跳转到歌手详情页
  goSingerDetail = (id) => {
    localStorage.setItem("singerID", id);
    this.props.history.push("/singerdetail");
  };

  goback = () => {
    this.props.history.go(-1);
  };

  render() {
    const { id } = this.props;
    const { isPlay, allTime, currentTime, musicDetail, isLoading } = this.state;
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {isLoading ? (
          <div
            style={{
              width: "100%",
              minHeight: "100%",
              padding: "0.4rem 0 0.4rem 0",
              boxSizing: "border-box",
              backgroundImage: "url(" + localStorage.getItem("bgUrl") + ")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundAttachment: "fixed",
              color: "#fff",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                color: "rgb(254,248,228)",
                marginBottom: "0.2rem",
                marginLeft: "0.4rem",
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
                  width: "5rem",
                  overflow: "hidden",
                  textAlign: "center",
                  marginLeft: "0.5rem",
                }}
                onClick={() => {
                  this.goSingerDetail(musicDetail.ar[0].id);
                }}
              >
                <span
                  style={{
                    margin: "0 auto",
                    fontSize: "0.4rem",
                  }}
                >
                  {musicDetail.name}
                </span>
                <br></br>
                <span
                  style={{
                    fontSize: "0.3rem",
                  }}
                >
                  {musicDetail.ar[0].name}&nbsp;-&nbsp;{musicDetail.al.name}
                </span>
              </p>
            </div>
            <img
              id={"musicPic"}
              src={musicDetail.al.picUrl}
              alt=""
              style={{
                position: "absolute",
                top: "18%",
                left: "10%",
                width: "6rem",
                height: "6rem",
                borderRadius: "50%",
              }}
            />
            <audio
              id={`audio${id}`}
              src={localStorage.getItem("musicUrl")}
              ref={(audio) => {
                this.audioDom = audio;
              }}
              autoPlay={true}
              preload={"auto"}
              onCanPlay={this.onCanPlay}
              onTimeUpdate={this.onTimeUpdate}
            >
              <track src={localStorage.getItem("musicUrl")} kind="captions" />
            </audio>
            <div
              style={{
                position: "absolute",
                bottom: "25%",
                display: "flex",
                width: "100%",
                marginTop: "0.2rem",
                marginLeft: "0.4rem",
                fontSize: "0.4rem",
              }}
            >
              <span
                style={{
                  marginRight: "0.2rem",
                }}
              >
                {currentTime !== allTime
                  ? this.formatSecond(currentTime)
                  : this.formatSecond(0)}
              </span>
              <Progress
                percent={
                  currentTime !== allTime
                    ? Math.floor((currentTime / allTime) * 100)
                    : 0
                }
                status="active"
                onChange={this.changeTime}
                showInfo={false}
                style={{
                  width: "65%",
                }}
              />
              <span
                style={{
                  marginLeft: "0.2rem",
                }}
              >
                {this.formatSecond(allTime)}
              </span>
            </div>
            {!isPlay ? (
              <i
                className="iconfont icon-bofang1
              "
                style={{
                  position: "absolute",
                  left: "45%",
                  bottom: "15%",
                  fontSize: "0.8rem",
                }}
                onClick={this.pauseAudio}
              ></i>
            ) : (
              <i
                className="iconfont icon-bofang
              "
                style={{
                  position: "absolute",
                  left: "45%",
                  bottom: "15%",
                  fontSize: "0.8rem",
                }}
                onClick={this.playAudio}
              ></i>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default withRouter(Musicplayer);
