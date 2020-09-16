import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Profile from '../components/Profile'

// MUI
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Scream from "../components/Scream";

const Home = () => {
  const [screams, setScreams] = useState(null);

  const _isMounted = useRef(true);

  useEffect(() => {
    axios
      .get("/screams")
      .then((res) => {
        if (_isMounted.current) setScreams(res.data);
      })
      .catch((err) => console.log(err));

    return () => {
      _isMounted.current = false;
    };
  }, []);

  let recentScreamMarkup = screams ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (    <CircularProgress color='secondary' />
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

export default Home;
