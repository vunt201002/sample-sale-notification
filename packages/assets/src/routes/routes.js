import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../loadables/Home';
import Samples from '../loadables/Samples';
import NotFound from '../loadables/NotFound';

const routeGroups = [
  {path: '/', component: Home},
  {path: '/samples', component: Samples}
];

const Routes = () => (
  <Switch>
    {routeGroups.map(group => group.map((props, key) => <Route key={key} exact {...props} />))}
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
