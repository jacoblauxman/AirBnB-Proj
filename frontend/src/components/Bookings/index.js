import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createBooking, getBookings, ownerRemoveBooking } from '../../store/bookings'
import { getCurrUser } from '../../store/session'
import { getOneSpot } from '../../store/spots'
import './Bookings.css'


const BookingsList = ({ spotId }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector(getCurrUser)
  const spot = useSelector(getOneSpot)

  const [isLoaded, setIsLoaded] = useState(false)
  const [errors, setErrors] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const bookings = useSelector(state => state.bookings?.oneSpot)
  const bookingsArr = Object?.values(bookings)

  useEffect(() => {
    dispatch(getBookings(spotId))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      errors.push('You need to login to do that!')
    }
    const newBooking = { startDate: startDate, endDate: endDate }
    const res = await dispatch(createBooking(newBooking, spotId))
    .then(() => history.push('/'))
    .catch(async res => {
      const data = await res.json()
      if (data && data.errors) setErrors([data.errors])
    })
  }


  if (!spotId || !isLoaded) return "Loading..."


  return (
    <div className='spot-reviews-container'>
      {isLoaded && (
        <div className='spot-reviews-grid-container'>
          {bookingsArr?.length > 0 && (
            <div>Currently with {bookingsArr?.length} folks planning to stay!</div>
          )}
          <div className='bookings-form-container'>
            <form onSubmit={handleSubmit}>
              <ul className='validation-error-list'>
                {errors?.length > 0 && errors.map((error, idx) => <li className='validation-error' key={idx}>{error}</li>)}
              </ul>
              <input
                type='date'
                onChange={e => setStartDate(e.target.value)}
                value={startDate}
                required={true}
                name='start date'
              />
              <input
                type='date'
                onChange={e => setEndDate(e.target.value)}
                value={endDate}
                required={true}
                name='end date'
              />
              <button type='submit'>Book this Spot</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingsList
