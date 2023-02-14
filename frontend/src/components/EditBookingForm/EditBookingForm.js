import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUser } from '../../store/session';
import { updateBooking } from '../../store/bookings';
import './EditBookingForm.css'
import { getOneSpot } from '../../store/spots';

function EditBookingForm({ setShowModal, booking, spotId }) {
  // const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector(getCurrUser)
  const spot = useSelector(getOneSpot)

  const [errors, setErrors] = useState([])
  const [newStartDate, setNewStartDate] = useState(booking.startDate)
  const [newEndDate, setNewEndDate] = useState(booking.endDate)
  const bookings = useSelector(state => state.bookings?.user)
  // const bookingsArr = Object?.values(bookings)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const now = new Date()
    const start = new Date(newStartDate)
    const end = new Date(newEndDate)
    if (now > start || now > end) {
      setErrors([`You can't book a date in the past!!`])
    } else if (start > end) {
      setErrors([`Start Date cannot be after End Date (can't start after ending)!!`])
    }
    if (errors.length > 0) return

    const updatedBooking = { ...booking, startDate: newStartDate, endDate: newEndDate }
    const res = await dispatch(updateBooking(updatedBooking))
      .then((res) => {
        setShowModal(false)
        history.push('/user')
      })
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
    setNewStartDate(e.target.value)
  }
  const handleSetEnd = (e) => {
    setErrors([])
    setNewEndDate(e.target.value)
  }

  if (!currUser) history.push('/')

  return (
    <div className='edit-bookings-container'>
      <div className='bookings-edit-form-container'>
        <form onSubmit={handleSubmit}>
          <ul className='validation-error-list'>
            {errors?.length > 0 && errors.map((error, idx) => <li className='validation-error' key={idx}>{error}</li>)}
          </ul>
          <label className='bookings-form-label-in'>CHECK-IN</label>
          <input
            className='bookings-input'
            type='date'
            onChange={handleSetStart}
            value={newStartDate}
            required={true}
            name='start date'
          />
          <label className='bookings-form-label-out'>CHECKOUT</label>
          <input
            className='bookings-input'
            type='date'
            onChange={handleSetEnd}
            value={newEndDate}
            required={true}
            name='end date'
          />
          <button className='bookings-submit-button' type='submit'>Update Your Trip</button>
          <button className='bookings-submit-button' type='button' onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default EditBookingForm;
