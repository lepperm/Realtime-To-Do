import React, { Component } from "react";

import logo from "../../Images/logo.svg";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <div className="title">Realtime To-Do</div>
        <div
          className={"button"}
          onClick={() => alert("Not currently active.")}
        >
          Archive Complete
        </div>
        <div
          className={"button"}
          onClick={() =>
            alert(
              "Not currently active, please see Max Lepper / FirebaseUI Auth for current login progress."
            )
          }
        >
          Login
        </div>
      </header>
    );
  }
}

export default Header;
