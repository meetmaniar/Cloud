import React, { Component } from "react";
import Search from "./Search";
import TopAssociation from "./TopAssociation";
import SubmitData from "./SubmitData";

class Body extends Component {

  render() {
    const { userinfo, recommenderinfo } = this.props.state;
    return (
      <div className="body">
        <Search info={recommenderinfo} />
        <TopAssociation info={recommenderinfo} />
        <SubmitData user={userinfo} info={recommenderinfo} updateState={this.props.updateState}/>
      </div>
      );
  }
}

export default Body;
