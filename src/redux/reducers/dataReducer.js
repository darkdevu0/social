import {
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  SET_SCREAMS,
  DELETE_SCREAM,
  POST_SCREAM,
  SUMBIT_COMMENT,
} from "../types";

const init = {
  screams: [],
  scream: {},
  loading: false,
};

function reducer(state = init, action) {
  let index, screams;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        loading: false,
        screams: action.payload,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      screams = [...state.screams];
      screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        return {
          ...state,
          scream: action.payload,
          screams: screams,
        };
      } else {
        return {
          ...state,
          screams: screams,
        };
      }
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(
          (scream) => scream.screamId !== action.payload
        ),
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SUMBIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    default:
      return state;
  }
}

export default reducer;
