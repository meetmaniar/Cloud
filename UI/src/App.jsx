import React, { Component } from "react";
import { Route } from "react-router-dom";
//Components
import Loader from "./components/Functional/Loader";
import Navigation from "./views/Navigation/Navigation";
import Header from "./views/Header";
import Body from "./views/Body/Body";
import Footer from "./views/Footer";
import Login from "./views/Login";
import Setup from "./views/SetUpAccount";
//Util
import authenticate from "./util/persistAuthenticate";
import api from "./api/api.js";
import getMicrositeConfigData from "./util/getMicrositeConfigData";
import getTranslatedText from "./util/getTranslatedText";
var object = require('lodash/object');

class App extends Component {
  state = {
    recommenderinfo: null,
    userinfo: null,
    config: null,
    text: null,
    loading: true,
    lang: "en",
  };

  /*================= APP FUNCTIONS =======================*/

  //Spinning Loader, passed down to props
  load = state => this.setState({ loading: state });

  //State Updater, passed down to props
  updateState = object => {
    this.setState(object);
  };

  //Initializer
  init = async () => {
    this.load(true);
    await getTranslatedText().then(res =>
      this.setState({ lang: res.lang, text: res.text })
    );
    await getMicrositeConfigData().then(config => this.setState({ config }));
    let token = await authenticate();
    let authenticated = token ? await api.authenticatetoken(token) : null;
    console.log(authenticated);
    if (authenticated) this.setState({ userinfo: authenticated });
    let recommenderAccount = authenticated ? await api.loginToRecommender(authenticated) : null;
    console.log(recommenderAccount);
    let recommenderAccountProducts = recommenderAccount ? await api.recommenderProducts(authenticated) : null;
    console.log(recommenderAccountProducts);
    if (recommenderAccountProducts) {
      let list = [];
      Object.keys(recommenderAccountProducts.message).forEach(product=>{
        if (!product.includes(',')) list.push(product);
      });
      this.setState({recommenderinfo: object.pick(recommenderAccountProducts.message, list)});
    }
    console.log('loading')
    this.load(false);
  };
  /*======================================================= */
  componentWillMount() {
    this.init();
  }
  render() {
    if (!this.state.loading && this.state.userinfo && this.state.recommenderinfo)
      return (
        <div className="App-Container">
          <div className="App">
            <Route path="/" render={(routeProps) => <Navigation state={this.state} routeProps={routeProps} />} />
            <Route path="/" render={(routeProps) => <Navigation state={this.state} routeProps={routeProps} fixed={true} updateState={this.updateState} />} />
            <div className="Content">
              <Header />
              <Route path="/" render={(routeProps) => <Body state={this.state} routeProps={routeProps} updateState={this.updateState} />} />
              <Footer />
            </div>
          </div>
        </div>
      );
    else if (!this.state.loading && this.state.userinfo && !this.state.recommenderinfo) return <Route path="/" render={() => <Setup state={this.state} updateState={this.updateState} />} />
    else if (!this.state.loading && !this.state.userinfo) return <Route path="/" render={() => <Login state={this.state} updateState={this.updateState} />} />
    else return <Loader />;
  }
}

export default App;
