import React from "react";
import {Panel} from "../components/Elemental/Panel";

const style = {
    // background: "#343434",
    height: "15vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    textAlign: "center"
}
const Footer = () => {
    return (
      <div className="footer">
      <Panel style={style} class="header-panel">
        © 2018 COEN Recommender Project
      </Panel>
      </div>
    );
}

export default Footer;
