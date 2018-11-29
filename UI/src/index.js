import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter
} from "react-router-dom";
import "./styles/css/index.css";
import App from "./App.jsx";
import unregister from "./registerServiceWorker";
import Helmet from "react-helmet";

const Meta = () => {
  return ( 
  <Helmet >
    <title> Product Recommender </title> </Helmet>
  );
};


ReactDOM.render( 
<HashRouter >
  <div className="full-height">
  <Meta />
  <App /></div>
</HashRouter>,
  document.getElementById("root")
);
unregister();