import { Favorite, FavoriteBorder } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";
import PropTypes from "prop-types";



// redux
import { connect } from "react-redux";

const Like = (props) => {
  const likedScream = () => {
    if (
      props.user.likes &&
      props.user.likes.find((like) => like.screamId === props.screamId)
    )
      return true;
    return false;
  };
  const unlikeScream = () => {
    props.unlikeScream(props.screamId);
  };

  const likeButton = !props.user.authenticated ? (
    <MyButton tip='Like'>
      <Link to='/login'>
        <FavoriteBorder color='primary' />
      </Link>
    </MyButton>
  ) : likedScream() ? (
    <MyButton tip='Unlike' onClick={unlikeScream}>
      <Favorite color='primary' />
    </MyButton>
  ) : (
    <MyButton tip='Like' onClick={() => props.likeScream(props.screamId)}>
      <FavoriteBorder color='primary' />
    </MyButton>
  );

  return likeButton;
};

Like.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(Like);
