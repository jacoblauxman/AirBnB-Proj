import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOneSpot, removeSpot } from '../../store/spots'
import { getCurrUser } from '../../store/session';
import EditSpotForm from '../EditSpotForm';
import ReviewsList from '../Reviews';
import { getReviews } from '../../store/reviews';



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
        <div>
          <div>
            <h1>SINGLE SPOT</h1>
            <h2>{spot?.name}</h2>
            <div><span>★ {spot?.avgStarRating}</span><span>{spot?.city}, {spot?.state}, {spot?.country}</span></div>
            <ul>{spot.SpotImages?.map(image => (
              <li key={image.id}>
                <img src={image.url} alt='Spot Preview' />
              </li>
            ))}</ul>
            <div>{spot?.description}</div>
          </div>
          <div>
            {currUser && (
              currUser.id === spot.ownerId && (
                <>
                  <div>
                    <button
                      type="button"
                      onClick={handleEdit}>Edit Spot</button>
                    <div style={{ visibility: displayForm ? 'visible' : 'hidden' }} >
                      <EditSpotForm spot={spot} displayForm={displayForm} setDisplayForm={setDisplayForm} />
                    </div>
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
