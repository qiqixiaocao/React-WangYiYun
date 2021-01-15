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
        // console.log(res);
        if (res.data.code === 200) {
          this.setState({
            singers: res.data.artists,
          });
        }
      });
  };

  //跳转到歌手详情页面
  goSingerDetail = async (id) => {
    // console.log(id);
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
    // console.log(type, limit);
    return (
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
        <Radio.Group
          onChange={this.onChange}
          defaultValue="a"
          buttonStyle="solid"
          style={{
            width: "95%",
            display: "flex",
            justifyContent: "space-between",
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
            width: "95%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignContent: "space-between",
            marginTop: "0.4rem",
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
                  width: "1.6rem",
                  height: "1.6rem",
                  borderRadius: "50%",
                  margin: "0 auto",
                }}
              />
              <p
                style={{
                  height: "0.9rem",
                  fontSize: "0.28rem",
                  color: "rgb(254,248,228)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginTop: "0.2rem",
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
          type="primary"
          style={{
            display: "block",
            margin: "0 auto",
            marginBottom: "1rem",
          }}
          onClick={() => {
            this.setState({
              limit: (limit += 9),
            });
            // console.log(limit, type);
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
