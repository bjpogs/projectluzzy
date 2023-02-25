import React from "react";
import { Redirect, Route } from "react-router-dom";

function AdminRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("adminAuthenticated") || false;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default AdminRoute;