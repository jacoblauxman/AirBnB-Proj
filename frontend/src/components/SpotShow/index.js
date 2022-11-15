import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOneSpot } from '../../store/spots'



const SpotShow = () => {
  const { spotId } = useParams()

  const dispatch = useDispatch()

  const spot = useSelector(state => state.spots.oneSpot)
  console.log(spot, 'here is SPOT')


  useEffect(() => {
    dispatch(fetchOneSpot(spotId))
  }, [dispatch, spotId])


  if (!spot) return null;


  return (
    <div>
      <h1>SINGLE SPOT</h1>
      {/* <img src={spot?.previewImage} alt='Spot Image' /> */}
      <h2>{spot?.name}</h2>
      <div><span>★ {spot?.avgStarRating}</span><span>{spot?.city}, {spot?.state}, {spot?.country}</span></div>
      <ul>{spot.SpotImages?.map(image => (
        <li>
          <img src={image.url} alt='spot image' />
        </li>
      ))}</ul>
      <div>{spot?.description}</div>
    </div>
  )
}

export default SpotShow
