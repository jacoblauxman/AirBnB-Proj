
// // frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './CreateReviewForm';
// import './CreateSpotFormModal.css'
import './CreateReviewForm.css'

function CreateReviewFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='create-review-modal' onClick={() => setShowModal(true)}>Add a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewFormModal;
