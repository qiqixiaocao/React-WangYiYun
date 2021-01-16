import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Footer from "../../components/footer/index";
import { Button, message, Radio } from "antd";
import axios from "axios";
class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchHot: [], //存储热搜列表结果
      Tops: [], //存储排行榜
      TopsLength: 9, //默认榜单获取长度
      type: 1, //当前地区类型
      SingerLength: 9, //默认获取歌手长度
      SingerTops: [], //存储歌手排行榜
    };
  }

  //获取热搜列表
  getSearchHot = async () => {
    await axios.get("http://localhost:3000/search/hot/detail").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          SearchHot: res.data.data,
        });
      }
    });
  };

  //获取推荐榜单(默认获取9条)
  getTops = async (length) => {
    if (length < 30) {
      await axios.get("http://localhost:3000/toplist/detail").then((res) => {
        if (res.data.code === 200) {
          let arr = res.data.list.splice(0, length);
          this.setState({
            Tops: arr,
          });
        }
      });
    } else {
      message.warning("没有更多数据了......", 2);
    }
  };

  //获取歌手榜单歌手(默认获取9条)
  getSingerTops = async (type, length) => {
    if (length < 100) {
      await axios
        .get("http://localhost:3000/toplist/artist?type=" + type)
        .then((res) => {
          if (res.data.code === 200) {
            let arr = res.data.list.artists.splice(0, length);
            this.setState({
              SingerTops: arr,
            });
          }
        });
    } else {
      message.warning("没有更多数据了......", 2);
    }
  };

  //跳转到搜索结果
  goSeach = async (value) => {
    await axios
      .get("http://localhost:3000/cloudsearch?keywords=" + value)
      .then((res) => {
        if (res.data.code === 200) {
          if (res.data.result.songs[0].ar[0].name === value) {
            //证明是歌手
            localStorage.setItem("singerID", res.data.result.songs[0].ar[0].id);
            this.props.history.push("/singerdetail");
          } else {
            localStorage.setItem("searchword", value);
            this.props.history.push("/searchresult");
          }
        }
      });
  };

  //跳转至歌单详情页面
  goMusicList = (id) => {
    localStorage.setItem("musiclistID", id);
    this.props.history.push("/musiclist");
  };

  //跳转到歌手详情页面
  goSingerDetail = async (id) => {
    localStorage.setItem("singerID", id);
    this.props.history.push("/singerdetail");
  };

  //切换类型
  onChange = (e) => {
    let value = e.target.value;
    switch (value) {
      case "a":
        this.setState({
          type: 1,
          SingerLength: 9,
        });
        this.getSingerTops(1, 9);
        break;
      case "b":
        this.setState({
          type: 2,
          SingerLength: 9,
        });
        this.getSingerTops(2, 9);
        break;
      case "c":
        this.setState({
          type: 3,
          SingerLength: 9,
        });
        this.getSingerTops(3, 9);
        break;
      default:
        this.setState({
          type: 4,
          limit: 9,
        });
        this.getSingerTops(4, 9);
    }
  };

  componentDidMount() {
    this.getSearchHot();
    this.getTops(9);
    this.getSingerTops(1, 9);
  }

  render() {
    var {
      SearchHot,
      Tops,
      TopsLength,
      SingerTops,
      SingerLength,
      type,
    } = this.state;
    return (
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
        <div>
          <h3
            style={{
              fontSize: "0.4rem",
              color: "rgb(254, 188, 173)",
            }}
          >
            热搜榜
          </h3>
          <ul
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              color: "#fff",
              margin: "0",
            }}
          >
            {SearchHot.map((val, index) => (
              <li
                key={val.searchWord}
                style={{
                  width: "45%",
                }}
                onClick={() => {
                  this.goSeach(val.searchWord);
                }}
              >
                <span
                  style={{
                    width: "23%",
                    float: "left",
                    color: "rgb(253,172,168)",
                    fontSize: "0.4rem",
                    lineHeight: "0.8rem",
                  }}
                >
                  {index + 1}
                </span>
                <span
                  style={{
                    width: "65%",
                    float: "left",
                    color: "rgb(254,248,228)",
                    fontSize: "0.36rem",
                    lineHeight: "0.8rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {val.searchWord}
                </span>
                {!val.iconUrl ? (
                  <></>
                ) : (
                  <img
                    src={val.iconUrl}
                    alt=""
                    style={{
                      float: "left",
                      width: "12%",
                      height: "0.4rem",
                      marginTop: "0.2rem",
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            marginTop: "0.4rem",
          }}
        >
          <h3
            style={{
              fontSize: "0.4rem",
              color: "rgb(254, 188, 173)",
            }}
          >
            云音乐推荐榜单
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
            {Tops.map((val) => (
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
                  src={val.coverImgUrl}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.3rem",
                  }}
                />
                <p
                  style={{
                    height: "0.5rem",
                    fontSize: "0.28rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: "0.2rem",
                    color: "rgb(254, 188, 173)",
                    textAlign: "center",
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
                  TopsLength: (TopsLength += 9),
                });
                this.getTops(TopsLength);
              }}
            >
              更多&gt;
            </Button>
          </ul>
        </div>
        <div
          style={{
            marginTop: "0.4rem",
          }}
        >
          <h3
            style={{
              fontSize: "0.4rem",
              color: "rgb(254, 188, 173)",
            }}
          >
            歌手榜
          </h3>
          <Radio.Group
            onChange={this.onChange}
            defaultValue="a"
            buttonStyle="solid"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.2rem",
            }}
          >
            <Radio.Button value="a">华语</Radio.Button>
            <Radio.Button value="b">欧美</Radio.Button>
            <Radio.Button value="c">韩国</Radio.Button>
            <Radio.Button value="d">日本</Radio.Button>
          </Radio.Group>
          <ul
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            {SingerTops.map((val) => (
              <li
                key={val.id}
                style={{
                  width: "30%",
                  height: "20%",
                }}
                onClick={() => {
                  this.goSingerDetail(val.id);
                }}
              >
                <img
                  src={val.img1v1Url}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.3rem",
                  }}
                />
                <p
                  style={{
                    height: "0.5rem",
                    fontSize: "0.28rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: "0.2rem",
                    color: "rgb(254, 188, 173)",
                    textAlign: "center",
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
                  SingerLength: (SingerLength += 9),
                });
                this.getSingerTops(type, SingerLength);
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

export default withRouter(Recommend);
