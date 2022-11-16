import { useState, useEffect } from 'react';
// import { getAllSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { updateSpot, fetchOneSpot } from '../../store/spots';
import { getCurrUser } from '../../store/session';




const EditSpotForm = ({ spot, displayForm, setDisplayForm }) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const spot = useSelector(state => state.spots.oneSpot)
  console.log(spot, 'here is SPOT in EDITSPOTFORM')
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
      price
    }

    const response = await dispatch(updateSpot(updatedSpot))
    if (response.ok) {
      console.log('in response ok of editspotform response', updatedSpot)
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
  console.log('HERE IS USER', currUser)

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
          placeholder={spot.name}
          name='title'
        />
        <input
          type='text'
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder={spot.address}
          name='address'
        />
        <input
          type='text'
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder={spot.city}
          name='city'
        />
        <input
          type='text'
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder={spot.state}
          name='state'
        />
        <input
          type='text'
          value={country}
          onChange={e => setCountry(e.target.value)}
          placeholder={spot.country}
          name='country'
        />
        <input
          type='text'
          value={lat}
          onChange={e => setLat(e.target.value)}
          placeholder={spot.lat}
          name='latitude'
        />
        <input
          type='text'
          value={lng}
          onChange={e => setLng(e.target.value)}
          placeholder={spot.lng}
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
          placeholder={spot.description}
          rows='10'
        ></textarea>
        <button type="submit">Update Spot</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}


export default EditSpotForm
