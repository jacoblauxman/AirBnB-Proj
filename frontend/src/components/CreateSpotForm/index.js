
// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm';
import './CreateSpotFormModal.css'

function CreateSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='create-spot-button' onClick={() => setShowModal(true)}>Host Your Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateSpotFormModal;
