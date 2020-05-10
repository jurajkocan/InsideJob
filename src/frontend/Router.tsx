import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import MasterPage from "./MasterPage";
import { Roots } from "src/constants/Roots";

export const RouterApp = () => (
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
);
