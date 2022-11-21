import { csrfFetch } from './csrf'

// --- STRING LITERALS - for ACTIONS --- //

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW'
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'



// ---- ACTIONS/CREATORS ---- //

const loadReviews = (reviews, spotId) => ({
  type: LOAD_REVIEWS,
  reviews,
  spotId
})

//may need spotId as well?
const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

const deleteReview = (reviewId, spotId) => ({
  type: REMOVE_REVIEW,
  reviewId,
  spotId
})



// ---- THUNKS ---- //

//get reviews of spot:
export const getReviews = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (response.ok) {
    const reviews = await response.json()
    dispatch(loadReviews(reviews, spotId))
  }
}

//create review:
export const createReview = (review, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  })

  if (response.ok) {
    const newReview = await response.json();

    dispatch(addReview(newReview))
    return newReview
  }
}


//delete a review:
export const removeReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(deleteReview(reviewId))
    return response
  }

  return
}



// ---- SELECTORS ---- //




// ---- INITIAL STATE ---- //

const initialState = { oneSpot: {} };

// ---- REDUCER ---- //

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const loadedState = { ...state, oneSpot: { ...state.oneSpot } }
      action.reviews.Reviews.forEach(review => {
        loadedState.oneSpot[review.id] = review;
      })
      return loadedState

    case REMOVE_REVIEW:
      const removedState = { ...state, oneSpot: { ...state.oneSpot } }
      delete removedState.oneSpot[action.reviewId]
      return removedState

    case ADD_REVIEW:
      const addedState = { ...state, oneSpot: { ...state.oneSpot } }
      console.log('in ADD-REVIEW REDUCER', addedState)
      addedState.oneSpot[action.review.id] = action.review
      return addedState
    default:
      return state
  }
}

export default reviewsReducer
