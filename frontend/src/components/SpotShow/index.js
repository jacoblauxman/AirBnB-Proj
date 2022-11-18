import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOneSpot, removeSpot } from '../../store/spots'
import { getCurrUser } from '../../store/session';
import ReviewsList from '../Reviews';
import { getReviews } from '../../store/reviews';

import EditSpotFormModal from '../EditSpotForm';
import EditSpotForm from '../EditSpotForm';
import './SpotShow.css'



const SpotShow = () => {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  //slice of state to control flow of re-renders
  const [isLoaded, setIsLoaded] = useState(false)
  //slice of state for showing form edit:
  const [displayForm, setDisplayForm] = useState(false)
  // error slice of state
  const [errors, setErrors] = useState([])
  const history = useHistory()

  const currUser = useSelector(getCurrUser)
  const reviews = useSelector(state => state.reviews.oneSpot)
  //for listening and updating from when reviews submit/delete!!!!!!!!!
  const reviewsArr = Object.values(reviews)
  const spot = useSelector(state => state.spots.oneSpot)


  useEffect(() => {
    dispatch(fetchOneSpot(spotId))
    console.log('in useEffect spotShow')
    dispatch(getReviews(spotId))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId, reviewsArr.length])


  // handling edit form button
  const handleEdit = async (e) => {
    e.preventDefault()

    setDisplayForm(prevDisplay => !prevDisplay)
  }



  // handling spot delete button
  const handleDelete = async (e) => {
    e.preventDefault();

    // const response = await dispatch(removeSpot(spot))
    const response = await dispatch(removeSpot(spot))
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
        if (data && !data.errors.length) history.push('/')
      }).then(history.push('/'))

  }


  if (Object.values(spot).length === 0) return null;


  return (
    <>
      {isLoaded && (
        <div className='single-spot-container'>
          <div className='single-spot'>
            {/* <h1>SINGLE SPOT</h1> */}
            <h2 className='spot-title'>{spot?.name} - {spot?.description}</h2>
            <div><span className='spot-avg-rating'>★ {spot?.avgStarRating ? spot?.avgStarRating : 'New'} · </span><span className='reviews-count'>{reviewsArr.length} reviews · </span><span className='spot-location-info'>{spot?.city}, {spot?.state}, {spot?.country}</span></div>
            <div className='single-spot-images-container'>{spot.SpotImages?.map(image => (
              <div key={image.id} className='single-spot-image'>
                <img src={image.url} alt='Spot Preview' className='spot-image-url' />
              </div>
            ))}</div>
            {/* <div>{spot?.description}</div> */}
            <h3 className='spot-host-info'>Entire Spot hosted by {spot?.Owner?.firstName}</h3>
            <div className='spot-details-random'>
              {Math.ceil(Math.random() * 3) * 2} guests · {Math.ceil(Math.random() * 3) * 2} bedrooms · {Math.ceil(Math.random() * 3) * 2} beds · {Math.ceil(Math.random() * 3) * 2} baths
            </div>
          </div>
          <div>
            {currUser && (
              currUser.id === spot.ownerId && (
                <>
                  <div>
                    <EditSpotFormModal />
                  </div>
                  <div>
                      <button
                        type="button"
                        onClick={handleDelete}> Delete Spot </button>
                    </div>
                </>
              ))}
          </div>
          <div>
            {spot && (<ReviewsList spotId={spot?.id} />)}
          </div>
        </div >)}
    </>
  )
}

export default SpotShow
