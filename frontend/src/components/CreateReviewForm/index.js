import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { getCurrUser } from '../../store/session';
import { createReview, getReviews } from '../../store/reviews';
import { fetchOneSpot, getOneSpot } from '../../store/spots';


const CreateReviewForm = ({ spot, displayForm, setDisplayForm }) => {
  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  const reviewSpot = useSelector(getOneSpot)
  const currUser = useSelector(getCurrUser)
  // console.log(currUser, 'current user in create review!')

  // const reviews = useSelector(state => state.reviews.oneSpot)
  // console.log(reviews, 'REVIEWS in CREATE REVIEW FORM')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newReview = {
      review,
      stars: +stars,
    }

    const res = await dispatch(createReview(newReview, reviewSpot.id))
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
        // if (data && data.errors.length === 0) history.push(`/spots/${reviewSpot.id}`)
      })
      // .then(dispatch(fetchOneSpot(reviewSpot?.id)))
      .then(setDisplayForm(false))
    setReview('')
    setStars('')
    // .then(history.push(`/spots/${reviewSpot?.id}`))
  }


  const handleCancel = async (e) => {
    e.preventDefault()
    setStars('')
    setReview('')
    setDisplayForm(false)
    history.push(`/spots/${reviewSpot?.id}`)
  }

  useEffect(() => {
    console.log('in UseEFFECT for review form creatioN!', reviewSpot.id)
    dispatch(fetchOneSpot(reviewSpot.id))
    dispatch(getReviews(reviewSpot.id))
      .then(history.push(`/spots/${reviewSpot.id}`))
    // .then(dispatch(getOneSpot(reviewSpot.id)))

  }, [dispatch, history, reviewSpot.id])


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


export default CreateReviewForm
