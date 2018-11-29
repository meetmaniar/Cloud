import React, { Component } from "react";
import Image from "../../components/Elemental/Image";

class Menu extends Component {

  render() {
      return (
        <div className="menu">
        <Image icon="fab fa-android" class="nav-logo-mobile"/>
        <Image icon="fab fa-android" class="nav-logo-desktop"/>
        <Image icon="fa fa-bars" class="nav-burger" onClick={this.props.showMenuLinkGroup}/>
        </div>
      );
  }
}

export default Menu;
