import React from "react";
import backgroundLogo from "assets/images/404-1.png";
import { style } from "typestyle";
import { Link } from "react-router-dom";
import { Roots } from "src/constants/Roots";

const notFoundStyle = {
  wrapper: style({
    maxWidth: "100%",
    minHeight: "calc(100vh - 128px)",
    backgroundImage: `url(${backgroundLogo})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  }),
};
export default () => (
  <div className={notFoundStyle.wrapper}>
    Wrong address, <Link to={Roots.Home}>back to home</Link>
  </div>
);
