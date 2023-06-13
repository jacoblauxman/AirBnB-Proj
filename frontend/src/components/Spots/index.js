import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'
import { fetchSpots, getAllSpots } from "../../store/spots"
// import { Route }
import SpotShow from '../SpotShow'
import './index.css'



const SpotsList = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const spots = useSelector(state => state.spots.Spots)

  const sendSoon = (e) => {
    // e.preventDefault()
    setTimeout(() => { history.push('/coming-soon') }, 1000)
  }

  useEffect(() => {
    dispatch(fetchSpots())
  }, [dispatch])

  if (!spots) return null

  return (
    <main className='spots-container'>
      <div className='spots-price-switch'>
        <span className='spots-price-switch-bold'>Display total Price</span>  <span className='spots-price-switch-gray'>| Includes all fees, before taxes</span>
        <label className='spots-price-label'
          onChange={sendSoon}>
          <input className='spots-price-checkbox' type='checkbox' />
          <span className='spots-price-checkbox-span' />
        </label>
      </div>
      <div className='spots-grid'>
        {Object.values(spots).map(spot => (
          <div key={spot.id} className='spots-spot-item' style={{ textDecoration: 'none' }}>
            <NavLink key={spot?.id} exact to={`/spots/${spot.id}`} spot={spot} className='spots-spot-link' style={{ textDecoration: 'none' }}>
              <div className='spots-spot-image-container'>
                <img src={spot?.previewImage} alt='previewImage' className='spots-spot-preview-image' />
              </div>

              <div className='spot-location-avgRating'>
                <span className='spot-location'>{spot.city}, {spot.state}</span>
                <span className='spot-avgRating'><span className='spot-star'>★</span> {spot?.avgRating ? spot?.avgRating?.toFixed(1) : 'New'}</span></div>
              <div className='spot-description'
              >Added {Math.ceil((Math.random() * 20))} weeks ago</div>
              <div className='spot-price' style={{ fontWeight: '475', color: 'black' }}> ${spot.price} <span style={{ fontWeight: '225', color: 'black' }}> night</span></div>
            </NavLink>
          </div>
        ))}
        {/* {Object.values(spots)?.includes().id} */}
        <Route exact path="/spots/:spotId">
          <SpotShow />
        </Route>
      </div>
    </main >
  )
}

export default SpotsList
