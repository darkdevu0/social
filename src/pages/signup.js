import React, { useState } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import axios from "axios";
import { Link } from "react-router-dom";

// REDUX
import { connect } from 'react-redux'
import {signupUser} from '../redux/actions/userActions'

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.log
});

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { classes } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signupUser(email, password, confirmPassword, handle, props.history);
  };

  const handleChange = (event) => {
    eval(`set${event.target.name}('${event.target.value}')`);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='monkey image' className={classes.image} />
        <Typography variant='h3' className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='Email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={props.UI.errors.email}
            error={props.UI.errors.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='handle'
            name='Handle'
            type='text'
            label='Handle'
            className={classes.textField}
            helperText={props.UI.errors.handle}
            error={props.UI.errors.handle ? true : false}
            value={handle}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='password'
            name='Password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={props.UI.errors.password}
            error={props.UI.errors.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='confirmPassword'
            name='ConfirmPassword'
            type='password'
            label='Confirm Password'
            className={classes.textField}
            helperText={props.UI.errors.confirmPassword}
            error={props.UI.errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          {props.UI.errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {props.UI.errors.general}
            </Typography>
          )}
          {!props.UI.loading ? (
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Signup
            </Button>
          ) : (
            <CircularProgress className={classes.progress} />
            )}
          <small className={classes.small}>
            Already have an account ? <Link to='/login'>Login</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    UI: state.UI,
    user: state.user
  }
};

const mapActionToProps = {
  signupUser
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Signup));
