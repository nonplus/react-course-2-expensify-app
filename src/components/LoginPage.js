import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import { loginAsync } from "../actions/auth";

export const LoginPage = ({ loginAsync }) => (
  <div>
    <h1>Login</h1>
    <p>
      <button onClick={loginAsync}>Login</button>
    </p>
  </div>
);

const mapDispatchToProps = dispatch => ({
  loginAsync: () => dispatch(loginAsync())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
