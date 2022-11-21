import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { getCurrUser } from '../../store/session';
import { createReview, getReviews } from '../../store/reviews';
import { fetchOneSpot, getOneSpot } from '../../store/spots';


const CreateReviewForm = ({ setShowModal }) => {
  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  const reviewSpot = useSelector(getOneSpot)
  const currUser = useSelector(getCurrUser)


  const handleSubmit = async (e) => {
    e.preventDefault()

    const newReview = {
      review,
      stars: +stars,
    }
    const res = await dispatch(createReview(newReview, reviewSpot.id))
      .then(() => setShowModal(false))
      .catch(async res => {
        const data = await res.json()
        console.log(data, 'data in error of newReview')
        if (data && data.errors) setErrors([data.errors])
      })
    setReview('')
    setStars('')
    // setShowModal(false)
    // .then(history.push(`/spots/${reviewSpot?.id}`))
  }


  const handleCancel = async (e) => {
    e.preventDefault()
    setStars('')
    setReview('')
    // setDisplayForm(false)
    setShowModal(false)
    history.push(`/spots/${reviewSpot?.id}`)
  }



  return (
    <>
      <h1 className='form-title'>Leave a Review</h1>

      <form onSubmit={handleSubmit}>
        <ul className='validation-error-list'>
          {errors?.length > 0 && errors.map((error, idx) => <li className='validation-error' key={idx}>{error}</li>)}
        </ul>
        <input
          type='text'
          onChange={e => setReview(e.target.value)}
          value={review}
          placeholder='Your thoughts here'
          name='review'
          required
          minLength='5'
          maxLength='25'
        />
        <input
          type='number'
          onChange={e => setStars(e.target.value)}
          value={stars}
          placeholder='rating'
          name='stars'
          required
          min='1'
          max='5'
        />
        <button type='submit'
        >Add Review</button>
        <button type='button' onClick={handleCancel}>Cancel</button>
      </form>
    </>
  )

}


export default CreateReviewForm
