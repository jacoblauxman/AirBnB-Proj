// import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom'

// import { useDispatch, useSelector } from 'react-redux';
// import { updateSpot } from '../../store/spots';
// import { getCurrUser } from '../../store/session';




// const EditSpotForm = ({ spot, displayForm, setDisplayForm }) => {
//   const [name, setName] = useState(spot.name)
//   const [address, setAddress] = useState(spot.address)
//   const [city, setCity] = useState(spot.city)
//   const [state, setState] = useState(spot.state)
//   const [country, setCountry] = useState(spot.country)
//   const [lat, setLat] = useState(spot.lat)
//   const [lng, setLng] = useState(spot.lng)
//   const [description, setDescription] = useState(spot.description)
//   const [price, setPrice] = useState(spot.price)

//   //adding error handling
//   const [errors, setErrors] = useState([])


//   const dispatch = useDispatch()

//   const history = useHistory()

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedSpot = {
//       ...spot,
//       name,
//       address,
//       city,
//       state,
//       country,
//       lat,
//       lng,
//       description,
//       price,
//     }

//     console.log('IN HANDLE SUBMIT:', updatedSpot)

//     const response = await dispatch(updateSpot(updatedSpot))
//       .catch(async res => {
//         const data = await res.json()
//         if (data && data.errors) setErrors(data.errors)
//         if (data && !data.errors.length) {
//           setDisplayForm(false)
//           updatedSpot && history.push(`/spots/${spot.id}`)
//         }
//       }).then(setDisplayForm(false))
//     // .then(history.push(`/spots/${spot.id}`))

//     // updatedSpot && history.push(`/spots/${spot.id}`)
//     // or history.push('/') if causing issues
//   }

//   const handleCancel = (e) => {
//     e.preventDefault();
//     setDisplayForm(false)
//     history.push(`/spots/${spot.id}`)
//   }

//   //testing - going to make conditional to render/return null if not logged in
//   const currUser = useSelector(getCurrUser)
//   if (!currUser) {
//     history.push('/')
//   }

//   useEffect(() => {
//     setDisplayForm(false)

//   }, [dispatch, setDisplayForm])


//   return (
//     <div>
//       <h1>Edit Spot</h1>
//       <form onSubmit={handleSubmit}>
//         {errors.length > 0 && <div>Error !</div>}
//         {errors.map(error => (
//           <li key={error}>{error}</li>
//         ))}
//         <input
//           type='text'
//           onChange={e => setName(e.target.value)}
//           value={name}
//           placeholder="Spot Name"
//           name='title'
//         />
//         <input
//           type='text'
//           value={address}
//           onChange={e => setAddress(e.target.value)}
//           placeholder="Address"
//           name='address'
//         />
//         <input
//           type='text'
//           value={city}
//           onChange={e => setCity(e.target.value)}
//           placeholder="City"
//           name='city'
//         />
//         <input
//           type='text'
//           value={state}
//           onChange={e => setState(e.target.value)}
//           placeholder="State"
//           name='state'
//         />
//         <input
//           type='text'
//           value={country}
//           onChange={e => setCountry(e.target.value)}
//           placeholder="Country"
//           name='country'
//         />
//         <input
//           type='text'
//           value={lat}
//           onChange={e => setLat(e.target.value)}
//           placeholder="Latitude"
//           name='latitude'
//         />
//         <input
//           type='text'
//           value={lng}
//           onChange={e => setLng(e.target.value)}
//           placeholder="Longitude"
//           name='longitude'
//         />
//         <input
//           type='text'
//           value={price}
//           onChange={e => setPrice(e.target.value)}
//           placeholder={spot.price}
//           name='price'
//         />
//         <textarea
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           name='description'
//           placeholder="Spot Description Here"
//           rows='10'
//         ></textarea>
//         <button type="submit">Update Spot</button>
//         <button type="button" onClick={handleCancel}>Cancel</button>
//       </form>
//     </div>
//   )
// }


// export default EditSpotForm


// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';

function EditSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditSpotFormModal;
