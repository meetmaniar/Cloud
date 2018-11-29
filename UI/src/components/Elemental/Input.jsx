import React, { Component } from "react";


class Input extends Component {
    state={
        focused: false
    }
    render() {
        const props = this.props;
        const state = this.state
        return (
            <div className="input">
                <label className={props.labelclass ? props.labelclass : `default-label${state.focused ? `input-focus` : ``}`}>{props.label}</label>
                <input type={props.type} value={props.value} placeholder={props.placeholder} className={props.inputclass ? props.inputclass : `default-input`}
                    onChange={(e) => {
                        e.persist();
                        props.update(()=>{
                            let input = {};
                            input[props.name] = e.target.value;
                            return input;
                        });
                    }}
                    onFocus={()=>{
                        this.setState({focused: true});
                    }}
                    onBlur={()=>{
                        this.setState({focused: false});
                    }}
                    autoFocus={props.autoFocus}
                    required
                    />
            </div>
        )
    }
}

export default Input;
