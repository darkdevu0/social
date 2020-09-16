import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropsTypes from 'prop-types'

import { connect } from 'react-redux'

const AuthRoute = ({ component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.user.authenticated ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

AuthRoute.PropsTypes = {
  user: PropsTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AuthRoute);
