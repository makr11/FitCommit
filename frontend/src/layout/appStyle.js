const drawerWidth = 175;

export const app = theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    width: `calc(100% - 48px)`,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth+48}px)`,
    },

    minHeight: '100vh',
    float: 'right',
  },
  toolbar: theme.mixins.toolbar,
})

export const navbar = theme => ({
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

export const sidebar = theme => ({
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});