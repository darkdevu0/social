import React, { Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

import { Link } from "react-router-dom";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// redux
import { connect } from "react-redux";

// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

const Navbar = (props) => {
  const { authenticated } = props;

  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {authenticated ? (
          <Fragment>
            <MyButton tip='Post a Scream!'>
              <AddIcon/>
            </MyButton>
            <Link to='/'>
              <MyButton tip='Home'>
                <HomeIcon/>
              </MyButton>
            </Link>
            <MyButton tip='notifications'>
              <Notifications/>
            </MyButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/'>
              Home
            </Button>
            <Button color='inherit' component={Link} to='/signup'>
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.prototype = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
