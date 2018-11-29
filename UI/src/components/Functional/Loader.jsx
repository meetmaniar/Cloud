import React, { Component } from "react";
import Spinner from "react-loader-spinner";

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <Spinner type="Bars" color="#343434" height={80} width={80} />
      </div>
    );
  }
}

export default Loader;
