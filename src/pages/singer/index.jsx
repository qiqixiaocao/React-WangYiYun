import React, { Component } from "react";
import { Button, Radio } from "antd";
import "antd/dist/antd.css";
import { withRouter } from "react-router-dom";
import Footer from "../../components/footer/index";
import axios from "axios";
class Singer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singers: [], //存储请求数据
      type: 7, //当前歌手类型
      limit: 9, //当前请求歌手条数
    };
  }

  //获取歌手列表
  getSingers = async (type, limit) => {
    await axios
      .get(`http://localhost:3000/artist/list?area=${type}&limit=${limit}`)
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            singers: res.data.artists,
          });
        }
      });
  };

  //跳转到歌手详情页面
  goSingerDetail = async (id) => {
    localStorage.setItem("singerID", id);
    this.props.history.push("/singerdetail");
  };

  componentDidMount() {
    this.getSingers(7, 9);
  }

  //切换类型
  onChange = (e) => {
    let value = e.target.value;
    switch (value) {
      case "a":
        this.setState({
          type: 7,
          limit: 9,
        });
        this.getSingers(7, 9);
        break;
      case "b":
        this.setState({
          type: 96,
          limit: 9,
        });
        this.getSingers(96, 9);
        break;
      case "c":
        this.setState({
          type: 8,
          limit: 9,
        });
        this.getSingers(8, 9);
        break;
      case "d":
        this.setState({
          type: 16,
          limit: 9,
        });
        this.getSingers(16, 9);
        break;
      default:
        this.setState({
          type: 0,
          limit: 9,
        });
        this.getSingers(0, 9);
    }
  };

  render() {
    var { singers, type, limit } = this.state;
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100%",
          padding: "0.4rem 0.4rem 0.9rem 0.4rem",
          boxSizing: "border-box",
          backgroundImage: "url(" + localStorage.getItem("bgUrl") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundAttachment: "fixed",
        }}
      >
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
          <Radio.Button value="c">日本</Radio.Button>
          <Radio.Button value="d">韩国</Radio.Button>
          <Radio.Button value="e">其他</Radio.Button>
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
          {singers.map((val) => (
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
        </ul>
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
              limit: (limit += 9),
            });
            this.getSingers(type, limit);
          }}
        >
          更多&gt;
        </Button>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(Singer);
