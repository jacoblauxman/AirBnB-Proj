import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { getUserBookings, removeBooking } from '../../store/bookings'
import { getCurrUser } from '../../store/session'
import EditBookingFormModal from '../EditBookingForm'
import './Bookings.css'


const BookingsList = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector(getCurrUser)
  const [errors, setErrors] = useState([])
  const [trips, setTrips] = useState([])
  const [pastTrips, setPastTrips] = useState([])

  const bookings = useSelector(state => state.bookings?.user)
  const bookingsArr = Object?.values(bookings)
  const myfriendjson = JSON?.stringify(bookingsArr)

  useEffect(() => {
    dispatch(getUserBookings()).
      then((res) => {
        setPastTrips(pastBookings(res.Bookings))
        setTrips(currentBookings(res.Bookings))
      })

  }, [dispatch, myfriendjson])

  const tripTime = (booking) => {
    let start = new Date(booking.startDate)
    let end = new Date(booking.endDate)
    let diff = end - start
    const day = (1000 * 3600 * 24)
    let tripDays = diff / day
    tripDays = Math.round(tripDays)

    return tripDays
  }

  const editCheck = (booking) => {
    const now = new Date()
    const end = new Date(booking.endDate)

    return now < end
  }

  const cancelCheck = (booking) => {
    const now = new Date()
    const start = new Date(booking.startDate)

    return now < start
  }

  const dateFormatter = (date) => {
    let res = new Date(date)
    res = res.toDateString()

    return res
  }

  const handleDelete = async (e, booking) => {
    e.preventDefault()

    const res = await dispatch(removeBooking(booking?.id))
      .then(history.push('/user'))
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors.length > 0) {
          setErrors(data.errors)
          return
        }
      })
  }

  const currentBookings = bookings => {
    let now = new Date()
    let res = bookings.filter(booking => new Date(booking.endDate) > now)
    console.log(res, 'TESTING RES IN CURRENT TRIPS!!')
    return res
  }

  const pastBookings = bookings => {
    let now = new Date()
    let res = bookings.filter(booking => new Date(booking.endDate) < now)
    console.log(res, 'RES IN TEST OF PAST TRIPS!!')

    return res
  }

  if (!currUser) history.push('/')

  return (
    <div className='bookings-list-container'>
      <div>
        {bookingsArr?.length > 0 && (
          <div className='bookings-list-header'>
            Hey <span className='bold'>{currUser?.username},</span>here are all {bookingsArr?.length} of your booked dates at da Air Buh'n'Buh!
          </div>
        )}
        {bookingsArr?.length === 0 && (
          <div className='bookings-list-header'>
            Hey <span className='bold'>{currUser?.username}</span>, no bookings yet? Why not <NavLink className='look-around' to={`/`}>take a look around</NavLink> and plan your next trip!
          </div>
        )}
      </div>
      <div>
        {trips.length > 0 && trips?.map(booking => (
          <div key={booking?.id} className='bookings-list-single-booking'>
            <div className='single-booking-preview-image'>
              <img className='single-booking-image' src={booking?.Spot?.previewImage} />
            </div>
            <div className='single-booking-name'>
              {booking?.Spot?.name} - <span className='single-booking-price-info'>{booking?.Spot?.city}, {booking?.Spot?.state}</span>
            </div>
            <div className='single-booking-trip-days'>
              <span className='bold'>From</span>{dateFormatter(booking?.startDate)} <span className='bold'>To</span> {dateFormatter(booking?.endDate)}
            </div>
            <div className='single-booking-price-info'>
              <div className='single-booking-days'>
                {tripTime(booking)} days for ${booking?.Spot?.price} a night
              </div>
              <div className='single-booking-total'>
                ${tripTime(booking) * booking?.Spot?.price} before ${Math.floor(Math.random() * 100) * 5} service fees
              </div>
            </div>
            {errors?.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
            {editCheck(booking) && (
              <div className='single-booking-edit-delete-container'>
                <EditBookingFormModal booking={booking} />
                {cancelCheck(booking) && (
                  <button
                    className='create-review-modal'
                    type='button'
                    onClick={(e) => handleDelete(e, booking)}
                  >Cancel Booking</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        {pastTrips.length > 0 && (
          <div className='bookings-list-header'><span className='bold'>Your Past Trips:</span></div>
        )}
        {pastTrips && pastTrips.map(booking => (
          <div>
            <div key={booking?.id} className='bookings-list-single-booking'>
              <div className='single-booking-preview-image'>
                <img className='single-booking-image' src={booking?.Spot?.previewImage} />
              </div>
              <div className='single-booking-name'>
                {booking?.Spot?.name} - <span className='single-booking-price-info'>{booking?.Spot?.city}, {booking?.Spot?.state}</span>
              </div>
              <div className='single-booking-trip-days'>
                <span className='bold'>From</span>{dateFormatter(booking?.startDate)} <span className='bold'>To</span> {dateFormatter(booking?.endDate)}
              </div>
              <div className='single-booking-price-info'>
                <div className='single-booking-days'>
                  {tripTime(booking)} days for ${booking?.Spot?.price} a night
                </div>
                <div className='single-booking-total'>
                  ${tripTime(booking) * booking?.Spot?.price} before ${Math.floor(Math.random() * 100) * 5} service fees
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingsList
