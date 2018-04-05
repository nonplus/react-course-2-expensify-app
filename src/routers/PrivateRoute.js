import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Header from "../components/Header";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  console.log("isAuthenticated", isAuthenticated);
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? (
          <div>
            <Header />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: Boolean(state.auth.uid)
});

export default connect(mapStateToProps)(PrivateRoute);
