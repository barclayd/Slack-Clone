import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';

export default () => {
  let routes = (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Redirect to="/" render={() => Home} />
      </Switch>
    </BrowserRouter>
  );

  if (localStorage.getItem('token') !== null) {
    // presume authenticated user
    routes = (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/create-team" exact component={CreateTeam} />
          <Redirect to="/" render={() => Home} />
        </Switch>
      </BrowserRouter>
    );
  }

  return routes;
};
