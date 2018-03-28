import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  console.log("isAuthenticated", isAuthenticated);
  return (
    <Route
      {...rest}
      component={props =>
        !isAuthenticated ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: Boolean(state.auth.uid)
});

export default connect(mapStateToProps)(PublicRoute);
