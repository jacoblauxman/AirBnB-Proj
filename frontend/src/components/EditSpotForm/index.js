import { useState, useEffect } from 'react';
// import { getAllSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { updateSpot, fetchOneSpot } from '../../store/spots';
import { getCurrUser } from '../../store/session';




const EditSpotForm = ({ spot, displayForm, setDisplayForm }) => {
  const [name, setName] = useState(spot.name)
  const [address, setAddress] = useState(spot.address)
  const [city, setCity] = useState(spot.city)
  const [state, setState] = useState(spot.state)
  const [country, setCountry] = useState(spot.country)
  const [lat, setLat] = useState(spot.lat)
  const [lng, setLng] = useState(spot.lng)
  const [description, setDescription] = useState(spot.description)
  const [price, setPrice] = useState(spot.price)

  // const spot = useSelector(state => state.spots.oneSpot)
  console.log(spot.spotImages, 'SPOT IMAGES, in edit form')
  //adding error handling
  const [errors, setErrors] = useState([])


  const dispatch = useDispatch()

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSpot = {
      ...spot,
      name,
      address,
      city,
      state,
      country,
      lat,
      lng,
      description,
      price,
      spotImages: spot.spotImages
    }

    console.log('IN HANDLE SUBMIT:', updatedSpot.spotImages)

    const response = await dispatch(updateSpot(updatedSpot))
    if (response.ok) {
      // console.log('in response ok of editspotform response', updatedSpot)
      //trying to send user to updated created spot location
      // history.push(`/spots/${response.id}`)
      history.push('/')
      //hideForm()
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    //hideForm()
    history.push('/')
  }

  //testing - going to make conditional to render/return null if not logged in
  const currUser = useSelector(getCurrUser)
  // console.log('HERE IS USER', currUser)

  if (!currUser) {
    history.push('/')
    // return null;
  }


  return (
    <div>
      <h1>Edit Spot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder="Spot Name"
          name='title'
        />
        <input
          type='text'
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Address"
          name='address'
        />
        <input
          type='text'
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="City"
          name='city'
        />
        <input
          type='text'
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder="State"
          name='state'
        />
        <input
          type='text'
          value={country}
          onChange={e => setCountry(e.target.value)}
          placeholder="Country"
          name='country'
        />
        <input
          type='text'
          value={lat}
          onChange={e => setLat(e.target.value)}
          placeholder="Latitude"
          name='latitude'
        />
        <input
          type='text'
          value={lng}
          onChange={e => setLng(e.target.value)}
          placeholder="Longitude"
          name='longitude'
        />
        <input
          type='text'
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder={spot.price}
          name='price'
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          name='description'
          placeholder="Spot Description Here"
          rows='10'
        ></textarea>
        <button type="submit">Update Spot</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}


export default EditSpotForm
