import React, { Component } from "react";
import Menu from "./Menu";
import MenuLinkGroup from "./MenuLinkGroup";
import MenuLink from "./MenuLink";
import logout from "../../util/logout";


class Navigation extends Component {
  state = {
    showMenuLinkGroup: window.innerWidth < 768 ? false : true
  }
  handleClick = (e, className) =>{
    if(!e.matches && window.innerWidth < 768){
      this.setState(st => ({showMenuLinkGroup: !st.showMenuLinkGroup}));
    }
    else this.setState({showMenuLinkGroup: true});

    if(className){
      this.goToElement(className);
    }
  }

  goToElement = async (className) => {
    if(this.props.routeProps.location.pathname !=="/"){
      await this.props.routeProps.history.push(`/${className}/link_id=${this.props.state.link_id}`);
    }
    let element = document.getElementsByClassName(className)[0];
    element.scrollIntoView({
      behavior: 'smooth',
      block: "start"
    });
  }

  logout = () =>{
    logout('recommender-user-token');
    this.props.updateState({userinfo: null, recommenderinfo: null})
  }

  componentWillMount(){
    let mql = window.matchMedia('(min-width: 768px)');
    mql.addListener(this.handleClick);
  }
  render() {
      return (
        <div className={`navigation ${this.props.fixed ? "fixed" : ""}`}>
        <Menu showMenuLinkGroup={(e)=>this.handleClick(e, null)}/>
        <MenuLinkGroup show={this.state.showMenuLinkGroup}>
        <div className="menu-scroll">
          <MenuLink icon={"fas fa-search"} title={"Search by Item"} onClick={(e)=>this.handleClick(e, "search")}/>
          <MenuLink icon={"fas fa-chess-king"} title={"Top Associations"} onClick={(e)=>this.handleClick(e, "top-association")}/>
          <MenuLink icon={"fas fa-file-upload"} title={"Submit Data"} onClick={(e)=>this.handleClick(e, "submit-data")}/>
          <MenuLink title="Sign Out" onClick={this.logout}/>
        </div>
        </MenuLinkGroup>
        </div>
      );
  }
}

export default Navigation;
