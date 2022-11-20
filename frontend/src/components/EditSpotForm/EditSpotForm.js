import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spots';
import { getCurrUser } from '../../store/session';




const EditSpotForm = ({ setShowModal }) => {
  const spot = useSelector(state => state.spots.oneSpot)
  const [name, setName] = useState(spot.name)
  const [address, setAddress] = useState(spot.address)
  const [city, setCity] = useState(spot.city)
  const [state, setState] = useState(spot.state)
  const [country, setCountry] = useState(spot.country)
  const [lat, setLat] = useState(spot.lat)
  const [lng, setLng] = useState(spot.lng)
  const [description, setDescription] = useState(spot.description)
  const [price, setPrice] = useState(spot.price)

  //adding error handling
  const [errors, setErrors] = useState([])


  const currUser = useSelector(state => state.session.user)

  const currSpot = useSelector(state => state.spots.oneSpot)

  const dispatch = useDispatch()

  const history = useHistory()

  const handleSubmit = (e) => {
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
      //TESTING
      Owner: { ...currUser }
    }
    console.log('editSPot handleSubmit, here IS UPDATED SPOT', updatedSpot)

    return dispatch(updateSpot(updatedSpot))
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
      }).then(setShowModal(false))
  }

  const handleCancel = (e) => {
    e.preventDefault();
    // history.push(`/spots/${spot.id}`)
    setShowModal(false)
  }

  //testing - going to make conditional to render/return null if not logged in
  if (!currUser) {
    history.push('/')
  }


  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Your Spot</h1>
      {/* <h1>Edit Spot</h1> */}
      {errors.length > 0 && <div>Error !</div>}
      {errors.map(error => (
        <li key={error}>{error}</li>
      ))}
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
  )
}


export default EditSpotForm
