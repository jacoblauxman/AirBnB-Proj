// frontend/src/store/session.js
import { csrfFetch } from './csrf';


// ---- LITERALS ---- //

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


// ---- ACTION CREATORS ---- //

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// ---- THUNK! ---- //

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  // console.log(response)
  return response;
};

// - END OF PHASE 1: restore session
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};


// - PHASE 2: signup form - //



// ---- INITIAL SLICE OF STATE FOR USER ---- //

const initialState = { user: null };


// ---- REDUCER ---- //

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
