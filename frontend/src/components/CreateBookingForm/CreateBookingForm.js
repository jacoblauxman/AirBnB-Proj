import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUser } from '../../store/session';
import { createBooking, getBookings } from '../../store/bookings';
import './CreateBookingForm.css'
import { getOneSpot } from '../../store/spots';

function CreateBookingForm({ spotId, bookSpot }) {
  // const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector(getCurrUser)
  const spot = useSelector(getOneSpot)

  const currDate = new Date();
  const minDate = currDate.toISOString().split("T")[0]
  let startDefault = new Date(currDate)
  startDefault.setDate(startDefault.getDate() + 3)
  let endDefault = new Date(currDate)
  endDefault.setDate(endDefault.getDate() + 5)


  const [isLoaded, setIsLoaded] = useState(false)
  const [errors, setErrors] = useState([])
  const [startDate, setStartDate] = useState(startDefault)
  const [endDate, setEndDate] = useState(endDefault)
  const bookings = useSelector(state => state.bookings?.oneSpot)
  const bookingsArr = Object?.values(bookings)

  useEffect(() => {
    dispatch(getBookings(spotId))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!currUser) history.push(`/spots/${spotId}`)

    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (now > start || now > end) {
      setErrors([`You can't book a date in the past!!`])
    } else if (start > end) {
      setErrors([`Start Date cannot be after End Date (can't start after ending)!!`])
    }
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


  if (!spotId) return null

  return (
    <div className='spot-bookings-container'>
      <div className='bookings-header'>
        <div className='header-items'>
          ${spot.price} <span className='price-text'>night</span>
        </div>
        <div className='header-items'>
          <span className='avg-rating'>★ {bookSpot?.avgStarRating ? bookSpot.avgStarRating.toFixed(1) : 'New'} · </span><span className='booking-review-text'> {bookSpot?.numReviews} Reviews</span>
        </div>
      </div>

      <div className='bookings-form-container'>
        <form className='bookings-form' onSubmit={handleSubmit}>
          <ul className='validation-error-list'>
            {errors?.length > 0 && errors.map((error, idx) => <li className='validation-error' key={idx}>{error}</li>)}
          </ul>
          <div className='dates-container'>
            <div className='dates-in'>
              <label htmlFor='start date' className='bookings-form-label-in'>CHECK-IN</label>
              <input
                title='CHECK-IN'
                className='bookings-input'
                type='date'
                onChange={handleSetStart}
                value={startDate.toISOString().split("T")[0]}
                required={true}
                name='start date'
                min={minDate}
              />
            </div>
            <div className='dates-out'>

              <label htmlFor='end date' className='bookings-form-label-out'>CHECKOUT</label>
              <input
                title='CHECKOUT'
                className='bookings-input'
                type='date'
                onChange={handleSetEnd}
                value={endDate.toISOString().split("T")[0]}
                required={true}
                name='end date'
                min={minDate}
              />
            </div>
          </div>
          <button
            className='bookings-submit-button'
            type='submit'>Reserve</button>
          <div className='bookings-not-charged'>You won't be charged yet</div>
        </form>
      </div>
    </div>
  )
}

export default CreateBookingForm;
