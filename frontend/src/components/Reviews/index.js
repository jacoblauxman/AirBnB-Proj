import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Switch, Route } from 'react-router-dom'
import { getReviews, removeReview } from '../../store/reviews'
import { getCurrUser } from '../../store/session'
import { fetchSpots, getOneSpot } from "../../store/spots"


const ReviewsList = ({ spotId }) => {
  const dispatch = useDispatch()

  // get current user for conditionals
  const currUser = useSelector(getCurrUser)

  const spot = useSelector(getOneSpot)
  // console.log(spot, 'HERE IN REVIEWS LIST - A SPOT')

  //grabbing reviews and converting to array
  const reviews = useSelector(state => state.reviews)
  const reviewsArr = Object.values(reviews).filter(review => review.spotId === spotId)
  // console.log(reviewsArr, 'HERE IN REVIEWS LIST - REVIEWS!!!')

  //check for if user has already reviewed spot
  const reviewedCheck = reviewsArr.filter(review => review.userId !== currUser.id).length
  // console.log(reviewedCheck, 'here is REVIEWEDCHECK!')


  useEffect(() => {
    dispatch(getReviews(spotId))
  }, [dispatch, spotId])

  //delete button handling
  const handleDelete = async (e) => {
    e.preventDefault()

    console.log('inside handleDelete ReviewSUBMIT res await')

    // const response = await dispatch(removeReview(review.id))

  }

  if (!spotId) return null;
  if (!reviews) return null

  return (
    <div>
      <div>
        <h1>Here are {spot.name}'s {reviewsArr.length} Reviews</h1>
        {reviewsArr.map(review => (
          <div key={review.id}>
            <div>
              {review.User.firstName} {review.User.lastName}
            </div>
            <div>
              ★ {review.stars}
            </div>
            <div>
              {review.review}
            </div>
            {currUser.id === review.userId && (
              <div>
                <button type='button'
                  onClick={handleDelete}>Delete Review</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {currUser.id !== spot.ownerId && !reviewedCheck && (

        <div>
          <button type='button'>Test for Not Owner / No Review Yet</button>

        </div>
      )
      }
    </div>
  )
}


export default ReviewsList
