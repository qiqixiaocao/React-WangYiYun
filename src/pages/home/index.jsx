import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Carousel, Input, Space, Button, message } from "antd";
import Footer from "../../components/footer/index";
import axios from "axios";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrls: [], //存储轮播图图片
      songs: [], //存储搜索结果
      defaultWords: [], //存储搜索默认词
      NewMusicList: [], //存储推荐歌单
      NewMV: [], //存储推荐MV
      SongLimit: 9, //歌单请求的条数
      MVLimit: 9, //MV请求的条数
    };
  }

  //获取轮播图
  playBanners = async () => {
    await axios.get("http://localhost:3000/banner").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          imgUrls: res.data.banners,
        });
      }
    });
  };

  //获取默认搜索词
  getDefaultWords = async () => {
    await axios.get("http://localhost:3000/search/hot").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          defaultWords: res.data.result.hots,
        });
      }
    });
  };

  //搜索
  onChange = async (e) => {
    await axios
      .get("http://localhost:3000/cloudsearch?keywords=" + e.target.value)
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            songs: res.data.result.songs,
          });
        }
      });
    if (!e.target.value) {
      this.setState({
        songs: [],
      });
    }
  };

  //获取推荐歌单(默认获取9条)
  getNewMusicList = async (SongLimit) => {
    if (SongLimit <= 54) {
      await axios
        .get(`http://localhost:3000/personalized?limit=${SongLimit}`)
        .then((res) => {
          if (res.data.code === 200) {
            this.setState({
              NewMusicList: res.data.result,
            });
          }
        });
    } else {
      message.warning("没有更多数据了......", 2);
    }
  };

  //获取推荐MV(默认获取9条)
  getNewMV = async (MVLimit) => {
    if (MVLimit <= 54) {
      await axios
        .get(`http://localhost:3000/mv/first?limit=${MVLimit}`)
        .then((res) => {
          if (res.data.code === 200) {
            this.setState({
              NewMV: res.data.data,
            });
          }
        });
    } else {
      message.warning("没有更多数据了......", 2);
    }
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
          localStorage.setItem("bgUrl", res.data.profile.backgroundUrl);
        }
      });
  };

  //跳转至播放页面
  goMusicPlayer = (id) => {
    localStorage.setItem("musicID", id);
    this.props.history.push("/musicplayer"); //路由跳转
  };

  //跳转至歌单详情页面
  goMusicList = (id) => {
    localStorage.setItem("musiclistID", id);
    this.props.history.push("/musiclist");
  };

  //跳转至MV播放页面
  goMVPlayer = (id) => {
    localStorage.setItem("mvID", id);
    this.props.history.push("/mvplayer");
  };

  componentDidMount() {
    this.playBanners();
    this.getNewMusicList(9);
    this.getNewMV(9);
    this.getUserMsg();
  }

  render() {
    var {
      imgUrls,
      songs,
      NewMusicList,
      NewMV,
      SongLimit,
      MVLimit,
    } = this.state;
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100%",
          padding: "0.3rem 0.4rem 0.9rem 0.4rem",
          boxSizing: "border-box",
          backgroundImage: "url(" + localStorage.getItem("bgUrl") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundAttachment: "fixed",
        }}
      >
        <Space
          direction="vertical"
          style={{
            width: "100%",
            margin: "0.3rem 0 0.4rem 0",
          }}
        >
          <Input
            placeholder="请输入搜索内容"
            onChange={this.onChange}
            style={{
              width: "100%",
              height: "0.8rem",
              borderRadius: "0.4rem",
            }}
          />
        </Space>
        <>
          {songs.length === 0 ? (
            <></>
          ) : (
            <ul
              style={{
                width: "90%",
                height: "60%",
                position: "absolute",
                left: "5%",
                top: "1.5rem",
                zIndex: "5",
                background: "#fff",
                borderRadius: "0.4rem",
                borderTop: "none",
                overflow: "auto",
              }}
            >
              {songs.map((val) => (
                <li
                  key={val.id}
                  style={{
                    fontSize: "0.4rem",
                    width: "100%",
                    padding: "0.2rem 0.4rem",
                  }}
                  onClick={() => {
                    this.goMusicPlayer(val.id);
                  }}
                >
                  {val.name}-{val.ar[0].name}
                </li>
              ))}
            </ul>
          )}
        </>
        <Carousel autoplay autoplaySpeed={2000} effect="fade">
          {imgUrls.map((val) => (
            <img src={val.imageUrl} alt="" key={val} />
          ))}
        </Carousel>
        <div
          style={{
            width: "100%",
            padding: "5% 0 3% 0",
            borderRadius: "0 0 0.4rem 0.4rem",
            color: "rgb(254, 188, 173)",
          }}
        >
          <h3
            style={{
              fontSize: "0.4rem",
              float: "left",
              color: "rgb(254, 188, 173)",
            }}
          >
            推荐歌单
          </h3>
          <ul
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            {NewMusicList.map((val) => (
              <li
                key={val.id}
                style={{
                  width: "30%",
                  height: "20%",
                }}
                onClick={() => {
                  this.goMusicList(val.id);
                }}
              >
                <img
                  src={val.picUrl}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.3rem",
                  }}
                />
                <p
                  style={{
                    height: "0.9rem",
                    fontSize: "0.28rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: "0.2rem",
                  }}
                >
                  {val.name}
                </p>
              </li>
            ))}
            <Button
              shape="round"
              ghost
              style={{
                display: "block",
                margin: "0 auto",
                color: "rgb(254, 188, 173)",
              }}
              onClick={() => {
                this.setState({
                  SongLimit: (SongLimit += 9),
                });
                this.getNewMusicList(SongLimit);
              }}
            >
              更多&gt;
            </Button>
          </ul>
        </div>
        <div
          style={{
            width: "100%",
            padding: "0 0 3% 0",
            borderRadius: "0.4rem",
            color: "rgb(254, 188, 173)",
          }}
        >
          <h3
            style={{
              fontSize: "0.4rem",
              float: "left",
              color: "rgb(254, 188, 173)",
            }}
          >
            推荐MV
          </h3>

          <ul
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            {NewMV.map((val) => (
              <li
                key={val.id}
                style={{
                  width: "30%",
                  height: "20%",
                }}
                onClick={() => {
                  this.goMVPlayer(val.id);
                }}
              >
                <img
                  src={val.cover}
                  alt=""
                  style={{
                    width: "100%",
                    height: "2rem",
                    borderRadius: "0.3rem",
                  }}
                />
                <p
                  style={{
                    height: "0.9rem",
                    fontSize: "0.28rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: "0.2rem",
                  }}
                >
                  {val.name}-{val.artistName}
                </p>
              </li>
            ))}
            <Button
              shape="round"
              ghost
              style={{
                display: "block",
                margin: "0 auto",
                color: "rgb(254, 188, 173)",
              }}
              onClick={() => {
                this.setState({
                  MVLimit: (MVLimit += 9),
                });
                this.getNewMV(MVLimit);
              }}
            >
              更多&gt;
            </Button>
          </ul>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(Home);
