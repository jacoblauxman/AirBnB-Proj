// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

// bring in modal -- children of this modal can be either login or signup form
import { Modal } from '../../context/Modal';
// bring in forms to apply with modal
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage'
// import CreateSpotForm from '../CreateSpotForm';



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  // this setter can be passed to prof button to show modal!
  const [login, setLogin] = useState(true)



  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        {isLoaded && (
          <ProfileButton
            user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal}
          />
        )}
      </li>
      {sessionUser && (<li>
        <NavLink to="/create-spot">
          <button>
            Host a Spot
          </button>
        </NavLink>
      </li>)}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {login ?
            <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal} />}
        </Modal>
      )}
    </ul>
  );
}
// we pass the prop of setShowModal to forms so they can close on click in forms!

// reminder: showModal is checking the state and consuming -
// we can short circuit the on close (setShowModal false)
// -- and then make sure we show by using the button click on
// profile button!!

//toggle ternary above to switch between login/signup form
// children content will be switched based on whether user or not
// we first set it to only show modal when show modal = true!

// PROFILE BUTTON NOW HAS PROPS PASSED IN

export default Navigation;
