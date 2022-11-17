import { useState, useEffect } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOneSpot, removeSpot } from '../../store/spots'
import { getCurrUser } from '../../store/session';
import EditSpotForm from '../EditSpotForm';
import ReviewsList from '../Reviews';



const SpotShow = () => {
  const { spotId } = useParams()

  //for deletion state - useEffect attempt to redirect
  // const [deleted, setDeleted] = useState(false)
  //slice of state for showing form edit:
  const [displayForm, setDisplayForm] = useState(false)
  // error slice of state
  const [errors, setErrors] = useState([])

  const history = useHistory()

  const dispatch = useDispatch()

  const spot = useSelector(state => state.spots.oneSpot)
  // console.log(spot, 'in SpotShow, here is SPOT')
  const currUser = useSelector(getCurrUser)
  // console.log(currUser, 'HERE IS current USER')


  useEffect(() => {
    dispatch(fetchOneSpot(spotId))
    console.log('in useEffect spotShow')
  }, [dispatch, spotId])


  // handling edit form button
  const handleEdit = async (e) => {
    e.preventDefault()

    setDisplayForm(prevDisplay => !prevDisplay)
  }



  const handleDelete = async (e) => {
    e.preventDefault();

    console.log('inside handleDelete before res await!')
    // const response = await dispatch(removeSpot(spot))

    const response = await dispatch(removeSpot(spot))
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
        if (data && !data.errors.length) response && history.push('/')
      }).then(history.push('/'))

  }


  // console.log('should be null!', Object.values(spot).length)
  if (Object.values(spot).length === 0) return null;


  return (
    <div>
      <div>
        <h1>SINGLE SPOT</h1>
        {/* <img src={spot?.previewImage} alt='Spot Image' /> */}
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
                {/* <NavLink exact to='/editSpot'> */}
                <button
                  type="button"
                  onClick={handleEdit}>Edit Spot</button>
                <div style={{ visibility: displayForm ? 'visible' : 'hidden' }} >
                  <EditSpotForm spot={spot} displayForm={displayForm} setDisplayForm={setDisplayForm} />
                </div>
                {/* </NavLink> */}
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
        {spot && (<ReviewsList spotId={spot.id} />)}
      </div>
    </div >
  )
}

export default SpotShow
