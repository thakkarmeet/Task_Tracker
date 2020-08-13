import "babel-polyfill";
import React from "react";
import ReactDom from "react-dom";
import { TodoApp } from "../jsx/TodoApp";

// Initialize the JSX app if the target is on the page.
const todoAppTarget = document.getElementById("TodoApp");
if (todoAppTarget) {
    ReactDom.render(<TodoApp />, todoAppTarget);
}
