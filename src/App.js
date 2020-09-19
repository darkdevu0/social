import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import axios from "axios";
import Theme from "./util/theme";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute.js";
import User from "./pages/user";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// MUI
import { MuiThemeProvider } from "@material-ui/core";
import CreateMuiTheme from "@material-ui/core/styles/createMuiTheme";

// pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Axios from "axios";

const theme = CreateMuiTheme(Theme);

Axios.defaults.baseURL = 'https://asia-south1-social-52b5a.cloudfunctions.net/api'

const App = (props) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("FBidToken"));
  }, []);

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
      window.location.href = "/login";
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUserData());
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className='App'>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <AuthRoute exact path='/login' component={Login} />
                <AuthRoute exact path='/signUp' component={Signup} />
                <Route exact path='/' component={Home} />
                <Route path='/users/:handle' exact component={User} />
                <Route path='/users/:handle/scream/:screamId' exact component={User} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
