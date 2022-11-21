// frontend/src/components/LoginFormPage/index.js
// import React, { useEffect, useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';

// import './LoginForm.css';


// function LoginFormPage({ setShowModal, showModal }) {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
//   const [credential, setCredential] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState([]);


//   if (sessionUser) return (
//     <Redirect to="/" />
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     return dispatch(sessionActions.login({ credential, password }))
//       .then(() => setShowModal(false))
//       .catch(async (res) => {
//         const data = await res.json();
//         console.log(data.errors, 'in handle submit Login Form!')
//         if (data && data.errors) setErrors(data.errors);
//         // if (data && !data.errors.length)
//       })
//     // .then(setErrors([]))
//     // .then(setShowModal(false))
//   }


//   return (
//     <form className='loginformcontainer' onSubmit={handleSubmit}>
//       {/* <h1 className='form-title'>Login</h1> */}
//       <ul className='validation-error-list'>
//         {errors?.length > 0 && errors.map((error, idx) => <li className='validation-error' style={{ color: 'red' }} key={idx}>{error}</li>)}
//       </ul>
//       <label>
//         {/* Username or Email */}
//         <input
//           type="text"
//           value={credential}
//           onChange={(e) => setCredential(e.target.value)}
//           required
//           placeholder='User Name or Email'
//         />
//       </label>
//       <label>
//         Password
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </label>
//       <button
//         className='submit-button'
//         type="submit"
//       >Log In
//       </button>
//     </form>
//   );
// }

// export default LoginFormPage;
