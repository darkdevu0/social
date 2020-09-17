import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED,
} from "../types";

import Axios from "axios";

export const loginUser = (email, password, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  Axios.post("/login", { email, password })
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.replace("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBidToken");
  delete Axios.defaults.headers.common.Authorization;
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const signupUser = (
  email,
  password,
  confirmPassword,
  handle,
  history
) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  Axios.post("/signup", { email, password, confirmPassword, handle })
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.replace("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  Axios.get("/user")
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  Axios.post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  Axios.post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

// helper

const setAuthorizationHeader = (token) => {
  const FBidToken = `Bearer ${token}`;
  localStorage.setItem("FBidToken", FBidToken);
  Axios.defaults.headers.common["Authorization"] = FBidToken;
};
