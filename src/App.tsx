import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import './App.less';
import {
  BrowserRouter, Redirect, Route, Switch, useLocation,
} from 'react-router-dom';
import { isEmpty, map } from 'lodash';
import modules from './modules';
import { userInfoState } from './store';
import Layout from './modules/Layout';

const { Login } = modules;

function NestedRoute(route: any) {
  const {
    routes, token, withLayout = true, component: RouteComponent, ...rest
  } = route;

  if (!token) {
    return (
      <Route {...rest}>
        <Redirect to="/login" />
      </Route>
    );
  }

  if (!isEmpty(routes)) {
    return (
      <Route
        {...rest}
        render={(props) => (withLayout ? (
          <Layout>
            <RouteComponent>
              {map(routes, (rt) => <NestedRoute {...rt} />)}
            </RouteComponent>
          </Layout>
        ) : (
          <RouteComponent>
            {map(routes, (rt) => <NestedRoute {...rt} />)}
          </RouteComponent>
        ))}
      />
    );
  }
  return withLayout ? (
    <Layout>
      <Route {...rest} component={RouteComponent} />
    </Layout>
  ) : <Route {...rest} component={RouteComponent} />;
}

function NoRouteMatch() {
  const location = useLocation();

  return (
    <div>
      No Match for
      {' '}
      <code>{location.pathname}</code>
    </div>
  );
}

const routesConfig = [{
  path: '/',
  exact: true,
},
{
  path: '/main',
  component: null,
  exact: true,
  routes: [
    {
      path: '/roles',
      component: NoRouteMatch,
    },
    {
      path: '/apps/:id',
      component: NoRouteMatch,
    },
  ],
},
{
  path: '*',
  component: NoRouteMatch,
},
];

function App() {
  const buildAppRoute = useCallback((routes: any) => {
    const { token } = useRecoilValue(userInfoState);
    return map(routes, (route) => <NestedRoute {...route} token={token} />);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          {buildAppRoute(routesConfig)}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
