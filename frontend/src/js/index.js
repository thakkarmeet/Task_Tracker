import "babel-polyfill";
import React from "react";
import ReactDom from "react-dom";
import { App } from "../jsx/App";

// Initialize the JSX app if the target is on the page.
const appTarget = document.getElementById("App");
if (appTarget) {
    ReactDom.render(<App />, appTarget);
}
