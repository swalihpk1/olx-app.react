import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home';
// import Home from './Pages/Home';
import { AuthContext, firebaseContext } from './store/Context';

function App() {

  const { user, setUser } = useContext(AuthContext)
  const { firebase } = useContext(firebaseContext)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
  })

  return (
    <div>
      <Router>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/signup'>
          <Signup />
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/create'>
          <Create />
        </Route>

      </Router>

    </div>
  );
}

export default App;
