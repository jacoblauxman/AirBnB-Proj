import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { NavLink, Switch, Route } from 'react-router-dom'
import { getReviews, removeReview } from '../../store/reviews'
import { getCurrUser } from '../../store/session'
import {  getOneSpot } from "../../store/spots"
import CreateReviewForm from '../CreateReviewForm'


const ReviewsList = ({ spotId }) => {

  //for displaying create review form
  const [displayForm, setDisplayForm] = useState(false)
  // for confirming reviews are loaded - testing
  const [isLoaded, setIsLoaded] = useState(false)

  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()

  // get current user for conditionals
  const currUser = useSelector(getCurrUser)

  //listening in on current spot
  const spot = useSelector(getOneSpot)

  //grabbing reviews and converting to array
  const reviews = useSelector(state => state.reviews.oneSpot)
  const reviewsArr = Object?.values(reviews).filter(review => review?.spotId === spotId)

  //check for if user has already reviewed spot
  const reviewedCheck = reviewsArr?.filter(review => review?.User?.id !== currUser?.id)


  //listening and getting the reviews of spot!
  useEffect(() => {
    dispatch(getReviews(spotId))
    .then(() => setIsLoaded(true))
  }, [dispatch, spotId])


  //delete button handling -- not used && needs refactoring
  // const handleDelete = (e) => {
  //   e.preventDefault()

  //   const response = dispatch(removeReview())
  //     .catch(async res => {
  //       const data = await res.json()
  //       if (data && data.errors) setErrors(data.errors)
  //       // if (data && !data.errors.length) history.push('/')
  //     })
  //   // .then(history.push(`/spots/${spotId}`))
  // }

  //create button handling
  const handleCreate = async (e) => {
    e.preventDefault()

    setDisplayForm(prevDisplay => !prevDisplay)
  }


  //testing for null initial return
  if (!spotId) return null;

  return (
    <>
      {isLoaded &&
        <div>
          <div>
            <h1>Here are {spot?.name}'s {reviewsArr?.length} Reviews</h1>
            {errors.length > 0 && <div>Error !</div>}
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}

            {reviewsArr?.map(review => (
              <div key={review?.id}>
                <div>
                  {review?.User?.firstName} {review?.User?.lastName}
                </div>
                <div>
                  ★ {review?.stars}
                </div>
                <div>
                  {review?.review}
                </div>
                {currUser &&
                  currUser?.id === review?.userId && (
                    <div>
                      <button type='button'
                        onClick={() => dispatch(removeReview(review.id))}>Delete Review</button>
                    </div>
                  )}
              </div>
            ))}
          </div>
          {currUser && (
            currUser?.id !== spot?.ownerId && (reviewedCheck && (
              <div>
                <button type='button'
                  onClick={handleCreate}>Add a Review</button>
                <div style={{ visibility: displayForm ? 'visible' : 'hidden' }}>
                  <CreateReviewForm spot={spot} displayForm={displayForm} setDisplayForm={setDisplayForm} />
                </div>
              </div>
            )))
          }
        </div>
      }
    </>
  )
}

export default ReviewsList
