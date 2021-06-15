import React from 'react';
import logo from './logo.svg';
import { Counter } from './components/counter/Counter';
import '@fontsource/roboto';
import Header from './components/header/header';
import { Home } from '@material-ui/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ListUser } from './views/admin/listUser';
import { USerListMenu } from './views/customer/listMenu';
import Login from './views/admin/login';
import { Dashboard } from './views/customer/dashboard';
import { Profile } from './views/admin/profile';
import GetAddress from './views/customer/getAddress';
import CreateUser from './views/admin/createUser';
import CreateMenu from './views/admin/createMenu';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/adminLogin">
            <Login />
          </Route>
          <Route path="/createMenu">
            <CreateMenu />
          </Route>
          <Route path="/listUser">
            <ListUser />
          </Route>
          <Route path="/address">
            <GetAddress />
          </Route>
          <Route path="/userMenu">
            <USerListMenu />
          </Route>
          <Route path="/counter">
            <Counter />
          </Route>
          <Route path="/createUser">
            <CreateUser />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
