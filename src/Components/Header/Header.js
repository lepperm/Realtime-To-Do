import React, { Component } from "react";

import logo from "../../Images/logo.svg";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <div className="title">Realtime To-Do</div>
        <div className={"button"} onClick={() => alert("This does nothing!")}>
          Archive Complete
        </div>
        <div className={"button"} onClick={() => alert("This does nothing!")}>
          Login
        </div>
      </header>
    );
  }
}

export default Header;
