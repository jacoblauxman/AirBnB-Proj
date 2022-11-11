import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';

// // FRONTEND PHASE 0: call restoreCSRF -- attach custom fetch to window to when in dev
// import { restoreCSRF, csrfFetch } from './store/csrf'

//TAKE TWO PHASE 0:
// ... other imports
import { restoreCSRF, csrfFetch } from './store/csrf';


const store = configureStore();

// if (process.env.NODE_ENV !== "production") {
//   // adding in for PHASE 0 of AUTH ME: checking window of crsfFetch!
//   restoreCSRF()
//   window.csrfFetch = csrfFetch;
//   //template boilerplate:
//   window.store = store;
// }




function Root() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
