//for fetching:
import { csrfFetch } from './csrf'


// --- STRING LITERALS - for ACTIONS --- //

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const ADD_SPOT = 'spots/ADD_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'




// ---- ACTIONS/CREATORS ---- //

//load all spots
export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  }
}

//create spot / add spot to 'oneSpot' / edit spot
export const addSpot = (spot) => {
  console.log('in addSpot creator:', spot)
  return {
    type: ADD_SPOT,
    spot
  }
}

//delete spot
export const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  }
}





// ---- THUNKS ---- //

// get all spots
export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const spots = await response.json()
    console.log('here in thunk ok', spots.Spots)
    dispatch(loadSpots(spots.Spots))
  }
}

// get one spot
export const fetchOneSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  console.log('here in fetch one')

  if (response.ok) {
    const spot = await response.json();
    console.log('here in thunk for spot ok', spot)
    dispatch(addSpot(spot))
    return spot
  }
}

//create a spot
export const createSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', { //CSRF FETCH when you get in trouble
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  })

  if (response.ok) {
    const spot = await response.json()
    console.log('here in thunk for createSpot ok', spot)
    dispatch(addSpot(spot))
    return spot
  }
}


// update a spot
export const updateSpot = spot => async dispatch => {
  const response = await csrfFetch(`api/spots/${spot.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot)
  })

  if (response.ok) {
    const updatedSpot = await response.json()
    dispatch(addSpot(updatedSpot))
    return updatedSpot
  }
}


//delete a spot
export const removeSpot = spot => async dispatch => {
  console.log('inside fetch delete Spot fetch')
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(deleteSpot(spot.id))
    console.log('inside response ok delete thunk:', spot.id)
    return spot
  }
}



// ---- SELECTORS ---- //

//for all spots -- array
export const getAllSpots = (state) => Object.values(state.spots.Spots)
// export const getAllSpots = (state) => state.spots.Spots

// for one spot -- object
export const getOneSpot = (state) => state.spots.oneSpot




// ---- INITIAL STATE ---- //

const initialState = { Spots: {}, oneSpot: {} }




// ---- REDUCER ---- //

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    // load all spots:
    case LOAD_SPOTS:
      const loadState = { ...state, Spots: { ...state.Spots } }
      action.spots.forEach((spot) => (loadState.Spots[spot.id] = spot))
      return loadState;

    case ADD_SPOT:
      //checking whether exists, if so update our Spots with new spot! -- attempt at create, read (single), update
      if (!state.Spots[action.spot.id]) {
        const addState = {
          ...state,
          Spots: { ...state.Spots, [action.spot.id]: action.spot },
          oneSpot: { ...state.oneSpot }
        }
        //setting new spot to our oneSpot, then returning
        addState.oneSpot = action.spot
        return addState
      } // else - ish: if we have the spot already, set as our 'oneSpot' - can pull in via selector then!
      const newState = {
        ...state,
        // this line especially intended for UPDATE spreading, as well as setting 'oneSpot'
        Spots: { ...state.Spots, [action.spot.id]: { ...state.Spots[action.spot.id], ...action.spot } },
        oneSpot: { ...state.oneSpot }
      }
      // sets our one spot, and returns
      newState.oneSpot = action.spot;
      return newState;

    // delete a spot:
    case DELETE_SPOT:
      const deleteState = { ...state, Spots: { ...state.Spots }, oneSpot: { ...state.oneSpot } }
      delete deleteState.Spots[action.spotId]
      //making sure oneSpot is set to empty obj by default -> hoping to redirect user home after deletion
      deleteState.oneSpot = {}
      return deleteState;

    default:
      return state
  }
}

export default spotsReducer
