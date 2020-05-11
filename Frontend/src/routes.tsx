import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Detail from './pages/Detail';
import Home from './pages/Home';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/home" component={Home} />
      <Route path="/detail/:login" component={Detail} />

      <Route path="/**">
        <Redirect to="/home" />
      </Route>
    </Switch>
    </BrowserRouter>
  );
};

export default Routes;