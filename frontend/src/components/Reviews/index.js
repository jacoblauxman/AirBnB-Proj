import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { NavLink, Switch, Route } from 'react-router-dom'
import { getReviews, removeReview } from '../../store/reviews'
import { getCurrUser } from '../../store/session'
import { getOneSpot } from "../../store/spots"
import CreateReviewFormModal from '../CreateReviewForm'
import CreateReviewForm from '../CreateReviewForm'

import './Reviews.css'

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
  const reviews = useSelector(state => state.reviews?.oneSpot)
  const reviewsArr = Object?.values(reviews).filter(review => review?.spotId === spotId)

  //check for if user has already reviewed spot
  const reviewedCheck = reviewsArr?.filter(review => review?.User?.id !== currUser?.id)


  //listening and getting the reviews of spot!
  useEffect(() => {
    dispatch(getReviews(spotId))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId])



  //create button handling
  const handleCreate = async (e) => {
    e.preventDefault()

    setDisplayForm(prevDisplay => !prevDisplay)
  }


  //testing for null initial return
  if (!spotId) return null;

  return (
    <div className='spot-reviews-container'>
      {isLoaded &&
        <div className='spot-reviews-grid-container'>
          <h2>★ {spot?.avgStarRating ? spot.avgStarRating.toFixed(1) : 'New'} · {reviewsArr?.length} Reviews</h2>
          {errors.length > 0 && <div>Error !</div>}
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
          {reviewsArr?.length > 0 && reviewsArr?.map(review => (
            <div className='reviews-array-container' key={review?.id}>
              <div className='single-review-container'>
                <div className='reviewer-name'>
                  <span className='user-icon-container'>
                    <i className="fas fa-user-circle" />
                  </span> <span>
                    {review?.User?.firstName} {review?.User?.lastName}
                    {console.log(review?.User)}
                  </span>
                </div>
                <div className='reviewer-review'>
                  "{review?.review}"
                </div>
                <div className='review-stars'>
                  ★ {review?.stars}
                </div>
                {currUser &&
                  currUser?.id === review?.userId && (
                    <div className='delete-review-container'>
                      <button type='button'
                        className='delete-review-button'
                        onClick={() => dispatch(removeReview(review?.id))}>
                        Delete Review
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))}
          {/* </div> */}
          {currUser && (
            currUser?.id !== spot?.ownerId && (reviewedCheck && (
              <div className='add-review-container'>
                <CreateReviewFormModal />
              </div>
            )))
          }
        </div>
      }
    </div>
  )
}

export default ReviewsList
