import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import Scream from "../components/Scream/Scream";
import StaticProfile from "../components/Profile/StaticProfile";
import ScreamSkeleton from '../util/ScreamSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'


// MUI
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

const user = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [profile, setProfile] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [screamIdParam, setScreamIdParam] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handle = props.match.params.handle;
    const screamId = props.match.params.screamId;
    if (screamId) setScreamIdParam(screamId);
    props.getUserData(handle);

    Axios.get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { screams, loading } = props.data;

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === [] ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamIdParam)
        return <Scream key={scream.screamId} scream={scream} />;
      else return <Scream key={scream.screamId} scream={scream} openDialog />;
    })
  );

  return (
    <Grid container spacing={6}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile !== null ? (
          <StaticProfile profile={profile} />
        ) : (
          <ProfileSkeleton />
        )}
      </Grid>
    </Grid>
  );
};

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
