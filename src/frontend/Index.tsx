import "core-js"; // polyfill for ie support

import { render } from "react-dom";
import App from "./App";
import { store } from "./redux/Store";

// @ts-ignore
import dark from "antd/dist/dark-theme";

(async () => {
  // TODO: sucks... too long for initial render when dark theme is selected...
  const theme = store.getState().app.theme;
  if (theme === "dark") {
    // @ts-ignore
    await window.less.modifyVars({
      ...dark,
    });
  }

  render(App, document.getElementById("root"));
})();
