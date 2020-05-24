import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React, { Suspense, lazy } from "react";
import MasterPage from "./MasterPage";
import { Roots } from "src/constants/Roots";
import { IntlProvider } from "react-intl";
import translation_en_US from "src/translations/en-US.json";
import translation_wookie from "src/translations/wookie.json";
import { State } from "./redux/States";
import { Languages } from "src/types/Common";

const translations = {
  "en-US": translation_en_US,
  wookiee: translation_wookie,
};

type StateProps = {
  language: Languages;
};
export const RouterApp = (props: StateProps) => (
  <IntlProvider locale={props.language} messages={translations[props.language]}>
    <BrowserRouter>
      <Suspense
        fallback={
          <MasterPage>
            <div>Loading...</div>
          </MasterPage>
        }
      >
        <MasterPage>
          <Switch>
            <Route
              exact
              path={Roots.Home}
              component={lazy(() => import("./pages/Home"))}
            />
            <Route
              exact
              path={Roots.PersonList}
              component={lazy(() => import("./pages/PersonList"))}
            />
            <Route
              exact
              path={Roots.PersonDetailWithParam}
              component={lazy(() => import("./pages/PersonDetail"))}
            />
            <Route component={lazy(() => import("./pages/404"))} />
          </Switch>
        </MasterPage>
      </Suspense>
    </BrowserRouter>
  </IntlProvider>
);

const mapStateToProps = (state: State): StateProps => ({
  language: state.app.language,
});

export default connect(mapStateToProps)(RouterApp);
