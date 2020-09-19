import React from "react";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//icons
import ChatIcon from "@material-ui/icons/Chat";

// redux
import { connect } from "react-redux";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import Like from "./Like";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
    width: '100%'
  },
  test: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    width: '100%'
  }
};

const Scream = (props) => {
  const {
    classes,
    scream: {
      body,
      createdAt,
      userImage,
      userHandle,
      screamId,
      likeCount,
      commentCount,
    },
    user: { authenticated, credentials: {handle} },
  } = props;

  dayjs.extend(relativeTime);

  

  const deleteButton = authenticated && userHandle === handle ? (
    <DeleteScream screamId={screamId}/>
  ): null;

  const likeScream = () => {
    props.likeScream(screamId);
  };

 
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title='profile image'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          component={Link}
          to={`/users/${userHandle}`}
          color='primary'
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
        <div className={classes.test}>
          <Like screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={props.openDialog}/>
        </div>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});


export default connect(
  mapStateToProps
)(withStyles(styles)(Scream));
