// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsList from "./components/Spots";
import SpotShow from "./components/SpotShow";
import CreateSpotForm from "./components/CreateSpotForm";
import CreateReviewForm from "./components/CreateReviewForm";
import BookingsList from "./components/Bookings";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <div className='main-nav-container'>
        <Navigation isLoaded={isLoaded} />
      </div>
      <div>

        {isLoaded && (
          <>
            <Switch>
              <Route exact path="/">
                <SpotsList />
                <Footer />
              </Route>
              <Route exact path="/spots/:spotId">
                <SpotShow />
              </Route>
              <Route exact path='/create-spot'>
                <CreateSpotForm />
              </Route>
              <Route exact path='/create-review'>
                <CreateReviewForm />
              </Route>
              <Route exact path='/user'>
                <BookingsList />
              </Route>
              <Route>
                <div className='error-handler'>
                  ¡ RESOÜRCE NOT FOÜND !
                </div>
              </Route>
            </Switch>
          </>
        )}
      </div>
    </>
  );
}

export default App;
