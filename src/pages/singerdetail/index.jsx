import axios from "axios";
import React, { Component } from "react";
class SingerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singerDetail: [],
    };
  }
  getSingerDetail = async () => {
    axios
      .get(
        "http://localhost:3000/artists?id=" + localStorage.getItem("singerID")
      )
      .then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          this.setState({
            singerDetail: res.data,
          });
        }
      });
  };

  //跳转至播放页面
  goMusicPlayer = (id) => {
    // console.log(id);
    localStorage.setItem("musicID", id);
    this.props.history.push("/musicplayer"); //路由跳转
  };

  goback = () => {
    this.props.history.go(-1);
  };

  componentDidMount() {
    this.getSingerDetail();
  }
  render() {
    const { singerDetail } = this.state;
    return (
      <>
        {singerDetail.length === 0 ? (
          <></>
        ) : (
          <div
            style={{
              width: "100%",
              minHeight: "100%",
              padding: "0.4rem 0 0.4rem 0.4rem",
              boxSizing: "border-box",
              backgroundImage: "url(" + localStorage.getItem("bgUrl") + ")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundAttachment: "fixed",
            }}
          >
            <div
              style={{
                width: "95%",
                height: "0.6rem",
                color: "rgb(254,248,228)",
                fontSize: "0.4rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <i
                className="iconfont icon-jiantou2"
                onClick={this.goback}
                style={{
                  float: "left",
                  fontSize: "0.4rem",
                  lineHeight: "0.6rem",
                }}
              ></i>
              {singerDetail.artist.name}
            </div>
            <div
              style={{
                width: "100%",
                height: "3.4rem",
                overflow: "hidden",
                paddingTop: "0.3rem",
                paddingRight: "0.2rem",
                color: "rgb(254,248,228)",
              }}
            >
              <img
                src={singerDetail.artist.img1v1Url}
                alt=""
                style={{
                  width: "2.8rem",
                  height: "2.8rem",
                  float: "left",
                  borderRadius: "0.2rem",
                }}
              />
              <div
                style={{
                  float: "left",
                  marginTop: "0.8rem",
                  marginLeft: "0.5rem",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={singerDetail.artist.img1v1Url}
                    alt=""
                    style={{
                      float: "left",
                      width: "0.8rem",
                      height: "0.8rem",
                      borderRadius: "50%",
                      marginRight: "0.2rem",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.4rem",
                      lineHeight: "0.8rem",
                    }}
                  >
                    {singerDetail.artist.name}
                  </span>
                </p>
                <span
                  style={{
                    fontSize: "0.3rem",
                  }}
                >
                  全部歌曲({singerDetail.hotSongs.length})首
                </span>
              </div>
            </div>
            <ul>
              {singerDetail.hotSongs.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: "0.2rem",
                      paddingRight: "0.2rem",
                      boxSizing: "border-box",
                      overflow: "hidden",
                    }}
                    onClick={() => {
                      this.goMusicPlayer(item.id);
                    }}
                  >
                    <span
                      style={{
                        float: "left",
                        width: "9%",
                        color: "rgb(253,172,168)",
                        fontSize: "0.4rem",
                        lineHeight: "1rem",
                        marginRight: "0.3rem",
                      }}
                    >
                      {index + 1}
                    </span>
                    <div
                      style={{
                        float: "left",
                        width: "75%",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.36rem",
                          color: "rgb(254,248,228)",
                          margin: "0",
                        }}
                      >
                        {item.name}
                      </p>
                      <span
                        style={{
                          fontSize: "0.3rem",
                          color: "rgb(254,188,173)",
                        }}
                      >
                        {item.ar[0].name}&nbsp;-&nbsp;{item.al.name}
                      </span>
                    </div>
                    <i
                      className="iconfont icon-bofang"
                      style={{
                        float: "right",
                        color: "#EB9D9C",
                        fontSize: "0.5rem",
                        lineHeight: "1rem",
                      }}
                    ></i>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </>
    );
  }
}

export default SingerDetail;
