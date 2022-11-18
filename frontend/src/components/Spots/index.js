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

      <div className='spots-grid'>
        {Object.values(spots).map(spot => (
          <div className='spots-spot-item' style={{ textDecoration: 'none' }}>
            <NavLink key={spot.id} to={`/spots/${spot.id}`} spot={spot} className='spots-spot-link' style={{ textDecoration: 'none' }}>
              <div className='spots-spot-image-container'>
                <img src={spot?.previewImage} alt='previewImage' className='spots-spot-preview-image' />
              </div>
              {/* <h3 className='spots-spot-item-name'>
                {spot.name}
              </h3> */}
              <div className='spot-location-avgRating'><span className='spot-location'>{spot.city}, {spot.state}</span><span className='spot-avgRating'>★ {spot?.avgRating}</span></div>
              <div className='spot-description'
              // style={{ fontWeight: '175', padding: '1rem', color: 'black' }}
              >"{spot.description}"</div>
              <div className='spot-price' style={{ fontWeight: 'bold', color: 'black' }}>${spot.price} <span style={{ fontWeight: '250', color: 'black' }}> night</span></div>
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
