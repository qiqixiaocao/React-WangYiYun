import React, { Component } from "react";
import axios from "axios";
class Musiclist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listdetail: "",
      creator: "",
      allsongs: [],
    };
  }
  componentDidMount = async () => {
    let newArr = [];
    let that = this;
    await axios
      .get(
        `http://localhost:3000/playlist/detail?id=${localStorage.getItem(
          "musiclistID"
        )}`
      )
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            listdetail: res.data.playlist,
            creator: res.data.playlist.creator,
          });
          for (let i in that.state.listdetail.trackIds) {
            axios
              .get(
                `http://localhost:3000/song/detail?ids=${that.state.listdetail.trackIds[i].id}`
              )
              .then((res) => {
                if (res.data.code === 200) {
                  newArr.push(res.data.songs[0]);
                }
                that.setState({
                  allsongs: [...newArr],
                });
              });
          }
        }
      });
  };
  goback = () => {
    this.props.history.go(-1);
  };
  gomusicplay = (id) => {
    localStorage.setItem("musicID", id);
    this.props.history.push("/musicplayer");
  };
  render() {
    const { listdetail, allsongs, creator } = this.state;
    return (
      <>
        {allsongs.length === 0 ? (
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
              {listdetail.name}
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
                src={listdetail.coverImgUrl}
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
                    src={creator.avatarUrl}
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
                    {creator.nickname}
                  </span>
                </p>
                <span
                  style={{
                    fontSize: "0.3rem",
                  }}
                >
                  全部歌曲({allsongs.length})首
                </span>
              </div>
            </div>
            <ul>
              {allsongs.map((item, index) => {
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
                      this.gomusicplay(item.id);
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

export default Musiclist;
