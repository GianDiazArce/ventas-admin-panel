import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}:any) => {
  return (
    <Route
      {...rest}
      component={(props:any) =>
        isAuthenticated === false ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};
