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
  console.log(spotId, 'SPOTID IN BOOKINGS LIST- PROp!')

  const [isLoaded, setIsLoaded] = useState(false)
  const [errors, setErrors] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const bookings = useSelector(state => state.bookings?.oneSpot)
  const bookingsArr = Object?.values(bookings)

  useEffect(() => {
    if (spotId) {

      dispatch(getBookings(spot?.id))
        .then(() => {
          console.log(spotId, 'SPOTID USEEFFECt')
          setIsLoaded(true)
        })
    }
  }, [dispatch, spotId, spot])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if (!currUser) {
    //   setErrors('You need to login to do that!')
    // }
    if (errors.length > 0) return

    const newBooking = { startDate: startDate, endDate: endDate }
    const res = await dispatch(createBooking(newBooking, spotId))
      .then(() => history.push('/'))
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors) setErrors([data.errors])
      })
  }

  const handleSetStart = (e) => {
    setErrors([])
    setStartDate(e.target.value)
  }
  const handleSetEnd = (e) => {
    setErrors([])
    setEndDate(e.target.value)
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
                onChange={handleSetStart}
                value={startDate}
                required={true}
                name='start date'
              />
              <input
                type='date'
                onChange={handleSetEnd}
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
