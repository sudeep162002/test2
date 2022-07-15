import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          currentUser.emailVerified ? (
            <Component {...props} />
          ) : (
            <Redirect to="/admin" />
          )
        ) : (
          <Redirect to="/admin" />
        );
      }}
    />
  );
}

export default PrivateRoute;
