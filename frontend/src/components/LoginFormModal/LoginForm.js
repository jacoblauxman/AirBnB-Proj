// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useEffect } from 'react'

function LoginForm({ setShowModal }) {
  //passed in setter of modal
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // useEffect(() => {

  // }, [errors.length])

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }))
      // adding our then in before the catch -- any below 400
      // if it's successful do the 'then' --> set our showModal slice of state to false
      // .then(setShowModal(false))
      .then(() => {
        console.log('.then in loginForm')
        setShowModal(false)
        setErrors([]);
      })
      .catch(
        async (res) => {
          console.log('.catch for loginForm')
          const data = await res.json();
          console.log(data)
          if (data && data.errors.length > 0) setErrors(data.errors);
        }
      );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className='form-title'>Login</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <input
            title="Username or Email Required"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username or Email'
            minLength={0}
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </label>
        <button
          type="submit"
        >
          Continue
        </button>
      </form>
    </>
  );
}

export default LoginForm;
