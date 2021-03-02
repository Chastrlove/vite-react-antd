import * as React from "react";
import { Suspense } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import _ from "lodash";
import { SuspenseFallback } from "components/suspenseFallback";
import { RoutesTypes } from "./types";
import { createBrowserHistory } from "history";
import { RouteComponentProps } from "react-router";
import { Access } from "./access";

export const history = createBrowserHistory();

export function renderRoutes(routes?: Array<RoutesTypes>) {
  return routes ? (
    <Switch>
      {_.map(routes, (item, i) => {
        if (item.redirect) {
          return (
            <Redirect
              key={item.key || i}
              from={item.path}
              to={item.redirect}
              exact={item.exact}
              strict={item.strict}
            />
          );
        }

        return (
          <Route
            strict={item.strict}
            exact={item.exact}
            key={item.key || i}
            path={item.path}
            render={(props) => {
              const childRoutes = renderRoutes(item.routes);

              if (item.component) {
                return (
                  <RenderRoutePage {...{ ...props, route: item }}>
                    {childRoutes}
                  </RenderRoutePage>
                );
              } else {
                return childRoutes;
              }
            }}
          />
        );
      })}
      <Redirect to={"/404"} />
    </Switch>
  ) : null;
}

interface PageRouteType extends RouteComponentProps {
  route: RoutesTypes;
}

const withAccess = (component) => {
  const Comp = component;
  return (props: PageRouteType) => {
    const { route } = props;
    return (
      <Access
        accessible={!route.unaccessible}
        fallback={<Redirect to={"/403"} />}
      >
        <Comp {...props} />
      </Access>
    );
  };
};

const RenderRoutePage = withAccess((props: PageRouteType) => {
  const { route } = props;
  let Component;
  if (route.lazy === false) {
    //layoutBasic 不需要lazy 会导致 spin有问题
    Component = route.component;
    return <Component {...props} />;
  }

  Component = route.component;

  return (
    <Suspense
      fallback={
        <div>
          <SuspenseFallback />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
});

export const RouterComponent = (props) => {
  const { routes } = props;
  return <Router history={history}>{renderRoutes(routes)}</Router>;
};
