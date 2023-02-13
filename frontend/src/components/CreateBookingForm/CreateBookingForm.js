import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUser } from '../../store/session';
import { createBooking } from '../../store/bookings';
import './CreateBookingForm.css'
import { getOneSpot } from '../../store/spots';

function CreateBookingForm({ setShowModal, spotId }) {
  // const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector(getCurrUser)
  const spot = useSelector(getOneSpot)

  const [errors, setErrors] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const bookings = useSelector(state => state.bookings?.oneSpot)
  const bookingsArr = Object?.values(bookings)


  const handleSubmit = async (e) => {
    e.preventDefault()

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
    <div className='spot-reviews-container'>
      <div className='spot-reviews-grid-container'>
        {bookingsArr?.length > 0 && (
          <div>Finalize your trip like {bookingsArr?.length} other folks planning to stay!</div>
        )}
        <div className='bookings-form-container'>
          <form onSubmit={handleSubmit}>
            <ul className='validation-error-list'>
              {errors?.length > 0 && errors.map((error, idx) => <li className='validation-error' key={idx}>{error}</li>)}
            </ul>
            <label className='bookings-form-label'>Start Date</label>
            <input
              type='date'
              onChange={handleSetStart}
              value={startDate}
              required={true}
              name='start date'
            />
            <label className='bookings-form-label'>End Date</label>
            <input
              type='date'
              onChange={handleSetEnd}
              value={endDate}
              required={true}
              name='end date'
            />
            <button type='submit'>Book Your Trip</button>
            <button type='button' onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateBookingForm;
