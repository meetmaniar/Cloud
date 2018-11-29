import React, { Component } from "react";
import Image from "../components/Elemental/Image";
import { Panel, PanelHeading, PanelBody } from "../components/Elemental/Panel";
import Button from "../components/Elemental/Button";
import api from "../api/api.js";


class Setup extends Component {
    state = {
        user: "",
        password: "",
        remember: false,
    }
    register = (e) => {
        e.preventDefault();
        api.setUpRecommender(this.props.state.userinfo).then(res=>{
            console.log(res);
            window.location.reload();
        })
    }
    update = (input) => {
        this.setState(input);
    }
    render() {
        const { state } = this.props;
        return (
            <div className="login">
                <Panel class="login-panel">
                    <PanelHeading class="login-header-panel">
                        <Image icon="fas fa-user-circle" class="page-not-found-img" imgWrapper="page-not-found-img-wrapper" />
                            <h1>Welcome {state.userinfo.user.toUpperCase()}</h1>
                    </PanelHeading>
                    <PanelBody>
                        <form onSubmit={this.register}>
                            <Button type="submit" class="button dark">SET UP YOUR ACCOUNT</Button>
                        </form>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
}

export default Setup;
