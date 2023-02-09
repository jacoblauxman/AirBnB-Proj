import { csrfFetch } from "./csrf";

// --- STRING LITERALS --- //

export const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS'
export const ADD_BOOKING = 'bookings/ADD_BOOKING'
export const EDIT_BOOKING = 'bookings/EDIT_BOOKING'
export const DELETE_BOOKING = 'bookings/DELETE_BOOKING'
export const OWNER_DELETE = 'bookings/OWNER_DELETE'

// --- ACTION CREATORS --- //

const loadBookings = (bookings, spotId) => ({
  type: LOAD_BOOKINGS,
  bookings,
  spotId
})

const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking
})

const editBooking = (booking) => ({
  type: EDIT_BOOKING,
  booking
})

const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId
})

const ownerDelete = (bookingId) => ({
  type: OWNER_DELETE,
  bookingId
})

// --- THUNKS --- //

export const getBookings = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

  if (response.ok) {
    const bookings = await response.json()
    dispatch(loadBookings(bookings, spotId))

    return bookings
  }
}

export const createBooking = (booking, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(booking)
  })

  if (response.ok) {
    const newBooking = await response.json()
    dispatch(addBooking(newBooking))

    return newBooking
  }
}

export const updateBooking = (booking) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(booking)
  })

  if (response.ok) {
    const updatedBooking = await response.json()
    dispatch(editBooking(updatedBooking))

    return updatedBooking
  }
}


export const removeBooking = (bookingId) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteBooking(bookingId))

    return response
  }
}

export const ownerRemoveBooking = (bookingId) = async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(ownerDelete(bookingId))

    return response
  }
}

// --- INITIAL STATE --- //

const initialState = { oneSpot: {}, user: {} }


// --- REDUCER --- //

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS: {
      const loadedState = { ...state, oneSpot: { ...state.oneSpot }, user: { ...state.user } }
      action.bookings.Bookings.forEach(booking => {
        loadedState.oneSpot[booking.id] = booking;
      })

      return loadedState
    }

    case ADD_BOOKING: {
      const addedState = { ...state, oneSpot: { ...state.oneSpot }, user: { ...state.user } }
      addedState.oneSpot[action.booking.id] = action.booking
      addedState.user[action.booking.id] = action.booking

      return addedState
    }

    case EDIT_BOOKING: {
      const updatedState = { ...state, oneSpot: { ...state.oneSpot }, user: { ...state.user } }
      updatedState.oneSpot[action.booking.id] = action.booking
      updatedState.user[action.booking.id] = action.booking

      return updatedState
    }

    case DELETE_BOOKING: {
      const deletedState = { ...state, oneSpot: { ...state.oneSpot }, user: { ...state.user } }
      delete deletedState.oneSpot[action.bookingId]
      delete deletedState.user[action.bookingId]

      return deletedState
    }

    case OWNER_DELETE: {
      const ownerDeletedState = { ...state, oneSpot: { ...state.oneSpot }, user: { ...state.user } }
      delete ownerDeletedState.oneSpot[action.bookingId]

      return ownerDeletedState
    }

    default:
      return state
  }
}

export default bookingsReducer
