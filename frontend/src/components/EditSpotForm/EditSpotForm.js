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
      lat: 111.1111,
      lng: 111.1111,
      description,
      price,
      //TESTING
      Owner: { ...currUser }
    }

    return dispatch(updateSpot(updatedSpot))
      .then(() => {
        console.log('.then in editSpot')
        setShowModal(false)
        setErrors([])
      })
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors.length > 0) setErrors(data.errors)
      })
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false)
  }

  //testing - going to make conditional to render/return null if not logged in
  if (!currUser) {
    history.push('/')
  }


  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Your Spot</h1>
      <ul className='validation-error-list'>
        {errors?.length > 0 && errors.map((error, idx) => <li className='validation-error' key={idx}>{error}</li>)}
      </ul>
      <input
        type='text'
        onChange={e => setName(e.target.value)}
        value={name}
        placeholder="Location Name Here"
        name='title'
        required
        title='Please provide a name (20 char. max)'
        maxLength='20'
      />
      <input
        type='text'
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Address"
        name='address'
        required
        title='Please provide a valid address'
        maxLength='25'
      />
      <input
        type='text'
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="City"
        name='city'
        required
        title='Please Provide a Valid City'
        maxLength='20'
      />
      <input
        type='text'
        value={state}
        onChange={e => setState(e.target.value)}
        placeholder="State"
        name='state'
        required
        title='Please Provide a Valid State (abbrev.)'
        minLength='2'
        maxLength='2'
      />
      <input
        type='text'
        value={country}
        onChange={e => setCountry(e.target.value)}
        placeholder="Country"
        name='country'
        required
        title='Please provide a valid Country'
        maxLength='20'
      />

      <input
        type='text'
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder={spot.price}
        name='price'
        required
        title='Please provide a valid Price'
        maxLength='10'
        minLength='1'
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        name='description'
        placeholder="Spot Description Here"
        rows='5'
        required
        title='Please provide a Description (between 10-50 chars.)'
        minLength='10'
        maxLength='50'
      ></textarea>
      <button type="submit">Update Spot</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  )
}


export default EditSpotForm
