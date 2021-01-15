import React, { Component } from "react";
import "../../app.css";
import { NavLink } from "react-router-dom";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="footer">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="selected">
              首页
            </NavLink>
          </li>
          <li>
            <NavLink to="/singer" activeClassName="selected">
              歌手
            </NavLink>
          </li>
          <li>
            <NavLink to="/recommend" activeClassName="selected">
              推荐
            </NavLink>
          </li>
          <li>
            <NavLink to="/mine" activeClassName="selected">
              我的
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Footer;
