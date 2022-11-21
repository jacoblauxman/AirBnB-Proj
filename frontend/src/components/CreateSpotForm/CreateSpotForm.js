import { useState, useEffect } from 'react';
// import { getAllSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { createSpot } from '../../store/spots';
import { getCurrUser } from '../../store/session';




const CreateSpotForm = ({ setShowModal }) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')

  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  //additional,frontend previewImage
  const [previewImage, setPreviewImage] = useState('')

  //adding error handling
  const [errors, setErrors] = useState([])


  const dispatch = useDispatch()
  const history = useHistory()


  //form submission click
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpot = {
      name,
      address,
      city,
      state,
      country,
      lat: 111.1111,
      lng: 111.1111,
      description,
      price,
      previewImage
    }


    const response = await dispatch(createSpot(newSpot))
      .then(() => {
        setShowModal(false)
        setErrors([])
      })
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors.length > 0) setErrors(data.errors)
      })
      .then(history.push("/"))
  }


  //cancel button click
  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false)
  }


  const currUser = useSelector(getCurrUser)

  if (!currUser) {
    history.push('/')
  }


  return (
    <form onSubmit={handleSubmit}>
      <h1>Become a Host</h1>
      <ul className='validation-error-list'>
        {errors?.length > 0 && errors.map((error, idx) => <li className='validation-error' key={idx}>{error}</li>)}
      </ul>
      <input
        type='text'
        onChange={e => setName(e.target.value)}
        value={name}
        placeholder='Location Name Here'
        name='title'
        required
        maxLength='20'

      />
      <input
        type='text'
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder='Address'
        name='address'
        required
        title='Please provide a valid address'
        maxLength='25'
      />
      <input
        type='text'
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder='City'
        name='city'
        required
        title='Please Provide a Valid City'
        maxLength='20'
      />
      <input
        type='text'
        value={state}
        onChange={e => setState(e.target.value)}
        placeholder='State'
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
        placeholder='Country'
        name='country'
        required
        title='Please provide a valid Country'
        maxLength='20'
      />
      <input
        type='text'
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder='Price'
        name='price'
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        name='description'
        placeholder='Spot Description'
        rows='5'
        required
        minLength='10'
        maxLength='50'
        title='Please add description between 10-50 chars.'
      ></textarea>
      <input
        type='url'
        value={previewImage}
        onChange={e => setPreviewImage(e.target.value)}
        placeholder='Preview Image URL'
        name='previewImage'
        required
        title='Please provide a valid URL (less than 200 chars.)'
        maxLength='200'
      />
      <button type="submit"
      >Create new Spot
      </button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  )
}


export default CreateSpotForm
