import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBookingForm from './EditBookingForm';

function EditBookingFormModal({ spotId, booking }) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <>
      <button className='create-review-modal' onClick={() => setShowBookingModal(true)}>Edit Trip Details</button>
      {showBookingModal && (
        <Modal onClose={() => setShowBookingModal(false)}>
          <EditBookingForm booking={booking} setShowModal={setShowBookingModal} spotId={spotId} />
        </Modal>
      )}
    </>
  );
}

export default EditBookingFormModal;
