import React from "react";
// app components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// styles
import { withStyles } from "@material-ui/core/styles";
import { layout } from "./styles";

class Layout extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { children, classes, user } = this.props;
    const { mobileOpen } = this.state;

    return (
      <React.Fragment>
        <Navbar
          handleDrawerToggle={this.handleDrawerToggle}
          user={user}
          openUserMenu={this.openUserMenu}
        />

        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
        />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(layout)(Layout);
