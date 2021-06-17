import React from "react";
import { Counter } from "./components/counter/Counter";
import "@fontsource/roboto";
import Header from "./components/header/header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ListUser } from "./views/admin/listUser";
import { USerListMenu } from "./views/customer/listMenu";
import Login from "./views/admin/login";
import { Dashboard } from "./views/customer/dashboard";
import { Profile } from "./views/admin/profile";
import GetAddress from "./views/customer/getAddress";
import CreateUser from "./views/admin/createUser";
import CreateMenu from "./views/admin/createMenu";
import { createMuiTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from "@material-ui/core";
import AuthProvider, { AuthIsNotSignedIn, AuthIsSignedIn } from "./contexts/authContext";

let lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
})
lightTheme = responsiveFontSizes(lightTheme)

const NotSignedInRoutes: React.FunctionComponent = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/adminLogin">
        <Login />
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
      <Route path="/createUser">
        <CreateUser />
      </Route>
      <Route path="/counter">
        <Counter />
      </Route>
      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  </Router>
)

const SignedInRoutes: React.FunctionComponent = () => (
  <Router>
    <Header />
    <Switch>
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
);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <AuthProvider>
          <AuthIsSignedIn>
            <SignedInRoutes />
          </AuthIsSignedIn>
          <AuthIsNotSignedIn>
            <NotSignedInRoutes />
          </AuthIsNotSignedIn>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
