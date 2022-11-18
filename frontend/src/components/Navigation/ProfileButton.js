// frontend/src/components/Navigation/ProfileButton.js

import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

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
            <i className="fa-solid fa-bars"></i>
            <i className="fas fa-user-circle" />
          </button>
        </div>

        {showMenu && (user ?
          <div className='profile-dropdown-container'>
            (<ul className="profile-dropdown">
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>

              </li>
            </ul>)
          </div>
          :
          <div className='profile-dropdown-container'>

            (<ul className="profile-dropdown">
              <li>
                <button onClick={() => {
                  setLogin(true)
                  setShowModal(true)
                  //if someone clicks log in button - login is true, open up modal
                }}>
                  Log In
                </button>
              </li>
              <li>
                <button onClick={() => {
                  setLogin(false)
                  setShowModal(true)
                  // need to hardcode to true to make sure when they click elsewhere in modal it closes!
                }}>
                  Sign Up
                </button>
              </li>
            </ul>)
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
