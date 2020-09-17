import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";
import Tooltip from "@material-ui/core/Tooltip";

// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadLog,
  button: {
    float: 'right'
  }
});

const EditDetails = (props) => {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const { classes } = props;

  const setUserDetails = () => {
    const { bio, website, location } = props.credentials;
    setBio(bio ? bio : "");
    setWebsite(website ? website : "");
    setLocation(location ? location : "");
  };

  const handleOpen = () => {
    setOpen(true);
    setUserDetails();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    eval(`set${event.target.name}('${event.target.value}')`);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      location,
      website,
    };
    props.editUserDetails(userDetails);
    handleClose();
  };

  return (
    <Fragment>
      <Tooltip title='Edit details' placement='top'>
        <IconButton onClick={handleOpen} className={classes.button}>
          <EditIcon color='primary' />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='Bio'
              type='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='Website'
              type='text'
              label='Website'
              placeholder='Your Personal/Professional website'
              className={classes.textField}
              value={website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='Location'
              type='text'
              label='Location'
              placeholder='Your location'
              className={classes.textField}
              value={location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

EditDetails.prototype = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
