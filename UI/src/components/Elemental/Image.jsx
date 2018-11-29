import React from "react";
// import { Link } from "react-router-dom";

const Image = (props) => {
    if(props.path){
        return (
        <a href={props.path} className={props.imgWrapper ? props.imgWrapper : "default-image"} onClick={props.onClick}>
        {
            props.icon ?
            <div className={props.class}>
                <i className={props.icon}></i>
            </div>
            :
            <img src={props.src} alt="logo" className={props.class} style={props.style} id={props.id}/>
        }
        </a>
        );
    }
    else{
        return(
        <div className={props.imgWrapper ? props.imgWrapper : "default-image"} onClick={props.onClick}>
        {
            props.icon ?
            <div className={props.class}>
                <i className={props.icon}></i>
            </div>
            :
            <img src={props.src} alt="logo" className={props.class} style={props.style} id={props.id}/>
        }
        </div>
        );
    }
};

export default Image;