import React, { Component } from "react";
import getTranslatedText from "../../util/getTranslatedText";

class Language extends Component {
  toggleLang = () => {
    if (this.props.lang === "en") {
      getTranslatedText("fr").then(res => {
        this.props.updateState({ lang: res.lang, text: res.text });
      });
    } else {
      getTranslatedText("en").then(res => {
        this.props.updateState({ lang: res.lang, text: res.text });
      });
    }
  };
  defaultLang = () =>{
    getTranslatedText(this.props.lang).then(res => {
      this.props.updateState({ lang: res.lang, text: res.text });
    });
  }
  componentWillMount() {
    this.defaultLang();
  }
  render() {
    if (this.props.display) {
      return (
        <div className="language" onClick={this.toggleLang}>
          {this.props.lang === "en" ? (
            <a>{this.props.text.FR}</a>
          ) : (
            <a>{this.props.text.EN}</a>
          )}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Language;
