import React, { Component } from "react";
import { Panel, PanelBody, PanelHeading } from "../../components/Elemental/Panel";
import Input from "../../components/Elemental/Input";
import api from "../../api/api";
import Button from "../../components/Elemental/Button";
import number from 'lodash/number'

class SubmitData extends Component {
  state = {
    search: "",
    results: [],
    message: "",
    list: []
  }
  componentWillMount() {
  }
  update = (input) => {
    this.setState(input);
  }

  submitRecipe = (e) => {

    e.preventDefault();
    if (this.state.search.length > 0) {
      api.searchRecipe(this.state.search).then(res => {
        if (res.hits) {
          this.setState(st => {
            st.results = {};
            st.results = res.hits[number.random(0,9)].recipe.ingredientLines;
            return st;
          })
        }
        else {
          this.setState({ message: `* No results were found for ${this.state.search}` })
        }
      })
    }
  }

  clickWordToAdd = (e, i) => {
    e.persist();
    this.setState(st => {
      if (!st.list[i]) st.list[i] = [];
      st.list[i].push(e.target.innerText.toLowerCase());
      return st;
    })
  }
  clickWordToRemove = (e, i) => {
    e.persist();
    this.setState(st => {
      delete st.list[i];
      return st;
    })
  }

  resetResults = () => {
    this.setState({ message: "" })
    this.setState({ message: "", results: [] });
  }

  submitData = async () => {
    let data = [];
    let hugedataset = [];
    this.state.list.forEach((el, i) => {
      data.push(el.join(" "));
    });
    hugedataset = new Array(1000);
    hugedataset.fill(data, 0, 1000);
    this.props.updateState({ loading: true });
    await api.submitData(this.props.user, data).then(res => {
    })
    this.props.updateState({ loading: false });
  }

  render() {
    return (
      <div className="submit-data">
        <h1>Search Recipes</h1>
        <Panel class="search-panel">
          <PanelBody class="search-body">
            <div className="search-name">
              <form onSubmit={this.submitRecipe}>
                <Input name="search" label="Search a recipe" type="text" value={this.state.search} placeholder={"eg. chicken"} update={this.update} autoFocus={false} />
                <Button type="submit" class="button dark">Search</Button>
                <Button type="button" class="button light" onClick={this.resetResults}>Clear search results</Button>
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
        {this.state.list.c ?
          <Panel class="search-body">
            <PanelHeading>
              {this.state.list.map((item, i) => {
                return <span className={`key-words-item`} key={i} onClick={(e) => this.clickWordToRemove(e, i)}>{item ? item.join(" ") : ""}</span>
              })}
            </PanelHeading>
            <PanelBody>
              <Button type="button" class="button light" onClick={this.submitData}>Submit Data</Button>
            </PanelBody>
          </Panel>
          :
          ""
        }
        <Panel class="search-body">
          {Object.values(this.state.results).map((value, i) => {
            let ingredient = value.toUpperCase().replace(/[,*&./;]+/g,' ');
            return (
              <div key={i} >
                <PanelHeading>
                  {ingredient.toUpperCase().split(" ").map((val, j) => {
                    return <span className={`key-words`} key={j} onClick={(e) => this.clickWordToAdd(e, i)}>{val}</span>
                  })}
                </PanelHeading>
              </div>
            )
          })}
        </Panel>
      </div>
    )
  }

}

export default SubmitData;
