import { useParams } from 'react-router-dom'

import { getAllSpots, fetchSpots } from '../../store/spots'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';


const SpotShow = ({ spot }) => {
  const { spotId } = useParams()

  const dispatch = useDispatch

  // const spot = useSelector(state => state.spots.Spots)
  // console.log(spot, 'here is SPOT')

  // useEffect(() => {
  //   dispatch(getAllSpots)
  // }, [dispatch])
  useEffect(() => {
    dispatch(fetchSpots())
  }, [dispatch])

  // const spots = useSelector(state => {
  //   console.log(state, 'STATE')
  //   return state.spots.Spots[spotId]

  // })
  // console.log(spots, 'HERE TRYING TO GET ALL SPOTS!')
  // // const spots = Object.values(useSelector(state => state.spots.Spots))
  // const spot = spots.find(spot => spot.id === spotId)
  // console.log(spot)

  // // if (!spot) return null;
  // // const singleSpot =


  return (
    <div>
      <img src={spot?.previewImage} alt='Spot Image' />
      <h2>{spot?.name}</h2>
      <div><span>::starHERE:: {spot?.avgStarRating}</span><span>{spot?.city}, {spot?.state}, {spot?.country}</span></div>
      {/* <ul>{spot.SpotImages.map(image => (
        <li>
          {image.url}
        </li>
      ))}</ul> */}
      <div>{spot?.description}</div>
    </div>
  )
}

export default SpotShow
