// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logo.png'

// bring in modal -- children of this modal can be either login or signup form
import { Modal } from '../../context/Modal';
// bring in forms to apply with modal
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage'
// import CreateSpotForm from '../CreateSpotForm';
import CreateSpotFormModal from '../CreateSpotForm';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  // this setter can be passed to prof button to show modal!
  const [login, setLogin] = useState(true)



  return (
    <div className='navigation-container'>
      {/* <div> */}
      <NavLink exact to="/" style={{ textDecoration: 'none' }}>
        <div className='logo-container'>
          <div className='da-icon'>
            <img src={logo} className={'site-logo'} />
          </div>
          <div className='logo-name'>
            buh'n'buh
          </div>
        </div>
      </NavLink >
      {/* </div> */}
      <div className='search-container'>
        <NavLink exact to="/coming-soon" style={{ textDecoration: 'none', color: 'black' }}>
          <div className='search-border'>
            <span className='search-text'>Anywhere</span> | <span className='search-text'>Any week</span> | <span className='search-text-gray'>Add guests</span> <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </NavLink>
      </div>
      <div className='hosting-profile-container'>
        {
          sessionUser && (
            <div className='hosting-container'>
              <CreateSpotFormModal />
            </div>
          )
        }
        <div>
          {isLoaded && (
            <div>
              <ProfileButton
                user={sessionUser}
                setLogin={setLogin}
                setShowModal={setShowModal}
                className='profile-button'
              />
            </div>
          )}
        </div>
      </div>
      {
        showModal && (
          <Modal onClose={() => setShowModal(false)} style={{ textDecoration: 'none' }}>
            {login ?
              <LoginForm setShowModal={setShowModal} showModal={showModal} /> : <SignupFormPage setShowModal={setShowModal} />}
          </Modal>
        )
      }
    </div >
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
