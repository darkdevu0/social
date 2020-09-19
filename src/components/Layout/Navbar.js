import React, { Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

import { Link } from "react-router-dom";
import Notifications from "./Notifications";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// redux
import { connect } from "react-redux";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import PostScream from "../Scream/PostScream";

const Navbar = (props) => {
  const { authenticated } = props;

  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {authenticated ? (
          <Fragment>
            <PostScream />
            <Link to='/'>
              <MyButton tip='Home'>
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications notifications={props.notifications} />
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
  notifications: state.user.notifications,
});

export default connect(mapStateToProps)(Navbar);
