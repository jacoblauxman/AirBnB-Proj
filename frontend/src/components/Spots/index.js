import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Switch, Route } from 'react-router-dom'
import { fetchSpots, getAllSpots } from "../../store/spots"
// import { Route }
import SpotShow from '../SpotShow'
import './index.css'



const SpotsList = () => {
  const dispatch = useDispatch()

  const spots = useSelector(state => state.spots.Spots)

  console.log(spots, 'HERE IS SPOTS')


  useEffect(() => {
    dispatch(fetchSpots())
  }, [dispatch])

  if (!spots) return null

  return (
    <div className='spots-grid-container'>

      <div className='spots-container'>
        {/* <h1>Spots List</h1> */}
        {/* <ul> */}
        {/* {spots.map(spot => ( */}
        {Object.values(spots).map(spot => (
          <div className='spots-spot-item' style={{ textDecoration: 'none' }}>
            <NavLink key={spot.id} to={`/spots/${spot.id}`} spot={spot}>
              <div className='spots-spot-item-image'>
                <img src={spot?.previewImage} alt='previewImage' className='spots-spot-preview-image' />
              </div>
              <div>

                {spot.name}
              </div>
              <div>{spot.city}, {spot.state} <span>★ {spot.avgRating}</span></div>
              <div>"{spot.description}"</div>
              <div>${spot.price} <span>night</span></div>
            </NavLink>
          </div>
        ))}
        {/* </ul> */}
        <Route path="/spots/:spotId">
          <SpotShow />
        </Route>
      </div>
    </div>
  )
}

export default SpotsList
