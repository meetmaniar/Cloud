import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
    if(props.path){
        return (
        <Link to={props.path}>
            <button type={props.type ? props.type: "button"} className={props.class} style={props.style}>
            {props.children}
            </button>
        </Link>
        );
    }
    else{
        return(
            <button type={props.type ? props.type: "button"} className={props.class} style={props.style} onClick={props.onClick}>
            {props.children}
            </button>
        );
    }
};

export default Button;