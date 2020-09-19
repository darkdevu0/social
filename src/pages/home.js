import React, { useEffect } from "react";
import PropTypes from 'prop-types'
import Profile from "../components/Profile/Profile";
import ScreamSkeleton from '../util/ScreamSkeleton'

// redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

// MUI
import Grid from "@material-ui/core/Grid";
import Scream from "../components/Scream/Scream";

const Home = (props) => {
  useEffect(() => {
    props.getScreams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { screams, loading } = props.data;

  let recentScreamMarkup = loading === false && screams !== [] ? (
   screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <ScreamSkeleton />
  );

  return (
    <Grid container spacing={6}>
      <Grid item sm={8} xs={12}>
        {recentScreamMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getScreams: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);
