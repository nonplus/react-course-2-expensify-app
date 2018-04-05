import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAsync } from "../actions/auth";

export const Header = ({ logoutAsync }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/" exact={true}>
          <h1>Expensify</h1>
        </Link>
        <button className="button button--link" onClick={logoutAsync}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = dispatch => ({
  logoutAsync: () => dispatch(logoutAsync())
});

export default connect(undefined, mapDispatchToProps)(Header);
