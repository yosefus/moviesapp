import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import userService from '../../services/userServices';

export default function ProtectedRoute({ component: Component, render, ...rest }) {
  const user = userService.getCurrentUser();

  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        user ? (
          Component ? (
            <Component {...props} />
          ) : (
            render(props)
          )
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}
