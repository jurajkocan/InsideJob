import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import RouterApp from "./Router";
import { cssRaw } from "typestyle";
import { cssForIe } from "src/style/common";

cssRaw(cssForIe);

export default (
  <Provider store={store}>
    <RouterApp />
  </Provider>
);
