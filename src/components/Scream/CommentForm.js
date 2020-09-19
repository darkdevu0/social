import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// redux
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.dialog,
  ...theme.log,
});

const CommentForm = (props) => {
  const [body, setBody] = useState("");

  useEffect(() => {
    setBody('');
  }, [props])

  const { classes, authenticated } = props;

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitComment(props.screamId, { body });
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit} preventDefault>
        <TextField
          name='body'
          type='text'
          label='Comment on scream'
          error={props.UI.errors.comment ? true : false}
          helperText={props.UI.errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.button}
          preventDefault
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeprator} />
    </Grid>
  ) : null;

  return commentFormMarkup;
};

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  submitComment: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
