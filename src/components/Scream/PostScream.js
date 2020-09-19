import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Tooltip from "@material-ui/core/Tooltip";
import MyButton from "../../util/MyButton";

// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// Redux
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.log,
  dialog: {
    postiton: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "4%",
    left: "90%",
  },
  submitButton: {
    float: "right",
    marginTop: 10,
  },
});

const PostScream = ({ classes, UI: { loading, errors }, postScream, clearErrors }) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState({});

  useEffect(() => {
    if (!loading) {
      setOpen(false);
      setBody("");
      clearErrors();
    }
  }, [loading]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearErrors();
  };

  const handleChange = (e) => {
    setBody(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postScream({ body });
    setBody("");
  };

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip='Post a Scream!'>
        <AddIcon color='primary' />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.dialog}
        fullWidth
        maxWidth='sm'
      >
        <MyButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='Body'
              type='text'
              label='Scream'
              multiline
              rows='3'
              placeholder='Scream at your fellow apes'
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            {!loading ? (
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
              >
                Post
              </Button>
            ) : (
              <CircularProgress color='primary' className={classes.submitButton} />
            )}
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
