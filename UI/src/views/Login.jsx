import React, { Component } from "react";
import Image from "../components/Elemental/Image";
import Input from "../components/Elemental/Input";
import { Panel, PanelHeading, PanelBody } from "../components/Elemental/Panel";
import Button from "../components/Elemental/Button";
import api from "../api/api.js";
import rememberme from "../util/persistLogin";


class Login extends Component {
    state = {
        user: "",
        password: "",
        remember: false,
    }
    login = (e) => {
        e.preventDefault();
        api.login(this.state).then((res) => {
            if (res.user){
                rememberme(this.state.remember, 'recommender-user-token', res.api_key);
                window.location.reload();
            }
        })
    }
    update = (input) => {
        this.setState(input);
    }
    render() {
        return (
            <div className="login">
                <Panel class="login-panel">
                    <PanelHeading class="login-header-panel">
                        <Image icon="fas fa-train" class="page-not-found-img" imgWrapper="page-not-found-img-wrapper" />
                        <h1>Welcome</h1>
                    </PanelHeading>
                    <PanelBody>
                        <form onSubmit={this.login}>
                            <Input name="user" label="Username" type="text" value={this.state.user} placeholder={"Username"} update={this.update} autoFocus={true} />
                            <Input name="password" label="Password" type="password" value={this.state.password} placeholder={"Password"} update={this.update} autoFocus={false} />
                            <Input name="remember" label="Remember Me" type="checkbox" value={this.state.remember} placeholder={"Remember Me"} update={this.update} autoFocus={false} />
                            <Button type="submit" class="button dark">Sign In</Button>
                        </form>
                        {/* <Button path={`/login`} class="button light">Register</Button> */}
                    </PanelBody>
                </Panel>
            </div>
        )
    }
}

export default Login;
