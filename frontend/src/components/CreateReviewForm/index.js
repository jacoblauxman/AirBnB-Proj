import { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import { getCurrUser } from '../../store/session';
import { createReview } from '../../store/reviews';


const CreateReviewForm = () => {
  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  //to get current spot - maybe use props instead?
  const reviewSpot = useSelector(getOneSpot)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newReview = {
      review,
      stars,
    }
    console.log(newReview, 'in createReviewSubmit handle, here is newReview')

    const response = await dispatch(createReview(newReview, reviewSpot.id))
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
        if (data && !data.errors.length) response && history.push(`/spots/${reviewSpot.id}`)
      })
  }


  const handleCancel = async (e) => {
    e.preventDefault()
    history.push()
  }


  return (
    <div>
      <div>
        <h1>Leave a Review!</h1>
      </div>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && <div>Error !</div>}
        {errors.map(error => (
          <li key={error}>{error}</li>
        ))}
        <input
          type='text'
          onChange={e => setReview(e.target.value)}
          value={review}
          placeholder='Your thoughts here'
          name='review'
        />
        <input
          type='number'
          onChange={e => setStars(e.target.value)}
          value={stars}
          placeholder='rating'
          name='stars'
        />
        <button type='submit'
        >Add Review</button>
        <button type='button' onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )

}
