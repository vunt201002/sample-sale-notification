import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../loadables/Home';
import Samples from '../loadables/Samples';
import NotFound from '../loadables/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/samples" component={Samples} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
