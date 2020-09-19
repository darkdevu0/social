import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (themes) => ({
  ...themes.dialog,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
});

const Comment = (props) => {
  const { comments, classes } = props;

  return (
    <Grid container>
      {comments && comments.map((comment, ind) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt='comment'
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant='h5'
                      component={Link}
                      to={`/users/${userHandle}`}
                      color='primary'
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeprator} />
                    <Typography variant='body1'>{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {ind !== comments.lenght - 1 && (
              <hr className={classes.visibleSeprator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);
