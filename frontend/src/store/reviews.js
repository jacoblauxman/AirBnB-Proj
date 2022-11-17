import { csrfFetch } from './csrf'

// --- STRING LITERALS - for ACTIONS --- //

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW'
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'
// export const UPDATE_REVIEW = ''



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
  console.log(response, 'here in review thunk response')

  if (response.ok) {
    const reviews = await response.json()
    console.log(reviews, 'get reviews thunk ok before dispatch')
    dispatch(loadReviews(reviews, spotId))
    console.log('after dispatch get reviews thunk')
  }
}

//create review:
export const createReview = (review, spotId) => async dispatch => {
  console.log('in createReview thunk before fetch', review, spotId)
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  })

  if (response.ok) {
    const newReview = await response.json();
    console.log('in createReview response ok', newReview)

    dispatch(addReview(newReview))
    return newReview
  }
}


//delete a review:
export const removeReview = (reviewId) => async dispatch => {
  console.log('in deleteReview thunk, before fetch', reviewId)
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

const initialState = {};

// ---- REDUCER ---- //

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const loadedState = {}
      action.reviews.Reviews.forEach(review => {
        loadedState[review.id] = review;
      })
      return {
        ...state,
        ...loadedState
      }
    case REMOVE_REVIEW:
      const removedState = { ...state }
      delete removedState[action.review.reviewId]
      return removedState

    //reference pokethunk -- looks like needs to export and be used in spots
    case ADD_REVIEW:
      const addedState = { ...state }
      addedState[action.review.id] = action.review
      return addedState
    default:
      return state
  }
}

export default reviewsReducer
