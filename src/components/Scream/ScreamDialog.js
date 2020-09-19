import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Like from "./Like";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

// MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// icons
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";

// redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
import { UnfoldMore } from "@material-ui/icons";

const styles = (theme) => ({
  ...theme.dialog,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
    width: "90%",
    height: "100%",
    marginLeft: 6,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    alignSelf: "flex-end",
  },
  spinnerDiv: {
    textAlign: "center",
    margin: "50 0 50 0",
  },
  test: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    width: "100%",
  },
});

const ScreamDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [OldPath, setOldPath] = useState("");
  const [NewPath, setNewPath] = useState("");

  useEffect(() => {
    if (props.openDialog) handleOpen();
  }, []);

  const {
    classes,
    scream: {
      screamId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
      comments,
    },
    UI: { loading },
    openDialog,
  } = props;

  const handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);
    setOldPath(oldPath);
    setNewPath(newPath);
    setOpen(true);
    props.getScream(props.screamId);
  };

  const handleClose = () => {
    window.history.pushState(null, null, OldPath);
    setOpen(false);
    props.clearErrors();
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} color={"primary"} thickness={2} />
    </div>
  ) : (
    <Grid container spacing='5'>
      <Grid item sm={5}>
        <img src={userImage} alt='Profile' className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color='primary'
          variant='h5'
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeprator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeprator} />
        <Typography variant='body1'>{body}</Typography>
        <div className={classes.test}>
          <Like screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} comments</span>
        </div>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comment comments={comments} />
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip='Expand Scream'
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color='primary' />
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

        <DialogContent className={`${classes.dialogContent} temp`}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  scream: state.data.scream,
});

export default connect(mapStateToProps, { getScream, clearErrors })(
  withStyles(styles)(ScreamDialog)
);
