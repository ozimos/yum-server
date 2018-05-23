import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import About from './components/presentational/About';
import SignUp from './components/presentational/SignUp';

export default () =>
  (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/about" component={About} />
        <Route path="/app" component={App} />
      </Switch>
    </BrowserRouter>
  );
