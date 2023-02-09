import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateBookingForm from './CreateBookingForm';

function CreateBookingFormModal({ spotId }) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <>
      <button className='create-review-modal' onClick={() => setShowBookingModal(true)}>Book this Spot!</button>
      {showBookingModal && (
        <Modal onClose={() => setShowBookingModal(false)}>
          <CreateBookingForm setShowModal={setShowBookingModal} spotId={spotId} />
        </Modal>
      )}
    </>
  );
}

export default CreateBookingFormModal;
