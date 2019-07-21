import React from "react";
// redux
import { connect } from "react-redux";
// redux
import { requestUsers } from "../store/actions/usersA";
import { requestServices } from "../store/actions/servicesA";
import { requestSetup } from "../store/actions/setupA";
// react router
import { withRouter } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// app components
import Signin from "./Signin";
import { sidebarRoutes, mainRoutes } from "../constants/routes";

class App extends React.Component {
  state = {
    mobileOpen: false
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getSetup();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthenticated === false) {
      this.props.getSetup();
    } else if (
      this.props.isAuthenticated === false ||
      prevProps.isAuthenticated === true
    ) {
      this.props.persistor();
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    const routes = sidebarRoutes.concat(mainRoutes);

    return (
      <BrowserRouter>
        <Route
          exact
          path="/signin"
          render={() =>
            isAuthenticated ? <Redirect to="/dashboard" /> : <Signin />
          }
        />
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        {routes.map((route, key) => {
          return (
            <Route
              path={route.path}
              key={key}
              render={() =>
                !isAuthenticated ? (
                  <Redirect to="/signin" />
                ) : (
                  <route.component />
                )
              }
            />
          );
        })}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userProfileReducer.profile,
    isAuthenticated: state.authenticationReducer.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestUsers: () => dispatch(requestUsers()),
    getServices: () => dispatch(requestServices()),
    getSetup: () => dispatch(requestSetup())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
