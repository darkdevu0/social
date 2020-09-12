import React, { useState } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import axios from "axios";
import { Link } from "react-router-dom";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.spreadLog,
});

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { classes } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    axios
      .post("/login", { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('FBidToken', `Bearer ${res.data.token}`);
        setLoading(false);
        props.history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data);
        setLoading(false);
      });
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
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='Email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='password'
            name='Password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          {!loading ? (
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Login
            </Button>
          ) : (
            <CircularProgress className={classes.progress} />
          )}
          <small className={classes.small}>
            dont have an account ? <Link to='/signup'>Signup</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
