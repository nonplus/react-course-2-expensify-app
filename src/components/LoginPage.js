import { connect } from "react-redux";
import React from "react";
import { loginAsync } from "../actions/auth";

export const LoginPage = ({ loginAsync }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It&apos;s time to get your expenses under control.</p>
      <button className="button" onClick={loginAsync}>
        Login with Google
      </button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  loginAsync: () => dispatch(loginAsync())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
