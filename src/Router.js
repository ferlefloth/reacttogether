import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './Home/Home';

const NotFound404 = () => <div>Nothing to do here</div>;

const Router = () => {

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound404} />
    </Switch>
  );
};

export default Router;