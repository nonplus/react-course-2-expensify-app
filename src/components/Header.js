import { NavLink } from "react-router-dom";
import React from "react";
import { logoutAsync } from "../actions/auth";
import { connect } from "react-redux";

export const Header = ({ logoutAsync }) => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <NavLink to="/help" activeClassName="is-active">
      Help
    </NavLink>
    <button onClick={logoutAsync}>Logout</button>
  </header>
);

const mapDispatchToProps = dispatch => ({
  logoutAsync: () => dispatch(logoutAsync())
});

export default connect(undefined, mapDispatchToProps)(Header);
