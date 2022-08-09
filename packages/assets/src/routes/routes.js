import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '@assets/loadables/Home';
import Samples from '@assets/loadables/samples';
import NotFound from '@assets/loadables/notFound';
import Integration from '@assets/loadables/integration';
import IntegrationOne from '@assets/loadables/integration/sample';

const routeGroups = [
  {path: '/', component: Home},
  {path: '/samples', component: Samples},
  {path: '/integrations', component: Integration},
  {path: '/integrations/:id', component: IntegrationOne}
];

const Routes = () => (
  <Switch>
    {routeGroups.map((props, key) => (
      <Route key={key} exact {...props} />
    ))}
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
