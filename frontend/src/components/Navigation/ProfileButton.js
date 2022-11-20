// frontend/src/components/Navigation/ProfileButton.js

import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// import LoginFormModal from "../LoginFormModal";
import './Navigation.css'

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    // click event listener to whole doc -- if we click on page it will run
    // closeMenu!! -- really sets 'setShowMenu' to false or our slice of state on showing menu
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div className='profile-container'>
        <div className='profile-button-container'>
          <button onClick={openMenu} className='profile-button'>
            {/* <i className="fa-regular fa-bars"></i> */}
            <div className='bars-icon-container'>
              <i className="fa-solid fa-bars"></i>
            </div>
            <div className='user-icon-container'>
              <i className="fas fa-user-circle" />
            </div>
          </button>
        </div>

        {showMenu && (user ?
          (
            <div className='profile-dropdown-container'>
              <div className="profile-dropdown">
                <div className='user-info-container'>
                <div className='user-username'>{user.username}</div>
                <div className='user-email'>{user.email}</div>
                </div>
                <div className='logout-button-container'>
                  <button
                  className='logout-button'
                  onClick={logout}>Log Out</button>

                </div>
              </div>
            </div>
          )
          :
          (
            <div className='profile-dropdown-container'>
              <div className="profile-dropdown">
                <div className='login-button-container'>
                  <button
                    className='login-button'
                    onClick={() => {
                      setLogin(true)
                      setShowModal(true)
                      //if someone clicks log in button - login is true, open up modal
                    }}>
                    Log In
                  </button>
                </div>
                <div className='signup-button-container'>
                  <button
                  className='signup-button'
                  onClick={() => {
                    setLogin(false)
                    setShowModal(true)
                    // need to hardcode to true to make sure when they click elsewhere in modal it closes!
                  }}>
                    Sign Up
                  </button>
                </div>
                <div className='demo-login-container'>
                  <button
                  className='demo-user-button'
                  onClick={() => {
                    dispatch(sessionActions.login({credential: 'DemoUser', password: 'password'}))
                    setShowModal(false)
                  }}>
                    Demo User
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default ProfileButton;
