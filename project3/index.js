import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";
import App from "./src";



const render = (Component) =>
  ReactDOM.render(<Component />, document.getElementById("app"));

render(hot(App));