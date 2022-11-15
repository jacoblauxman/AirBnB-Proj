import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Switch, Route } from 'react-router-dom'
import { fetchSpots, getAllSpots } from "../../store/spots"
// import { Route }
import SpotShow from '../SpotShow'



const SpotsList = () => {
  const dispatch = useDispatch()

  const spots = useSelector(state => state.spots.Spots)
  // const spots = useSelector(getAllSpots)
  // const spotsArr = Object.values(spots)
  console.log(spots, 'HERE IS SPOTS')


  useEffect(() => {
    dispatch(fetchSpots())
  }, [dispatch])

  if (!spots) return null

  return (
    <div>
      <h1>Spots List</h1>
      <ul>
        {/* {spots.map(spot => ( */}
        {Object.values(spots).map(spot => (
          <NavLink key={spot.id} to={`/spots/${spot.id}`} spot={spot}>
            <img src={spot.previewImage} alt='previewImage' />
            <h3>
              {spot.name}
            </h3>
            <div>{spot.city}, {spot.state} <span>★ {spot.avgRating}</span></div>
            <div>"{spot.description}"</div>
            <div>${spot.price} <span>night</span></div>
          </NavLink>
        ))}
      </ul>
      <Route path="/spots/:spotId">
        <SpotShow />
      </Route>
    </div>
  )
}

export default SpotsList
