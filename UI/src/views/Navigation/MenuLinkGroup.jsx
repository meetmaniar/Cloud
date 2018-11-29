import React from "react";

const MenuLinkGroup = (props) => {
      return (
        <div className="menu-link-group" style={{display: props.show ? "block": "none"}}>
        {props.children}
        </div>
      );
}

export default MenuLinkGroup;
