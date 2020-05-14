import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { RouterApp } from "./Router";
import { cssRaw } from "typestyle";
import { cssForIe } from "src/style/common";
import { IntlProvider } from "react-intl";
import translation_en_US from "src/translations/en-US.json";
import translation_wookie from "src/translations/wookie.json";

cssRaw(cssForIe);

const usersLocale = "en-US";
const translations = {
  "en-US": translation_en_US,
  wookie: translation_wookie,
};
export default (
  <IntlProvider locale={usersLocale} messages={translations[usersLocale]}>
    <Provider store={store}>
      <RouterApp />
    </Provider>
  </IntlProvider>
);
