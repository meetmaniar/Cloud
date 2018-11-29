import React, { Component } from "react";
import { Panel, PanelBody, PanelHeading } from "../../components/Elemental/Panel";
import Input from "../../components/Elemental/Input";
import api from "../../api/api";
import Button from "../../components/Elemental/Button";

class Search extends Component {
  state = {
    search: "",
    results: this.props.info,
    message: ""
  }
  submitSearch = (e) => {
    e.preventDefault();
    if (this.state.search.length > 0) {
      api.getRelatedProducts(this.state.search).then(res => {
        if (res.message) {
          this.setState(st => {
            st.results = {};
            st.results[this.state.search] = res.message;
            return st
          })
        }
        else {
          this.setState({ message: `* No results were found for ${this.state.search}` })
        }
      })
    }
  }

  resetResults = () =>{
    this.setState({message: ""})
    this.setState({ message: "", results: this.props.info});
  }

  update = (input) => {
    this.setState(input);
  }
  render() {
    return (
      <div className="search">
        <h1>Search for a product</h1>
        <Panel class="search-panel">
          <PanelBody class="search-body">
            <div className="search-name">
              <form onSubmit={this.submitSearch}>
                <Input name="search" label="Search a product" type="text" value={this.state.search} placeholder={"eg. milk"} update={this.update} autoFocus={true} />
                <div className="search-buttons">
                <Button type="submit" class="button dark">Search</Button>
                <Button type="button" class="button light" onClick={this.resetResults}>Clear search results</Button>
                </div>
              </form>
            </div>
          </PanelBody>
        </Panel>
        {this.state.message.length > 0 ?
          <Panel class="search-body">
            <PanelHeading>
              {this.state.message}
            </PanelHeading>
          </Panel>
          :
          ""
        }
        <Panel class="search-body">
          {Object.keys(this.state.results).map((key, i) => (
            <div key={i} >
              <PanelHeading>
                <h1>{key}</h1>
              </PanelHeading>
              <PanelBody>{this.state.results[key].map(el => {
                return <div className={`top-association-tags`} key={el}>{el}</div>
              })}</PanelBody>
            </div>
          ))}
        </Panel>
      </div>
    )
  }

}

export default Search;
