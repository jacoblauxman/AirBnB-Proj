
// let preloadedState = {}




// --- STRING LITERALS - for ACTIONS --- //

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const LOAD_ONE = 'spots/LOAD_ONE'




// ---- ACTIONS/CREATORS ---- //

//load all spots
export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  }
}

//create spot
export const addSpot = (spot) => {
  return {
    type: CREATE_SPOT,
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

const loadOneSpot = spot => ({
  type: LOAD_ONE,
  spot
})




// ---- THUNKS ---- //

// get all spots
export const fetchSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots');

  if (response.ok) {
    const spots = await response.json()
    console.log('here in thunk ok', spots.Spots)
    dispatch(loadSpots(spots.Spots))
  }
}

// get one spot
export const fetchOneSpot = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    console.log('here in thunk for spot ok', spot)
    dispatch(loadOneSpot)
    return spot
  }
}

//create a spot
export const createSpot = (spot) => async (dispatch) => {
  const response = await fetch('/api/spots', { //CSRF FETCH when you get in trouble
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  })

  if (response.ok) {
    const spot = await response.json()
    dispatch(addSpot(spot))
    // return spot
  }
}

//remove/delete a spot
// export const removeSpot =(spot)




// ---- SELECTORS ---- //

// export const getAllSpots = (state) => state.spots.Spots
export const getAllSpots = (state) => Object.values(state.spots.Spots)




// ---- INITIAL STATE ---- //

const initialState = { Spots: {} }




// ---- REDUCER ---- //

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    // load all spots:
    case LOAD_SPOTS:
      const loadState = { ...state, Spots: { ...state.Spots } }
      action.spots.forEach((spot) => (loadState.Spots[spot.id] = spot))
      return loadState;
    // create a spot:
    case CREATE_SPOT:
      const createState = { ...state, Spots: { ...state.Spots } }
      createState.Spots[action.spot.id] = action.spot
      return createState;
    // delete a spot:
    case DELETE_SPOT:
      const deleteState = { ...state, Spots: { ...state.Spots } }
      delete deleteState.Spots[action.spotId]
      return deleteState;
    default:
      return state
  }
}

export default spotsReducer
