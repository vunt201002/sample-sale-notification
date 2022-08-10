import React from 'react';
import {Route, Switch} from 'react-router-dom';
import loadable from 'react-loadable';
import Loading from '@assets/components/atoms/Loading';

const createRoute = route => {
  const {path} = route;
  const routePath = (() => {
    if (path === '/home') return '/';
    if (path === '/not-found') return '*';
    return path;
  })();
  const component = loadable({
    loader: () => import(`../pages${route.path.replace(':', '@')}`),
    loading: Loading
  });
  const exact = path !== '/not-found';
  return {path: routePath, component, exact};
};

const createList = routes => {
  const list = [];
  routes.forEach(route => {
    list.push(createRoute(route));
    list.push(...createList(route.childRoutes));
  });
  return list;
};

const a = require('!react-router-routes-loader!../pages');
const allPages = require('!pegasus-loader!../pages');
const allRoutes = createList(allPages.childRoutes);
allRoutes.sort(a => (a.path === '*' ? 0 : -1));

console.log(111, a);
console.log(222, allPages);
console.log(333, allRoutes);

const Routes = () => (
  <Switch>
    {allRoutes.map((props, key) => (
      <Route key={key} {...props} />
    ))}
  </Switch>
);

export default Routes;
