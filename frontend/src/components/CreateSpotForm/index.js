import { useState, useEffect } from 'react';
// import { getAllSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';


const CreateSpotForm = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const dispatch = useDispatch()

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpot = {
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

    const response = await dispatch(createSpot(newSpot))
    if (response.ok) {

      history.push("/")
    }
  }

  return (
    <div>
      <h1>Host a Spot (Create a Spot)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder='Name Here'
          name='title'
        />
        <input
          type='text'
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder='Address'
          name='address'
        />
        <input
          type='text'
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder='City'
          name='city'
        />
        <input
          type='text'
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder='State'
          name='state'
        />
        <input
          type='text'
          value={country}
          onChange={e => setCountry(e.target.value)}
          placeholder='Country'
          name='country'
        />
        <input
          type='text'
          value={lat}
          onChange={e => setLat(e.target.value)}
          placeholder='latitude'
          name='latitude'
        />
        <input
          type='text'
          value={lng}
          onChange={e => setLng(e.target.value)}
          placeholder='longitude'
          name='longitude'
        />
        <input
          type='text'
          {/* may need to swap to NUMBER^^ */}
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder='Price'
          name='price'
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          name='description'
          placeholder='Spot Description'
          rows='10'
        ></textarea>
      </form>
    </div>
  )
}


export default CreateSpotForm
