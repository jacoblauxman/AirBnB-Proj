import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOneSpot, getOneSpot, removeSpot } from '../../store/spots'
import { getCurrUser } from '../../store/session';
import ReviewsList from '../Reviews';
import { getReviews } from '../../store/reviews';

import EditSpotFormModal from '../EditSpotForm';
import EditSpotForm from '../EditSpotForm';
import './SpotShow.css'
import noImage from './noImage.png'



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
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors.length > 0) history.push('/404')
      })
    dispatch(getReviews(spotId))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId, reviewsArr.length])



  // handling spot delete button
  const handleDelete = async (e) => {
    e.preventDefault();

    // const response = await dispatch(removeSpot(spot))
    const response = await dispatch(removeSpot(spot))
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors.length > 0) setErrors(data.errors)
      }).then(history.push('/'))
  }


  if (errors?.length > 0) history.push('/404')


  return (
    <>
      {isLoaded && (
        <div className='single-spot-container'>
          {errors?.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
          <div className='single-spot'>
            <h2 className='spot-title'>{spot?.name} - {spot?.description}</h2>
            <div className='spot-title-subheader'>
              <span className='spot-avg-rating'>??? {spot?.avgStarRating ? spot?.avgStarRating : 'New'}&nbsp;??&nbsp;</span><span className='reviews-count'> {spot?.numReviews} reviews&nbsp;??&nbsp;</span> <span className='spot-location-info'>{spot?.city}, {spot?.state}, {spot?.country}</span>
            </div>
            <div className='single-spot-images-container'>{spot?.SpotImages?.length ? spot?.SpotImages?.map(image => (
              <img src={image?.url} key={image?.id} alt='Spot Preview' className='spot-image-url' />
            )) : <img src={noImage} alt='Preview Not Available' className='single-spot-image' />}
            </div>
            <h3 className='spot-host-info'>Entire Spot hosted by {spot?.Owner?.firstName}</h3>
            <div className='spot-details-random'>
              {Math.ceil(Math.random() * 3) * 2} guests ?? {Math.ceil(Math.random() * 3) * 2} bedrooms ?? {Math.ceil(Math.random() * 3) * 2} beds ?? {Math.ceil(Math.random() * 3) * 2} baths
            </div>
            <div className='spot-main-details'>
              <div>
                <span className='owner-medal'><i class="fa-solid fa-medal"></i></span> <span>{spot?.Owner?.firstName} is a Superhost</span>
              </div>
              <div className='owner-medal-info'>
                <span>Superhosts are experienced, highly rated hosts who are committed to great stays for great guests</span>
              </div>
            </div>
          </div>
          {currUser && (
            currUser?.id === spot?.ownerId && (
              <div className='edit-spot-delete-spot-container'>
                <span className='edit-spot-modal-container'>
                  <EditSpotFormModal />
                </span>
                <span className='delete-spot-container'>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className='delete-spot-button'>
                    ?? Delete Spot ?
                  </button>
                </span>
              </div>
            ))}
          {spot?.id && (<ReviewsList spotId={spot?.id} />)}
        </div >)}
    </>
  )
}

export default SpotShow
