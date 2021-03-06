import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashborad from './pages/Dashborad';
import Create from './pages/Create';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashborad} />
      <Route exact path="/cadastro" component={Create} />
    </BrowserRouter>
  );
}