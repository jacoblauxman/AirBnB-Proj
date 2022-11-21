
// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { getCurrUser } from '../../store/session';
import EditSpotForm from './EditSpotForm';
import { useSelector } from 'react-redux'
import { getOneSpot } from '../../store/spots';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function EditSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  const currUser = useSelector(getCurrUser)
  const currSpot = useSelector(getOneSpot)
  const currReviews = useSelector(state => state.reviews.oneSpot)

  const dispatch = useDispatch()
  useEffect(() => {

  }, [dispatch, currUser, currSpot, currReviews])

  return (
    <>
      <button className='edit-spot-modal' onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditSpotFormModal;
