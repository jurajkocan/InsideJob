import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { RouterApp } from "./Router";

export default (
  <Provider store={store}>
    <RouterApp />
  </Provider>
);
