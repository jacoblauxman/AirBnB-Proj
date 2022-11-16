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
import EditSpotForm from "./components/EditSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path="/">
            <SpotsList />
          </Route>
          <Route path="/spots/:spotId">
            <SpotShow />
          </Route>
          <Route path='/spots'>
            <CreateSpotForm />
          </Route>
          {/* <Route path='/editSpot'>
            <EditSpotForm />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
