const drawerWidth = 265;

export const appStyle = theme => ({
  root: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    width: `calc(100% - ${drawerWidth+48}px)`,
    minHeight: '100vh',
    float: 'right',
  },
  toolbar: theme.mixins.toolbar,
});

export const navbarStyle = theme => ({
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  }
});

export const sidebarStyle = theme => ({
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});
