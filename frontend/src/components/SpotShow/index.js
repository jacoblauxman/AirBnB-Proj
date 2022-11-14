import { useParams } from 'react-router-dom'

import { getAllSpots } from '../../store/spots'
import { useSelector } from 'react-redux'

const SpotShow = () => {
  const { spotId } = useParams()

  const spots = useSelector(getAllSpots)
  console.log(spots, 'HERE TRYING TO GET ALL SPOTS!')
  // const spots = Object.values(useSelector(state => state.spots.Spots))
  const spot = spots.find(spot => spot.id === spotId)
  // console.log(spot)

  // if (!spot) return null;
  // const singleSpot =


  return (
    <div>
      <h2>{spot.name}</h2>
      <div><span>::starHERE:: {spot.avgStarRating}</span><span>{spot.city}, {spot.state}, {spot.country}</span></div>
      <ul>{spot.SpotImages.map(image => (
        <li>
          {image.url}
        </li>
      ))}</ul>
      <div>{spot.description}</div>
    </div>
  )
}

export default SpotShow
