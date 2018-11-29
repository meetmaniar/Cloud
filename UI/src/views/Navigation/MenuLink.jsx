import React from "react";
import Image from "../../components/Elemental/Image";
import Button from "../../components/Elemental/Button";

const MenuLink = (props) => {
  if(props.icon){
    return (
      <div className="menu-link" onClick={props.onClick}>
      <Image icon={props.icon} class="menu-link-img"/>
      <div className="menu-link-title">{props.title}</div>
      </div>
    );
  }
  else{
    return(
      <div className="menu-link-button" onClick={props.onClick}>
      <Button class="button dark">{props.title}</Button>
      </div>
    );
  }
}

export default MenuLink;
