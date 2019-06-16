import React from 'react';
import { Switch } from 'react-router-dom';
import routes from '../routes/index';
import '../style.scss';

const Main = () => {
  return (
    <main className="main">
      <Switch>
        {
          routes.map((route, index) => (
            <route.type
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.component}
              location={route.location}
            />
          ))
        }
      </Switch>
    </main>
  );
};

export default Main;
