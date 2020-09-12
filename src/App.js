import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import axios from "axios";
import Theme from "./util/theme";

// MUI
import { MuiThemeProvider } from "@material-ui/core";
import CreateMuiTheme from "@material-ui/core/styles/createMuiTheme";

// pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

const theme = CreateMuiTheme(Theme);

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("FBidToken"));
  }, []);

  if (token) {
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/signUp' component={Signup} />
              <Route path='/' component={Home} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
