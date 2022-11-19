// import { useState, useEffect } from 'react';
// // import { getAllSpots } from '../../store/spots';
// import { useHistory } from 'react-router-dom'

// import { useDispatch, useSelector } from 'react-redux';
// import { createSpot } from '../../store/spots';
// import { getCurrUser } from '../../store/session';



// const CreateSpotForm = () => {
//   const [name, setName] = useState('')
//   const [address, setAddress] = useState('')
//   const [city, setCity] = useState('')
//   const [state, setState] = useState('')
//   const [country, setCountry] = useState('')
//   const [lat, setLat] = useState('')
//   const [lng, setLng] = useState('')
//   const [description, setDescription] = useState('')
//   const [price, setPrice] = useState('')
//   //additional,frontend previewImage
//   const [previewImage, setPreviewImage] = useState('')

//   //adding error handling
//   const [errors, setErrors] = useState([])


//   const dispatch = useDispatch()
//   const history = useHistory()


//   //form submission click
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newSpot = {
//       name,
//       address,
//       city,
//       state,
//       country,
//       lat,
//       lng,
//       description,
//       price,
//       previewImage
//     }

//     console.log(newSpot, 'IN CREATE SUBMIT, HERE IS NEW SPOT')

//     const response = await dispatch(createSpot(newSpot))
//       .catch(async res => {
//         const data = await res.json()
//         if (data && data.errors) setErrors(data.errors)
//         if (data && !data.errors.length) response && history.push('/')
//       }).then(history.push("/"))
//   }


//   //cancel button click
//   const handleCancel = (e) => {
//     e.preventDefault();
//     //hideForm()
//     history.push('/')
//   }


//   //testing - going to make conditional to render/return null if not logged in
//   const currUser = useSelector(getCurrUser)
//   console.log('HERE IS USER', currUser)

//   if (!currUser) {
//     history.push('/')
//   }


//   return (
//     <div className='create-spot-container'>
//       <h1>Host a Spot (Create a Spot)</h1>
//       <form onSubmit={handleSubmit}>
//         {errors.length > 0 && <div className='create-error-title'>Error !</div>}
//         {errors.map(error => (
//           <div className='create-error-container' key={error}>{error}</div>
//         ))}
//         <input
//           type='text'
//           onChange={e => setName(e.target.value)}
//           value={name}
//           placeholder='Name Here'
//           name='title'
//         />
//         <input
//           type='text'
//           value={address}
//           onChange={e => setAddress(e.target.value)}
//           placeholder='Address'
//           name='address'
//         />
//         <input
//           type='text'
//           value={city}
//           onChange={e => setCity(e.target.value)}
//           placeholder='City'
//           name='city'
//         />
//         <input
//           type='text'
//           value={state}
//           onChange={e => setState(e.target.value)}
//           placeholder='State'
//           name='state'
//         />
//         <input
//           type='text'
//           value={country}
//           onChange={e => setCountry(e.target.value)}
//           placeholder='Country'
//           name='country'
//         />
//         <input
//           type='text'
//           value={lat}
//           onChange={e => setLat(e.target.value)}
//           placeholder='latitude'
//           name='latitude'
//         />
//         <input
//           type='text'
//           value={lng}
//           onChange={e => setLng(e.target.value)}
//           placeholder='longitude'
//           name='longitude'
//         />
//         <input
//           type='text'
//           value={price}
//           onChange={e => setPrice(e.target.value)}
//           placeholder='Price'
//           name='price'
//         />
//         <textarea
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           name='description'
//           placeholder='Spot Description'
//           rows='10'
//         ></textarea>
//         <input
//           type='text'
//           value={previewImage}
//           onChange={e => setPreviewImage(e.target.value)}
//           placeholder='Preview Image URL'
//           name='previewImage'
//         />
//         <button type="submit"
//         // disabled={errors.length > 0}
//         >Create new Spot
//         </button>
//         <button type="button" onClick={handleCancel}>Cancel</button>
//       </form>
//     </div>
//   )
// }


// export default CreateSpotForm


// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm';
import './CreateSpotFormModal.css'

function CreateSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='create-spot-button' onClick={() => setShowModal(true)}>Host a Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateSpotFormModal;
