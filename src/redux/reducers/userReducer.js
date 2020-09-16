import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

const init = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return init;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
