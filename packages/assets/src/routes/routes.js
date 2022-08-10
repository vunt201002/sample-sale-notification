import React from 'react';
import {Route, Switch} from 'react-router-dom';
import loadable from 'react-loadable';
import Loading from '@assets/components/atoms/Loading';

const a = require('!react-router-routes-loader!../pages');
const allPages = require('!pegasus-loader!../pages');

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

const createList = (routes = allPages.childRoutes) => {
  const list = [];
  routes.forEach(route => {
    list.push(createRoute(route));
    list.push(...createList(route.childRoutes));
  });
  return list;
};

console.log(111, a);
console.log(222, allPages);
console.log(333, createList());

const Routes = () => (
  <Switch>
    {createList().map((props, key) => (
      <Route key={key} {...props} />
    ))}
  </Switch>
);

export default Routes;
