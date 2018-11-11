import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { sidebarRoutes, mainRoutes } from '../../constants/routes';

const routes = sidebarRoutes.concat(mainRoutes);

class Main extends React.Component {

  render(){
    return(
      <Switch>
        {routes.map((route, key) => {
          return(
            <Route path={route.path} component={route.component} key={key}/>
          )
        })}
      </Switch>
    )
  }
}
export default Main;
