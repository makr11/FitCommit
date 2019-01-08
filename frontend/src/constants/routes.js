import React from 'react';
// view sidebar components
import Arrivals from '../views/Arrivals/Arrivals';
import Dashboard from '../views/Dashboard/Dashboard';
import Services from '../views/Services/Services';
import Users from '../views/Users/Users';
import User from '../views/User/User';
// material ui icons
import SettingsCellIcon from '@material-ui/icons/SettingsCell';
import PersonIcon from '@material-ui/icons/Person';
import InputIcon from '@material-ui/icons/Input';
import DashboardIcon from '@material-ui/icons/Dashboard';

export const sidebarRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Pregled",
    sidebarIcon: <DashboardIcon/>,
    component: Dashboard,
  },
  {
    path: "/arrivals",
    sidebarName: "Dolasci",
    sidebarIcon: <InputIcon/>,
    component: Arrivals,
  },
  {
    path: "/services",
    sidebarName: "Usluge",
    sidebarIcon: <SettingsCellIcon/>,
    component: Services,
  },
  {
    path: "/users",
    sidebarName: "Članovi",
    sidebarIcon: <PersonIcon/>,
    component: Users,
  },
];

export const mainRoutes = [
  {
    path: "/profile/:id",
    component: User,
  },
]
