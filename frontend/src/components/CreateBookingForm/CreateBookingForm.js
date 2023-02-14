import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUser } from '../../store/session';
import { createBooking } from '../../store/bookings';
import './CreateBookingForm.css'
import { getOneSpot } from '../../store/spots';

function CreateBookingForm({ setShowModal, spotId, bookSpot }) {
  // const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector(getCurrUser)
  const spot = useSelector(getOneSpot)
  console.log(bookSpot, 'BOOK SPOT')

  const [errors, setErrors] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const bookings = useSelector(state => state.bookings?.oneSpot)
  const bookingsArr = Object?.values(bookings)


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

  const handleCancel = (e) => {
    e.preventDefault()

    setShowModal(false)
  }

  const handleSetStart = (e) => {
    setErrors([])
    setStartDate(e.target.value)
  }
  const handleSetEnd = (e) => {
    setErrors([])
    setEndDate(e.target.value)
  }


  if (!currUser) history.push(`/spots/${spotId}`)

  return (
    <div className='spot-bookings-container'>
      <div className='bookings-header'>
        <div className='header-items'>
          ${spot.price} <span className='price-text'>night</span>
        </div>
        <div className='header-items'>
          <span className='avg-rating'>★ {bookSpot?.avgStarRating} · </span><span className='booking-review-text'> {bookSpot?.numReviews} Reviews</span>
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
                value={startDate}
                required={true}
                name='start date'
              />
            </div>
            <div className='dates-out'>

              <label htmlFor='end date' className='bookings-form-label-out'>CHECKOUT</label>
              <input
                title='CHECKOUT'
                className='bookings-input'
                type='date'
                onChange={handleSetEnd}
                value={endDate}
                required={true}
                name='end date'
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
