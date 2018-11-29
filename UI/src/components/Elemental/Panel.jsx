import React from "react";

export const Panel = (props) => {
    return <div className={props.class ? props.class : "default-panel"} style={props.style}>{props.children}</div>
};

export const PanelHeading = (props) =>{
    return <div className={props.class ? props.class : "default-panel-heading"} style={props.style}>{props.children}</div>
}

export const PanelBody = (props) =>{
    return <div className={props.class ? props.class : "default-panel-body"} style={props.style}>{props.children}</div>
}

export const PanelFooter = (props) =>{
    return <div className={props.class ? props.class : "default-panel-footer"} style={props.style}>{props.children}</div>
}
