import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

export const withRouter = (
  children: React.ReactElement,
  defaultRoute: string,
  testedRoute: string[]
) => (
  <MemoryRouter initialEntries={testedRoute}>
    <Route path={defaultRoute}>{children}</Route>
  </MemoryRouter>
);
