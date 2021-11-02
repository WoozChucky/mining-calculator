// @flow
import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, useParams
} from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import {AppRoutes, RouteWithSubRoutes} from "./components/RouterConfig";

function ProtectedPage() {
  return null;
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { id } = useParams<any>();

  return (
      <div>
        <h3>ID: {id}</h3>
      </div>
  );
}

export default function MyRouterApp() {
  return (

      <div className="App">
        <header className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <Router>
            <div>
              <ul>
                <li>
                  <Link className="App-link" to="/">Home</Link>
                </li>
                <li>
                  <Link className="App-link" to="/calculator">Calculator</Link>
                </li>
              </ul>
            </div>

            <div className="App-content">
              <Switch>
                <PrivateRoute path="/test">
                  <ProtectedPage />
                </PrivateRoute>
                <Route path="/param/:id" component={Child} />
              </Switch>

              <Switch>
                {AppRoutes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
              </Switch>
            </div>
          </Router>
        </header>
      </div>
  );
}
