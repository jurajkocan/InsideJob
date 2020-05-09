import React from "react";
import backgroundLogo from "assets/images/404-1.png";
import { style } from "typestyle";

const notFoundStyle = {
  wrapper: style({
    maxWidth: "100%",
  }),
};
export default () => (
  <div>
    <h1>404</h1>
    <img src={backgroundLogo} />
  </div>
);
