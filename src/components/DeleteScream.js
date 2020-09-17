import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// redux
import { connect } from "react-redux";
import { deleteScream as dScream } from "../redux/actions/dataActions";

const styles = {
  deleteButton: {
    left: '90%',
    top: '10%',
    position: 'absolute'
 }
};

const DeleteScream = ({ screamId, classes, dScream }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const deleteScream = () => {
    dScream(screamId);
    setOpen(false);
  }

  return (
    <Fragment>
      <MyButton
        tip='Delete'
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color='secondary' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Are you sure you want to delete this scream ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(null, { dScream })(
  withStyles(styles)(DeleteScream)
);
